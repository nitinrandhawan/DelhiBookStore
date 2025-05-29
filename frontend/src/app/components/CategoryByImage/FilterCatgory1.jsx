"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import filterimage1 from "../../Images/DBS/BANNER2.jpg";
import filterimage2 from "../../Images/DBS/BANNER9.jpg";
import filterimage3 from "../../Images/DBS/BANNER13.png";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion"; // Importing the necessary hooks

const bannerData = [
  {
    id: 1,
    imgSrc: filterimage1,
    link: "/category/fruits",
    alt: "Fruits Banner",
  },
  {
    id: 2,
    imgSrc: filterimage2,
    link: "/category/vegetables",
    alt: "Vegetables Banner",
  },
  {
    id: 3,
    imgSrc: filterimage3,
    link: "/category/dairy",
    alt: "Dairy Banner",
  },
];

const FilterCatgory1 = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {bannerData.map((item) => (
        <Link href={item.link} key={item.id} className="block group">
          {/* Using motion.div to animate the element when in view */}
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }} // Initial hidden state
            whileInView={{ opacity: 1, y: 0 }} // State when in view
            viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the element is in view
            transition={{ duration: 0.6 }} // Animation duration
          >
            <Image
              src={item.imgSrc}
              alt={item.alt}
              width={400}
              height={250}
              className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 w-full flex items-center justify-center pb-2">
              <button className="bg-purple-600 hover:bg-purple-800 text-white font-medium px-4 py-2 border border-white rounded-full inline-flex items-center gap-2 transition">
                Shop Now <MoveRight size={14} />
              </button>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default FilterCatgory1;
