import React from 'react';
import Slider from 'react-slick';
import { Box, Container } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Carousel settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  pauseOnHover:false,
  draggable:false,
  swipe:false
};

const slides = [
  {
    id: 1,
    image: 'https://scholarships.gov.in/public/assets2425/images/banner/Ministry-of-tribal.png', // Replace with your image URLs
  },
//   {
//     id: 2,
//     image: 'https://scholarships.gov.in/public/assets2425/images/banner/Ministry-of-electronic.jpg',
//     // heading: 'Academic Year 2024-25',
//     // subtext: 'Empowering Youth through Education',
//   },
  {
    id: 2,
    image: 'https://scholarships.gov.in/public/assets2425/images/banner/Banner4.png', // Replace with your image URL
  },
  {
    id: 3,
    image: 'https://scholarships.gov.in/public/assets2425/images/banner/banner3.png', // Replace with your image URL
  },
  {
    id: 4,
    image: 'https://scholarships.gov.in/public/assets2425/images/banner/Banner1.png', // Replace with your image URL
  },
];

const Carousel = () => {
  return (
    <Container maxWidth={false} sx={{ mt: 1 }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              position: 'relative',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 200,
              borderRadius: 2,
              width:'100%',
            }}
          />
        ))}
      </Slider>
    </Container>
  );
};

export default Carousel;
