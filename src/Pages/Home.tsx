import { useQuery } from "react-query";
import styled from "styled-components";
import { getCommunityList, ICommunity } from "../api";
import Chat from "../Components/Chat";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
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
    border-top: 4px solid ${(props) => props.theme.textColor};
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

const Title = styled.h2`
    font-size: 3rem;
    margin-top: 5rem;
    padding-bottom: 3rem;
    text-align: center;
`;

const Box = styled.div`
    text-align: center;
    border-radius: 1rem;
    width: 30rem;
    padding: 4.5rem;
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
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
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
`;

const Card = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2rem;
    border-radius: 3rem;
`;

const More = styled.span`
    font-size: 1.4rem;
    transition: color 0.5s;

    &:hover {
        color: lightblue;
    }
`;

const CardName = styled.span`
    font-size: 1.1rem;
`;

function Home() {
    const { isLoading: LoadingCommunity, data: Community } = useQuery<ICommunity>("community", getCommunityList);

    return (
        <>
            <Title>Welcome League Of Legend Community</Title>
            <Wrapper>
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
                                                {community.title} <CardName>- {community.nickname} -</CardName>
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
                <Chat />
            </Wrapper >
        </>

    );
}

export default Home;
