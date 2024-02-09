var express = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  addPatient,
  fetchPatients,
  deletePatient,
  updatePatient,
} = require("../src/repository/postgres/postgres");
var router = express.Router();

router.get("/", async function (req, res, next) {
  await fetchPatients()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.post("/", async function (req, res, next) {
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
  } = req.body;
  console.log(req.body);
  if (
    firstName &&
    lastName &&
    address &&
    gender &&
    history &&
    phoneNumber &&
    dependents
  ) {
    try {
      await addPatient(
        firstName,
        middleName,
        lastName,
        address,
        gender,
        history,
        birthDate,
        phoneNumber,
        dependents,
        (data) => {
          return res.status(200).json(data);
        },
        (err) => {
          return res.status(500).json(err);
        }
      );
    } catch (error) {
      console.error("Authentication failed:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Missing Required Parameters" });
  }
});

router.post("/:id", async function (req, res, next) {
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
  } = req.body;
  const { id } = req.params;
  console.log(req.body);
  if (
    firstName &&
    lastName &&
    address &&
    gender &&
    history &&
    phoneNumber &&
    dependents &&
    id
  ) {
    await updatePatient(
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

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  if (id) {
    await deletePatient(id)
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
