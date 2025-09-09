import React, { useState } from 'react';
import { X, Building2, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'user' | 'builder' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, {
          fullName: formData.fullName,
          phone: formData.phone,
          userType: userType
        });
      }

      if (result.error) {
        setError(result.error.message || 'An error occurred');
      } else {
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Demo credentials for testing
  const demoCredentials = [
    { type: 'Admin', email: 'admin@elitehomes.com', password: 'admin123', userType: 'admin' },
    { type: 'Builder', email: 'builder@sobha.com', password: 'builder123', userType: 'builder' },
    { type: 'Buyer', email: 'buyer@gmail.com', password: 'buyer123', userType: 'user' }
  ];

  const fillDemoCredentials = (demo: typeof demoCredentials[0]) => {
    setFormData({
      ...formData,
      email: demo.email,
      password: demo.password
    });
    setUserType(demo.userType as 'user' | 'builder' | 'admin');
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Demo Credentials */}
          {isLogin && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
              <div className="space-y-2">
                {demoCredentials.map((demo) => (
                  <button
                    key={demo.type}
                    type="button"
                    onClick={() => fillDemoCredentials(demo)}
                    className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-medium">{demo.type}:</span> {demo.email}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              I am a:
            </label>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-all ${
                  userType === 'user'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="font-medium">Buyer</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('builder')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-all ${
                  userType === 'builder'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="font-medium">Builder</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-all ${
                  userType === 'admin'
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="font-medium">Admin</span>
              </button>
            </div>
          </div>

          {/* Name Field (only for registration) */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {/* Phone Field (only for registration) */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 p-1 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-slate-800 to-amber-500 text-white py-3 rounded-lg font-medium hover:from-slate-700 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
          </button>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-amber-600 font-medium hover:text-amber-700 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;