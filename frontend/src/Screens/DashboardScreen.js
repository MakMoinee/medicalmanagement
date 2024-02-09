import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function DashboardScreen({ onLogout }) {
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

  const openInventory = () => {
    navigate("/patients");
  };
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
                    <a href="/" className="active">
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
                    <a href="#patients" onClick={openInventory}>
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

      {/* ***** Welcome Area Start ***** */}
      <div className="welcome-area" id="welcome">
        {/* ***** Header Text Start ***** */}
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div
                className="left-text col-lg-6 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              ></div>
              <div
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
              ></div>
            </div>
          </div>
        </div>
        {/* ***** Header Text End ***** */}
      </div>
      {/* ***** Welcome Area End ***** */}
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
      {/* ***** Footer End ***** */}
    </div>
  );
}

export default DashboardScreen;
