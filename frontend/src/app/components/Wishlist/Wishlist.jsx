"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/app/redux/wishlistSlice";
import { BadgeX } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import EmptywishList from "../../Images/DowloadImage/EmptyWishList.jpg";
import { addToCart } from "@/app/redux/cartSlice";
import Link from "next/link";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (id, name, image, price) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        image: image,
        price: price,
        totalPrice: price,
      })
    );
    if (cartItems.some((item) => item.id === id)) {
      toast.success("Quantity updated in your cart!");
    } else {
      toast.success(`"Great choice! ${name} added."`);
    }
  };

  const handleRemoveFromWishlist = (id, name) => {
    dispatch(removeFromWishlist(id));
    toast.error(`"${name}" removed from wishlist`);
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      <table className="min-w-full table-auto border-separate border-spacing-y-0">
        <thead>
          <tr className="text-left text-sm text-black font-bold">
            <th className="py-3">Image</th>
            <th className="py-3">Product</th>
            <th className="hidden md:table-cell py-3">Price</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>

        {wishlistItems.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={EmptywishList} // ✅ Replace with your image path
                    alt="Empty Wishlist"
                    className="w-45 h-45 object-contain mb-2 opacity-100"
                  />
                  <p className="text-purple-800 text-lg font-bold">
                    Your wishlist is empty.
                  </p>
                  <p className="text-sm text-black font-semibold">
                    Start exploring and add items you love!
                  </p>
                  <Link href="/">
                    <button className="mt-4 purple-btn">
                      Back to Shopping
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {wishlistItems.map((wishItem) => (
              <tr
                key={wishItem.id}
                className="hover:bg-gray-100 transition border-b"
              >
                {/* Image */}
                <td className="py-4 pr-2">
                  <Image
                    src={wishItem.image}
                    alt={wishItem.name}
                    width={60}
                    height={60}
                    className="rounded-md object-contain"
                  />
                </td>

                {/* Product Name */}
                <td className="text-sm font-medium text-gray-800 max-w-xs pr-4">
                  {wishItem.name}
                </td>

                {/* Price */}
                <td className="hidden md:table-cell text-sm pr-4">
                  <span className="text-purple-700 font-semibold">
                    ₹{wishItem.price}
                  </span>
                  {wishItem.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      ₹{wishItem.oldPrice}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2 md:gap-4">
                    <button
                      className={`${
                        cartItems.some((item) => item.id === wishItem.id)
                          ? "bg-black text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      } py-1 md:py-2 px-2 md:px-4  text-sm rounded `}
                      onClick={() =>
                        handleAddToCart(
                          wishItem.id,
                          wishItem.name,
                          wishItem.image,
                          wishItem.price
                        )
                      }
                    >
                      {cartItems.some((item) => item.id === wishItem.id)
                        ? "Added"
                        : "Add to cart"}
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      onClick={() =>
                        handleRemoveFromWishlist(wishItem.id, wishItem.name)
                      }
                    >
                      <BadgeX size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Wishlist;
