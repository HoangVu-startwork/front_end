'use client'
import React from "react";
import { useState, useEffect } from 'react';
import SingupLayout from '../layout';
import '@fortawesome/fontawesome-svg-core/styles.css'
import Image from "next/image";
import '../css/style.css'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Auth from "../../../service/auth"
export default function page() {
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [username, setusername] = useState("");
  const [usernameError, setusernameError] = useState("");

  const [phone, setphone] = useState("");
  const [phoneError, setphoneError] = useState("");

  const [ngaysinh, setCompanyDate] = useState("");
  const [companyDateError, setCompanyDateError] = useState("");


  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      return "Password phải có 8 ký tự trợ lên.";
    }
    if (!uppercase.test(password)) {
      return "Password phải có chữ hoa.";
    }
    if (!lowercase.test(password)) {
      return "Password phải có chữ thường.";
    }
    if (!specialChar.test(password)) {
      return "Password phải có ký tự đặt biệt.";
    }
    return "";
  };

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_HOST);
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
    // Check repeat password match when password changes
    if (repeatPassword && newPassword !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
    } else {
      setRepeatPasswordError("");
    }
  };

  const handleRepeatPasswordChange = (e) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);
    if (newRepeatPassword !== password) {
      setRepeatPasswordError("Confirm password must match with password.");
    } else {
      setRepeatPasswordError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty.");
    }
  };

  const handleRepeatPasswordBlur = () => {
    if (repeatPassword.trim() === "") {
      setRepeatPasswordError("Confirm password cannot be empty.");
    } else if (repeatPassword !== password) {
      setRepeatPasswordError("Confirm password must match with password.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Check if email is empty
    if (newEmail.trim() === "") {
      setEmailError("Please enter your email.");
    } else {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    // Check if email is empty when input loses focus
    if (email.trim() === "") {
      setEmailError("Please enter your email.");
    } else {
      setEmailError("");
    }
  };

  const handlUsernameChange = (e) => {
    const newUsername = e.target.value;
    setusername(newUsername);

    // Check if email is empty
    if (newUsername.trim() === "") {
      setusernameError("Vui lòng không bỏ trống.");
    } else {
      setusernameError("");
    }
  };

  const handleUsernameBlur = () => {
    // Check if email is empty when input loses focus
    if (username.trim() === "") {
      setusernameError("Vui lòng không bỏ trống.");
    } else {
      setusernameError("");
    }
  };

  const handlPhoneChange = (e) => {
    const newPhone = e.target.value;
    setphone(newPhone);

    // Check if email is empty
    if (newPhone.trim() === "") {
      setphoneError("Vui lòng không bỏ trống.");
    } else {
      setphoneError("");
    }
  };

  const handlePhoneBlur = () => {
    // Check if email is empty when input loses focus
    if (phone.trim() === "") {
      setphoneError("Vui lòng không bỏ trống.");
    } else {
      setphoneError("");
    }
  };

  const handleCompanyDateChange = (e) => {
    const newDate = e.target.value;
    setCompanyDate(newDate);
    if (newDate.trim() === "") {
      setCompanyDateError("Please select a date.");
    } else {
      setCompanyDateError("");
    }
  };

  const handleCompanyDateBlur = () => {
    if (ngaysinh.trim() === "") {
      setCompanyDateError("Please select a date.");
    } else {
      setCompanyDateError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset all errors
    setusernameError("");
    setEmailError("");
    setphoneError("");
    setCompanyDateError("");
    setPasswordError("");
    setRepeatPasswordError("");
  
    // Validate all fields before submission
    let hasError = false;
    
    if (username.trim() === "") {
      setusernameError("Vui lòng không bỏ trống.");
      hasError = true;
    }
    
    if (email.trim() === "") {
      setEmailError("Please enter your email.");
      hasError = true;
    }
    
    if (phone.trim() === "") {
      setphoneError("Vui lòng không bỏ trống.");
      hasError = true;
    }
    
    if (ngaysinh.trim() === "") {
      setCompanyDateError("Please select a date.");
      hasError = true;
    }
    
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty.");
      hasError = true;
    }
    
    if (repeatPassword.trim() === "") {
      setRepeatPasswordError("Confirm password cannot be empty.");
      hasError = true;
    }
    
    if (password !== repeatPassword) {
      setRepeatPasswordError("Confirm password must match with password.");
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
  
    // Send POST request to backend API
    try {
      const response = await Auth.singup(username, email, password, phone, ngaysinh);
      if (response) {
        setGeneralError("Đa");
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      if (error.code && error.message) {
        console.error(`Error ${error.code}: ${error.message}`);
        // Hiển thị lỗi trên giao diện
        setGeneralError(error.message); // Cập nhật trạng thái lỗi chung của form
      } else {
        console.error("An unknown error occurred.");
        setGeneralError("An unknown error occurred."); // Cập nhật trạng thái lỗi chung của form
      }
    }
  };
  

  return (
    <div className="singup">
      <div className="mt-10">
        <div className="mt-10 max-w-md mx-auto">
          <img className="mx-auto h-20 w-auto" src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500">Sign in to continue</h2>
          <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
              <path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"></path>
              <path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"></path>
              <path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"></path>
              <path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335"></path>
            </svg>
            <span>Sign up with Google</span>
          </a>
        </div>
    
        <div className="mt-10">
        {generalError && <p className="text-red-500 text-center font-bold leading-9 tracking-tight text-sm max-w-md mx-auto">{generalError}</p>}
          <div className="max-w-[60%] mx-auto scroll-mx-0.5 max-800:max-w-[90%]">
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" id="floating_email" className={`block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer 
                ${usernameError ? "border-red-500 text-red-600" : "border-gray-300 text-base text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"}`}
                placeholder=" " value={username} onChange={handlUsernameChange} onBlur={handleUsernameBlur} required />
              <label htmlFor="floating_password" className={`peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${usernameError ? "text-red-600" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"}
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 `}>Họ và Tên</label>
              {usernameError && (<p className="text-red-500 text-sm mt-2">{usernameError}</p>)}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" id="floating_email" className={`block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer 
                ${emailError ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"}`}
                placeholder=" " value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} required />
              <label htmlFor="floating_password" className={`peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${emailError ? "text-red-600" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 `}>Nhập Email</label>
              {emailError && (<p className="text-red-500 text-sm mt-2">{emailError}</p>)}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type={showPassword ? "text" : "password"} id="floating_password" className={`block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer 
                  ${passwordError ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"}`}
                placeholder=" " value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} required />
              <label htmlFor="floating_password" className={`peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                ${passwordError ? "text-red-600" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Password</label>
              <span onClick={toggleShowPassword} className="absolute right-2 top-3 cursor-pointer text-gray-500 dark:text-gray-400">{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</span>
              {passwordError && (<p className="text-red-500 text-sm mt-2">{passwordError}</p>)}</div>

            <div className="relative z-0 w-full mb-5 group">
              <input type={showRepeatPassword ? "text" : "password"} id="floating_repeat_password" className={`block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer 
                ${repeatPasswordError ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"}`}
                placeholder=" " value={repeatPassword} onChange={handleRepeatPasswordChange} onBlur={handleRepeatPasswordBlur} required />
              <label htmlFor="floating_repeat_password" className={`peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                ${repeatPasswordError ? "text-red-600" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Confirm password</label>
              <span onClick={toggleShowRepeatPassword} className="absolute right-2 top-3 cursor-pointer text-gray-500 dark:text-gray-400">{showRepeatPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</span>
              {repeatPasswordError && (<p className="text-red-500 text-sm mt-2">{repeatPasswordError}</p>)}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input type="email" id="floating_email" className={`block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer 
                ${phoneError ? "border-red-500 text-red-600" : "border-gray-300 text-base text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"}`}
                  placeholder=" " value={phone} onChange={handlPhoneChange} onBlur={handlePhoneBlur} required />
                <label htmlFor="floating_password" className={`peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${phoneError ? "text-red-600" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 `}>Nhập số điện thoại</label>
                {phoneError && (<p className="text-red-500 text-sm mt-2">{phoneError}</p>)}
              </div>
              <div className="relative z-0 w-full mb-5 mt-1 group">
                <input type="date" id="floating_company" className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${companyDateError ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"}`}
                  placeholder=" " value={ngaysinh} onChange={handleCompanyDateChange} onBlur={handleCompanyDateBlur} required />
                <label htmlFor="floating_company" className={`peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                  ${companyDateError ? "text-red-600" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                  Date of Birth </label>
                {companyDateError && (<p className="text-red-500 text-sm mt-2">{companyDateError}</p>)}
              </div>
            </div>
            <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            <a href="/signin" className="font-semibold leading-6 text-red-500 hover:text-red-400">Bạn đã có tài khoản? Đăng nhập ngay</a>
          </p>
        </div>
      </div>
    </div>
  )
}

page.Layout = SingupLayout;