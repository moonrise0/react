import "bootstrap/dist/css/bootstrap.min.css"; //부트스트랩 라이브러리.

import { Outlet, Link, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/list">
                게시판
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hero/list">
               영웅
               </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ marginTop: "20px" }} />
      <Outlet />
    </div>
  );
}
//  anchor 말고 navLink를 쓰자 a태그는 페이지 전체가 새로고침된다.
// //*컴포넌트가 출력되는 위치는 outlet* /
export default Layout;
