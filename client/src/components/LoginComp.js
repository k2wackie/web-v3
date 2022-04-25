import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginComp = () => {
  const userIDInput = useRef();
  const userPWInput = useRef();

  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const userInputData = {
    userID,
    userPW,
    userIDInput,
    userPWInput,
  };

  const [handleSubmit] = useLogin(userInputData);

  return (
    <div className="loginComp">
      <div className="loginBox">
        로그인
        <div>
          <input
            ref={userIDInput}
            name="userID"
            placeholder="아이디를 입력하세요."
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <div>
          <input
            ref={userPWInput}
            name="userPSW"
            placeholder="비밀번호를 입력하세요."
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>로그인</button>
        </div>
        <div>
          <p className="registerMSG">
            아이디 / 비밀번호 찾기 /{" "}
            <Link className="registerLink link" to="/register">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
