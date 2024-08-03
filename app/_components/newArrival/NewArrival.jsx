"use client"
import React from 'react'
import TitleSection from '../TitleSection'
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";





function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className=' absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-colorGrayOne' onClick={onClick}>
        <GoArrowRight/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className=' absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-colorGrayOne' onClick={onClick}>
      <GoArrowLeft />
    </div>
  );
}



function NewArrival() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  const newArrivalArray = [
    {
      image: '/newArrival/newArrival1.png',
      name:"Knitted Joggers"
    },
    {
      image: '/newArrival/newArrival2.png',
      name:"Knitted Joggers"
    },
    {
      image: '/newArrival/newArrival3.png',
      name:"Knitted Joggers"
    },
    {
      image: '/newArrival/newArrival4.png',
      name:"Knitted Joggers"
    },
  ]
  return (
    <div className=' max-w-screen-xl mx-auto mb-[120px]'>
      <div className='mb-[70px]'>
        <TitleSection title={`New Arrival`} />
      </div>
      <div>
        <div className="slider-container">
          <Slider {...settings} className='px-8'>
            {
              newArrivalArray.map((product, i) => (
                <div key={i} className='px-2'>
                  <div className=' rounded-xl mb-6'>
                    <Image src={product.image} width={263} height={264} alt='product image' className='w-full rounded-xl' />
                  </div>
                  <div>
                    <Link href={'/'}>
                      <h1 className='text-[20px] text-colorGrayOne font-bold tracking-wide'>{product.name}</h1>
                    </Link>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default NewArrival