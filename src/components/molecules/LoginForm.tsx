import React, { CSSProperties, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../atom/Input";
import Button from "../atom/Button";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate(); // useNavigate 훅을 사용

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        id,
        pwd,
      });
      if (response.data === "로그인 성공") {
        navigate("/mainpage"); // 로그인 성공 시 '/main' 페이지로 이동
      } else {
        alert("로그인 실패 ");
      }
    } catch (error) {
      alert("로그인 실패 ");
    }
  };

  const inputStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  };
  const btnStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  };

  return (
    <div>
      <div>
        <div style={inputStyle}>
          <Input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div style={inputStyle}>
          <Input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
      </div>
      <div style={btnStyle}>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
};

export default LoginForm;
