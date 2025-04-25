import React, { useState } from 'react';
import FormInput from './ui/FormInput';
import Button from './ui/Button';
import SocialButtons from './ui/SocialButtons';
import PasswordStrength from './ui/PasswordStrength';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!username) { // Changed from email to username
      newErrors.username = 'Username is required';
    } else if (username.length < 4) { // Added validation for username length
      newErrors.username = 'Username must be at least 4 characters';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Signup form submitted', { name, username, password, agreeTerms }); // Changed from email to username
      // Handle signup logic here
    }
  };

  return (
    <div className="p-8 md:p-10 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-500">Join ChatSphere today</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          iconColor="pink"
        />
        
        <FormInput
          label="Username" // Changed label from Email to Username
          type="text" // Changed type from email to text
          value={username} // Changed from email to username
          onChange={(e) => setUsername(e.target.value)} // Changed from setEmail to setUsername
          error={errors.username} // Changed from errors.email to errors.username
          iconColor="pink"
        />
        
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          iconColor="pink"
        />
        
        {password && <PasswordStrength password={password} />}
        
        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          iconColor="pink"
        />
        
        <div className="mb-6">
          <label className="flex items-start cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                className="sr-only"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <div className={`w-4 h-4 border rounded transition-colors ${
                agreeTerms 
                  ? 'bg-pink-500 border-pink-500' 
                  : errors.agreeTerms 
                    ? 'border-red-500' 
                    : 'border-gray-300 group-hover:border-pink-400'
              }`}>
                {agreeTerms && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 text-white"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
            <div className="ml-2">
              <span className="text-sm text-gray-600 group-hover:text-gray-800">
                I agree to the <a href="#" className="text-pink-500 hover:text-pink-700">Terms of Service</a> and <a href="#" className="text-pink-500 hover:text-pink-700">Privacy Policy</a>
              </span>
              {errors.agreeTerms && (
                <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>
              )}
            </div>
          </label>
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          color="pink" 
          fullWidth
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-pink-50 to-blue-50 text-gray-500">Or sign up with</span>
          </div>
        </div>
        
        <SocialButtons />
      </div>
    </div>
  );
};

export default SignupForm;