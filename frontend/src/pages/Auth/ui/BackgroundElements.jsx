import React from 'react';


const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-pink-100 opacity-60" />
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-60" />
      
      {/* Bottom right circles */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-60" />
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-pink-100 opacity-70" />
      
      {/* Floating square elements */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-pink-200 opacity-20 rounded-lg transform rotate-12 animate-float-slow" />
      <div className="absolute bottom-1/3 left-1/5 w-12 h-12 bg-blue-200 opacity-30 rounded-lg transform -rotate-12 animate-float-slow-reverse" />
      <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-pink-300 opacity-20 rounded-lg transform rotate-45 animate-float-medium" />
      <div className="absolute top-2/3 right-1/3 w-10 h-10 bg-blue-300 opacity-20 rounded-lg transform -rotate-15 animate-float-medium-reverse" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className='absolute bottom-0 left-0 border '>
        <img src="https://paintingvalley.com/drawings/cherry-blossom-tree-drawing-5.jpg" alt="tree"
        className='object-cover h-96' />
      </div>
    </div>
  );
};

export default BackgroundElements;