import React, { CSSProperties, useState } from "react";
import ControlDate from "./ControlDate";
import DateBox from "./DateBox";

const Main: React.FC = () => {
  const style: CSSProperties = {
    width: "320px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid lightgray",
    borderRadius: "10px",
    backgroundColor: "white",
  };

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [clickedDate, setClickedDate] = useState<Date>();

  return (
    <div style={style}>
      <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
      <DateBox
        nowDate={nowDate}
        setNowDate={setNowDate}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
      />
    </div>
  );
};

export default Main;
