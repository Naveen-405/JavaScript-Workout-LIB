import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Minimum 3 characters.";
    } else if (username.length > 20) {
      return "Maximum 20 characters.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username contains letters, numbers, and underscores.";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (email.includes(" ")) {
      return "Email cannot contain spaces.";
    }

    // RFC 5322 compliant regex for email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Check for multiple subdomains after '@'
    if (/(.+@.*\..*\..*\..*)/.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    } else if (password.length > 20) {
      return "Password cannot exceed 20 characters.";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
      return "Password must include at least one letter and one number.";
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword !== password) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessage = "";
    if (name === "username") {
      errorMessage = validateUsername(value);
    } else if (name === "email") {
      errorMessage = validateEmail(value);
    } else if (name === "password") {
      errorMessage = validatePassword(value);
    } else if (name === "confirmPassword") {
      errorMessage = validateConfirmPassword(formData.password, value);
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }
    setSuccessMessage("Registration successful!");
    navigate("/login");
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setSuccessMessage("");
        return;
      }

      const data = await response.json();
      setSuccessMessage("Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
      setErrors({});
    } catch (error) {
      console.error("Registration Error:", error);
      setSuccessMessage("");
    }
  };

  return (
    <section className="vh-100 bg-sandle d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="bg-white rounded-4 col-10 col-md-8 col-lg-6 col-xl-5">
            <form onSubmit={handleSubmit} className="p-4">
              <h4 className="mb-4 text-center">Register</h4>
              {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                  {successMessage}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="btn-grp d-flex flex-column justify-content-center align-items-center">
                <button type="submit" className="btn px-5 bg-btn btnlg my-4">
                  Submit
                </button>
                <span className="">
                  Already have an account{" "}
                  <Link to="/login" className="fw-bold text-dark">
                    Login
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

export default Register;
