import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IContent } from "../../api";

const Wrapper = styled.div``;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const MainContainerHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 5rem 0;
    gap: 2rem;
`;

const Title = styled.span`
    font-size: 3rem;
    text-align: center;
`;

const CreateBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    height: 3rem;
    width: 10rem;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.5s ease-in;

    &:hover {
        background-color: crimson;
    }
`;

const WriteList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    list-style-type: none;
`;

const ListItem = styled.li`
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.textColor};
    padding: 3rem;
    border-radius: 2rem;
    &:hover {
        background-color: crimson;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InfoTitle = styled.div`
    display: flex;
`;
const Info = styled.div`
    display: flex;
`;

function Communities() {
    const navigate = useNavigate();
    const newWrite = () => {
        navigate("/community/write");
    };

    const [communitylist, setCommunitylist] = useState<IContent[]>([]);
    const [date, setDate] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/community`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const json = await response.json();
                setCommunitylist(json.content);
                const result = [];
                for (let i = 0; i < json.content.length; i++) {
                    const dateString = json.content[i].createdAt;
                    const [date, timeWithMs] = dateString.split("T");
                    const time = timeWithMs.split(".")[0];
                    result.push(`${date} ${time}`);
                }
                setDate(result);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <Wrapper>
            <MainContainer>
                <MainContainerHeader>
                    <Title>Community</Title>
                    <CreateBtn onClick={newWrite}>글쓰기</CreateBtn>
                </MainContainerHeader>
                <WriteList>
                    {communitylist.map((community, index) => (
                        <ListItem key={community.id}>
                            {/* <Link to={`/community/${community.id}`}> */}
                            <a href={`/community/${community.id}`}>
                                <InfoContainer>
                                    <InfoTitle>
                                        {community.title} -{community.nickname}-
                                    </InfoTitle>

                                    <Info>
                                        작성일자: {date[index]} / 좋아요: {community.likesCount}
                                    </Info>
                                </InfoContainer></a>
                            {/* </Link> */}
                            {/* <div
                                dangerouslySetInnerHTML={{
                                    __html: community.content,
                                }}
                            /> */}
                        </ListItem>
                    ))}
                </WriteList>
            </MainContainer>
        </Wrapper>
    );
}

export default Communities;
