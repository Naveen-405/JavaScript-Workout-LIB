import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Minimum 3 characters";
    } else if (username.length > 25) {
      return "Maximum 25 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username contain letters, numbers, and underscores.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Minimum 6 characters.";
    } else if (password.length > 20) {
      return "Maximum 20 characters.";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
      return "Password contains at least one letter and one number.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Perform validation on each field as the user types
    let errorMessage = "";
    if (name === "username") {
      errorMessage = validateUsername(value);
    } else if (name === "password") {
      errorMessage = validatePassword(value);
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("Login successful!"); // Clear success message if any
    navigate('/theme')
  
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
  
    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }
  
    // If no errors, send data to backend API
    try {
      const response = await fetch("https://your-backend-api.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setSuccessMessage(""); // Clear success message if any
        return;
      }
  
      const data = await response.json();
      setSuccessMessage("Login successful!");
      navigate("/theme")
      setFormData({ username: "", password: "" });
    } catch (error) {
      console.error("Login Error:", error);
      setSuccessMessage("");
      
    }
  };
  

  return (
    <section className="vh-100 bg-sandle d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="bg-white rounded-4 col-12 col-md-12 col-lg-4 col-xl-5">
            <form onSubmit={handleSubmit} className="p-4">
              <h1 className="mb-4 text-center">Login</h1>

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                  {successMessage}
                </div>
              )}

              {/* Username Field */}
              <div className="mb-3">
                <label className="form-label form-input">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label className="form-label form-input">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="btn-grp d-flex flex-column justify-content-center align-items-center">
                <button type="submit" className="btn px-5 bg-btn btnlg my-4">
                  Login
                </button>
                <span>
                  Don't have an account?{" "}
                  <Link to="/register" className="fw-bold text-dark">
                    Register now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
