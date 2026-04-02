import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { FaSnowflake, FaHeart, FaShieldAlt, FaThermometerHalf } from 'react-icons/fa';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Load services data
    fetch('/services.json')
      .then(response => response.json())
      .then(data => {
        setServices(data.slice(0, 6)); // Show only first 6 services
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading services:', error);
        setLoading(false);
      });
  }, []);

  const winterTips = [
    {
      id: 1,
      title: "Keep Paws Protected",
      description: "Use pet-safe ice melt and consider booties for walks on icy surfaces.",
      icon: <FaSnowflake className="w-8 h-8 text-blue-600" />
    },
    {
      id: 2,
      title: "Monitor Body Temperature",
      description: "Watch for signs of hypothermia and keep pets warm during outdoor activities.",
      icon: <FaThermometerHalf className="w-8 h-8 text-red-600" />
    },
    {
      id: 3,
      title: "Provide Extra Nutrition",
      description: "Pets may need more calories in winter to maintain body heat.",
      icon: <FaHeart className="w-8 h-8 text-green-600" />
    },
    {
      id: 4,
      title: "Emergency Preparedness",
      description: "Have a winter emergency kit ready for your pet's safety.",
      icon: <FaShieldAlt className="w-8 h-8 text-purple-600" />
    }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Winter Pet Care Specialist",
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Emergency Veterinary Medicine",
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pet Nutrition & Wellness",
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop&crop=center"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Popular Winter Care Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Popular Winter Care Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional services to keep your pets warm, safe, and healthy during the cold winter months.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.serviceId} service={service} />
              ))}
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <a
              href="/services"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Winter Care Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Winter Care Tips for Pets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential tips to keep your furry friends safe and comfortable during winter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {winterTips.map((tip, index) => (
              <div
                key={tip.id}
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Expert Vets */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Expert Vets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced veterinary team is here to provide the best winter care for your pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <div
                key={expert.id}
                className="text-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {expert.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {expert.specialty}
                  </p>
                  <p className="text-gray-600">
                    {expert.experience} of experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated with Winter Pet Care Tips
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest winter care advice and seasonal tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;