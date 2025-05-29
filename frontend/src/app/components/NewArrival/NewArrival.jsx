"use client";
import { useRef } from "react";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import book1 from "../../Images/DBS/1.jpg";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/app/redux/wishlistSlice";

const NewArrival = () => {
  const products = [
    {
      id: 1,
      img: book1,
      name: "Introduction to Algorithms",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
    {
      id: 2,
      img: book1,
      name: "Data Structures in C",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
    {
      id: 3,
      img: book1,
      name: "Operating Systems Concepts",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
    {
      id: 4,
      img: book1,
      name: "Database System Design",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
    {
      id: 5,
      img: book1,
      name: "Computer Networks",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
    {
      id: 6,
      img: book1,
      name: "Artificial Intelligence Basics",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
    {
      id: 7,
      img: book1,
      name: "Web Development with React",
      oldPrice: "8500",
      newPrice: "7995",
      discount: "6%",
    },
  ];

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

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

  const handleAddToWishlist = (id, name, img, price, oldPrice) => {
    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === id);

    if (isAlreadyInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.error(`"${name}" removed from wishlist.`);
    } else {
      dispatch(
        addToWishlist({
          id,
          name,
          image: img,
          price,
          oldPrice,
        })
      );
      toast.success(`"${name}" added to wishlist.`);
    }
  };

  const swiperRef = useRef(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">New Arrival Books</h2>
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="border border-gray-300 p-2 rounded-lg relative bg-white">
                <div className="absolute top-2 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-e-2xl z-10">
                  {product.discount}
                </div>

                <div
                  className="bg-white text-black absolute top-2 right-3 shadow-md rounded-2xl p-1 cursor-pointer"
                  onClick={() =>
                    handleAddToWishlist(
                      product.id,
                      product.name,
                      product.img,
                      product.newPrice,
                      product.oldPrice
                    )
                  }
                >
                  {wishlistItems.some((item) => item.id === product.id) ? (
                    "❤️"
                  ) : (
                    <Heart size={16} />
                  )}
                </div>

                <Link href={`/pages/shop/${product.id}`}>
                  <div className="w-50 h-60 flex justify-center m-auto items-center mb-2">
                    <Image
                      src={product.img}
                      alt={product.name}
                      className="object-contain h-full"
                    />
                  </div>
                </Link>

                <Link href={`/pages/shop/${product.id}`}>
                  <h3 className="mt-2 text-sm md:text-md font-normal md:font-semibold line-clamp-2 hover:underline">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center text-sm gap-1 mb-1">
                  <div className="text-yellow-400">★ ★ ★ ★ ★</div>
                  <span className="text-gray-500 text-xs">(3)</span>
                </div>

                <div className="text-md md:text-lg font-bold text-red-600">
                  ₹{product.newPrice}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  ₹{product.oldPrice}
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
                      product.img,
                      product.newPrice
                    )
                  }
                >
                  {cartItems.some((item) => item.id === product.id)
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
