import { useQuery } from "react-query";
import styled from "styled-components";
import { getCommunityList, ICommunity } from "../api";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    border-radius: 1.5rem;
    padding: 3rem;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
`;

const ALink = styled.a`
    margin-bottom: 1.5rem;
`;

const BoxTitle = styled.h2`
    display: inline-block;
    font-size: 2rem;
    text-align: center;
    transition: color 0.5s;
    &:hover {
        color: lightblue;
    }
`;

const CommunityList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
`;

const ListTitle = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 1.7rem;
`;

const ListItem = styled.li`
    font-size: 1.5rem;
    border-radius: 3rem;
    border: 1px solid ${(props) => props.theme.bgColor}; /* 테두리 추가 */
    background-color: ${(props) => props.theme.textColor}; /* 배경색 추가 */
`;

const Card = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    border-radius: 3rem;
`;

function Home() {
    const { isLoading: LoadingCommunity, data: Community } =
        useQuery<ICommunity>("community", getCommunityList);

    return (
        <Wrapper>
            <MainContainer>
                <Title>Welcome League Of Legend Community</Title>
                <Box>
                    <BoxTitle>
                        <ALink href="/community">최근 글</ALink>
                    </BoxTitle>

                    {LoadingCommunity ? (
                        <Loading>
                            <SpinnerImg></SpinnerImg>
                        </Loading>
                    ) : (
                        <CommunityList>
                            <ListTitle>
                                <span>제목</span>
                                <span>이름</span>
                            </ListTitle>
                            {Array.isArray(Community?.content) ? (
                                Community?.content
                                    .slice(0, 3)
                                    .map((community) => (
                                        <ListItem key={community.id}>
                                            <Card>
                                                <span>{community.title}</span>
                                                <span>
                                                    {community.nickname}
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
        </Wrapper>
    );
}

export default Home;
