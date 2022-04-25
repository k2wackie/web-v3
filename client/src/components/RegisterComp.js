import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useChkID from "../hooks/useChkID";
import useRegist from "../hooks/useRegist";

const RegisterComp = () => {
  const userIDInput = useRef();
  const userPWInput = useRef();

  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userChkPW, setUserChkPW] = useState("");

  const userInputData = {
    userID,
    userPW,
    userChkPW,
    userIDInput,
    userPWInput,
  };

  const [handleSubmit] = useRegist(userInputData);
  const [chkID, chkIDSubmit] = useChkID(userInputData);

  const onClick = () => {
    return chkID ? handleSubmit : alert("아이디 중복 확인을 해주세요.");
  };

  return (
    <div className="loginComp">
      <div className="loginBox">
        회원가입
        <div>
          <input
            ref={userIDInput}
            name="userID"
            placeholder="아이디를 입력하세요."
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
          <button onClick={chkIDSubmit}>중복확인</button>
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
          <input
            name="userChkPSW"
            placeholder="비밀번호를 다시 입력하세요."
            value={userChkPW}
            onChange={(e) => setUserChkPW(e.target.value)}
          />
        </div>
        <div>
          <button onClick={onClick}>회원가입</button>
        </div>
        <div>
          <p className="registerMSG">
            <Link className="registerLink link" to="/login">
              로그인으로
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComp;
