import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom } from "../atom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, UserInfo } from "../api";
import useFetch from "../Hooks/useFetch";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-top: 5rem;
`;

const Container = styled.div`
margin-top: 3rem;
  display: flex;
  gap: 3rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  gap: 1.5rem;
  padding: 3rem;
  border-radius: 3rem;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const Info = styled.span`
    font-size: 1.5rem;
    text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  background-color: #10a37f;
  color: #fff;
  margin: 1.5rem;
  border-radius: 0.7rem;
  padding: 2rem;
  font-size: 1.2rem;
  border: 1px solid #10a37f;
  cursor: pointer;
`;

const ImgBox = styled.div`
  padding: 3rem;
  border-radius: 3rem;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const ImgItem = styled.img`
  width: 20rem;
  height: 10rem;
  object-fit: contain;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  background-color: crimson;
  color: #fff;
  border-radius: 0.7rem;
  padding: 2rem;
  font-size: 1.2rem;
  border: 1px solid crimson;
  cursor: pointer;
`;

function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  let isLogin = useRecoilValue(isLoginAtom);

  const { data: userData, loading: userLoading } = useFetch("http://localhost:8080/mypage");
  const { data: userInfoData, loading: userInfoLoading } = useFetch("http://localhost:8080/info");


  useEffect(() => {
    if (userData) {
      setUser(userData);
    }

    if (userInfoData) {
      setUserInfo(userInfoData);
    }
  }, [userData, userInfoData]);

  const setLogin = useSetRecoilState(isLoginAtom);
  const toggleLoginAtom = () => {
    setLogin((current: boolean) => !current);
  };

  const handleLogout = async () => {
    await fetch(`http://localhost:8080/logout`, {
      method: "POST",
      credentials: "include",
    });
    toggleLoginAtom();
    navigate("/");
  };

  const gotoUserInfo = () => {
    navigate("/login/nickname");
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/info`, {
      method: "DELETE",
      credentials: "include",
    });
    alert("탈퇴가 완료되었습니다.");
    navigate("/login");
    isLogin = false;
  };

  const gotoEdit = () => {
    navigate("/mypage/edit");
  };

  return (
    <Wrapper>
      <Title>{user?.name}'s My Page</Title>
      <Container>
        <InfoBox>
          <Info>이메일 : {user?.email}</Info>
          {userInfo &&
            <>
              <Info>닉네임 : {userInfo?.nickname}</Info>
              <Info>포인트 : {userInfo?.point}</Info>
              <Info>레벨 : {userInfo?.level} / 경험치 : {userInfo?.exp}</Info>
            </>
          }
        </InfoBox>
        {userInfo &&
          <>
            <ImgBox>
              <ImgItem src={userInfo?.imageUrl} />
            </ImgBox>
          </>
        }

      </Container>

      <ButtonContainer>
        {!userInfo && <LogoutButton onClick={gotoUserInfo}>Goto Nickname</LogoutButton>}
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        {userInfo && <LogoutButton onClick={gotoEdit}>수정하기</LogoutButton>}
      </ButtonContainer>

      {(user || userInfo) && <DeleteButton onClick={handleDelete}>탈퇴하기</DeleteButton>}

    </Wrapper>
  );
}

export default MyPage;
