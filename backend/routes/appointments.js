var express = require("express");
const {
  addAppointment,
  fetchAppointments,
  fetchAppointment,
  updateAppointment,
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

router.get("/detail/:id", async function (req, res, next) {
  const { id } = req.params;
  if (id) {
    await fetchAppointment(id)
      .then((data) => {
        // const d = data.map((dd) => {
        //   return dd.appointmentid == id;
        // });
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(500).json({ error: "Missing Required Parameters" });
  }
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

router.post("/:id", async function (req, res, next) {
  const {
    patientname,
    appointmentdate,
    doctor,
    contactnumber,
    prescription,
    history,
  } = req.body;
  const { id } = req.params;
  console.log(req.body);
  if (prescription && history && id) {
    await updateAppointment(
      id,
      patientname,
      appointmentdate,
      doctor,
      contactnumber,
      prescription,
      history
    )
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({ error: "Missing Required Parameters" });
  }
});

module.exports = router;
