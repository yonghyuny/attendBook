import React, { useState } from "react";
import axios from "axios";
import InputField from "../atom/InputField";
import Button from "../atom/Button";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [student_id, setStudentId] = useState("");
  const [student_name, setStudentName] = useState("");
  const [student_pwd, setStudentPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const navigateLogin = useNavigate();

  const handleRegister = async () => {
    if (student_pwd !== confirmPwd) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/register", {
        student_id,
        student_name,
        student_pwd,
      });
      alert(response.data);
    } catch (error) {
      alert("Registration failed: " + error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아이디"
        value={student_id}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="이름"
        value={student_name}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={student_pwd}
        onChange={(e) => setStudentPwd(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        value={confirmPwd}
        onChange={(e) => setConfirmPwd(e.target.value)}
      />
      <button onClick={handleRegister}>가입하기</button>
      <button onClick={() => navigateLogin("/login")}>취소</button>
    </div>
  );
};

export default RegisterForm;
