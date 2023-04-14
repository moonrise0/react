import "bootstrap/dist/css/bootstrap.min.css"; //부트스트랩 라이브러리.
import React, { useState, useEffect } from "react"; // 함수기반 컴포터는 할려한다면.
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link } from "react-router-dom";
import Pagination from 'react-js-pagination';
import "../../page.css"


function BoardList(props) {
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [pg, setPg] = useState(0);
  const [loading, setLoading] = useState(false);

 const loadData = async (pg) => {
    const url = SERVERIP + "/hero_board/list" + pg;
    await axios.get(url)
      .then((res) => {
       let totalCnt = res.data.totalCnt;
       let pg = res.pg;
       let boardList = res.data.boardList;
       console.log("데이터전체개수 :", totalCnt);
       console.log("현재페이지 :", pg);
       console.log("데이터 :", boardList);
       setTotalCnt(totalCnt)
       setPg(pg)
        setBoardList(boardList);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

const goPage=(pg) =>{
  setPg(pg);
  loadData(pg);
}



  useEffect(() => {
 
    loadData(1);
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
              제목
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              내용
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
        <colgroup>
            <col width="8%"/>
            <col width="*"/>
            <col width="8%"/>
            <col width="18%"/>
        
        
        
        </colgroup>

        <thead className="table-secondary">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {loading === true
            ? boardList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.username}</td>
                    <td>
                      <Link to={"/board/view/" + item.id}>
                        {item.hero_name}
                      </Link>
                    </td>
                    <td>{item.title}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
      <Pagination
         activePage={pg}            /*현재실행중인페이지*/
         itemsCountPerPage={10}       /*  힌페이지에 보여줄 라인수 */
         totalItemsCount={totalCnt}
         pageRangeDisplayed={5}
         prevPageText={"<"}
         nextPageText={">"}
         onChange={goPage}
         firstPageText={"<<"}
         lastPageText={">>"}
      />
      <div>
        <Link className="btn btn-danger" to="/board/write">
          글쓰기
        </Link>
      </div>
    </div>
  );
}

export default BoardList;
