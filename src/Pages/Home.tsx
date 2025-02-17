import { useQuery } from "react-query";
import styled from "styled-components";
import { getCommunityList, ICommunity } from "../api";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Loading = styled.div`
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SpinnerImg = styled.div`
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid ${(props) => props.theme.bgColor};
    border-radius: 50%;
    width: 4rem;
    aspect-ratio: 1;
    animation: spin 1s linear infinite;
    @keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
`;

const MainContainer = styled.div``;

const Title = styled.span`
    display: inline-block;
    font-size: 3rem;
    padding: 3rem;
    margin-top: 5rem;
`;

const Box = styled.div`
    text-align: center;
    border-radius: 1rem;
    padding: 3rem;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
`;

const ALink = styled.a`
    margin-bottom: 1.5rem;
`;

const BoxTitle = styled.h2`
    display: flex;
    font-size: 2rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const CommunityList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
`;

const ListItem = styled.li`
    font-size: 1.5rem;
    border-radius: 1rem;
    border: 1px solid ${(props) => props.theme.bgColor}; /* 테두리 추가 */
    background-color: ${(props) => props.theme.textColor}; /* 배경색 추가 */
`;

const Card = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    border-radius: 3rem;
`;

const More = styled.span`
    font-size: 1.3rem;
    transition: color 0.5s;

    &:hover {
        color: lightblue;
    }
`;

const ChatBtnBox = styled.div`
    position: absolute;
    right: 10rem;
    top: 30rem;
`;

const ChatBtn = styled.button`
display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  background-color: #10a37f;
  color: #fff;
  border-radius: 0.7rem;
  padding: 1.5rem;
  font-size: 1.2rem;
  border: 1px solid #10a37f;
  cursor: pointer;
`;


function Home() {
    const navigate = useNavigate();
    const { isLoading: LoadingCommunity, data: Community } = useQuery<ICommunity>("community", getCommunityList);
    const gotoChat = () => {
        navigate("/chat");
    }

    return (
        <Wrapper>
            <MainContainer>
                <Title>Welcome League Of Legend Community</Title>
                <Box>
                    <BoxTitle>
                        최근 글
                        {Community && <More><ALink href="/community">More...</ALink></More>}
                    </BoxTitle>

                    {LoadingCommunity ? (
                        <Loading>
                            <SpinnerImg></SpinnerImg>
                        </Loading>
                    ) : (
                        <CommunityList>
                            {Array.isArray(Community?.content) ? (
                                Community?.content
                                    .slice(0, 3).map((community) => (
                                        <ListItem key={community.id}>
                                            <Card>
                                                <span>{community.title}</span>
                                                <span>
                                                    -{community.nickname}-
                                                </span>
                                            </Card>
                                        </ListItem>
                                    ))
                            ) : (
                                <div>
                                    <h1>{Community?.content.title}</h1>
                                </div>
                            )}
                        </CommunityList>
                    )}
                </Box>
            </MainContainer>
            <ChatBtnBox>
                {Community && <ChatBtn onClick={gotoChat}>채팅방 입장</ChatBtn>}
            </ChatBtnBox>
        </Wrapper >
    );
}

export default Home;
