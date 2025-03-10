import { useEffect, useState } from "react";
import { ITeamImage } from "../Types/api";
import styled from "styled-components";
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

const ImgSelectWrapper = styled.div`
  margin-top: 3rem;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 1.5rem;
  height: 15rem;
  border-radius: 2rem;
`;

const SelectImg = styled.select`
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 0.5rem;
  border-radius: 2rem;
`;

const LogImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
`;

const CheckInput = styled.div`
display:flex;
align-items: center;
gap: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
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

const GrayBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 17rem;
  background-color: gray;
  color: #fff;
  margin: 1.5rem;
  border-radius: 0.7rem;
  padding: 2rem;
  font-size: 1.2rem;
  border: 1px solid gray;
  cursor: pointer;
`;

const FormWrapper = styled.form`
display:flex;
flex-direction: column;
align-items: center;
`;


function EditTeamImage() {
    const [teamImg, setTeamImg] = useState<ITeamImage[]>([]);
    const [myTeam, setMyTeam] = useState<ITeamImage>();
    const [myteamId, setMyteamId] = useState<string>("");
    const navigate = useNavigate();

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
    }, [myteamId])

    const selectId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMyteamId(e.target.value);
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imageUrl = myTeam?.imageUrl;
        await fetch(`http://localhost:8080/info/team`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl }),
        });
        navigate(-1);
    };

    console.log(myTeam);

    const gotoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Wrapper>
                <Title>Edit Your Nickname</Title>
                <FormWrapper onSubmit={handleEdit}>
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
                    <ButtonContainer>
                        <Btn type="submit">수정하기</Btn>
                        <GrayBtn type="button" onClick={gotoBack}>뒤로가기</GrayBtn>
                    </ButtonContainer>
                </FormWrapper>
            </Wrapper>
        </>
    );
}

export default EditTeamImage;