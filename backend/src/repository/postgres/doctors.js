const addDoctor = (
  pool,
  doctorname,
  profession,
  specialty,
  license,
  registered_date
) => {
  return new Promise((resolve, reject) => {
    pool
      .connect()
      .then((client) => {
        return client
          .query("SELECT * FROM doctors WHERE doctorname = $1", [doctorname])
          .then((result) => {
            if (result.rows.length > 0) {
              client.release();
              console.log("Doctor already exists");
              reject("Doctor already exists");
            } else {
              const query =
                "INSERT INTO doctors (doctorname, profession, specialty, license, registered_date) VALUES ($1, $2, $3, $4, NOW())";
              return client
                .query(query, [doctorname, profession, specialty, license])
                .then(() => {
                  client.release();
                  console.log("Doctor added to the database");
                  resolve();
                })
                .catch((err) => {
                  client.release();
                  console.error("Error adding doctor:", err);
                  reject(err);
                });
            }
          })
          .catch((err) => {
            client.release();
            console.error("Error checking doctorname:", err);
            reject(err);
          });
      })
      .catch((err) => {
        console.error("Error connecting to the database:", err);
        reject(err);
      });
  });
};

const fetchDoctors = (pool) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      client.query("SELECT * FROM doctors", (err, result) => {
        if (err) {
          release(); // Release the client
          console.error("Error checking doctor:", err);
          reject(err);
          return;
        }

        if (result.rows.length > 0) {
          release();
          resolve(result.rows);
        } else {
          release(); // Release the client
          reject(new Error("doctor not found"));
        }
      });
    });
  });
};

const deleteDoctor = (pool, doctorId) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      // Delete the doctor based on its id
      client.query(
        "DELETE FROM doctors WHERE doctorid = $1",
        [doctorId],
        (err, result) => {
          release(); // Release the client

          if (err) {
            console.error("Error deleting doctor:", err);
            reject(err);
            return;
          }

          resolve(result.rowCount); // Resolve with the number of rows affected
        }
      );
    });
  });
};

const updateDoctor = (
  pool,
  doctorID,
  doctorname,
  profession,
  specialty,
  license
) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      // Check if the product with given patientID exists
      client.query(
        "SELECT * FROM doctors WHERE doctorid = $1",
        [doctorID],
        (err, result) => {
          if (err) {
            release(); // Release the client
            console.error("Error checking doctor:", err);
            reject(err);
            return;
          }

          if (result.rows.length === 0) {
            release(); // Release the client
            console.error("doctor not found");
            reject("doctor not found");
            return;
          }

          const query =
            "UPDATE doctors SET doctorname = $2, profession = $3, specialty = $4, license = $5 WHERE doctorid = $1";

          client.query(
            query,
            [doctorID, doctorname, profession, specialty, license],
            (err, result) => {
              release(); // Release the client

              if (err) {
                console.error("Error updating doctor:", err);
                reject(err);
              } else {
                console.log("doctor updated successfully");
                resolve();
              }
            }
          );
        }
      );
    });
  });
};

module.exports = { addDoctor, fetchDoctors, deleteDoctor, updateDoctor };
