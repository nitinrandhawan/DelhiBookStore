"use client";
import React, { useEffect, useState } from "react";
import ShopBanner from "./ShopBanner";
import { ChevronsLeft, ChevronsRight, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import book from "../../Images/DBS/1.jpg";
import { addToCart } from "@/app/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/redux/features/shop/shopSlice";
import { useRouter, useSearchParams } from "next/navigation";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading, error, totalPages } = useSelector(
    (state) => state.products
  );
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 30;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  console.log("limit valu", limit);
  const router = useRouter();
  useEffect(() => {
    console.log("limit", limit);

    dispatch(fetchProducts({ limit, page }));
  }, [dispatch, limit, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const handleLimitChange = (e) => {
    const selectedLimit = e.target.value;
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("limit", selectedLimit);
    setLimit(e.target.value);
    router.push(`?${currentParams.toString()}`);
  };
  const { cartItems } = useSelector((state) => state.cart);

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
      <div className="text-center py-6 text-red-500">Error loading banners</div>
    );
  }

  const visiblePages = 8;
  const pageGroupStart =
    Math.floor((page - 1) / visiblePages) * visiblePages + 1;
  const pageGroupEnd = Math.min(pageGroupStart + visiblePages - 1, totalPages);
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
          <div className="flex justify-between items-center text-sm text-gray-600">
            {/* Sort Dropdown */}
            <div>
              <span>Sort by:</span>
              <select className="p-2 text-black  focus:outline-none">
                <option value="latest">Latest</option>
                <option value="popularity">Popularity</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>

            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span>Show:</span>
              <select
                className="p-2 text-black focus:outline-none"
                onChange={handleLimitChange}
                value={limit}
              >
                <option value="20">20 Items</option>
                <option value="40">40 Items</option>
                <option value="50">50 Items</option>
                <option value="60">60 Items</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="grid md:flex-row flex-col border border-gray-200 bg-white px-2 py-2"
            >
              <div className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-e-2xl z-10">
                  {product.discount}%
                </div>

                {/* Wishlist Icon */}
                <div className="absolute top-2 right-3 bg-white rounded-full p-1 shadow-md hover:text-red-600 cursor-pointer z-10">
                  <Heart size={18} />
                </div>

                {/* Product Image */}
                <Link href={`/pages/shop/${product._id}`}>
                  <div className="w-30 h-30 lg:w-50 lg:h-45 md:w-45 md:h-40 flex justify-center m-auto items-center py-2 mb-2 bg-white ">
                    <Image
                      // src={product.images}
                      src={book}
                      alt={product.title}
                      className="object-contain h-full"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Name */}
              <div className="w-full">
                <Link href={`/product/${product.id}`}>
                  <h3
                    style={{
                      background:
                        "linear-gradient(90deg, #e9d5ff 0%, #d8b4fe 50%)", // light purple gradient
                      color: "var(--purple)", // dark purple text
                      maxWidth: "fit-content",
                      padding: "0px 10px",
                      fontSize: "14px",
                    }}
                    className="my-2 text-sm md:text-md font-normal md:font-bold line-clamp-1 hover:underline rounded-l-0 rounded-r-2xl"
                  >
                    {product.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-700 leading-relaxed tracking-wide line-clamp-3">
                  {
                    new DOMParser().parseFromString(
                      product.description || "",
                      "text/html"
                    ).body.textContent
                  }
                </p>

                {/* Rating */}
                <div className="flex items-center text-sm gap-1 mt-1">
                  <div className="text-yellow-400 text-2xl">★ ★ ★ ★ ★</div>
                  <span className="text-gray-500 text-xs">(3)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                  <div className="text-lg md:text-1xl font-semibold md:font-bold text-red-500">
                    ₹ {product.price}
                  </div>
                  <div className="text-sm text-gray-800 font-bold line-through">
                    ₹ {product.price}
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
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6 overflow-auto">
        <div className="flex justify-center space-x-2 mt-4">
          {/* Prev Group Button */}
          <button
            onClick={() =>
              handlePageChange(Math.max(pageGroupStart - visiblePages, 1))
            }
            disabled={page === 1}
            className={`px-4 flex items-center py-2 border rounded-full ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            <ChevronsLeft size={20} /> Prev
          </button>

          {/* Page Buttons */}
          {Array.from(
            { length: pageGroupEnd - pageGroupStart + 1 },
            (_, i) => pageGroupStart + i
          ).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 border rounded ${
                pageNum === page ? "bg-purple-600 text-white" : "bg-white"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Group Button */}
          <button
            onClick={() =>
              handlePageChange(
                Math.min(page + 1, totalPages - visiblePages + 1)
              )
            }
            disabled={pageGroupEnd === totalPages}
            className={`px-4 py-1 flex items-center border rounded-full ${
              pageGroupEnd === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Next <ChevronsRight size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;
