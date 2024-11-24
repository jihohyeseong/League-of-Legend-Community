import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IContent } from "../../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const MainContainer = styled.div`
  flex: 0 0 auto;
  display: grid;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 0;
  padding-top: 80px;
  width: 100%;
`;

const Title = styled.span`
  font-size: 25px;
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 20px;
`;

const ListBox = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  height: auto; /* 높이를 자동으로 조정 */
  width: 800px;
  padding: 20px; /* 내부 여백 추가 */
  border-radius: 10px; /* 모서리 둥글게 */
`;

const CreateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  width: 200px;
  background-color: #6e24ed;
  color: #fff;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: auto; /* 오른쪽으로 정렬 */
  margin-bottom: 20px;
`;

const WriteList = styled.ul`
  list-style-type: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 패딩 제거 */
`;

const ListItem = styled.li`
  background-color: ${(props) => props.theme.bgColor}; /* 배경색 추가 */
  border: 1px solid ${(props) => props.theme.accentColor}; /* 테두리 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 15px; /* 내부 여백 */
  margin-bottom: 10px; /* 리스트 아이템 간격 */
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.theme.accentColor}; /* 호버 시 배경색 변경 */
  }
`;

function Communities() {
  const navigate = useNavigate();
  const newWrite = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/community/write");
  };
  // const { isLoading: LoadingCommunity, data: Community } = useQuery<ICommunity>(
  //   "community",
  //   getCommunityList
  // );

  const [communitylist, setCommunitylist] = useState<IContent[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/community`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      // console.log(json.content);
      setCommunitylist(json.content);
    })();
  }, []);

  const onClickRecently = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const onClickPopularity = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/community/popularity`, {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    // console.log(json);
    setCommunitylist(json.content);
  };

  const [search, setSearch] = useState("");
  const onClickSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/community/search/${search}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const json = await response.json();
    console.log(json);
    setCommunitylist(json.content);
  };

  return (
    <Wrapper>
      <MainContainer>
        <Title>Community</Title>
        <CreateBtn onClick={newWrite}>글쓰기</CreateBtn>
        <ListBox>
          <button onClick={onClickPopularity}>인기순</button>
          <button onClick={onClickRecently}>최신순</button>
          <form>
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <button onClick={onClickSearch}>검색</button>
          </form>
          <WriteList>
            {communitylist.map((community) => (
              <ListItem key={community.id}>
                <strong>
                  <Link to={`/community/${community.id}`}>
                    {community.title} | {community.nickname}
                  </Link>
                </strong>
                {/* <div dangerouslySetInnerHTML={{ __html: community.content }} /> */}
              </ListItem>
            ))}
          </WriteList>
        </ListBox>
      </MainContainer>
    </Wrapper>
  );
}

export default Communities;
