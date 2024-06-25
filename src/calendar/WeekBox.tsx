import React, { CSSProperties } from "react";

interface WeekBoxProps {
  weekName: string;
}

const WeekBox: React.FC<WeekBoxProps> = ({ weekName }) => {
  const style: CSSProperties = {
    backgroundColor: "grey",
    display: "flex",
    fontSize: "10px", 
  };
  return (
    <div style={style}>
      <p>{weekName}</p>
    </div>
  );
};

export default WeekBox;
