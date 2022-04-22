import React from "react";
import { useNavigate } from "react-router-dom";

const BulletinItem = ({ id, author, content, in_date }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`diary/${id}`);
  };

  const goEdit = () => {
    navigate(`edit/${id}`);
  };

  return (
    <div className="bulletinItem" onClick={goEdit}>
      <div>작성자: {author}</div>
      <div>내용: {content}</div>
      <div>작성시간(ms): {in_date}</div>
    </div>
  );
};

export default React.memo(BulletinItem);
