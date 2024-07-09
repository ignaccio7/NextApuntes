"use client";

import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css"

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const SlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#666",
            "--swiper-pagination-color": "#666",
          } as React.CSSProperties
        }
        spaceBetween={10}
        autoplay={{
          delay:2000
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="swiperBig"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img src={`/products/${image}`} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PAGINATION */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiperSmall"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img src={`/products/${image}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
