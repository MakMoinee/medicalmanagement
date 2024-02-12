import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {
  fetchAppointmentDetailRequest,
  sendUpdateAppointmentRequest,
} from "../services/AppointmentService";

function AppointmentDetailScreen({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem("isLoggedIn", false);
    // onLogout();
    Swal.fire({
      icon: "success",
      title: "Successfully Logout",
      showConfirmButton: false,
    });
    onLogout();
    window.location.href = "/";
  };

  const [details, setDetails] = useState([]);

  const [formValues, setFormValues] = useState({
    patientname: "",
    appointmentdate: "",
    doctor: "",
    contactnumber: "",
    prescription: "",
    history: "",
  });

  const reload = () => {
    fetchAppointmentDetailRequest(id)
      .then((response) => {
        if (!response.ok) {
          setDetails([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        setDetails([]);
        return;
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClickSave = (index) => {
    const id = details[index].appointmentid;
    const {
      patientname,
      appointmentdate,
      doctor,
      contactnumber,
      prescription,
      history,
    } = formValues;

    sendUpdateAppointmentRequest(
      id,
      patientname,
      appointmentdate,
      doctor,
      contactnumber,
      prescription,
      history
    )
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Failed To Update Appointment",
            showConfirmButton: false,
            timer: 800,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Successfully Updated Appointment",
            showConfirmButton: false,
            timer: 800,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed To Update Appointment",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        reload();
      });
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div>
      <header className="header-area background-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  MedSys
                </a>
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a
                      href="#home"
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#appointments"
                      onClick={() => {
                        navigate("/appointments");
                      }}
                      className="active"
                    >
                      Appointments
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a
                      href="#inventory"
                      onClick={() => {
                        navigate("/patients");
                      }}
                    >
                      Patients
                    </a>
                  </li>

                  <li className="scroll-to-section">
                    <a
                      href="#doctors"
                      onClick={() => {
                        navigate("/doctors");
                      }}
                    >
                      Doctors
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact-us" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* ***** Header Area End ***** */}
      <section className="section" id="about2">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 mb-4">
              <Button
                variant="primary"
                onClick={() => navigate("/appointments")}
              >
                Go Back
              </Button>
            </div>
            <div className="col-lg-12">
              <h2 className="mb-3">Appointment Details</h2>
            </div>
          </div>
          {details.map((detail, index) => (
            <div>
              <div className="row mb-5">
                <div className="col-lg-12">
                  <div className="col-lg-4" style={{ float: "left" }}>
                    <h4>Patient Name:</h4>
                    <h4>
                      <b>{detail.patientname}</b>
                    </h4>
                  </div>
                  <div className="col-lg-4" style={{ float: "left" }}>
                    <h4>Contact Number:</h4>
                    <h4>
                      <b>{detail.contactnumber}</b>
                    </h4>
                  </div>
                  <div className="col-lg-4" style={{ float: "left" }}>
                    <h4>Appointment Date:</h4>
                    <h4>
                      <b>
                        {new Date(detail.appointmentdate).toLocaleString(
                          "en-PH",
                          {
                            timeZone: "Asia/Manila",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </b>
                    </h4>
                  </div>
                </div>
              </div>
              <Form>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="col-lg-4" style={{ float: "left" }}>
                      <h4>Doctor Name:</h4>
                      <h4>
                        <b>{detail.doctor}</b>
                      </h4>
                    </div>
                    {detail.prescription ? (
                      <div className="col-lg-4" style={{ float: "left" }}>
                        <h4>Prescription:</h4>
                        <h4>
                          <b>{detail.prescription}</b>
                        </h4>
                      </div>
                    ) : (
                      <div className="col-lg-4" style={{ float: "left" }}>
                        <Form.Group controlId="form-group-id">
                          <Form.Label>
                            <h4>Prescriptions:</h4>
                          </Form.Label>
                          <textarea
                            required
                            value={formValues.prescription}
                            onChange={handleInputChange}
                            name="prescription"
                            type="text"
                            style={{
                              width: "300px",
                              height: "200px",
                              display: "block",
                              padding: "0.375rem 0.75rem",
                              fontSize: "1rem",
                              fontWeight: "400",
                              lineHeight: "1.5",
                              color: "#495057",
                              backgroundColor: "#fff",
                              backgroundClip: "padding-box",
                              border: "1px solid #ced4da",
                              borderRadius: "0.25rem",
                              transition:
                                "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                            }}
                          />
                        </Form.Group>
                      </div>
                    )}

                    {detail.history ? (
                      <div className="col-lg-4" style={{ float: "left" }}>
                        <h4>History:</h4>
                        <h4>
                          <b>{detail.history}</b>
                        </h4>
                      </div>
                    ) : (
                      <div className="col-lg-4" style={{ float: "left" }}>
                        <Form.Group controlId="form-group-id">
                          <Form.Label>
                            <h4>History:</h4>
                          </Form.Label>
                          <textarea
                            required
                            value={formValues.history}
                            onChange={handleInputChange}
                            name="history"
                            type="text"
                            style={{
                              width: "300px",
                              height: "200px",
                              display: "block",
                              padding: "0.375rem 0.75rem",
                              fontSize: "1rem",
                              fontWeight: "400",
                              lineHeight: "1.5",
                              color: "#495057",
                              backgroundColor: "#fff",
                              backgroundClip: "padding-box",
                              border: "1px solid #ced4da",
                              borderRadius: "0.25rem",
                              transition:
                                "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                            }}
                          />
                        </Form.Group>
                      </div>
                    )}
                  </div>
                </div>

                {detail.prescription ? (
                  <div></div>
                ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <div
                        className="col-lg-4"
                        style={{ float: "left", marginTop: "50px" }}
                      >
                        <Form.Group controlId="form-group-id">
                          <Button
                            className="btn btn-primary"
                            onClick={() => handleClickSave(index)}
                          >
                            Save
                          </Button>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          ))}
        </div>
      </section>
      {/* ***** Footer Start ***** */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <p className="copyright">Copyright &copy; 2024 MedSys Company</p>
            </div>
          </div>
        </div>
      </footer>
      {/* ***** Footer End ***** */}
    </div>
  );
}

export default AppointmentDetailScreen;
