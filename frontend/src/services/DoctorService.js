import defaultData from "../Commons/Commons";

const sendAddDoctorRequest = (doctorname, profession, specialty, license) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.doctorsURL, {
      method: "POST",
      body: JSON.stringify({
        doctorname,
        profession,
        specialty,
        license,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Network response was not ok"));
        } else {
          resolve(response);
        }
      })
      .then((data) => {
        // Simulating a successful account creation
        resolve(data);
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        reject(error);
      });
  });
};

const fetchDoctorsRequest = () => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.doctorsURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Network response was not ok"));
        }
        resolve(response);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        reject(error);
      });
  });
};

const deleteDoctorRequest = (id) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.doctorsURL + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Network response was not ok"));
        }
        resolve(response);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        reject(error);
      });
  });
};

const sendUpdateDoctorRequest = (
  id,
  doctorname,
  profession,
  specialty,
  license
) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.doctorsURL + `/${id}`, {
      method: "POST",
      body: JSON.stringify({
        doctorname,
        profession,
        specialty,
        license,
        btnUpdate: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Network response was not ok"));
        } else {
          resolve(response);
        }
      })
      .then((data) => {
        // Simulating a successful account creation
        resolve(data);
      })
      .catch((error) => {
        console.error("Error updating doctor:", error);
        reject(error);
      });
  });
};

export {
  sendAddDoctorRequest,
  fetchDoctorsRequest,
  deleteDoctorRequest,
  sendUpdateDoctorRequest,
};
