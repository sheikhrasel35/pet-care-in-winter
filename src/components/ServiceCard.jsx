import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaUsers } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
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

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="relative">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-green-600">${service.price}</span>
        </div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
          {service.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {service.serviceName}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(service.rating)}
            <span className="ml-2 text-sm text-gray-600">({service.rating})</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <FaUsers className="w-4 h-4" />
            <span>{service.slotsAvailable} slots</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-semibold">{service.providerName}</span>
          </div>
          <Link
            to={`/service/${service.serviceId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;


