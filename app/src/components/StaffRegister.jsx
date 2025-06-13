import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const StaffRegister = ({ onSwitchToLogin }) => {  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'receptionist',
    phoneNumber: '',
    department: '',
    specialization: '',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerStaff } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    try {
      setError('');
      setLoading(true);
      await registerStaff(formData.email, formData.password, formData);
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl backdrop-blur-sm">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Hospital Staff Registration</h2>
        
        {error && <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg mb-4 text-center font-medium">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-gray-700 font-medium">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-2 text-gray-700 font-medium">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 text-gray-700 font-medium">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
          >
            <option value="receptionist">Receptionist</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacy">Pharmacy Staff</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-gray-700 font-medium">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2 text-gray-700 font-medium">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block mb-2 text-gray-700 font-medium">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Cardiology, Emergency, Administration"
            required
            className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
          />        </div>

        {formData.role === 'doctor' && (
          <>
            <div className="mb-4">
              <label htmlFor="specialization" className="block mb-2 text-gray-700 font-medium">Specialization:</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g., Cardiology, Neurology, General Medicine"
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="licenseNumber" className="block mb-2 text-gray-700 font-medium">Medical License Number:</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:-translate-y-0.5"
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading} className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mb-4">
          {loading ? 'Creating Account...' : 'Create Staff Account'}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="text-blue-500 hover:text-purple-600 font-medium underline transition-colors duration-300">
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default StaffRegister;