import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const FormInput = ({
  label,
  type,
  value,
  onChange,
  error,
  iconColor = 'blue'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const getInputIcon = () => {
    const colorClass = iconColor === 'pink' ? 'text-pink-500' : 'text-blue-500';
    
    switch (type) {
      case 'email':
        return <Mail className={`w-5 h-5 ${colorClass}`} />;
      case 'password':
        return <Lock className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <User className={`w-5 h-5 ${colorClass}`} />;
    }
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="mb-4">
      <div className={`relative border rounded-lg transition-all duration-200 ${
        error 
          ? 'border-red-500' 
          : isFocused 
            ? iconColor === 'pink' ? 'border-pink-500' : 'border-blue-500' 
            : 'border-gray-300'
      }`}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {getInputIcon()}
        </div>
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-10 py-3 bg-transparent focus:outline-none text-gray-800 rounded-lg transition-all ${
            isFocused || value ? 'pt-5 pb-1' : ''
          }`}
          placeholder={isFocused || value ? '' : label}
        />
        
        {(isFocused || value) && (
          <label 
            className={`absolute left-10 top-1 text-xs transition-all ${
              iconColor === 'pink' ? 'text-pink-500' : 'text-blue-500'
            }`}
          >
            {label}
          </label>
        )}
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;