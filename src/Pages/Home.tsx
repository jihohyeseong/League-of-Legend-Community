import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCommunityList, ICommunity } from "../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const MainContainer = styled.div`
  flex: 1 0 auto;
  display: grid;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 0;
  padding-top: 80px;
  width: 100%;
  grid-template-columns: repeat(2, 0.33fr);
`;

const Title = styled.span`
  font-size: 25px;
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 30px;
`;

const Box = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  width: 400px;
  height: auto;
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;

  ${Title}:hover {
    font-size: 30px;
    color: teal;
  }
`;

const CommunityList = styled.ul`
  margin-top: 14px;
  list-style-type: none;
  padding: 0;
  text-align: left; /* 텍스트 왼쪽 정렬 */
`;

const ListItem = styled.li`
  margin-bottom: 20px; /* 리스트 아이템 간격 */
  padding: 10px;
  border: 1px solid ${(props) => props.theme.bgColor}; /* 테두리 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
  background-color: ${(props) => props.theme.textColor}; /* 배경색 추가 */

  strong {
    display: block; /* 제목을 블록 요소로 */
    font-size: 18px; /* 제목 크기 조정 */
    margin-bottom: 5px; /* 제목과 내용 간격 */
  }
`;

function Home() {
  const navigate = useNavigate();
  const gotoCommunity = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/community");
  };

  const { isLoading: LoadingCommunity, data: Community } = useQuery<ICommunity>(
    "community",
    getCommunityList
  );

  return (
    <Wrapper>
      <MainContainer>
        <Title>Welcome League Of Legend Community</Title>
        <Box>
          <Title onClick={gotoCommunity}>최근 글</Title>
          {LoadingCommunity ? (
            <div>Loading....</div>
          ) : (
            <CommunityList>
              {Array.isArray(Community?.content) ? (
                Community?.content.slice(0, 3).map((community) => (
                  <ListItem key={community.id}>
                    <strong>
                      {community.nickname} : <span>{community.title}</span>
                    </strong>
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
