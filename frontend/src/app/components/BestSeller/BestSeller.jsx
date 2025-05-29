"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import product1 from "../../Images/DBS/1.jpg";
import { addToCart } from "@/app/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Sample product data with placeholder images
const products = [
  { id: 30, name: "Book Title 30", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 31, name: "Book Title 31", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 32, name: "Book Title 32", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 33, name: "Book Title 33", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 34, name: "Book Title 34", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 35, name: "Book Title 35", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 36, name: "Book Title 36", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 37, name: "Book Title 37", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 38, name: "Book Title 38", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 39, name: "Book Title 39", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 40, name: "Book Title 40", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 41, name: "Book Title 41", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 42, name: "Book Title 42", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 43, name: "Book Title 43", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 44, name: "Book Title 44", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 45, name: "Book Title 45", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 46, name: "Book Title 46", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 47, name: "Book Title 47", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 48, name: "Book Title 48", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 49, name: "Book Title 49", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 50, name: "Book Title 50", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 51, name: "Book Title 51", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 52, name: "Book Title 52", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 53, name: "Book Title 53", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 54, name: "Book Title 54", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
  { id: 55, name: "Book Title 55", image: product1, discount: "6%", oldPrice: "8500", newPrice: "7995" },
];


const BestSeller = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? products : products.slice(0, 12);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

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

        <Link href="/">
          <button className="view-all-btn">
            View All <ArrowRight size={16} />
          </button>
        </Link>
      </div>

      {/* Product Grid - Horizontal cards with improved layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row border border-gray-200 rounded-lg bg-white p-3 hover:shadow-md transition-shadow"
          >
            {/* Left side - Image with badges */}
            <div className="relative w-full md:w-1/3 mr-3">
              {/* Discount Badge */}
              <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg z-10">
                {product.discount}
              </div>

              {/* Wishlist Icon */}
              <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-sm hover:text-red-600 cursor-pointer z-10">
                <Heart size={18} />
              </div>

              {/* Product Image - Using placeholder */}
              <Link href={`/pages/shop/${product.id}`}>
                <div className="h-35 flex justify-center m-auto items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
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
                <Link href={`/pages/shop/${product.id}`}>
                  <h3 className="mt-2 text-sm md:text-md font-normal md:font-semibold line-clamp-2 hover:underline">
                    {product.name}
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
                    ₹{product.newPrice}
                  </div>
                  <div className="text-sm text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </div>
                </div>

                {/* Add to Cart Button */}
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
          </div>
        ))}
      </div>

      {products.length > 12 && (
        <div className="text-center mt-4">
          <button
            className="view-all-btn m-auto"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                View Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                View More <ChevronDown size={16} />
              </>
            )}{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
