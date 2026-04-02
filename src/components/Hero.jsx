import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'animate.css';

const Hero = () => {
  const heroSlides = [
    {
      id: 1,
      title: "Keep Your Pets Warm This Winter",
      subtitle: "Professional winter care services for your furry friends",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1600&h=900&fit=crop&crop=center",
      buttonText: "Explore Services",
      buttonLink: "/services"
    },
    {
      id: 2,
      title: "Expert Winter Grooming",
      subtitle: "Specialized grooming to protect your pet's skin and coat",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1600&h=900&fit=crop&crop=center",
      buttonText: "Book Now",
      buttonLink: "/services"
    },
    {
      id: 3,
      title: "Emergency Winter Care",
      subtitle: "24/7 emergency services for winter-related pet health issues",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1600&h=900&fit=crop&crop=center",
      buttonText: "Learn More",
      buttonLink: "/services"
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`
                }}
              />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <h1 
                    className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeInUp"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {slide.title}
                  </h1>
                  <p 
                    className="text-xl md:text-2xl mb-8 animate__animated animate__fadeInUp animate__delay-1s"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;


