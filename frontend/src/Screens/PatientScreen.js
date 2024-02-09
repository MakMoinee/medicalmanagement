import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {
  fetchProductsRequest,
  deleteProductsRequest,
  sendUpdateProductRequest,
  sendAddPatientRequest,
  deletePatientRequest,
} from "../services/PatientService";

function PatientScreen({ onLogout }) {
  const navigate = useNavigate();
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [formAddPatientValues, setFormAddPatientValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    gender: "",
    history: "",
    birthDate: "",
    phoneNumber: "",
    dependents: "",
  });
  const [formUpdatePatientValues, setFormUpdatePatientValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    address: "",
    gender: "",
    history: "",
    birthDate: "",
    phonenumber: "",
    dependents: "",
  });

  const [patients, setPatients] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleAddPatientInputChange = (event) => {
    const { name, value } = event.target;
    setFormAddPatientValues({ ...formAddPatientValues, [name]: value });
  };

  const handleUpdatePatientInputChange = (event) => {
    const { name, value } = event.target;
    setFormUpdatePatientValues({ ...formUpdatePatientValues, [name]: value });
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
  };

  const handleUpdateClick = (index) => {
    setUpdateIndex(index);
    setFormUpdatePatientValues(patients[index]);
  };

  const handleUpdateConfirm = () => {
    // Add your delete logic here
    const {
      firstname,
      middlename,
      lastname,
      address,
      gender,
      history,
      birthDate,
      phonenumber,
      dependents,
    } = formUpdatePatientValues;
    const id = patients[updateIndex].patientid;
    sendUpdateProductRequest(
      id,
      firstname,
      middlename,
      lastname,
      address,
      gender,
      history,
      birthDate,
      phonenumber,
      dependents,
    )
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Failed To Update Patient",
            showConfirmButton: false,
            timer: 800,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Successfully Updated Patient",
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed To Update Patient",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        // Close the modal after deletion
        setUpdateIndex(null);
        reload();
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
        console.log("Data from API:", data); // Log the data
        setPatients(data);
      })
      .catch((error) => {
        setPatients([]);
        return;
      });
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here

    console.log("Deleting patient at index:", deleteIndex);
    const id = patients[deleteIndex].patientid;
    deletePatientRequest(id)
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Failed To Delete Patient",
            showConfirmButton: false,
            timer: 800,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Successfully Deleted Patient",
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed To Delete Patient",
          showConfirmButton: false,
          timer: 800,
        });
      })
      .finally(() => {
        // Close the modal after deletion
        setDeleteIndex(null);
        reload();
      });
  };

  const handleCloseModal = () => {
    setDeleteIndex(null);
  };

  const handleAddProductClick = (event) => {
    event.preventDefault();
    setShowAddPatientModal(true);
  };

  const handleAddPatientSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };

  const handleCloseAddProductModal = () => {
    setShowAddPatientModal(false);
  };

  const handleCloseUpdateProductModal = () => {
    setUpdateIndex(null);
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

  const handleAddPatientRequest = () => {
    const {
      firstName,
      middleName,
      lastName,
      address,
      gender,
      history,
      birthDate,
      phoneNumber,
      dependents,
    } = formAddPatientValues;

    sendAddPatientRequest(
      firstName,
      middleName,
      lastName,
      address,
      gender,
      history,
      birthDate,
      phoneNumber,
      dependents
    )
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully Added Patient",
          showConfirmButton: false,
        });
        fetchProductsRequest()
          .then((response) => {
            if (!response.ok) {
              setShowAddPatientModal(false);
            }
            return response.json();
          })
          .then((data) => {
            setPatients(data);
            setShowAddPatientModal(false);
          })
          .catch((error) => {
            console.error("Error fetching Patient:", error);
            throw error;
          });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed Operation",
          text: "Failed To Add Product, Please Try Again Later",
          showConfirmButton: false,
          timer: 800,
        });
      });
  };

  useEffect(() => {
    reload();
  }, []);
  return (
    <div>
      {/* ***** Header Area Start ***** */}
      <header className="header-area background-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <a href="/" className="logo">
                  MedSys
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
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
                      className="active"
                    >
                      Patients
                    </a>
                  </li>
                  {/* <li className="scroll-to-section">
                    <a
                      href="#transactions"
                      onClick={() => {
                        navigate("/transactions");
                      }}
                    >
                      Transactions
                    </a>
                  </li> */}
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
              <div className="section-title mb-3">
                <h1 className="display-5 mb-0">Patients Table</h1>
              </div>
              <div className="section-title mb-2 col-lg-2">
                <Button variant="primary" onClick={handleAddProductClick}>
                  Add Patient
                </Button>
              </div>
              <div className="table-responsive mb-5">
                <table className="table border mb-0" id="sortTable">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">First Name</th>
                      <th>Middle Name</th>
                      <th className="text-center">Last Name</th>
                      <th>History</th>
                      <th className="text-center">Address</th>
                      <th>Phone Number</th>
                      <th className="text-center">Gender</th>
                      <th>Dependents</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={index}>
                        <td className="text-center">{patient.firstname}</td>
                        <td>{patient.middlename}</td>
                        <td className="text-center">{patient.lastname}</td>
                        <td>{patient.history}</td>
                        <td>{patient.address}</td>
                        <td className="text-center">{patient.phonenumber}</td>
                        <td>{patient.gender}</td>
                        <td className="text-center">{patient.dependents}</td>
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
      {/* ***** Features Big Item End ***** */}

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

      <Modal show={showAddPatientModal} onHide={handleCloseAddProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPatientSubmit}>
          <Modal.Body>
            <Form.Group controlId="signup-firstName">
              <Form.Label for="firstName">First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                required
                value={formAddPatientValues.firstName}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-middleName">
              <Form.Label for="middleName">Middle Name:</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={formAddPatientValues.middleName}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-lastName">
              <Form.Label for="lastName">Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formAddPatientValues.lastName}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>
            <Form.Group controlId="signup-history">
              <Form.Label for="history">History:</Form.Label>
              <Form.Control
                type="text"
                name="history"
                value={formAddPatientValues.history}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>

            <Form.Group controlId="signup-gender" style={{ marginTop: "15px" }}>
              <Form.Label for="gender">Gender:</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                required
                value={formAddPatientValues.gender}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>

            <Form.Group
              controlId="signup-address"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="address">Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                value={formAddPatientValues.address}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>

            <Form.Group
              controlId="signup-phoneNumber"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="phoneNumber">Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                required
                value={formAddPatientValues.phoneNumber}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>

            <Form.Group
              controlId="signup-dependents"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="dependents">
                Dependents (separate dependents by comma):
              </Form.Label>
              <Form.Control
                type="text"
                name="dependents"
                required
                value={formAddPatientValues.dependents}
                onChange={handleAddPatientInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleAddPatientRequest}
            >
              Proceed Adding
            </Button>
            <Button variant="secondary" onClick={handleCloseAddProductModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={updateIndex != null} onHide={handleCloseUpdateProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Patient</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddPatientSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label for="firstName">First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                required
                value={formUpdatePatientValues.firstname}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="middlename">Middle Name:</Form.Label>
              <Form.Control
                type="text"
                name="middlename"
                value={formUpdatePatientValues.middlename}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="lastname">Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formUpdatePatientValues.lastname}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="history">History:</Form.Label>
              <Form.Control
                type="text"
                name="history"
                value={formUpdatePatientValues.history}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label for="gender">Gender:</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                required
                value={formUpdatePatientValues.gender}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label for="address">Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                value={formUpdatePatientValues.address}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label for="phonenumber">Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phonenumber"
                required
                value={formUpdatePatientValues.phonenumber}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: "15px" }}>
              <Form.Label for="dependents">
                Dependents (separate dependents by comma):
              </Form.Label>
              <Form.Control
                type="text"
                name="dependents"
                required
                value={formUpdatePatientValues.dependents}
                onChange={handleUpdatePatientInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleUpdateConfirm}
            >
              Proceed Updating
            </Button>
            <Button variant="secondary" onClick={handleCloseUpdateProductModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={deleteIndex !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Patient?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ***** Footer End ***** */}
    </div>
  );
}

export default PatientScreen;
