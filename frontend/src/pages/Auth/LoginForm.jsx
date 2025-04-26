import React, { useState } from 'react';
import FormInput from './ui/FormInput';
import Button from './ui/Button';
import SocialButtons from './ui/SocialButtons';
import { toast } from 'react-hot-toast';
import apiInstance from '../../lib/axios'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom';
import useAuthStore  from '../../store/useAuthStore';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const setUser = useAuthStore((state) => state.setUser); // Get the setUser function from the store

    if (validateForm()) {
      console.log('Signup form submitted', { username, password }); // Changed from email to username

      const res = await apiInstance.post('/auth/login', {
        username: username, password: password
      }// Changed from email to username
      );

      const data = await res.data;
      console.log(data);
      if (data) {
        toast.success('Account created successfully!', data);
        await setUser(data.userId); // Set the user ID in the store
        localStorage.setItem('userId', data.userId); // Store the token in local storage
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    }

    navigate('/chat'); // Redirect to the home page after successful login
  };

  return (
    <div className="p-8 md:p-10 ">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-gray-500">Sign in to continue to ChatSphere</p>
      </div>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
          iconColor="blue"
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          iconColor="blue"
        />

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <div className={`w-4 h-4 border rounded transition-colors ${rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300 group-hover:border-blue-400'
                }`}>
                {rememberMe && (
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
            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">Remember me</span>
          </label>

          <button onClick={() => toast("Yup Working on that")} className="text-sm text-blue-500 hover:text-blue-700 transition-colors cursor-pointer">
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          color="blue"
          fullWidth
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <SocialButtons />
      </div>
    </div>
  );
};

export default LoginForm;