import React, { useContext, useEffect, useState, } from 'react';
import { AllContext } from '../context/AllContext';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
  const [isEmail, setIsEmail] = useState(true); // Toggle between email and phone
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {backendUrl , setToken , token  } = useContext(AllContext);

  // useEffect(() => {
  //   console.log("Token is " + token);
  // }, [token])

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setToken(token); // Update context if token exists
  //     console.log(token);
  //     navigate('/'); // Redirect to the home page or desired page
  //   }
  // }, [setToken, navigate]);


  

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const formData = new FormData();
    // if (isEmail) {
    // formData.append("email", email);
    // } else {
    // formData.append("phone", phone);
    // }
    // formData.append("password", password);

    const payload = {
        password,
      };
    
      if (isEmail) {
        payload.email = email;
      } else {
        payload.phone = phone;
      }


    try {
        const response = await axios.post(backendUrl+'/api/user/login',payload);
        console.log(response)
        if (response.data.success) {
          toast.success(response.data.message);
          // localStorage.setItem('token', response.data.token);
          setToken(response.data.token); // Update context
          navigate('/'); // Optionally redirect after login
          } else {
              toast.error(response.data.message);
          }
    } catch (error) {
        console.log(error)
    }
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };      

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };



  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full sm:w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login to Your Account</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Toggle for Email or Phone */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={() => setIsEmail(true)}
              className={`w-1/2 py-2 text-sm font-semibold text-center rounded-l-xl ${isEmail ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} transition-all duration-300`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setIsEmail(false)}
              className={`w-1/2 py-2 text-sm font-semibold text-center rounded-r-xl ${!isEmail ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} transition-all duration-300`}
            >
              Phone
            </button>
          </div>

          {/* Input for Email or Phone */}
          <div className="mb-4">
            <label htmlFor={isEmail ? 'email' : 'phone'} className="text-gray-300 block mb-1">
              {isEmail ? 'Email Address' : 'Phone Number'}
            </label>
            <input
              type={isEmail ? 'email' : 'tel'}
              id={isEmail ? 'email' : 'phone'}
              value={isEmail ? email : phone}
              onChange={isEmail ? handleEmailChange : handlePhoneChange} // Handle change based on input type
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isEmail ? 'Enter your email' : 'Enter your phone number'}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="text-gray-300 text-sm ml-2">Remember Me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-400 text-sm">Forgot Password?</a>
        </div>

        {/* Sign Up Option */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">Don't have an account? <Link to='/signup' className="text-blue-400">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
