import "bootstrap/dist/css/bootstrap.min.css"; //부트스트랩 라이브러리.
import React, { useState, useEffect } from "react"; // 함수기반 컴포터는 할려한다면.
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link } from "react-router-dom";

function ScoreList(props) {
  const [scoreList, setScoreList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const url = SERVERIP + "/score/list";

      console.log(url);
      await axios
        .get(url)
        .then((res) => {
          setScoreList(res.data);
          setLoading(true);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>게시판 목록</h1>

      <div className="input-group mb-3" style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          선택하세요
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              이름
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              영어
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              제목+내용
            </a>
          </li>
        </ul>
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-secondary" type="submit">
          Go
        </button>
      </div>

      <table className="table table-hover ">
        <thead className="table-secondary">
          <tr>
            <th>이름</th>
            <th>국어</th>
            <th>영어</th>
            <th>수학</th>
          </tr>
        </thead>
        <tbody>
          {loading === true
            ? scoreList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.student}</td>
                    <td>{item.kor}</td>
                    <td>{item.math}</td>
                    <td>{item.eng}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
      <div>
        <Link className="btn btn-danger" to="/score/write">
          글쓰기
        </Link>
      </div>
    </div>
  );
}

export default ScoreList;
