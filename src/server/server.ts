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
  timezone: "Z", // 'Z'는 UTC 시간대를 의미
});

connection.connect((err: QueryError | null) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

//관리자 로그인
app.post("/login", (req, res) => {
  const { id, pwd } = req.body;
  if (!id || !pwd) {
    return res.status(400).send("All fields are required.");
  }

  const sql = "SELECT * FROM admin WHERE id = ? AND pwd = ?";
  connection.query(sql, [id, pwd], (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error logging in: " + err.message);
    }

    const rows = results as RowDataPacket[];
    if (rows.length > 0) {
      res.status(200).send("로그인 성공");
    } else {
      res.status(401).send("로그인 실패");
    }
  });
});

// 드롭다운바 목록 가져오기
app.get("/classes", (req, res) => {
  connection.query("SELECT classNum, className FROM class", (err, results) => {
    if (err) {
      console.error("반 정보를 조회하는 중 오류 발생:", err);
      res.status(500).send("반 정보 조회 실패");
      return;
    }
    res.json(results);
  });
});

// 학생 정보 입력
app.post("/register", (req, res) => {
  const { studentNum, classNum } = req.body;

  const queryStudent = "INSERT INTO students (studentName) VALUES (?)";
  const queryClassStudents =
    "INSERT INTO class_students (classNum, studentNum) VALUES (?, LAST_INSERT_ID())";

  connection.query(queryStudent, [studentNum], (err, result) => {
    if (err) {
      console.error("학생 정보 입력 중 오류 발생:", err);
      res.status(500).send("학생 등록에 실패했습니다");
      return;
    }
    connection.query(queryClassStudents, [classNum], (err, result) => {
      if (err) {
        console.error("반-학생 관계 데이터 입력 중 오류 발생:", err);
        res.status(500).send("반에 학생을 등록하는 데 실패했습니다");
        return;
      }
      res.send("학생 등록 성공");
    });
  });
});

// 출결 정보 가져오기
app.get("/attendancecheck", (req, res) => {
  // DATE_FORMAT을 사용해서 서버와 클라이언트간의 시간을 맞춰야한다.
  const query = `
      SELECT 
          s.studentName,
          DATE_FORMAT(c.date, '%Y-%m-%d') as date,   
          a.status,
          cl.className
      FROM 
          attendance a
      JOIN 
          students s ON a.studentNum = s.studentNum
      JOIN 
          july_calendar c ON a.date_id = c.date_id
      JOIN 
          class_students cs ON s.studentNum = cs.studentNum
      JOIN 
          class cl ON cs.classNum = cl.classNum
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching attendance data:", err);
      res.status(500).send("Error fetching attendance data.");
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
