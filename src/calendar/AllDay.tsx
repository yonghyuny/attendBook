import React, { CSSProperties } from "react";

interface AllDayProps {
  day: Date;
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  clickedDate: Date | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  sameMonth: boolean;
}

const AllDay: React.FC<AllDayProps> = ({
  day,
  nowDate,
  setNowDate,
  clickedDate,
  setClickedDate,
  sameMonth,
}) => {
  const style: CSSProperties = {
    border: "1px solid lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px",
    margin: "1px",
    fontSize: "12px",
    width: "25px",
    height: "25px",
    backgroundColor: sameMonth ? "white" : "#f0f0f0",
    cursor: "pointer",
  };

  const pStyle: CSSProperties = {
    fontWeight: sameMonth ? "700" : "300",
    color: day.getDay() === 0 ? "red" : day.getDay() === 6 ? "blue" : "black",
  };

  const clickDate = () => {
    setClickedDate(day);
  };

  return (
    <div style={style} onClick={clickDate}>
      <p style={pStyle}>{day.getDate()}</p>
    </div>
  );
};

export default AllDay;
