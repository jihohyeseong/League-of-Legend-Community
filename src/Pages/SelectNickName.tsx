import styled from "styled-components";
import { getCheckDuplicate, ITeamImage, postUserInfo } from "../api";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  font-size: 2rem;
  margin-top: 5rem;
`;

const FormWrapper = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-top: 3rem;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 1.5rem;
  border-radius: 2rem;
`;

const ImgSelectWrapper = styled.div`
  margin-top: 3rem;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 1.5rem;
  height: 15rem;
  border-radius: 2rem;
`

const CheckInput = styled.div`
  display:flex;
  align-items: center;
  gap: 2rem;
`;

const Message = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

const UsernameInput = styled.input`
  height: 2.5rem;
  width: 15rem;
  padding: 1rem;
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  background-color: #10a37f;
  color: #fff;
  margin: 1.5rem;
  border-radius: 0.7rem;
  padding: 2rem;
  font-size: 1.2rem;
  border: 1px solid #10a37f;
  cursor: pointer;
`;

const DupBtn = styled(Btn)`
  width: 7rem;
  height: 2rem;
  padding: 1.3rem;
  font-size: 1rem;
`;

const LogImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
`;

const SelectImg = styled.select`
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 0.5rem;
  border-radius: 2rem;
`

function SelectNickName() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [msg, setMsg] = useState("");
  const [teamImg, setTeamImg] = useState<ITeamImage[]>([]);
  const [myTeam, setMyTeam] = useState<ITeamImage | null>(null);
  const [myteamId, setMyteamId] = useState<string>("");

  const selectId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMyteamId(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/image/list`, {
        method: "GET",
        credentials: "include",
      }).then((data) => data);
      const json = await response.json();
      setTeamImg(json);
    })();

    (async () => {
      const response = await fetch(`http://localhost:8080/image/${myteamId}`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();
      setMyTeam(json);
    })();
  }, [myteamId]);

  const writeNickname = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageUrl = myTeam?.imageUrl;
    const response = await getCheckDuplicate(nickname);
    const status = response.status;
    if (status === 409) {
      alert(nickname + "은 중복입니다. 다른 닉네임으로 만들어주세요.");
    } else if (status === 200) {
      alert(nickname + "로 닉네임을 만들었습니다.");
      await fetch(`http://localhost:8080/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, imageUrl }),
        credentials: "include",
      });
      console.log(JSON.stringify({ nickname, imageUrl }));
      navigate("/mypage");
    }
  };

  const checkDuplicate = async () => {
    const response = await fetch(`http://localhost:8080/check/${nickname}`, { credentials: "include", });
    const data = await response.json();
    setMsg(data.message);
  }

  return (
    <Wrapper>
      <Title>Select Your Nickname</Title>
      <FormWrapper onSubmit={writeNickname}>
        <InputWrapper>
          <CheckInput>
            <UsernameInput
              placeholder="Please Write Your Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <DupBtn type="button" onClick={checkDuplicate}>중복체크</DupBtn>
          </CheckInput>

          <Message>{msg}</Message>
        </InputWrapper>

        <ImgSelectWrapper>
          <CheckInput>
            <SelectImg onChange={selectId}>
              <option value="">좋아하는 팀 선택</option>
              {[...teamImg].map((img) => (
                <option key={img.id} value={img.id}>
                  {img.team}
                </option>
              ))}
            </SelectImg>
            {myTeam && (
              <LogImg src={myTeam.imageUrl} />
            )}
          </CheckInput>
        </ImgSelectWrapper>
        <Btn type="submit">등록하기</Btn>
      </FormWrapper>
    </Wrapper >
  );
}

export default SelectNickName;
