import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atom/Button";

const MainPage = () => {
  const h1Style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  };

  const style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  };
  const navigate = useNavigate();

  const navigateToStudentRegistration = () => {
    navigate("/register");
  };

  const navigateToAttendance = () => {
    navigate("/attendance");
  };

  const navigateToAttendanceCheck = () => {
    navigate("/attendancecheck");
  };

  return (
    <div>
      <h1 style={h1Style}>관리자페이지</h1>
      <div style={style}>
        <Button onClick={navigateToStudentRegistration}>학생등록</Button>
        <Button onClick={navigateToAttendance}>출결관리</Button>
        <Button onClick={navigateToAttendanceCheck}>출결확인</Button>
      </div>
    </div>
  );
};

export default MainPage;
