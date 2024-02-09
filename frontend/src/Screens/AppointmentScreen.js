import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchAppointmentsRequest,
  sendAddAppointmentRequest,
} from "../services/AppointmentService";
import { fetchProductsRequest } from "../services/PatientService";
import { fetchDoctorsRequest } from "../services/DoctorService";

function AppointmentScreen({ onLogout }) {
  const navigate = useNavigate();
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formAddAppointmentValues, setFormAddAppointmentValues] = useState({
    patientname: "",
    appointmentdate: "",
    doctor: "",
    contactnumber: "",
  });
  const handleAddAppointmentInputChange = (event) => {
    const { name, value } = event.target;
    setFormAddAppointmentValues({ ...formAddAppointmentValues, [name]: value });
  };
  const handleAddAppointmentSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };
  const handleCloseAddAppointmentModal = () => {
    setShowAddAppointmentModal(false);
    setFormAddAppointmentValues({
      patientname: "",
      appointmentdate: "",
      doctor: "",
      contactnumber: "",
    });
  };
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

  const handleSelect = (e) => {
    console.log(e.target.value);
    formAddAppointmentValues.patientname = e.target.value;
  };
  const handleSelectDoctor = (e) => {
    console.log(e.target.value);
    formAddAppointmentValues.doctor = e.target.value;
  };

  const handleAddAppointmentClick = (event) => {
    event.preventDefault();
    setShowAddAppointmentModal(true);
  };

  const handleAddAppointmentRequest = () => {
    const { patientname, appointmentdate, doctor, contactnumber } =
      formAddAppointmentValues;

    sendAddAppointmentRequest(
      patientname,
      appointmentdate,
      doctor,
      contactnumber
    )
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully Added Patient",
          showConfirmButton: false,
          timer: 800,
        });
        setShowAddAppointmentModal(false);
        reload();
        reloadAppointments();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed Operation",
          text: "Failed To Add Product, Please Try Again Later",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        setFormAddAppointmentValues({
          patientname: "",
          appointmentdate: "",
          doctor: "",
          contactnumber: "",
        });
      });
  };

  const reload = () => {
    fetchProductsRequest()
      .then((response) => {
        if (!response.ok) {
          setPatients([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        setPatients([]);
        return;
      });
  };

  const reloadDoctors = () => {
    fetchDoctorsRequest()
      .then((response) => {
        if (!response.ok) {
          setDoctors([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        setDoctors([]);
        return;
      });
  };

  const reloadAppointments = () => {
    fetchAppointmentsRequest()
      .then((response) => {
        if (!response.ok) {
          setAppointments([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        setAppointments([]);
        return;
      });
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reloadDoctors();
  }, []);

  useEffect(() => {
    reloadAppointments();
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
            <div className="col-lg-12">
              <h2 className="mb-3">Appointments</h2>
              <div className="section-title mb-2 col-lg-2">
                <Button variant="primary" onClick={handleAddAppointmentClick}>
                  Add Appointment
                </Button>
              </div>
              <div className="table-responsive mb-5">
                <table className="table border mb-0" id="sortTable">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">Patient Name</th>
                      <th>Appointment Date</th>
                      <th className="text-center">Contact Number</th>
                      <th>Doctor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          {appointment.patientname}
                        </td>
                        <td>{appointment.appointmentdate}</td>
                        <td className="text-center">
                          {appointment.contactnumber}
                        </td>
                        <td>{appointment.doctor}</td>

                        {/* <td>
                          <Button
                            variant="success"
                            className="mr-2"
                            // onClick={() => handleUpdateClick(index)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            // onClick={() => handleDeleteClick(index)}
                          >
                            Delete
                          </Button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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

      <Modal
        show={showAddAppointmentModal}
        onHide={handleCloseAddAppointmentModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddAppointmentSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-patientname">
              <Form.Label for="patientname">Patient Name:</Form.Label>
              <select
                name="patientname"
                onChange={handleSelect}
                className="form-control"
              >
                <option key="-1" value="Select Patient">
                  Select Patient
                </option>
                {patients.map((patient) => (
                  <option
                    key={patient.patientID}
                    value={patient.lastname + ", " + patient.firstname}
                  >
                    {patient.lastname}, {patient.firstname}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group controlId="signup-doctor">
              <Form.Label for="doctor">Doctor:</Form.Label>
              <select
                name="doctor"
                onChange={handleSelectDoctor}
                className="form-control"
              >
                <option key="-1" value="Select Doctor">
                  Select Doctor
                </option>
                {doctors.map((doctor) => (
                  <option
                    key={doctor.doctorid}
                    value={doctor.doctorname + "- " + doctor.specialty}
                  >
                    {doctor.doctorname} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group controlId="signup-appointmentdate">
              <Form.Label for="appointmentdate">Appointment Date:</Form.Label>
              <Form.Control
                type="date"
                name="appointmentdate"
                value={formAddAppointmentValues.appointmentdate}
                onChange={handleAddAppointmentInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-contactnumber">
              <Form.Label for="contactnumber">Contact Number:</Form.Label>
              <Form.Control
                type="text"
                name="contactnumber"
                value={formAddAppointmentValues.contactnumber}
                onChange={handleAddAppointmentInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleAddAppointmentRequest}
            >
              Proceed Adding
            </Button>
            <Button
              variant="secondary"
              onClick={handleCloseAddAppointmentModal}
            >
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AppointmentScreen;
