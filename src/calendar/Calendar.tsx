import React, { CSSProperties } from "react";
import Main from "./Main";

const Calendar = () => {
  const style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  };

  return (
    <div style={style}>
      <Main />
    </div>
  );
};

export default Calendar;
