import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookForm = () => {
  const [AppointmentDate, setAppointmentDate] = useState(new Date());
  const [timeslot, setTimeslot] = useState('');
  // const [Submitting, setSubmitting] = useState(true)
  const navigate = useNavigate();

  const schema = yup.object().shape({
    fullname: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    companyname: yup.string().required("Company name is required"),
    your_requirements: yup.string().required("Your Requirements is required"),
    AppointmentDate: yup
    .date()
    .required("Appointment Date is required")
    .min(new Date(), "Appointment Date must be in the future"),
    timeslot: yup.string().required('Time slot is required')
  });

  const handleSubmit = async (values) => {
    console.log('clicked');
    console.log(values);
    try {
      const response = await fetch('http://localhost:5000/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('Failed to book appointment'); 
      }
      
      // Data
      const data = await response.json();
      console.log(data);
      console.log('Appointment booked successfully:', data.message);

      // Take this process have do 3sec after...
        setTimeout(() => {
          navigate('/thanks-cds');
          // setSubmitting(false)

        }, 2000);

    } catch (error) {
      console.error('Error booking appointment:', error.message);
      // Handle error, show error message to user,
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn nav-btn text-white fw-bold"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@getbootstrap"
      >
        Book a Meeting
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Schedule a Meeting
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                validationSchema={schema}
                initialValues={{
                  fullname: "",
                  email: "",
                  phoneNumber: "",
                  companyname: "",
                  your_requirements: "",
                  AppointmentDate: new Date(), 
                  timeslot: "",
                }}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                  <Form noValidate onSubmit={handleSubmit} className="p-1">
                    <Row>
                      <Col md={12} mb={3} className="mt-2">
                        <Form.Label className="fw-bold">Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullname"
                          value={values.fullname}
                          onChange={handleChange}
                          isInvalid={touched.fullname && !!errors.fullname}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullname}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={12} mb={3} className="mt-2">
                        <Form.Label className="fw-bold">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={12} mb={5} className="mt-3 mb-3 phone-number">
                        <Form.Label className="fw-bold">
                          Phone Number
                        </Form.Label>
                        <PhoneInput
                          className="phone-input"
                          country={"us"}
                          value={values.phoneNumber}
                          onChange={(phoneNumber) =>
                            handleChange({
                              target: { name: "phoneNumber", value: phoneNumber },
                            })
                          }
                          inputClass={`form-control ${
                            touched.phoneNumber && !!errors.phoneNumber
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <Form.Control.Feedback type="is-invalid" className="text-danger">
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={12} mb={3} className="mt-2 mb-3">
                        <Form.Label className="fw-bold">
                          Select Appointment Date
                        </Form.Label>
                        <Calendar
                          name="AppointmentDate"
                          value={values.AppointmentDate}
                          onChange={(date) => {
                            setAppointmentDate(date);
                            setFieldValue("AppointmentDate", date); // Update form value
                          }}
                          className={`form-control ${
                            touched.AppointmentDate && !!errors.AppointmentDate
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <Form.Control.Feedback type="is-invalid" className="text-danger">
                          {errors.AppointmentDate}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={12} mb={3} className="mt-2 mb-3">
                        <Form.Label className="fw-bold">Select Time Slot</Form.Label>
                        <div className={`d-flex gap-2 flex-wrap form-control
                      ${
                        touched.AppointmentDate && !!errors.AppointmentDate
                          ? "is-invalid"
                          : ""
                      }`}>
                          {['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'].map(slot => (
                            <button
                              key={slot}
                              type="button"
                              className={`btn border ${timeslot === slot ? 'btn-selected' : ''}
                              `}
                              
                              onClick={() => {
                                setTimeslot(slot);
                                setFieldValue('timeslot', slot);
                                 // Update form value
                              }}
                              
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <Form.Control.Feedback type="is-invalid" className="text-danger">
                          {errors.timeslot}
                        </Form.Control.Feedback>
                      </Col>

                      <Col md={12} mb={3} className="mt-2">
                        <Form.Label className="fw-bold">
                          Company Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="companyname"
                          value={values.companyname}
                          onChange={handleChange}
                          isInvalid={
                            touched.companyname && !!errors.companyname
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.companyname}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={12} mb={3} className="mt-2">
                        <Form.Label className="fw-bold">
                          Your Requirements
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="your_requirements"
                          value={values.your_requirements}
                          onChange={handleChange}
                          isInvalid={
                            touched.your_requirements &&
                            !!errors.your_requirements
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.your_requirements}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                    <div className="btn-grp d-flex justify-content-center mt-2">
                      <Button
                        type="submit"  
                        className="btn-lg fw-bold px-5 mt-4 nav-btn"
                        id="nav-btn"   
                        // disabled={isSubmitting} 
                        >
                         Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="modal-footer">
              {/* Additional footer content here */}
            </div>
          </div>
        </div>
      </div>  
     
    </div>
  );
};

export default BookForm;
