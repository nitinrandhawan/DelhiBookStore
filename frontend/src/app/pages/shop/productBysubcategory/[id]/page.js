"use client";
import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { addToCart } from "@/app/redux/AddtoCart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import ShopBanner from "@/app/components/Shop/ShopBanner";
import book1 from "../../../../Images/DBS/1.jpg";
import { fetchProductsByCategory } from "@/app/redux/features/productByCategory/productByCategorySlice";

const page = () => {
  const dispatch = useDispatch();
  const { id: subcategoryId } = useParams();
  const { cartItems } = useSelector((state) => state.cart);

  const { products, loading, error } = useSelector(
    (state) => state.productByCategory
  );

  useEffect(() => {
    if (subcategoryId) {
      dispatch(fetchProductsByCategory(subcategoryId));
    }
  }, [dispatch, subcategoryId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse space-y-2 rounded-lg border border-gray-200 p-4 shadow"
          >
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading Product By SubCategory
      </div>
    );
  }
  const handleAddToCart = (id, name, image, newPrice) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        image: image,
        price: newPrice,
        totalPrice: newPrice,
      })
    );
    if (cartItems.some((item) => item.id === id)) {
      toast.success("Quantity updated in your cart!");
    } else {
      toast.success(`"Great choice! ${name} added."`);
    }
  };
  return (
    <>
      <ShopBanner />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-5 py-2 bg-gray-200">
          <div className="text-sm text-gray-600 text-left">
            {products.length > 0
              ? `Showing ${products.length} products`
              : "No products found"}
          </div>
          <div>
            <span>Sort by:</span>
            <select className="p-2 text-black focus:outline-none">
              <option value="latest">Latest</option>
              <option value="popularity">Popularity</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 bg-white p-2 rounded"
            >
              {/* Image & Wishlist */}
              <div className="relative">
                {/* Discount badge */}
                {product.discount > 0 && (
                  <div className="absolute top-2 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-e-2xl z-10">
                    {product.discount}%
                  </div>
                )}

                {/* Wishlist icon */}
                <div className="absolute top-2 right-3 bg-white rounded-full p-1 shadow-md hover:text-red-600 cursor-pointer z-10">
                  <Heart size={18} />
                </div>

                {/* Product Image */}
                <Link href={`/pages/shop/${product._id}`}>
                  <div className="w-30 h-30 lg:w-50 lg:h-45 md:w-45 md:h-40 flex justify-center m-auto items-center py-2 mb-2 bg-white ">
                    <Image
                      // src={product.images[0] || "/fallback.jpg"}
                      src={book1}
                      alt={product.title}
                      width={120}
                      height={120}
                      className="object-contain h-full"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Content */}
              <div>
                <Link href={`/product/${product._id}`}>
                  <h3
                    className="my-2 text-sm md:text-md font-bold hover:underline line-clamp-1"
                    style={{
                      background:
                        "linear-gradient(90deg, #e9d5ff 0%, #d8b4fe 50%)",
                      padding: "0px 10px",
                      maxWidth: "fit-content",
                      borderRadius: "0 10px 10px 0",
                    }}
                  >
                    {product.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {
                    new DOMParser().parseFromString(
                      product.description || "",
                      "text/html"
                    ).body.textContent
                  }
                </p>

                <div className="flex items-center text-sm gap-1 mt-1">
                  <div className="text-yellow-400 text-2xl">★ ★ ★ ★ ★</div>
                  <span className="text-gray-500 text-xs">(3)</span>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <div className="text-lg font-bold text-red-500">
                    ₹{product.finalPrice}
                  </div>
                  <div className="text-sm text-gray-800 line-through">
                    ₹{product.price}
                  </div>
                </div>

                <button
                  className={`${
                    cartItems.some((item) => item.id === product.id)
                      ? "added-to-cart-btn"
                      : "add-to-cart-btn"
                  }`}
                  onClick={() =>
                    handleAddToCart(
                      product.id,
                      product.name,
                      product.image,
                      product.newPrice
                    )
                  }
                >
                  {cartItems.some((item) => item.id === product.id)
                    ? "Added"
                    : "Add to cart 🛒"}{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
