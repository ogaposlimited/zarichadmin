/* eslint-disable react/self-closing-comp */

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Video.css';

const VideoCarousel = ({ videoUrls }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Center the videos on large screens
          variableWidth: true, // Allow variable width for videos
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="video-carousel-container">
      <Slider {...settings}>
        {videoUrls.map((video, index) => (
          <div key={index} className="video-slide">
            <div className="video-frame">
              <iframe
                width="100%"
                height="400px" // Increase the height as needed
                src={video}
                title={`Video ${index}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
