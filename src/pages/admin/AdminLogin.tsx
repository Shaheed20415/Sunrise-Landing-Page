import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem('adminAuthenticated') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call - Replace with actual authentication
    setTimeout(() => {
      // Demo credentials - Replace with actual authentication logic
      if (formData.username === 'admin' && formData.password === 'admin123') {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminUsername', formData.username);
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        navigate('/admin/dashboard');
      } else {
        setLoginError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300 group"
      >
        <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sunrise Marketing Solutions</p>
        </div>

        {/* Login Error */}
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center animate-fade-in-up">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3">
              <span className="text-white text-xs">!</span>
            </div>
            {loginError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none ${
                errors.username 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs">!</span>
                </span>
                {errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full py-4 px-6 pr-14 rounded-xl border transition-all duration-300 outline-none ${
                  errors.password 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs">!</span>
                </span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Login to Dashboard
              </>
            )}
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default AdminLogin;