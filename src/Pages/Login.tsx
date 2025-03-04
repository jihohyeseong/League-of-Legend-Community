import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    margin: 10rem;
`;

const Container = styled.div``;

const Btn = styled.button`
    display: flex;
    align-items: center;
    gap: 5rem;
    border: 1px solid #cacaca;
    border-radius: 1rem;
    padding: 1rem 1rem;
    cursor: pointer;
    min-width: 20rem; // 최소 너비 지정으로 버튼 사이즈 일정
`;

const NaverBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 5rem;
    border: 1px solid #8ac007;
    border-radius: 1rem;
    padding: 1rem 1rem;
    background-color: #8ac007;
    cursor: pointer;
    min-width: 20rem; // 최소 너비 지정으로 버튼 사이즈 일정
`;

const KakaoBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 5rem;
    border: 1px solid yellow;
    border-radius: 1rem;
    padding: 1rem 1rem;
    background-color: yellow;
    cursor: pointer;
    min-width: 20rem; // 최소 너비 지정으로 버튼 사이즈 일정
`;

const ImgBox = styled.div`
    width: 2rem;
    height: 2rem;
`;

const BtnTitle = styled.span`
    font-weight: 500;
    opacity: 0.6;
    color: #232836;
    font-size: 1.3rem;
`;

const NaverBtnTitle = styled.span`
    color: #fff;
    font-weight: 500;
    opacity: 0.8;
    font-size: 1.3rem;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function Login() {
    const setLogin = useSetRecoilState(isLoginAtom);
    const googleOnclick = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
        setLogin(true);
    };
    const naverOnclick = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/naver";

        setLogin(true);
    };
    const kakaoOnclick = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/kakao";
        setLogin(true);
    };
    return (
        <Wrapper>
            <Container>
                <Btn onClick={googleOnclick}>
                    <ImgBox>
                        <Img
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                            alt=""
                        />
                    </ImgBox>
                    <BtnTitle>Login with Google</BtnTitle>
                </Btn>
            </Container>
            <Container>
                <NaverBtn onClick={naverOnclick}>
                    <ImgBox>
                        <Img
                            src="https://cdn-icons-png.flaticon.com/512/9605/9605284.png"
                            alt=""
                        />
                    </ImgBox>
                    <NaverBtnTitle>Login with Naver</NaverBtnTitle>
                </NaverBtn>
            </Container>
            <Container>
                <KakaoBtn onClick={kakaoOnclick}>
                    <ImgBox>
                        <Img
                            src="https://cdn-icons-png.flaticon.com/512/3669/3669973.png"
                            alt=""
                        />
                    </ImgBox>
                    <BtnTitle>Login with Kakao</BtnTitle>
                </KakaoBtn>
            </Container>
        </Wrapper>
    );
}

export default Login;
