import React, { CSSProperties, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [student_id, setStudentId] = useState("");
  const [student_pwd, setStudentPwd] = useState("");
  const navigateRegi = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        student_id,
        student_pwd,
      });
      alert(response.data);
    } catch (error) {
      alert("Login failed: " + error);
    }
  };

  return (
    <div>
      <div>
        <i aria-hidden="true" style={{ marginRight: "10px" }}></i>
        <input
          type="text"
          placeholder="Username"
          value={student_id}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div>
        <i aria-hidden="true" style={{ marginRight: "10px" }}></i>
        <input
          type="password"
          placeholder="Password"
          value={student_pwd}
          onChange={(e) => setStudentPwd(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Sign In</button>
      <button onClick={() => navigateRegi("/register")}>Register</button>
    </div>
  );
};

export default LoginForm;
