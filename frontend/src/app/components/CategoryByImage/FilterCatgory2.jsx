"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import filterimage4 from "../../Images/DBS/BANNER7.jpg";
import filterimage5 from "../../Images/DBS/BANNER8.jpg";
import filterimage6 from "../../Images/DBS/BANNER11.jpg";
import filterimage7 from "../../Images/DBS/BANNER12.jpg";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion"; // Import motion from framer-motion

const bannerData = [
  {
    id: 1,
    imgSrc: filterimage4,
    link: "/category/fruits",
    alt: "Fruits Banner",
  },
  {
    id: 2,
    imgSrc: filterimage5,
    link: "/category/vegetables",
    alt: "Vegetables Banner",
  },
  {
    id: 3,
    imgSrc: filterimage6,
    link: "/category/dairy",
    alt: "Dairy Banner",
  },
  {
    id: 4,
    imgSrc: filterimage7,
    link: "/category/dairy",
    alt: "Dairy Banner",
  },
];

const FilterCatgory2 = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {bannerData.map((item) => (
        <Link href={item.link} key={item.id} className="block group">
          {/* Adding motion.div to animate when in view */}
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }} // Initial hidden state
            whileInView={{ opacity: 1, y: 0 }} // State when in view
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the element is in view
            transition={{ duration: 0.6 }} // Animation duration
          >
            <Image
              src={item.imgSrc}
              alt={item.alt}
              width={400}
              height={250}
              className="w-full h-[280px] md:h-[380px] object-cover bg-top transition-transform duration-300 group-hover:scale-105"
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

export default FilterCatgory2;
