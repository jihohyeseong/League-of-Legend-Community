import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { IContent } from "../Types/api";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../Stores/atom";
import { CustomButton } from "./Button";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 50rem;
    width: 50rem;
    border: 1px solid ${(props) => props.theme.textColor};
    padding: 1rem 2rem;
    border-radius: 1rem;
`;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
    padding: 1rem;
    width: 45rem;
    gap: 2rem;
    transition: color 0.3s;
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
`;

const TableBodytd = styled.td``;

const TableTitle = styled.h2`
    font-size:1.5rem;
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

    &:hover {
        color: steelblue;
    }

    &:active {
        color: steelblue;
    }
`;

const FilterBtnContainer = styled.div`
    display: flex;
`;

const FilterBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-size: 1rem;
  color: white;
  cursor: pointer;

  &:hover {
    color: steelblue;
  }
`;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SearchForm = styled.form`
    border: 1px solid;
    border-radius: 1rem;
    padding: 0.5rem;
`;

const SearchInput = styled.input`
    background-color: transparent;
    border: transparent;
    color: ${(props) => props.theme.textColor};

    &:focus {
        outline: transparent;
    }
`;

function Communities() {
    const navigate = useNavigate();
    const newWrite = () => {
        navigate("/community/write");
    };

    const isLogin = useRecoilValue(isLoginAtom);

    const [communitylist, setCommunitylist] = useState<IContent[]>([]);
    const [date, setDate] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [search, setSearch] = useState("");

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

    // 좋아요 버튼 누르기
    const addLike = async (id: Number) => {
        const res = await fetch(`http://localhost:8080/community/${id}/like`, {
            method: "POST",
            credentials: "include",
        })
        const data = await res.text();
        alert(data);
        window.location.reload();
    };

    // 페이지화 처리하기
    const totalPages = Math.ceil(communitylist.length / itemsPerPage);
    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const displayedItems = communitylist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 비로그인 커뮤니티 이용불가
    if (!isLogin) {
        return (
            <Wrapper>
                <h1>로그인 후 이용해주세요</h1>
            </Wrapper>
        )
    }

    // if (displayedItems.length === 0) {
    //     alert("검색 결과가 없습니다.");
    //     setSearch("");
    // };

    // 10개 이상 좋아요 정렬
    const handlePopularity = async () => {
        const response = await fetch(`http://localhost:8080/community/popularity`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        setCommunitylist(data.content);
    };

    // 게시글 검색 폼
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8080/community/search/${search}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        setCommunitylist(data.content);
        setSearch("");
    };

    // 최신순으로 정렬
    const handleRecent = async () => {
        const response = await fetch(`http://localhost:8080/community`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        setCommunitylist(data.content);
    };

    return (
        <Wrapper>
            <MainContainer>
                <TableBox>
                    {/* <CreateBtn onClick={newWrite}>글쓰기</CreateBtn> */}
                    <TableHeader>
                        <FilterBtnContainer>
                            <FilterBtn onClick={handleRecent}>최신순</FilterBtn>
                            <FilterBtn onClick={handlePopularity}>10추</FilterBtn>
                        </FilterBtnContainer>
                        <SearchForm onSubmit={handleSearch}>
                            <SearchInput type="text" placeholder="제목을 입력하세요" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <CustomButton variant="input" type="submit">검색</CustomButton>
                        </SearchForm>
                    </TableHeader>

                    {displayedItems.slice(0, 10).map((community, index) => (
                        <TableBody key={community.id}>
                            <TableBodytd>
                                <LikeButton onClick={() => addLike(community.id)}>❤️{community.likesCount}</LikeButton>
                            </TableBodytd>
                            <Link to={`/community/${community.id}`}>
                                <BoxInfo>
                                    <TableBodytd><TableTitle>{community.title} [{community.commentsCount}]</TableTitle></TableBodytd>
                                    <TableBodytd><TableDate>{date[index]} | 조회수:{community.viewsCount}</TableDate></TableBodytd>
                                </BoxInfo>
                            </Link>
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
        </Wrapper >
    );
}

export default Communities;
