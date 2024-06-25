import React, { CSSProperties } from "react";

interface ControlDateProps {
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

const ControlDate: React.FC<ControlDateProps> = ({ nowDate, setNowDate }) => {
  const style: CSSProperties = {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid lightgray",
    boxSizing: "border-box",
  };

  const BtnBoxStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "5px",
  };

  const btnStyle: CSSProperties = {
    backgroundColor: "white",
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    cursor: "pointer",
    borderRadius: "3px",
  };

  const h1Style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    margin: "0",
    textAlign: "center",
  };

  const changeYear = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setFullYear(date.getFullYear() + change);
    setNowDate(date);
  };

  const changeMonth = (change: number) => {
    const date = new Date(nowDate.getTime());
    date.setMonth(date.getMonth() + change);
    setNowDate(date);
  };

  return (
    <div style={style}>
      <div style={BtnBoxStyle}>
        <button style={btnStyle} onClick={() => changeYear(-1)}>{`<<`}</button>
        <button style={btnStyle} onClick={() => changeMonth(-1)}>{`<`}</button>
      </div>
      <h1 style={h1Style}>{`${nowDate.getFullYear()}.${
        nowDate.getMonth() + 1
      }`}</h1>
      <div style={BtnBoxStyle}>
        <button style={btnStyle} onClick={() => changeMonth(1)}>{`>`}</button>
        <button style={btnStyle} onClick={() => changeYear(1)}>{`>>`}</button>
      </div>
    </div>
  );
};

export default ControlDate;
