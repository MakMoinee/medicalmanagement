var express = require("express");
const {
  addDoctor,
  pool,
  fetchDoctors,
  deleteDoctor,
  updateDoctor,
} = require("../src/repository/postgres/postgres");
var router = express.Router();

router.post("/", async function (req, res, next) {
  const { doctorname, profession, specialty, license } = req.body;
  console.log(req.body);
  if (doctorname && profession && specialty && license) {
    await addDoctor(pool, doctorname, profession, specialty, license)
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

router.get("/", async function (req, res, next) {
  await fetchDoctors(pool)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  if (id) {
    await deleteDoctor(pool, id)
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
  const { doctorname, profession, specialty, license } = req.body;
  const { id } = req.params;
  console.log(req.body);
  if (doctorname && profession && specialty && license && id) {
    await updateDoctor(pool, id, doctorname, profession, specialty, license)
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
