import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import { QueryError, RowDataPacket } from "mysql2";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydatabase",
});

connection.connect((err: QueryError | null) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

app.post("/register", (req, res) => {
  const { student_id, student_name, student_pwd } = req.body;
  if (!student_id || !student_name || !student_pwd) {
    res.status(400).send("All fields are required.");
    return;
  }

  const sql =
    "INSERT INTO students (student_id, student_name, student_pwd) VALUES (?, ?, ?)";
  connection.query(
    sql,
    [student_id, student_name, student_pwd],
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error registering user: " + err.message);
        return;
      }
      res.status(200).send("User registered successfully");
    }
  );
});

app.post("/login", (req, res) => {
  const { student_id, student_pwd } = req.body;
  if (!student_id || !student_pwd) {
    res.status(400).send("All fields are required.");
    return;
  }

  const sql = "SELECT * FROM students WHERE student_id = ? AND student_pwd = ?";
  connection.query(
    sql,
    [student_id, student_pwd],
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error logging in: " + err.message);
        return;
      }
      if (results.length > 0) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
