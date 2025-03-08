import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IContent } from "../../api";

const Wrapper = styled.div`
`;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const MainContainerHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
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
        background-color: transparent;
        border: 1px solid ${(props) => props.theme.bgColor};
        color:${(props) => props.theme.textColor};
    }
`;

const TableBox = styled.table`
    padding: 1rem 2rem;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 1rem;
`;

const TableBody = styled.tr`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    padding: 1.5rem;
    gap: 2rem;
    transition: color 0.3s;
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
`;

const TableBodytd = styled.td`
    
`;

const TableLink = styled.a`
    &:hover {
        color: ${(props) => props.theme.boxTextColor};
    }
`;

const TableTitle = styled.h2`
    font-size:1.7rem;
    font-weight: bold;
`;

const TableDate = styled.h2`
    font-weight: lighter;
    font-size: 1rem;
`;

const BoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3rem;
`;

const LikeButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3rem;
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap:1rem;
`;

const PageButton = styled.button`
    cursor: pointer;
    padding: 1rem;
    border:1px solid transparent;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    font-size:1.2rem;
`;

function Communities() {
    const navigate = useNavigate();
    const newWrite = () => {
        navigate("/community/write");
    };

    const [communitylist, setCommunitylist] = useState<IContent[]>([]);
    const [date, setDate] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const addLike = async (id: Number) => {
        const res = await fetch(`http://localhost:8080/community/${id}/like`, {
            method: "POST",
            credentials: "include",
        })
        const data = await res.text();
        alert(data);
        window.location.reload();
    };

    const totalPages = Math.ceil(communitylist.length / itemsPerPage);

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const displayedItems = communitylist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <Wrapper>
            <MainContainer>
                {/* <MainContainerHeader>

                </MainContainerHeader> */}
                <TableBox>
                    {/* <CreateBtn onClick={newWrite}>글쓰기</CreateBtn> */}
                    {displayedItems.slice(0, 10).map((community, index) => (
                        <TableBody key={community.id}>
                            <TableBodytd><LikeButton onClick={() => addLike(community.id)}>❤️{community.likesCount}</LikeButton></TableBodytd>
                            <TableLink href={`/community/${community.id}`}>
                                <BoxInfo>
                                    <TableBodytd><TableTitle>{community.title} [{community.commentsCount}]</TableTitle></TableBodytd>
                                    <TableBodytd><TableDate>{date[index]} | 조회수:{community.viewsCount}</TableDate></TableBodytd>
                                </BoxInfo>
                            </TableLink>
                            <TableBodytd>-{community.nickname}-</TableBodytd>
                        </TableBody>
                    ))}
                    <BtnContainer>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PageButton
                                key={index + 1}
                                onClick={() => changePage(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </PageButton>
                        ))}
                    </BtnContainer>
                </TableBox>
            </MainContainer>
        </Wrapper>
    );
}

export default Communities;
