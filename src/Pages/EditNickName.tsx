import { useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ITeamImage } from "../api";

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

const DupBtn = styled(Btn)`
  width: 7rem;
  height: 2rem;
  padding: 1.3rem;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

function EditNickName() {
    const [nickname, setNickname] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const checkDuplicate = async () => {
        const response = await fetch(`http://localhost:8080/check/${nickname}`, { credentials: "include", });
        const data = await response.json();
        console.log(data);
        setMsg(data.message);
        return data.available;
    };

    const handleEdit = async () => {
        await fetch(`http://localhost:8080/info`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nickname }),
        });
        navigate(-1);
    };

    console.log(nickname);

    const gotoBack = () => {
        navigate(-1);
    };

    return (
        <Wrapper>
            <Title>Edit Your Nickname</Title>
            <FormWrapper onSubmit={handleEdit}>
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
                <ButtonContainer>
                    <Btn type="submit">수정하기</Btn>
                    <GrayBtn type="button" onClick={gotoBack}>뒤로가기</GrayBtn>
                </ButtonContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default EditNickName;