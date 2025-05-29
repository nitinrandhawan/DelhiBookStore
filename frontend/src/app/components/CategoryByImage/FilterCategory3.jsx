import React from "react";
import Image from "next/image";
import Link from "next/link";
import filterimage8 from "../../Images/DBS/BANNER14.png";
import filterimage9 from "../../Images/DBS/BANNER10.jpg";
import { MoveRight } from "lucide-react";

const bannerData = [
  {
    id: 1,
    imgSrc: filterimage8,
    link: "/category/fruits",
    alt: "Fruits Banner",
  },
  {
    id: 2,
    imgSrc: filterimage9,
    link: "/category/vegetables",
    alt: "Vegetables Banner",
  },
];
const FilterCatgory3 = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {bannerData.map((item) => (
        <Link href={item.link} key={item.id} className="block group">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <Image
              src={item.imgSrc}
              alt={item.alt}
              width={400}
              height={250}
              className="w-full h-[200px] md:h-[250px] object-fill md:object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 w-full flex items-center justify-center pb-2">
              <button className="bg-purple-600 hover:bg-purple-800 text-white font-medium px-4 py-2 border border-white rounded-full inline-flex items-center gap-2 transition">
                Shop Now <MoveRight size={14} />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FilterCatgory3;
