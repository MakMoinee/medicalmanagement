import defaultData from "../Commons/Commons";

const sendAddAppointmentRequest = (
  patientname,
  appointmentdate,
  doctor,
  contactnumber
) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.appointmentURL, {
      method: "POST",
      body: JSON.stringify({
        patientname,
        appointmentdate,
        doctor,
        contactnumber,
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

const fetchAppointmentsRequest = () => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.appointmentURL, {
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

export { sendAddAppointmentRequest, fetchAppointmentsRequest };
