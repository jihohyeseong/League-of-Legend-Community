import { useNavigate } from "react-router-dom";
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
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in;

    &:hover {
        background-color: crimson;
    }
`;

const TableBox = styled.table`
    padding: 3rem;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    width: 100rem;
`;

const TableHead = styled.tr`
    display: flex;
    border-bottom: 1px solid lightgray; 
    font-size: 1.4rem;
    padding: 1rem;
`;

const TableBody = styled.tr`
    font-size: 1.2rem;
    padding: 1rem;
    transition: color 0.3s;

    &:hover {
        color: ${(props) => props.theme.boxTextColor};
    }
`;

const TableBodytd = styled.td`
    width: 30rem;
`;

const TableLink = styled.a`
    display: flex;
    align-items: center;
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
                console.log(json);
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
                <TableBox>
                    <TableHead>
                        <TableBodytd>번호</TableBodytd>
                        <TableBodytd>제목</TableBodytd>
                        <TableBodytd>작성자</TableBodytd>
                        <TableBodytd>작성일자</TableBodytd>
                    </TableHead>
                    {communitylist && communitylist.slice(0, 20).map((community, index) => (
                        <TableBody>
                            <TableLink href={`/community/${community.id}`}>
                                <TableBodytd>{communitylist.length - index}</TableBodytd>
                                <TableBodytd>{community.title}</TableBodytd>
                                <TableBodytd>{community.nickname}</TableBodytd>
                                <TableBodytd>{date[index]}</TableBodytd>
                            </TableLink>
                        </TableBody>
                    ))}
                </TableBox>
            </MainContainer>
        </Wrapper>
    );
}

export default Communities;
