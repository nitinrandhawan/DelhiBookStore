"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import product1 from "../../Images/DBS/1.jpg";
import { addToCart } from "@/app/redux/AddtoCart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance, { serverUrl } from "@/app/redux/features/axiosInstance";
import { usePathname } from "next/navigation";
import {
  addToCartAPIThunk,
  addtoCartState,
} from "@/app/redux/AddtoCart/apiCartSlice";
import {
  addToWishlist,
  addToWishlistApi,
  addToWishlistState,
  removeFromWishlist,
  removeFromWishlistApi,
  removeFromWishlistState,
} from "@/app/redux/wishlistSlice";
import CallBackImg from "../../Images/DBS/DBSLOGO.jpg";
const BestSeller = ({ productlength, btnlength }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { cartItems } = useSelector((state) => state.cart);
  const { items: apiCartItems } = useSelector((state) => state.apiCart);
  const user = useSelector((state) => state.login.user);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  let cartItemsValue = [];
  if (user?.email) {
    cartItemsValue = apiCartItems;
  } else {
    cartItemsValue = cartItems;
  }

  const handleAddToCart = async (product) => {
    const exists = cartItems.some((item) => item.id === product._id);
    const insideApiExists = apiCartItems.some(
      (item) => item.id === product._id
    );

    const cartItem = {
      id: product._id,
      name: product.title,
      image: product1,
      price: product.finalPrice,
      totalPrice: product.finalPrice,
      quantity: 1,
    };

    if (!user && !user?.email) {
      try {
        await dispatch(addToCart(cartItem)).unwrap();

        toast.success(
          exists
            ? "Quantity updated in your cart!"
            : `Great choice! ${product.title} added.`
        );
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error("Cart error:", error);
      }
    } else {
      dispatch(addtoCartState({ id: product._id }));
      dispatch(addToCartAPIThunk({ productId: product._id, quantity: 1 }));
      toast.success(
        insideApiExists
          ? "Quantity updated in your cart!"
          : `Great choice! ${product.title} added.`
      );
    }
  };
  const handleAddToWishlist = (_id, title, img, finalPrice, price) => {
    if (user?.email) {
      const isAlreadyInWishlist = wishlistItems.some(
        (item) => item._id === _id
      );
      if (isAlreadyInWishlist) {
        dispatch(removeFromWishlistState(_id));
        dispatch(removeFromWishlistApi(_id));
      } else {
        dispatch(addToWishlistState({ _id }));
        dispatch(addToWishlistApi({ productId: _id }));
      }
    } else {
      const isAlreadyInWishlist = wishlistItems.some((item) => item.id === _id);
      if (isAlreadyInWishlist) {
        dispatch(removeFromWishlist(_id));
        toast.error(`"${title}" removed from wishlist.`);
      } else {
        dispatch(
          addToWishlist({
            id: _id,
            name: title,
            image: img,
            price: finalPrice,
            oldPrice: price,
          })
        );
        toast.success(`"${title}" added to wishlist.`);
      }
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
    product?.length > productlength ? product.slice(0, productlength) : product;

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
              <div
                className="bg-white text-black absolute top-2 right-3 shadow-md rounded-2xl p-1 cursor-pointer"
                onClick={() =>
                  handleAddToWishlist(
                    pro._id,
                    pro.title,
                    pro.img,
                    pro.finalPrice,
                    pro.oldPrice
                  )
                }
              >
                {(
                  user?.email
                    ? wishlistItems.some((item) => item?._id === pro._id)
                    : wishlistItems.some((item) => item.id === pro._id)
                ) ? (
                  "❤️"
                ) : (
                  <Heart size={16} />
                )}
              </div>

              {/* Product Image - Using placeholder */}
              <Link href={`/pages/shop/${pro._id}`}>
                <div className="h-35 flex justify-center m-auto items-center">
                  <Image
                    src={
                      pro?.images[0]
                        ? `${serverUrl}/public/image/${pro?.images[0]}`
                        : CallBackImg
                    }
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
                  <h3 className="mt-1 text-sm text-gray-800 underline font-semibold italic line-clamp-1">
                    by {pro.author}
                  </h3>
                </Link>
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
                    (
                      user?.email
                        ? cartItemsValue.some(
                            (item) => item?.productId?._id === pro._id
                          )
                        : cartItemsValue.some((item) => item.id === pro._id)
                    )
                      ? "added-to-cart-btn"
                      : "add-to-cart-btn"
                  }`}
                  onClick={() => handleAddToCart(pro)}
                >
                  {(
                    user?.email
                      ? cartItemsValue.some(
                          (item) => item?.productId?._id === pro._id
                        )
                      : cartItemsValue.some((item) => item.id === pro._id)
                  )
                    ? "Added"
                    : "Add to cart 🛒"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts?.length > btnlength && (
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
