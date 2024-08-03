"use client"
import React from 'react'
import TitleSection from '../TitleSection'
import Slider from 'react-slick';
import FeedBackCard from './FeedBackCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Feedback() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear"
      };
    const FeedbackS = [
        {
            image: '/Feedback/Feedback1.png',
            rate: 3.5,
            name: "Floyd Miles",
            p:"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        },
        {
            image: '/Feedback/Feedback2.png',
            rate: 4,
            name: "Ronald Richards",
            p:"ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        },
        {
            image: '/Feedback/Feedback3.png',
            rate: 4.5,
            name: "Savannah Nguyen",
            p:"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        },
    ]
    return (
        <div className='feedback max-w-screen-xl mx-auto pb-[120px]'>
            <div className='mb-[70px]'>
            <TitleSection title={'Feedback'} />
            </div>
            <div>
                <div className="slider-container">
                    <Slider {...settings}>
                        {
                            FeedbackS.map((Feedback, i) => {
                                return <FeedBackCard key={i} feedBack={Feedback} />
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Feedback