import { useState } from "react";
import Link from "next/link";
import {
  Home,
  UserPlus,
  Search,
  LucideHeart,
  BadgeX,
  ShoppingCart,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function BottomNavBar() {
  const [bottombar, setBottomBar] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const wishlistCount = useSelector(
    (state) => state.wishlist.wishlistItems.length
  );

  const navItems = [
    {
      icon: <Home className="h-6 w-6" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      label: "Cart",
      href: "/pages/cart",
      count: cartCount,
    },
    {
      icon: <Search className="h-6 w-6" />,
      label: "Search",
      type: "search",
    },
    {
      icon: <LucideHeart className="h-6 w-6" />,
      label: "Wishlist",
      href: "/pages/wishlist",
      count: wishlistCount,
    },
    {
      icon: <UserPlus className="h-6 w-6" />,
      label: "Login",
      href: "/pages/login",
    },
  ];

  return (
    <>
      {/* Slide-down Search Bar */}
      {showSearchBar && (
        <div
          className={`md:hidden fixed top-0 left-0 w-full z-50 bg-white p-3 shadow-md flex items-center gap-2 transition-all duration-300`}
        >
          <button
            onClick={() => setShowSearchBar(false)}
            className="text-black font-semibold"
          >
            <BadgeX />
          </button>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-purple-700 text-black rounded-full focus:outline-none"
          />
          <Search className="text-purple-800" h={16} w={16} />
        </div>
      )}

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-purple-900 rounded-t-lg md:hidden">
        <div className="grid h-full grid-cols-5 mx-auto">
          {navItems.map((item) => {
            const isSearch = item.type === "search";
            const isActive = bottombar === item.label.toLowerCase();

            if (isSearch) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setShowSearchBar(true);
                    setBottomBar(item.label.toLowerCase());
                  }}
                  className="relative -top-4 w-14 h-14 bg-white text-purple-900 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-500 mx-auto"
                >
                  {item.icon}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setBottomBar(item.label.toLowerCase())}
                className="flex flex-col items-center justify-center relative"
              >
                <div className={`${isActive ? "text-blue-400" : "text-white"}`}>
                  {item.icon}
                  {item.count > 0 && (
                    <span className="absolute top-2 right-5 bg-red-500 text-white text-xs px-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isActive ? "text-blue-400" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
