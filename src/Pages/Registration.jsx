import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../store/registrationStore";
import { useMutation, useQueryClient,useQuery } from "react-query";
import {AuthService} from './../AuthService'
import api from "../api"
import { showSuccessToast } from "./showSuccessToast";


const fetchAllEmployees = async () => {
  const response = await api.get('http://localhost:8080/employees/allEmployees');
  // console.log("list of all",response.data)
  return response.data.map(employee => ({
    value: employee.employeeId,
    label: employee.employeeName
  }));;
};

const registerUser = async (userData) => {
  const response = await api.post('http://localhost:8080/register', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.token;
};


const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [managerId, setManagerId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const navigate = useNavigate();


  const setSubmittedStatus = useRegistrationStore((state) => state.setSubmitted);
  const queryClient = useQueryClient();

  const { data: allEmployeesList = [] } = useQuery('allEmployees', fetchAllEmployees);

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      setSubmittedStatus(true);
      console.log("data.token ",data.token)
      queryClient.setQueryData('authToken', data.token); 
      if (data.role === 'SUPER_ADMIN') {
        navigate(`/admin/dashboard/${data.empId}`);
      } else if (data.role === 'TEAM_LEADER') {
        navigate(`/teamLeader/dashboard/${data.empId}`);
      } else {
        navigate(`/employee/dashboard/${data.empId}`);

      }
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Registration failed: User with the same email already exists');
      } else {
        setErrorMessage('Registration failed');
      }
    },
  });


  const handleRegistration = async () => {
    const missingFields = [];
    setSubmitted(true)

    if (!firstName) missingFields.push("First Name");
    if (!lastName) missingFields.push("Last Name");
    if (!login) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    if (!role) missingFields.push("Role");
    if (!gender) missingFields.push("Gender");
    if (!managerId) missingFields.push("Manager");

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill out the following fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const registerBody = {
      firstName,
      lastName,
      login,
      password: password.split(""),
      role,
      gender,
      managerId: managerId ? parseInt(managerId.value) : null, 
    };
    console.log(registerBody);
    try {
      const response = await api.post(
        "http://localhost:8080/register",
        registerBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data)
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
     
      if (accessToken && refreshToken) {
        console.log("accessToken is ",accessToken ,"refreshToken is ",refreshToken);
        AuthService.setAccessToken(accessToken)
        AuthService.setRefreshToken(refreshToken)
      }

      // if (response.status==200) {
      //   navigate("/dashboard");
      // }
    setErrorMessage("");  
      console.log("Registration successful:", response.data);
      showSuccessToast('register successfully');
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Registration failed: User with the same email already exists");
      }
      else{
        setErrorMessage("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-xl rounded-xl md:max-w-2xl xl:max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Registration</h2>
        {submitted && errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="md:flex md:items-center md:justify-start md:gap-5">

        <div className={`mb-4 md:w-1/2 ${!firstName ? "has-error" : ""}`}>
          <label htmlFor="firstName" className="block mb-1 font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className={`w-full p-2  border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300 ${
                submitted && !firstName ? "border-red-500" : ""
            }`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First name"
          />
          {submitted && !firstName && (
            <p className="text-red-500">Please enter your first name</p>
          )}
        </div>

        <div className={`mb-4 md:w-1/2 ${submitted && !lastName ? "has-error" : ""}`}>
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Last Name
          </label>
          <input
          placeholder="Last name"
            type="text"
            id="lastName"
            className={`w-full p-2  border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300 ${
                submitted && !lastName ? "border-red-500" : ""
            }`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {submitted && !lastName && (
            <p className="text-red-500">Please enter your last name</p>
          )}
        </div>
        </div>



        <div className={`mb-4  ${ submitted && !login ? "has-error" : ""}`}>
          <label htmlFor="login" className="block mb-1 font-medium">
            Email
          </label>
          <input
          placeholder="Email"
            type="email"
            id="Email"
            className={`w-full p-2  border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300 ${
                submitted && !login ? "border-red-500" : ""
            }`}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          {submitted && !login && <p className="text-red-500">Please enter your email</p>}
        </div>
        <div className={`mb-4 ${!password ? "has-error" : ""}`}>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
          placeholder="password at least 4 char"
            type="password"
            id="password"
            className={`w-full p-2  border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300 ${
                submitted &&  !password ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
          {submitted && !password && <p className="text-red-500">Please enter a password</p>}
        </div>
        <div className={`mb-4 ${submitted && !role ? "has-error" : ""}`}>
          <label htmlFor="role" className="block mb-1 font-medium">
            Role
          </label>


          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="role"
                value="SUPER_ADMIN"
                checked={role === 'SUPER_ADMIN'}
                onChange={() => setRole('SUPER_ADMIN')}
                className={`mr-1  ${
                  submitted && !role ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              Super Admin
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="role"
                value="TEAM_LEADER"
                checked={role === 'TEAM_LEADER'}
                onChange={() => setRole('TEAM_LEADER')}
                className={`mr-1 ${
                  submitted && !role ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              Team Leader
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="REGULAR_EMPLOYEE"
                checked={role === 'REGULAR_EMPLOYEE'}
                onChange={() => setRole('REGULAR_EMPLOYEE')}
                className={`mr-1 ${
                  submitted && !role ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              Regular Employee
            </label>
          </div>
          {submitted && !role && (
            <p className="text-red-500">Please select a role</p>
          )}
        </div>


        <div className={`mb-4 ${!gender ? "has-error" : ""}`}>
          <label htmlFor="gender" className="block mb-1 font-medium">
            Gender
          </label>
        

          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={gender === 'MALE'}
                onChange={() => setGender('MALE')}
                className={`mr-1 ${
                  submitted && !gender ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              Male
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={gender === 'FEMALE'}
                onChange={() => setGender('FEMALE')}
                className={`mr-1 ${
                  submitted && !gender ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="OTHERS"
                checked={gender === 'OTHERS'}
                onChange={() => setGender('OTHERS')}
                className={`mr-1 ${
                  submitted && !gender ? 'border-red-500' : 'border-blue-300'
                }`}
              />
              Others
            </label>
          </div>
          {submitted && !gender && (
            <p className="text-red-500">Please select a gender</p>
          )}
        </div>


        

        <div className={`mb-4 ${!managerId ? "has-error" : ""}`}>
          <label className="block font-medium text-gray-700">
            Selected Manager
          </label>
          <Select
     options={[...allEmployeesList, { value: null, label: "None" }]}
    value={managerId}
    onChange={setManagerId}
    className=" border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md"
  />
          { submitted && !managerId && (
            <p className="text-red-500">Please select a manager</p>
          )}
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleRegistration}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Registration;
