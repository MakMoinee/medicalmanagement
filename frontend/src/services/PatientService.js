import defaultData from "../Commons/Commons";

const sendAddPatientRequest = (
  firstName,
  middleName,
  lastName,
  address,
  gender,
  history,
  birthDate,
  phoneNumber,
  dependents
) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.patientsURL, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        address,
        gender,
        history,
        birthDate,
        phoneNumber,
        dependents,
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
        console.error("Error creating patient:", error);
        reject(error);
      });
  });
};

const fetchProductsRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.patientsURL, {
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

const deletePatientRequest = (id) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.patientDeleteURL + `/${id}`, {
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

const sendUpdateProductRequest = (
  id,
  firstName,
  middleName,
  lastName,
  address,
  gender,
  history,
  birthDate,
  phoneNumber,
  dependents
) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.patientsURL + `/${id}`, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        address,
        gender,
        history,
        phoneNumber,
        dependents,
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
        console.error("Error creating product:", error);
        reject(error);
      });
  });
};

export {
  sendAddPatientRequest,
  fetchProductsRequest,
  deletePatientRequest,
  sendUpdateProductRequest,
};
