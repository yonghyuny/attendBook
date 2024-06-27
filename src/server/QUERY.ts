export const Querys = {
  LOGIN: "SELECT * FROM admin WHERE id = ? AND pwd = ?", // 관리자 로그인쿼리
  CLASSLIST: "SELECT classNum, className FROM class", // 학생등록시 반 리스트 가져오는 쿼리
  STUDENTREGI: "INSERT INTO students (studentName) VALUES (?)", // 학생 등록 쿼리
  CLASSSTUDENTS:
    "INSERT INTO classStudents (classNum, studentNum) VALUES (?, LAST_INSERT_ID())", //학생 등록과 동시에 반도 같이 등록
  ATTENDANCEDATA: `SELECT 
          s.studentName,
          DATE_FORMAT(jc.date, '%Y-%m-%d') as date,
          a.status,
          cl.className,
          cl.classNum
      FROM 
          attendance a
      JOIN 
          students s ON a.studentNum = s.studentNum
      JOIN 
          julyCalendar jc ON a.dateId = jc.dateId
      JOIN 
          classStudents cs ON s.studentNum = cs.studentNum
      JOIN 
          class cl ON cs.classNum = cl.classNum`, // 출결 데이터 가져오는 쿼리
  DATELIST:
    "SELECT dateId, DATE_FORMAT(date, '%Y-%m-%d') as date FROM julyCalendar", // 날짜 목록 가져오는 쿼리
};
