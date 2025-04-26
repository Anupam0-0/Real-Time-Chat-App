import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import BackgroundElements from './ui/BackgroundElements';

const AuthPage = () => {
  return (
    <div className="h-screen overflow-y-auto bg-[#F5FAF6] w-full relative md:overflow-hidden">
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
        
        <div className="w-full max-w-5xl bg-sky-50 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 border-r border-gray-100">
              <LoginForm />
            </div>
            <div className="w-full md:w-1/2">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;