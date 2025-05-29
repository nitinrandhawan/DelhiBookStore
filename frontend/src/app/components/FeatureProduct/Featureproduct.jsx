"use client";
import React from "react";
import Image from "next/image";
import { Heart, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import toast from "react-hot-toast";
import product1 from "../../Images/DBS/1.jpg";

const Featureproduct = () => {
  const products = [
    {
      id: 30,
      name: "Book Title 30",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 31,
      name: "Book Title 31",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 32,
      name: "Book Title 32",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 33,
      name: "Book Title 33",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 34,
      name: "Book Title 34",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 35,
      name: "Book Title 35",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 36,
      name: "Book Title 36",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 37,
      name: "Book Title 37",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 38,
      name: "Book Title 38",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 39,
      name: "Book Title 39",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 40,
      name: "Book Title 40",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 41,
      name: "Book Title 41",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 42,
      name: "Book Title 42",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 43,
      name: "Book Title 43",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 44,
      name: "Book Title 44",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 45,
      name: "Book Title 45",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 46,
      name: "Book Title 46",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 47,
      name: "Book Title 47",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 48,
      name: "Book Title 48",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 49,
      name: "Book Title 49",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 50,
      name: "Book Title 50",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 51,
      name: "Book Title 51",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 52,
      name: "Book Title 52",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 53,
      name: "Book Title 53",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 54,
      name: "Book Title 54",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
    {
      id: 55,
      name: "Book Title 55",
      image: product1,
      discount: "6%",
      oldPrice: "8500",
      newPrice: "7995",
    },
  ];

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (id, name, img, newPrice) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        image: img,
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
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Featured Books</h2>
            <p className="text-sm max-w-48 md:max-w-full text-gray-500">
              Discover the most popular books of the month at Delhi Book Store
            </p>
          </div>

          <Link href="/">
            <button className="view-all-btn">
              View All <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex md:flex-row flex-col border border-gray-200 bg-white px-2"
            >
              <div className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-e-2xl z-10">
                  {product.discount}
                </div>

                {/* Wishlist Icon */}
                <div className="absolute top-2 right-3 bg-white rounded-full p-1 shadow-md hover:text-red-600 cursor-pointer z-10">
                  <Heart size={18} />
                </div>

                {/* Product Image */}
                <Link href={`/product/${product.id}`}>
                  <div className="w-30 h-50 lg:w-40 md:w-35 flex justify-center m-auto p-2 items-center mb-2 bg-white ">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="object-contain h-full"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Name */}
              <div className="w-full">
                <Link href={`/product/${product.id}`}>
                  <h3 className="mt-2 text-sm md:text-md font-normal md:font-semibold line-clamp-2 hover:underline">
                    {product.name}
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
                    ₹{product.newPrice}
                  </div>
                  <div className="text-sm text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`mb-2 md:mb-0 ${
                    cartItems.some((item) => item.id === product.id)
                      ? "added-to-cart-btn"
                      : "add-to-cart-btn"
                  }`}
                  onClick={() =>
                    handleAddToCart(
                      product.id,
                      product.name,
                      product.img,
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

export default Featureproduct;
