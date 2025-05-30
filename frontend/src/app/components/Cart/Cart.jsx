"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import EmptyCart from "../../Images/DowloadImage/EmptyCart.png";
import toast from "react-hot-toast";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  applyCoupon,
  calculateTotalsLoad,
  removeFromCart,
  updateQuantity,
} from "@/app/redux/cartSlice";
import Link from "next/link";

export default function Cart() {
  const { cartItems, totalAmount, tax, discountAmount, total, couponCode } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [couponCodeInput, setCouponCode] = useState("");

  useEffect(() => {
    dispatch(calculateTotalsLoad());
  }, [dispatch, cartItems]);
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={EmptyCart} // ✅ Replace with your image path
            alt="Empty Wishlist"
            className="w-60 h-60 object-contain opacity-100"
          />
          <p className="text-purple-800 text-lg font-bold">Your Cart is empty.</p>
          <p className="text-sm text-black font-semibold">
            Start exploring and add items you like!
          </p>
          <Link href="/">
            <button className="mt-4 black-btn">Contineu to Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-xl font-bold mb-4">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div
            className="bg-white shadow-lg rounded p-5"
            style={{
              maxHeight: "700px",
              overflowY: "auto",
            }}
          >
            <div className="flex justify-around items-start text-sm font-semibold text-gray-500 mb-4">
              <div>Image</div>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>

            <div className="space-y-4 pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row flex-wrap justify-between items-center gap-2 md:gap-4 border-b border-gray-300 pb-4"
                >
                  <div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-contain"
                    />
                  </div>
                  <div className="font-medium line-clamp-1">{item.name}</div>
                  <div className="text-center">₹{item.price}</div>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          );
                        } else {
                          dispatch(removeFromCart(item.id));
                          toast.success(`${item.name} removed from cart`);
                        }
                      }}
                      className="p-2 rounded text-dark bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center border border-gray-300 rounded"
                    />

                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="p-2 rounded text-dark bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right flex justify-end items-center space-x-2">
                    <span>₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                        toast.success(`${item.name} removed from cart`);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg rounded p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(applyCoupon(couponCodeInput));
                console.log("couponCodeInput", couponCodeInput);
                console.log("couponCode", couponCode);
                if (couponCodeInput === couponCode) {
                  toast.success("Coupon Applied Successfully!");
                  return;
                } else {
                  toast.error("Please enter a valid coupon code.");
                  return;
                }
              }}
              className="mt-4 space-y-2"
            >
              <label htmlFor="coupon" className="text-sm font-medium">
                Coupon Code
              </label>
              <input
                type="text"
                id="coupon"
                placeholder="Enter code"
                value={couponCodeInput}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full border border-gray-300 focus:outline-purple-600 rounded px-3 py-2"
              />
              <button
                type="submit"
                className="w-full purple-btn"
                disabled={!couponCodeInput.trim()}
              >
                Apply Coupon
              </button>
            </form>

            <Link href={"/pages/checkout"}>
              <button className="w-full bg-black text-white py-2 rounded text-lg">
                Proceed to Checkout
              </button>
            </Link>
            <div className="text-center text-xs text-gray-500 mt-2">
              <p>🔒 Secure checkout powered by DELHI BOOK STORE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
