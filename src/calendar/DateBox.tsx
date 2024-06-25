import React, { CSSProperties } from "react";
import AllDay from "./AllDay";

const monthList = (nowDate: Date) => {
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();

  const result: Date[] = [];
  const firstDayOfMonth = new Date(nowYear, nowMonth, 1).getDay(); // 해당 월의 첫 번째 날짜 요일
  const lastDateOfMonth = new Date(nowYear, nowMonth + 1, 0).getDate(); // 해당 월의 마지막 날짜

  // 이전 달의 마지막 날짜
  const lastDateOfPrevMonth = new Date(nowYear, nowMonth, 0).getDate();

  // 첫 주의 빈 칸 채우기
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    result.push(new Date(nowYear, nowMonth - 1, lastDateOfPrevMonth - i));
  }

  // 해당 월의 날짜 채우기
  for (let i = 1; i <= lastDateOfMonth; i++) {
    result.push(new Date(nowYear, nowMonth, i));
  }

  // 마지막 주의 빈 칸 채우기
  const nextMonthDayCount = 7 - (result.length % 7);
  if (nextMonthDayCount < 7) {
    for (let i = 1; i <= nextMonthDayCount; i++) {
      result.push(new Date(nowYear, nowMonth + 1, i));
    }
  }

  return result;
};

interface DateBoxProps {
  nowDate: Date;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  clickedDate: Date | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DateBox: React.FC<DateBoxProps> = ({
  nowDate,
  setNowDate,
  clickedDate,
  setClickedDate,
}) => {
  const style: CSSProperties = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    fontSize: "10px",
    gap: "2px",
    padding: "5px",
  };

  const allDay: Date[] = monthList(nowDate);
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  const getWeekStyle = (week: string): CSSProperties => {
    if (week === "일")
      return { color: "red", fontWeight: "bold", textAlign: "center" };
    if (week === "토")
      return { color: "blue", fontWeight: "bold", textAlign: "center" };
    return { fontWeight: "bold", textAlign: "center" };
  };

  return (
    <div style={style}>
      {weeks.map((week: string) => {
        return (
          <div key={week} style={getWeekStyle(week)}>
            <p>{week}</p>
          </div>
        );
      })}
      {allDay.map((day: Date, index: number) => {
        return (
          <AllDay
            key={index}
            day={day}
            nowDate={nowDate}
            setNowDate={setNowDate}
            clickedDate={clickedDate}
            setClickedDate={setClickedDate}
            sameMonth={nowDate.getMonth() === day.getMonth()}
          />
        );
      })}
    </div>
  );
};

export default DateBox;
