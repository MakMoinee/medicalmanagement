import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import {
  deleteDoctorRequest,
  fetchDoctorsRequest,
  sendAddDoctorRequest,
  sendUpdateDoctorRequest,
} from "../services/DoctorService";

function DoctorScreen({ onLogout }) {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [formDoctorValues, setFormDoctorValues] = useState({
    doctorname: "",
    profession: "",
    specialty: "",
    license: "",
    registered_date: "",
  });

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);

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

  const handleAddDoctorClick = () => {
    setShowDoctorModal(true);
  };

  const handleCloseDoctorModal = () => {
    setShowDoctorModal(false);
    setUpdateIndex(null);
    setFormDoctorValues({
      doctorname: "",
      profession: "",
      specialty: "",
      license: "",
      registered_date: "",
    });
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setFormDoctorValues({ ...formDoctorValues, [name]: value });
  };

  const handleAddDoctorRequest = () => {
    const { doctorname, profession, specialty, license, registered_date } =
      formDoctorValues;

    sendAddDoctorRequest(
      doctorname,
      profession,
      specialty,
      license,
      registered_date
    )
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully Added Doctor",
          showConfirmButton: false,
        });
        setShowDoctorModal(false);
        reload();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed Operation",
          text: "Failed To Add Doctor, Please Try Again Later",
          showConfirmButton: false,
          timer: 800,
        });
      });
  };

  const reload = () => {
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

  // DELETE
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
  };

  const handleCloseModal = () => {
    setDeleteIndex(null);
  };

  const handleDeleteConfirm = async () => {
    const id = doctors[deleteIndex].doctorid;
    await deleteDoctorRequest(id)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted Doctor",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed To Add Doctor",
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setDeleteIndex(null);
        reload();
      });
  };

  //UPDATE
  const handleUpdateClick = (index) => {
    setUpdateIndex(index);
    const d = doctors[index];
    formDoctorValues.doctorname = d.doctorname;
    formDoctorValues.profession = d.profession;
    formDoctorValues.specialty = d.specialty;
    formDoctorValues.license = d.license;
  };

  const handleUpdateDoctorRequest = async () => {
    const doctorid = doctors[updateIndex].doctorid;
    const { doctorname, profession, specialty, license, registered_date } =
      formDoctorValues;

    await sendUpdateDoctorRequest(
      doctorid,
      doctorname,
      profession,
      specialty,
      license,
      registered_date
    )
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully Updated Doctor",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed Operation",
          text: "Failed To Update Doctor, Please Try Again Later",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        setUpdateIndex(null);
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
                      className="active"
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
              <h2 className="mb-3">Doctors</h2>
              <div className="section-title mb-2 col-lg-2">
                <Button variant="primary" onClick={handleAddDoctorClick}>
                  Add Doctor
                </Button>
              </div>
              <div className="table-responsive mb-5">
                <table className="table border mb-0" id="sortTable">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">Doctor Name</th>
                      <th>Profession</th>
                      <th className="text-center">Specialty</th>
                      <th>License</th>
                      <th className="text-center">Registered Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor, index) => (
                      <tr key={index}>
                        <td className="text-center">{doctor.doctorname}</td>
                        <td>{doctor.profession}</td>
                        <td className="text-center">{doctor.specialty}</td>
                        <td>{doctor.license}</td>
                        <td className="text-center">
                          {doctor.registered_date}
                        </td>
                        <td>
                          <Button
                            variant="success"
                            className="mr-2"
                            onClick={() => handleUpdateClick(index)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(index)}
                          >
                            Delete
                          </Button>
                        </td>
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
      <Modal show={showDoctorModal} onHide={handleCloseDoctorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDoctorSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-doctorname">
              <Form.Label for="doctorname">Doctor Name:</Form.Label>
              <Form.Control
                type="text"
                name="doctorname"
                required
                value={formDoctorValues.doctorname}
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-profession">
              <Form.Label for="profession">Profession:</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                required
                value={formDoctorValues.profession}
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-specialty">
              <Form.Label for="specialty">Specialty:</Form.Label>
              <Form.Control
                type="text"
                name="specialty"
                required
                value={formDoctorValues.specialty}
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-license">
              <Form.Label for="license">License:</Form.Label>
              <Form.Control
                type="text"
                name="license"
                required
                value={formDoctorValues.license}
                onChange={handleAddInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleAddDoctorRequest}
            >
              Proceed Adding
            </Button>
            <Button variant="secondary" onClick={handleCloseDoctorModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={updateIndex != null} onHide={handleCloseDoctorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Doctor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDoctorSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-doctorname">
              <Form.Label for="doctorname">Doctor Name:</Form.Label>
              <Form.Control
                type="text"
                name="doctorname"
                required
                value={formDoctorValues.doctorname}
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-profession">
              <Form.Label for="profession">Profession:</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                required
                value={formDoctorValues.profession}
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-specialty">
              <Form.Label for="specialty">Specialty:</Form.Label>
              <Form.Control
                type="text"
                name="specialty"
                required
                value={formDoctorValues.specialty}
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-license">
              <Form.Label for="license">License:</Form.Label>
              <Form.Control
                type="text"
                name="license"
                required
                value={formDoctorValues.license}
                onChange={handleAddInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleUpdateDoctorRequest}
            >
              Proceed Updating
            </Button>
            <Button variant="secondary" onClick={handleCloseDoctorModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={deleteIndex !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Doctor?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DoctorScreen;
