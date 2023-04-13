import React, { useState } from "react";

function Gugudan(props) {
  const [dan, setDan] = useState(4); //단
  const [guguList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [show, setShow] = useState(false); //show가 true일 때만 화면에 구구단 출력

  const danChange = (e) => {
    setShow(false); //show를 false로 해서 화면에 출력 막음
    setDan(e.target.value); //단 값 입력
  };

  const goConfirm = () => {
    setShow(true); //확인버튼 누르면 show->true로 바꿔서 화면에 출력
  };

  return (
    <div>
      <input type="text" onChange={danChange}></input>
      <br />
      <br />
      <button type="button" onClick={goConfirm}>
        확인
      </button>
      <br />
      <br />
      <ul>
        {show
          ? guguList.map((item, index) => {
              return (
                <li key={index}>
                  {dan} X {item} = {dan * item}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}
export default Gugudan;
