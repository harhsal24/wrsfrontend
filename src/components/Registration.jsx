import React, { useState } from 'react';
import './Registration.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

function Registration() {  

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    empID: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phonePattern = /^\d{10}$/;
    if (!formData.phone.trim() || !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
      isValid = false;
    }

    // EmpID validation
    if (!formData.empID.trim()) {
      newErrors.empID = 'Employee ID is required';
      isValid = false;
    }

    // Password validation (minimum length of 6 characters)
    if (formData.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Send the form data to the server for registration
      console.log('Form Data:', formData);
      setIsSubmitted(true);
    }
  };     

  const navigate=useNavigate();

  const handleAfterRegistration=()=>{
      navigate('/success');
  };
   
  

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="empID">Employee ID</label>
          <input
            type="text"
            id="empID"
            name="empID"
            value={formData.empID}
            onChange={handleChange}
            required
          />
          {errors.empID && <div className="error">{errors.empID}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit" className="registration-button" onClick={handleAfterRegistration}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
