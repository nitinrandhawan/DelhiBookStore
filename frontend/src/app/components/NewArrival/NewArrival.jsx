"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import product1 from "../../Images/DBS/1.jpg";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/AddtoCart/cartSlice";
import {
  addToWishlist,
  addToWishlistApi,
  addToWishlistState,
  getAllWishlistItemsApi,
  removeFromWishlist,
  removeFromWishlistApi,
  removeFromWishlistState,
} from "@/app/redux/wishlistSlice";
import axiosInstance, { serverUrl } from "@/app/redux/features/axiosInstance";
import { addToCartAPIThunk, addtoCartState, removeFromCartAPI } from "@/app/redux/AddtoCart/apiCartSlice";

const NewArrival = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { items: apiCartItems } = useSelector((state) => state.apiCart);
  const user = useSelector((state) => state.login.user);
  let cartItemsValue = [];
    if (user?.email) {
    cartItemsValue = apiCartItems;
  } else {
    cartItemsValue = cartItems;
  }


  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const handleAddToCart = async (product) => {
    const exists = cartItems.some((item) => item.id === product._id);
    const insideApiExists = apiCartItems.some(
      (item) => item.productId?._id === product._id
    );

    const cartItem = {
      id: product._id,
      name: product.title,
      image: product?.images[0],
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
      const isAlreadyInWishlist = wishlistItems.some((item) => item._id === _id);
      if (isAlreadyInWishlist) {
        dispatch(removeFromWishlistState(_id));
        dispatch(removeFromWishlistApi(_id));
      }else{
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
  const swiperRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const newArrivals = async () => {
      try {
        const response = await axiosInstance.get("/product/get-new-arrival");
        setProduct(response.data.products);
      } catch (err) {
        setError("Failed to load New Arrival product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    newArrivals();
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          New Arrival products
        </h2>
        <Link href="/">
          <button className="view-all-btn">
            View All
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>

      <div
        onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          navigation
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {product.map((pro) => (
            <SwiperSlide key={pro._id}>
              <div className="border border-gray-300 p-2 rounded-lg relative bg-white">
                <div className="absolute top-2 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-e-2xl z-10">
                  {pro.discount}%
                </div>

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
                  {(user?.email ? wishlistItems.some((item) => item?._id === pro._id) :wishlistItems.some((item) => item.id === pro._id) ) ? (
                    "❤️"
                  ) : (
                    <Heart size={16} />
                  )}
                </div>

                <Link href={`/pages/shop/${pro._id}`}>
                  <div className="w-50 h-60 flex justify-center m-auto items-center mb-2">
                    <Image
                      src={`${serverUrl}/public/image/${pro.images[0]}`}
                      width={300}
                      height={300}
                      alt={pro.title}
                      className="object-contain h-full"
                    />
                  </div>
                </Link>

                <Link href={`/pages/shop/${pro._id}`}>
                  <h3 className="mt-2 text-sm md:text-md font-normal md:font-semibold line-clamp-1 hover:underline">
                    {pro.title}
                  </h3>
                </Link>
                <div className="flex items-center text-sm gap-1 mb-1">
                  <div className="text-yellow-400">★ ★ ★ ★ ★</div>
                  <span className="text-gray-500 text-xs">(3)</span>
                </div>

                <div className="text-md md:text-lg font-bold text-red-600">
                  ₹{pro.finalPrice}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  ₹{pro.price}
                </div>

                <button
                  className={`${
                  (user?.email ?cartItemsValue.some((item) => item?.productId?._id  === pro._id): cartItemsValue.some((item) => item.id === pro._id))
                      ? "added-to-cart-btn"
                      : "add-to-cart-btn"
                  }`}
                  onClick={() =>
                    handleAddToCart(pro)
                  }
                >
                  {(user?.email ?cartItemsValue.some((item) => item?.productId?._id  === pro._id): cartItemsValue.some((item) => item.id === pro._id))
                    ? "Added"
                    : "Add to cart 🛒"}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrival;
