import React, { useState } from "react";
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
        navigate("/mainpage"); // 로그인 성공 시 '/main' 페이지로 리디렉션
      } else {
        alert("로그인 실패 ");
      }
    } catch (error) {
      alert("로그인 실패 ");
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Username"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <Button onClick={handleLogin}>Sign In</Button>
    </div>
  );
};

export default LoginForm;
