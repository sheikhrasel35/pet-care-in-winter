import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaUsers, FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Load service data
    fetch('/services.json')
      .then(response => response.json())
      .then(data => {
        const foundService = data.find(s => s.serviceId === parseInt(id));
        if (foundService) {
          setService(foundService);
        } else {
          navigate('/services');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading service:', error);
        setLoading(false);
        navigate('/services');
      });
  }, [id, navigate]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      toast.success('Service booked successfully! We will contact you soon.');
      setBookingForm({ name: '', email: '' });
      setIsBooking(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service not found</h2>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/services')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          data-aos="fade-right"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up">
              <img
                src={service.image}
                alt={service.serviceName}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {service.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {renderStars(service.rating)}
                    <span className="ml-2 text-sm text-gray-600">({service.rating})</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {service.serviceName}
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Provider</h3>
                    <p className="text-gray-600">{service.providerName}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Price</h3>
                    <p className="text-2xl font-bold text-green-600">${service.price}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Available Slots</h3>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">{service.slotsAvailable} slots available</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">{service.providerEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8" data-aos="fade-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book This Service</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBooking ? 'Booking...' : 'Book Now'}
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• We'll contact you within 24 hours</li>
                  <li>• Schedule your appointment</li>
                  <li>• Prepare for your pet's winter care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;







