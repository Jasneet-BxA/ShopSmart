'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const images = [
  {
    src: 'https://static.vecteezy.com/system/resources/previews/028/559/544/non_2x/online-shopping-concept-free-photo.jpg',
    alt: 'Banner 1',
    title: 'Big Sale - Up to 50% OFF',
    description: 'Shop now and save big on all items!',
  },
  {
    src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    alt: 'Banner 2',
    title: 'New Arrivals',
    description: 'Check out the latest trends in our store.',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
    alt: 'Banner 3',
    title: 'Free Shipping',
    description: 'On all orders over $50.',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex, length]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % length);
  };

  return (
    <div className="relative max-w-7xl mx-auto rounded-md overflow-hidden select-none">
      {/* Slides */}
      <div className="relative h-64 sm:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 sm:h-96 object-cover"
              draggable={false}
            />
            {/* Text Overlay */}
            <div className="absolute bottom-10 left-6 sm:left-16 text-white bg-black bg-opacity-50 rounded-md p-4 max-w-sm">
              <h3 className="text-2xl font-bold">{img.title}</h3>
              <p className="mt-1">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left / Right Arrows */}
      <Button
        variant="ghost"
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        ‹
      </Button>

      <Button
        variant="ghost"
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        ›
      </Button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
