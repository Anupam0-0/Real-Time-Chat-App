import React from 'react';

const Button = ({
  children,
  variant,
  color = 'blue',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all duration-200 overflow-hidden';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return color === 'pink'
          ? 'bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white shadow-md hover:shadow-lg'
          : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-md hover:shadow-lg';
      
      case 'secondary':
        return color === 'pink'
          ? 'bg-pink-100 hover:bg-pink-200 active:bg-pink-300 text-pink-800'
          : 'bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-800';
      
      case 'outline':
        return color === 'pink'
          ? 'border border-pink-500 hover:bg-pink-50 text-pink-500'
          : 'border border-blue-500 hover:bg-blue-50 text-blue-500';
      
      default:
        return '';
    }
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'transform hover:-translate-y-0.5 active:translate-y-0';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${getVariantClasses()} 
        ${disabledClasses} 
        ${widthClasses} 
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <span className={`
          absolute -inset-[40%] rounded-full opacity-0 transition-all duration-500 ease-out
          ${variant === 'primary' 
            ? color === 'pink' ? 'bg-pink-400' : 'bg-blue-400' 
            : color === 'pink' ? 'bg-pink-100' : 'bg-blue-100'
          }
          group-hover:opacity-100 group-active:opacity-100 group-active:duration-300
        `} />
      </div>
    </button>
  );
};

export default Button;