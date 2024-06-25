import React from "react";
import AttendanceTable from "../atom/AttendanceTable";

const AttendanceCheck: React.FC = () => {
  return (
    <div>
      <h1>출결 확인</h1>
      <AttendanceTable />
    </div>
  );
};

export default AttendanceCheck;
