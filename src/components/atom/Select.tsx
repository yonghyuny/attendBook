import React, { CSSProperties } from "react";

type Option = {
  id: number | string;
  value: number | string;
  text: string;
};

type SelectProps = {
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultOption: "날짜 선택" | "수업 선택";
  defaultValue?: "";
};

const Select = ({
  options,
  onChange,
  defaultOption,
  defaultValue = "",
}: SelectProps) => {
  const style: CSSProperties = { width: "100px", height: "40px" };

  return (
    <select style={style} onChange={onChange} defaultValue={defaultValue}>
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
{
  /* <select
        style={selectStyle}
        onChange={(e) => setSelectedDate(e.target.value)}
        defaultValue=""
      >
        <option value="">날짜 선택</option>
        {dates.map((date) => (
          <option key={date.dateId} value={date.date}>
            {date.date}
          </option>
        ))}
      </select>

      <select
        style={selectStyle}
        onChange={(e) => setSelectedClass(parseInt(e.target.value, 10))}
        defaultValue=""
      >
        <option value="">수업 선택</option>
        {classes.map((cls) => (
          <option key={cls.classNum} value={cls.classNum}>
            {cls.className}
          </option>
        ))}
      </select> */
}
