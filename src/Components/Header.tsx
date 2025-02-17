import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isLoginAtom } from "../atom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Gnb = styled.nav`
  padding: 1rem;
  background-color: #444;
`;

const Itemlist = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 3rem;
`;

const Item = styled.li`
  color: #fff;
  transition: all 0.5s;

  &:hover {
    color: #8a6d3b;
  }
`;

const ImgBox = styled.div`
  width: 2rem;
  height:2rem;
`;

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

function Header() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((current: boolean) => !current);
  };
  const isLogin = useRecoilValue(isLoginAtom);
  const setLogin = useSetRecoilState(isLoginAtom);

  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      method: "GET",
      credentials: "include", // JWT 쿠키 포함
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setLogin(true); // 로그인 상태 업데이트
      })
      .catch(() => {
        setLogin(false); // 로그인 실패 시 상태 업데이트
      });
  }, [setLogin]);



  return (
    <Gnb>
      <Itemlist>
        <Item><Link to="/">HOME</Link></Item>
        {!isLogin ? <Item><Link to="/login">LOG IN</Link></Item> : <Item><Link to="/mypage">MY PAGE</Link></Item>}
        <ImgBox key={isDark ? 'dark' : 'light'}>
          <Img src={isDark ? "https://cdn-icons-png.flaticon.com/512/6360/6360844.png" : "https://cdn-icons-png.flaticon.com/512/6714/6714978.png"} onClick={toggleDarkAtom} />
        </ImgBox>
      </Itemlist>
    </Gnb >
  );
}

export default Header;
