import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Find Your Furry Friend Today!",
    subtitle: "Browse loving pets waiting for a forever home.",
    img: "https://images.pexels.com/photos/5731865/pexels-photo-5731865.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Adopt, Don’t Shop",
    subtitle: "Give a second chance to rescued pets.",
    img: "https://images.pexels.com/photos/5731908/pexels-photo-5731908.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Care, Food & Toys",
    subtitle: "All your pet supplies in one place.",
    img: "https://images.pexels.com/photos/7474521/pexels-photo-7474521.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const Banner = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[380px] sm:h-[480px] md:h-[520px]">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 sm:p-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2">
                  {s.title}
                </h1>
                <p className="text-base sm:text-lg text-white/80 mb-4 max-w-xl">
                  {s.subtitle}
                </p>
                <button className="btn btn-primary w-fit">
                  Explore Pets & Supplies
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
