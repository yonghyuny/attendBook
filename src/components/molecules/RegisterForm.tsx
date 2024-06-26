import React, { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import Input from "../atom/Input";
import { useNavigate } from "react-router-dom";
import Button from "../atom/Button";
import Select from "../atom/Select";
import { ClassOption } from "../organisms/AttendanceCheck";

const RegisterForm = () => {
  const [studentNum, setStudentNum] = useState<string>("");
  const [classNum, setClassNum] = useState<string>("");

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const MainNav = useNavigate();

  const MainNavBtn = () => {
    MainNav("/MainPage");
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get<ClassOption[]>(
          "http://localhost:3001/classes"
        );
        setClasses(response.data);
      } catch (error) {
        console.error("반 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchClasses();
  }, []);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassNum(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const payload = { studentNum, classNum: parseInt(classNum, 10) };
      const response = await axios.post(
        "http://localhost:3001/register",
        payload
      );
      console.log(response.data);
      alert("등록 성공!");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 실패");
    }
  };

  const optionStyle: CSSProperties = {
    height: "45px",
    width: "100px",
    fontSize: "15px",
    textAlign: "center",
  };

  const mainStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const btnStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
  };

  const inputStyle: CSSProperties = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={mainStyle}>
      <div style={inputStyle}>
        <Select
          options={classes.map((cls) => ({
            id: cls.classNum,
            value: cls.classNum,
            text: cls.className,
          }))}
          onChange={handleClassChange}
          defaultOption="수업 선택"
        />
        <Input
          type="text"
          placeholder="학생 이름"
          value={studentNum}
          onChange={(e) => setStudentNum(e.target.value)}
        />
      </div>
      <div style={btnStyle}>
        <Button onClick={handleSubmit}>등록</Button>
        <Button onClick={MainNavBtn}>돌아가기</Button>
      </div>
    </div>
  );
};

export default RegisterForm;
