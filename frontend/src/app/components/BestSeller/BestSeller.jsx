"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import product1 from "../../Images/DBS/1.jpg";
import { addToCart } from "@/app/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "@/app/redux/features/axiosInstance";
import { usePathname } from "next/navigation";

const BestSeller = ({ productlength, btnlength }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (_id, title, img, finalPrice) => {
    dispatch(
      addToCart({
        id: _id,
        name: title,
        image: img,
        price: finalPrice,
        totalPrice: finalPrice,
      })
    );
    if (cartItems.some((item) => item.id === _id)) {
      toast.success("Quantity updated in your cart!");
    } else {
      toast.success(`"Great choice! ${title} added."`);
    }
  };

  useEffect(() => {
    const bestSellingProduct = async () => {
      try {
        const response = await axiosInstance.get(
          "/product/get-best-selling-books"
        );
        setProduct(response.data.products || []); // ✅ Fallback to [] if undefined
      } catch (err) {
        setError("Failed to load New Arrival product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    bestSellingProduct();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse space-y-3 border border-gray-200 rounded-lg shadow p-4"
          >
            {/* Image skeleton */}
            <div className="w-full h-40 bg-gray-300 rounded-md"></div>

            {/* Title skeleton */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>

            {/* Price skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500">
        {loading ? "Loading..." : "Product not found."}
      </div>
    );
  }

  const visibleProducts =
    product.length > productlength ? product.slice(0, productlength) : product;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Best Selling Books
          </h2>
          <p className="text-sm max-w-48 md:max-w-full text-gray-500">
            Explore our top-selling titles this month at Delhi Book Store
          </p>
        </div>

        {pathname !== "/pages/bestSellerbook" && (
          <Link href="/pages/bestSellerbook">
            <button className="view-all-btn">
              View All <ArrowRight size={16} />
            </button>
          </Link>
        )}
      </div>

      {/* Product Grid - Horizontal cards with improved layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {visibleProducts.map((pro) => (
          <div
            key={pro._id}
            className="flex flex-col md:flex-row border border-gray-200 rounded-lg bg-white p-3 hover:shadow-md transition-shadow"
          >
            {/* Left side - Image with badges */}
            <div className="relative w-full md:w-1/3 mr-3">
              {/* Discount Badge */}
              <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg z-10">
                {pro.discount}%
              </div>

              {/* Wishlist Icon */}
              <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-sm hover:text-red-600 cursor-pointer z-10">
                <Heart size={18} />
              </div>

              {/* Product Image - Using placeholder */}
              <Link href={`/pages/shop/${pro._id}`}>
                <div className="h-35 flex justify-center m-auto items-center">
                  <Image
                    src={product1}
                    alt={pro.title}
                    width={112}
                    height={112}
                    className="object-contain h-full w-full"
                  />
                </div>
              </Link>
            </div>

            {/* Right side - Product details */}
            <div className="w-full md:w-2/3 flex flex-col justify-between">
              {/* Product Name */}
              <div>
                <Link href={`/pages/shop/${pro._id}`}>
                  <h3 className="mt-2 text-sm md:text-md font-normal md:font-semibold line-clamp-2 hover:underline">
                    {pro.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center text-sm gap-1 mt-1">
                  <div className="text-yellow-400 text-xs">★ ★ ★ ★ ★</div>
                  <span className="text-gray-500 text-xs">(3)</span>
                </div>
              </div>

              <div className="mt-auto">
                {/* Price */}
                <div className="flex items-center gap-2">
                  <div className="text-md md:text-lg font-bold text-red-600">
                    ₹{pro.finalPrice}
                  </div>
                  <div className="text-sm text-gray-400 line-through">
                    ₹{pro.price}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`${
                    cartItems.some((item) => item.id === pro._id)
                      ? "added-to-cart-btn"
                      : "add-to-cart-btn"
                  }`}
                  onClick={() =>
                    handleAddToCart(pro._id, pro.title, pro.img, pro.finalPrice)
                  }
                >
                  {cartItems.some((item) => item.id === pro._id)
                    ? "Added"
                    : "Add to cart 🛒"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts.length > btnlength && (
        <div className="text-center mt-4">
          <button className="view-all-btn m-auto">
            View All <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
