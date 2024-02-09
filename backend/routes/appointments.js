var express = require("express");
const {
  addAppointment,
  fetchAppointments,
} = require("../src/repository/postgres/postgres");
var router = express.Router();

router.get("/", async function (req, res, next) {
  await fetchAppointments()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.post("/", async function (req, res, next) {
  const { patientname, appointmentdate, doctor, contactnumber } = req.body;
  console.log(req.body);
  if (patientname && appointmentdate && contactnumber) {
    await addAppointment(patientname, appointmentdate, doctor, contactnumber)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({ error: "Missing Required Paramaters" });
  }
});

module.exports = router;
