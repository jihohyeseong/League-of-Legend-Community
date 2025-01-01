import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isLoginAtom } from "../atom";
import { Link } from "react-router-dom";

const Gnb = styled.nav`
  padding: 1rem;
  background-color: #333;
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

  return (
    <Gnb>
      <Itemlist>
        <Item><Link to="/">HOME</Link></Item>
        {isLogin ? <Item><Link to="/login">LOG IN</Link></Item> : <Item><Link to="/mypage">MY PAGE</Link></Item>}
        {isDark ? <ImgBox><Img src="https://cdn-icons-png.flaticon.com/512/6360/6360844.png" onClick={toggleDarkAtom} /></ImgBox> :
          <ImgBox><Img src="https://cdn-icons-png.flaticon.com/512/6714/6714978.png" onClick={toggleDarkAtom} /></ImgBox>}
      </Itemlist>
    </Gnb >
  );
}

export default Header;