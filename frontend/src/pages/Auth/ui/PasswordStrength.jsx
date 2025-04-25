import React, { useMemo } from 'react';

const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(Math.floor(score / 2), 3);
  }, [password]);
  
  const getStrengthLabel = () => {
    switch (strength) {
      case 0: return { text: 'Weak', color: 'text-red-500' };
      case 1: return { text: 'Fair', color: 'text-yellow-500' };
      case 2: return { text: 'Good', color: 'text-green-500' };
      case 3: return { text: 'Strong', color: 'text-emerald-500' };
      default: return { text: '', color: '' };
    }
  };
  
  const { text, color } = getStrengthLabel();
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xs text-gray-500">Password strength</p>
        <p className={`text-xs font-medium ${color}`}>{text}</p>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            strength === 0 ? 'bg-red-500 w-1/4' : 
            strength === 1 ? 'bg-yellow-500 w-2/4' : 
            strength === 2 ? 'bg-green-500 w-3/4' : 
            'bg-emerald-500 w-full'
          }`} 
        />
      </div>
    </div>
  );
};

export default PasswordStrength;