"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";

// import required modules
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const MobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={
          {
            width: "100%",
            height: "500px",
          } as React.CSSProperties
        }
        pagination
        spaceBetween={10}
        autoplay={{
          delay: 3000,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="swiperBig"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img src={`/products/${image}`} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
