"use client"
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
function ImageOfPrduct({ productImage }) {
    console.log(productImage);
    const settings = {
        customPaging: function(i) {
          return (
            <a>
              
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className="slider-container mt-[120px]">
      <Slider {...settings}>
        {
                  productImage.map((img, i) => (
                <div key={i}>
                    <Image src={img.attributes.url} width={img.attributes.width} height={img.attributes.height} alt='product Image'/>
                </div>
            ))
        }
      </Slider>
    </div>
  )
}

export default ImageOfPrduct