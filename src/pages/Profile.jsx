import React, { useContext, useState } from 'react';
import {
  UserCircle,
  Wallet,
  Coins,
  LogOut,
  Bitcoin,
  ArrowDown,
  BanknoteArrowDown,
} from 'lucide-react';
import { resolvePath, useNavigate } from 'react-router-dom';
import { AllContext } from '../context/AllContext';
import axios from 'axios';
import { toast } from 'react-toastify'
import scanner from '../assets/images/scanner.jpg'
import { useEffect } from 'react';

const Profile = () => {
  const {
    balance,
    userDetails,
    backendUrl,
    token
  } = useContext(AllContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  // Form states
  const [amount, setAmount] = useState('1000');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  //Withdraw Request 
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [holderphoneNumber, setHolderphoneNumber] = useState('');
  const [holderName, setholderName] = useState('');
  
  const [detail, setDetail] = useState(1);
  const { setUpdate , update} = useContext(AllContext);

  const handleDepositSubmit = async () => {
    if (!amount || !transactionId || !screenshot) {
      toast.error('Please fill in all fields and upload a screenshot.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('transactionId', transactionId);
      formData.append('paymentMethod', 'online'); // or UPI/bank, adjust based on your use-case
      formData.append('screenshot', screenshot);

      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${backendUrl}/api/user/add-money`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      // console.log(response);


      // (response.data.message || 'Request submitted successfully');
      setAmount('');
      setTransactionId('');
      setScreenshot(null);
      setDropdown(false);
    } catch (error) {
      console.error('Deposit request failed:', error);
      alert(
        error?.response?.data?.message ||
        'An error occurred while submitting your request.'
      );
    } finally {
      setLoading(false);
    }
  };

  const  handlewithdraw = async () =>{

    const payload = {
      amount,
      holderphoneNumber,
      holderName,
    };

    if (detail === 0) {
      payload.accountNumber = accountNumber;
      payload.ifscCode = ifscCode;
    } else {
      payload.upiId = upiId;
    }

    // const formData = new FormData();

    // if(detail === 0){
    //   formData.append( 'accountNumber', accountNumber );
    //   formData.append( 'ifscCode', ifscCode );
    // }else{
    //   formData.append( 'upiId', upiId );
    // }
    
    // // formData.append( 'upiId', upiId );
    // formData.append( 'holderpho', bankphoneNumber );

    // formData.append( 'amount', amount );
    // // formData.append( 'bankphoneNumber', bankphoneNumber );
    // formData.append( 'bankHolderName' , bankHolderName );

    try {
      const response = await axios.post(`${backendUrl}/api/user/withdraw`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      // console.log(response);
      // console.log(payload);      
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log('Backend response:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
      console.log(error)
    }
  }

  useEffect(() => {
    setUpdate(!update);
  }, [ ]);
  

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col items-center mt-30 px-4">
        {/* Profile Info */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 w-full max-w-md text-center border border-gray-800">
          <UserCircle className="w-12 h-12 text-purple-400 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold">
            {userDetails?.name || 'N/A'}
          </h2>
          <p className="text-sm text-gray-400">@{userDetails?.email || 'N/A'}</p>
        </div>

        {/* Wallet Balance */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-green-400" />
              <span className="text-lg font-medium text-white">Wallet Balance</span>
            </div>
            <span className="text-xl font-bold text-green-300 flex items-center gap-1">
              <Coins className="w-5 h-5" />
              {balance}
            </span>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
          <div className="flex items-center justify-between" onClick={() => setDropdown(!dropdown)}>
            <div className="flex items-center gap-3">
              <Bitcoin className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-medium text-white">Deposit Money</span>
            </div>
            <ArrowDown className="w-5 h-5 text-green-300" />
          </div>

          {dropdown && (
            <div className="pt-8">

              <div className='w-full flex items-center justify-center py-4' >
                <img src={scanner} className='w-40 rounded-2xl' alt="" />
              </div>

              <div className="pb-6">
                <label htmlFor="amount" className="pl-2 block mb-1">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                  placeholder="Enter your amount"
                />
              </div>

              <div className="pb-6">
                <label htmlFor="transactionId" className="pl-2 block mb-1">Transaction ID</label>
                <input
                  type="text"
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                  placeholder="Enter Transaction ID"
                />
              </div>

              <div className="pb-6">
                <label htmlFor="screenshot" className="pl-2 block mb-1">Upload Screenshot</label>
                <input
                  type="file"
                  id="screenshot"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleDepositSubmit}
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-2 font-medium"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ==== Withdraw Request ==== */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
          <div className="flex items-center justify-between" onClick={() => setDropdown2(!dropdown2)}>
            <div className="flex items-center gap-3">
              <BanknoteArrowDown className="w-6 h-6  text-cyan-400" />
              <span className="text-lg font-medium text-white">Withdraw Request</span>
            </div>
            <ArrowDown className="w-5 h-5 text-cyan-300" />
          </div>
          {dropdown2 && (
            <div className="pt-8">

              {/* <div className='w-full flex items-center justify-center py-4' > 
                <img src={scanner} className='w-40 rounded-2xl' alt="" />
              </div> */}

              <div className='flex justify-between py-5' >
                <button onClick={() => (setDetail(0))} className={` border-2 text-white border-cyan-400 font-semibold w-40 py-2 rounded-2xl ${ detail === 0 ? 'bg-cyan-400' : '' }  ` }>Account Details </button>
                <button onClick={() => (setDetail(1))} className={` border-2 text-white border-cyan-400 font-semibold w-40 py-2 rounded-2xl ${ detail === 1 ? 'bg-cyan-400' : '' }  ` }>UPI Id </button>
              </div>

              {
                detail === 0 ? (
                  <>
                    <div className="pb-6">
                      <label htmlFor="accountNumber" className="pl-2 block mb-1">Bank Account Number</label>
                      <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                        placeholder="Enter Your Account Number"
                      />
                    </div>

                    <div className="pb-6">
                      <label htmlFor="ifsc" className="pl-2 block mb-1">IFSC Code</label>
                      <input
                        type="text"
                        id="ifsc"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                        placeholder="Enter IFSC Code"
                      />
                    </div>
                  </>
                ) : (
                  <div className="pb-6">
                    <label htmlFor="upiId" className="pl-2 block mb-1">UPI ID</label>
                    <input
                      type="text"
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                      placeholder="Enter Your UPI ID"
                    />
                  </div>
                )
              }

              {/* <div className="pb-6">
                <label htmlFor="transactionId" className="pl-2 block mb-1">UPI Id  </label>
                <input
                  type="text"
                  id="ifscode"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                  placeholder="Enter Your UPI ID"
                />
              </div> */}

              <div className="pb-6">
                <label htmlFor="transactionId" className="pl-2 block mb-1">Amount  </label>
                <input
                  type="text"
                  id="ifscode"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                  placeholder="Enter Amount "
                />
              </div>

              <div className="pb-6">
                <label htmlFor="transactionId" className="pl-2 block mb-1"> Phone Number  </label>
                <input
                  type="text"
                  value={holderphoneNumber}
                  onChange={(e) => setHolderphoneNumber(e.target.value)}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                  placeholder="Enter Holder Name"
                />
              </div>

              <div className="pb-6">
                <label htmlFor="transactionId" className="pl-2 block mb-1"> Holder Name  </label>
                <input
                  type="text"
                  value={holderName}
                  onChange={(e) => setholderName(e.target.value)}
                  className="w-full px-3 py-3 border rounded-2xl text-sm bg-black border-gray-700"
                  placeholder="Enter Holder Number"
                />
              </div>


              <div className="flex justify-center pt-4">
                <button
                  onClick={handlewithdraw}
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-2 font-medium"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 mb-24 w-full max-w-md space-y-4 border border-gray-800">
          <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
            <div onClick={handleLogout} className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-md font-medium text-red-400">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
