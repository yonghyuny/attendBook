import React, { CSSProperties } from "react";
import AttendanceTable from "../atom/AttendanceTable";

const AttendanceCheck: React.FC = () => {
  const attendancecheckStyle: CSSProperties = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };
  return (
    <div style={attendancecheckStyle}>
      <h1 style={{ width: "100%", textAlign: "center" }}>출결 확인</h1>
      <AttendanceTable />
    </div>
  );
};

export default AttendanceCheck;
