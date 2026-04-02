import { useState } from 'react';
import { useAuth } from '../provider/AuthProvider';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(editForm.displayName, editForm.photoURL);
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-12 text-center">
            <div className="relative inline-block">
              <img
                src={user?.photoURL || 'https://i.postimg.cc/8kL9XmJ2/default-avatar.jpg'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto mb-4"
              />
              {isEditing && (
                <button
                  onClick={handleEdit}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {user?.displayName || 'User'}
            </h1>
            <p className="text-blue-100">{user?.email}</p>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8">
            {isEditing ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
                
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={editForm.displayName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    id="photoURL"
                    name="photoURL"
                    value={editForm.photoURL}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter photo URL"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FaSave className="w-4 h-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                    <span>Update Profile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <p className="text-gray-800">{user?.displayName || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-800">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Status</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Email Verified</label>
                        <p className="text-gray-800">
                          {user?.emailVerified ? (
                            <span className="text-green-600 font-medium">✓ Verified</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">⚠ Not verified</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Member Since</label>
                        <p className="text-gray-800">
                          {user?.metadata?.creationTime ? 
                            new Date(user.metadata.creationTime).toLocaleDateString() : 
                            'Unknown'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Winter Pet Care Tips</h3>
                  <p className="text-blue-700">
                    As a WarmPaws member, you have access to our comprehensive winter pet care services. 
                    Keep your furry friends safe and warm during the cold months with our expert guidance and professional services.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;







