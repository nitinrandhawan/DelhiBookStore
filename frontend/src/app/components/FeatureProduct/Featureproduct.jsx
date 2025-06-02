"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/AddtoCart/cartSlice";
import toast from "react-hot-toast";
import product1 from "../../Images/DBS/1.jpg";
import axiosInstance from "@/app/redux/features/axiosInstance";
import { usePathname } from "next/navigation";
const Featureproduct = ({ productlength, btnlength }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const pathname = usePathname();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const featureProduct = async () => {
      try {
        const response = await axiosInstance.get("/product/get-featured-books");
        setProduct(response.data.products || []); // ✅ Fallback to [] if undefined
      } catch (err) {
        setError("Failed to load New Arrival product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    featureProduct();
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

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Featured Books</h2>
            <p className="text-sm max-w-48 md:max-w-full text-gray-500">
              Discover the most popular books of the month at Delhi Book Store
            </p>
          </div>

          {pathname !== "/pages/featurebook" && (
            <Link href="/pages/featurebook">
              <button className="view-all-btn">
                View All <ArrowRight size={16} />
              </button>
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3">
          {visibleProducts.map((pro) => (
            <div
              key={pro._id}
              className="flex md:flex-row flex-col border border-gray-200 bg-white px-2"
            >
              <div className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-e-2xl z-10">
                  {pro.discount}%
                </div>

                {/* Wishlist Icon */}
                <div className="absolute top-2 right-3 bg-white rounded-full p-1 shadow-md hover:text-red-600 cursor-pointer z-10">
                  <Heart size={18} />
                </div>

                {/* Product Image */}
                <Link href={`/pages/shop/${pro._id}`}>
                  <div className="w-30 h-50 lg:w-40 md:w-35 flex justify-center m-auto p-2 items-center mb-2 bg-white ">
                    <Image
                      src={product1}
                      alt={pro.title}
                      className="object-contain h-full"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Name */}
              <div className="w-full">
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

                {/* Price */}
                <div className="mt-2">
                  <div className="text-md md:text-lg font-bold text-red-600">
                    ₹{pro.finalPrice}
                  </div>
                  <div className="text-sm text-gray-400 line-through">
                    ₹{pro.price}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`mb-2 md:mb-0 ${
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
          ))}
        </div>
        {product.length > btnlength && (
          <div className="text-center mt-4">
            <Link href={`/pages/shop/featured-books`}>
              <button className="view-all-btn m-auto">View All</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Featureproduct;
