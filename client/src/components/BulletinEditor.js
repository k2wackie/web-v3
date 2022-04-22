import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BulletinDispatchContext } from "../App";

const BulletinEditor = ({ isEdit, originData, id }) => {
  const { onCreateEdit, onRemove } = useContext(BulletinDispatchContext);

  const navigate = useNavigate();

  const authorInput = useRef();
  const contentInput = useRef();

  const [author, setauthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    // console.log(state.author.length, state.content.length);

    if (author.length < 1) {
      authorInput.current.focus();
      return;
    }
    if (content.length < 5) {
      contentInput.current.focus();
      return;
    }
    // console.log("state", state);
    const id = originData.id;
    console.log(id);
    onCreateEdit(author, content, id, isEdit);
    // alert("저장 성공!");
    navigate("/");
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setauthor(originData.author);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="bulletinEditor">
      <h2 className="bulletinEditorTitle">
        {isEdit ? "게시판 수정" : "게시판 생성"}
      </h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          placeholder="작성자을 입력하세요."
          value={author}
          onChange={(e) => setauthor(e.target.value)}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          placeholder="내용을 작성하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>저장하기</button>
        {isEdit ? <button onClick={handleRemove}>삭제하기</button> : ""}
      </div>
    </div>
  );
};

export default BulletinEditor;
