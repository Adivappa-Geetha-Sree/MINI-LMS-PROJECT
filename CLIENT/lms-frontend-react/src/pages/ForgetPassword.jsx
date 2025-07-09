import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Login from './Loginpage';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: enter email, Step 2: new password
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser && storedUser.email === email) {
      setStep(2);
    } else {
      alert('Email not found. Please register first.');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser && storedUser.email === email) {
      const updatedUser = {
        ...storedUser,
        password: newPassword,
      };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      alert('Password updated successfully! Please login.');
      navigate('/login');
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">🔐 Forgot Password</h2>
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit}>
              <label className="block mb-2 text-gray-700">Enter your registered email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Verify Email
              </button>
              <label className="block mb-2 text-gray-700">If you remeber password back to <Link to="/Login" className='text-blue-600 underline hover:text-blue-800'>login...</Link></label>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <label className="block mb-2 text-gray-700">Enter new password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
