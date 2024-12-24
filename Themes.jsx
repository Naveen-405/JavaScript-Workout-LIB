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

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending data to the backend
    console.log("Sending data to backend:", formData);
    setSubmittedData(formData);

    // Example of sending the data to an API
    // fetch("/api/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // }).then((response) => console.log(response));
  };

  const renderPreview = () => {
    const { name, profession, country, profileImage, description, theme } =
      formData;

    const animationClass = "animate animate__animated animate__fadeIn";

    if (theme === "theme-1") {
      return (
        <div
          className={`card text-center border border-3 border-white rounded-5 ${animationClass}`}
          style={{ width: "90%", backgroundColor: "#FFE2E2" }}
        >
          <img
            src={profileImage}
            className="card-img-top mx-auto my-0 mt-3 rounded-circle "
            alt={name}
            style={{ height: "100px", width: "100px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text mb-1">{profession}</p>
            <p className="card-text mb-1">{country}</p>
            <p className="card-text">{description}</p>
          </div>
        </div>
      );
    } else if (theme === "theme-2") {
      return (
        <div
          className={`card py-4 rounded-5 ${animationClass}`}
          style={{ width: "90%", backgroundColor: "#FFE2E2" }}
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
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{profession}</p>
                <p className="card-text">{country}</p>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (theme === "theme-3") {
      return (
        <div
          className={`card text-white text-center border-0  ${animationClass}`}
          style={{
            width: "90%",
            height: "320px",
            backgroundImage: `url(${profileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="rounded-5"
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
            <p className="card-text mb-1">{profession}</p>
            <p className="card-text mb-1">{country}</p>
            <p className="card-text mx-auto w-75">{description}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="bg-grey vh-100">
      <div className="wrapper h-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row bg-white rounded-5">
            {/* Form Section */}
            <div className="col-12 col-md-6 border-end">
              <form onSubmit={handleSubmit} className="p-4 ">
                <h4 className="mb-4">Enter Details</h4>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profession</label>
                  <input
                    type="text"
                    className="form-control"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="india">India</option>
                    <option value="africa">Africa</option>
                    <option value="United States of America">
                      United States of America
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Theme</label>
                  <select
                    className="form-select"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                  >
                    <option value="theme-1">Theme 1</option>
                    <option value="theme-2">Theme 2</option>
                    <option value="theme-3">Theme 3</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <button type="submit" className="btn btn-success">
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
      <style jsx>
        {`
          .bg-grey {
            background-color: #ffe2e2;
            
          } 
          .bg-sandle {
            background-color: #f0bb78;
          }
        `}
      </style>
    </section>
  );
};

export default Themes;
