import React, { useState } from "react";

const Themes = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    profession: "Software Developer",
    country: "United States",
    profileImage: "https://cdn-icons-png.flaticon.com/128/847/847969.png",
    description: "Passionate about building scalable web applications.",
    theme: "theme-1",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
      validateField("profileImage", file);
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          errorMessage = "This field is required.";
        } else if (value.length < 3 || value.length > 50) {
          errorMessage = "Minimum 3 characters.";
        } else if (value.length > 50) {
          errorMessage = "Maximum 50 characters.";
        } else if (/[^a-zA-Z\s]/.test(value)) {
          errorMessage = "Name contains alphabets and spaces.";
        }
        break;

      case "profession":
        if (!value.trim()) {
          errorMessage = "This field is required.";
        } else if (/[^a-zA-Z\s]/.test(value)) {
          errorMessage = "Profession contains alphabets and spaces.";
        }
        break;

      case "country":
        if (!value) {
          errorMessage = "This field is required";
        }
        break;

      case "description":
        if (!value.trim()) {
          errorMessage = "This field is required.";
        } else if (value.length < 10 || value.length > 150) {
          errorMessage = "minimum 10 and maximum 150 characters.";
        }
        break;

      case "profileImage":
        if (!value) {
          errorMessage = "This field is required.";
        } else if (value.size > 2 * 1024 * 1024) {
          errorMessage = "Profile image size must not exceed 2MB.";
        } else if (!["image/jpeg", "image/png"].includes(value.type)) {
          errorMessage = "Only JPEG and PNG formats are allowed.";
        }
        break;

      case "theme":
        if (!value) {
          errorMessage = "Please select a theme.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for any validation errors
    const isValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value);

    if (!isValid) {
      setSuccessMessage("");
      setErrors((prev) => ({
        ...prev,
        form: "Please fill in all required fields.",
      }));
      return;
    }

    // Success submission logic
    setSuccessMessage("Form submitted successfully!");
    setErrors({});
    setFormData({
      name: "",
      profession: "",
      country: "",
      description: "",
      theme: "",
      profileImage: null,
    });
  };

  const ClearFunction = () => {
    setSuccessMessage("")
    setErrors({});
    setFormData({
      name: "",
      profession: "",
      country: "",
      description: "",
      theme: "",
      profileImage: null,
    });
  };
  
  const renderPreview = () => {
    const { name, profession, country, profileImage, description, theme } =
      formData;

    const animationClass = "animate animate__animated animate__fadeIn";

    if (theme === "theme-1") {
      return (
        <div
          className={`card layout text-center border border-1 border-white rounded-3 ${animationClass}`}
        >
          <img
            src={profileImage}
            className="card-img-top mx-auto my-0 mt-3 rounded-circle "
            alt={name}
            style={{ height: "100px", width: "100px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="fw-normal card-text mb-1">{profession}</p>
            <p className="fw-normal card-text mb-1">{country}</p>
            <p className="fw-normal card-text">{description}</p>
          </div>
        </div>
      );
    } else if (theme === "theme-2") {
      return (
        <div
          className={`card layout py-4 border border-1 border-white rounded-3 ${animationClass}`}
        >
          <div className="row g-0 align-items-center h-100">
            <div className="col-4 text-center">
              <img
                src={profileImage}
                className="card-img-top rounded-circle"
                alt={name}
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div className="col-7">
              <div className="card-body text-start">
                <h5 className=" card-title mb-8">{name}</h5>
                <p className="fw-normal card-text mb-8 pb-0">{profession}</p>
                <p className="fw-normal card-text mb-8 pb-0">{country}</p>
                <p className="fw-normal card-text mb-8 pb-0">{description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (theme === "theme-3") {
      return (
        <div
          className={`card text-white text-center border border-1 border-white border-0  ${animationClass}`}
          style={{
            width: "90%",
            height: "320px",
            backgroundImage: `url(${profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="rounded-3 border border-1 border-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <h5 className="card-title">{name}</h5>
            <p className="fw-normal card-text mb-1">{profession}</p>
            <p className="fw-normal card-text mb-1">{country}</p>
            <p className="fw-normal card-text mx-auto w-75">{description}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="bg-grey vh-100">
      <div className="wrapper h-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row bg-white rounded-4">
            {/* Form Section */}
            <div className="col-12 col-md-6 border-end">
              <form onSubmit={handleSubmit} className="p-4">
                <h4 className="mb-4">Enter Details</h4>

                {errors.form && (
                  <div className="alert alert-danger">{errors.form}</div>
                )}
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Profession</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.profession ? "is-invalid" : ""
                    }`}
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                  {errors.profession && (
                    <div className="invalid-feedback">{errors.profession}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <select
                    className={`form-select ${
                      errors.country ? "is-invalid" : ""
                    }`}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select a country</option>
                    <option value="india">India</option>
                    <option value="africa">Africa</option>
                    <option value="United States of America">
                      United States of America
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  {errors.country && (
                    <div className="invalid-feedback">{errors.country}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className={`form-control ${
                      errors.profileImage ? "is-invalid" : ""
                    }`}
                    onChange={handleFileChange}
                  />
                  {errors.profileImage && (
                    <div className="invalid-feedback">
                      {errors.profileImage}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Select Theme</label>
                  <select
                    className={`form-select ${
                      errors.theme ? "is-invalid" : ""
                    }`}
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                  >
                    <option value="">Select a theme</option>
                    <option value="theme-1">Theme 1</option>
                    <option value="theme-2">Theme 2</option>
                    <option value="theme-3">Theme 3</option>
                  </select>
                  {errors.theme && (
                    <div className="invalid-feedback">{errors.theme}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn bg-white text-dark fw-bold" onClick={ClearFunction}>
                    Clear Form
                  </button>
                  <button type="submit" className="btn bg-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* Preview Section */}
            <div className="col-12 col-md-6">
              <div className="p-4 h-100 d-flex justify-content-center align-items-center">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Themes;
