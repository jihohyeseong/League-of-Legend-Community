import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useFetch from "../Hooks/useFetch";
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 1.5rem;
  border-radius: 3rem;
  width: 40%;
  height: 25em;
  overflow-y: auto;
  overflow-x: hidden;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  padding: 1.5rem;
`;


const Chat = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<{ nickname: string; content: string }[]>([]);
  const [message, setMessage] = useState("");
  const { data: userInfoData } = useFetch("http://localhost:8080/info");
  const userInfo = userInfoData;
  const navigate = useNavigate();

  useEffect(() => {
    // SockJS를 사용한 WebSocket 연결
    const socket = new SockJS("http://localhost:8080/ws", { Credential: "include" });
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      debug: (msg) => console.log("STOMP:", msg),
      onConnect: () => {
        console.log("✅ WebSocket 연결됨!");

        // 서버에서 오는 메시지를 구독
        stompClient.subscribe("/topic/chat", (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log("❌ WebSocket 연결 종료됨");
      },
      onStompError: (error) => {
        console.error("🚨 STOMP 에러:", error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfoData && client && client.connected && message.trim()) {
      client.publish({
        destination: "/app/chat",
        body: JSON.stringify({ nickname: userInfo?.nickname, content: message }),
      });
      setMessage("");
    } else {
      console.error("🚨 STOMP 연결이 안 되어 있음!");
    }
  };

  const gotoBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Title>Live Chat</Title>
      {messages.length > 0 && <BoxContainer>
        {messages && messages.map((msg) => (
          <InfoBox>
            {msg.nickname} : {msg.content}
          </InfoBox>
        ))}
      </BoxContainer>}
      <FormWrapper onSubmit={sendMessage}>
        <InputWrapper>
          <CheckInput>
            <UsernameInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
            />
            <DupBtn type="submit">전송</DupBtn>
          </CheckInput>
        </InputWrapper>
      </FormWrapper>
      <ButtonContainer>
        <GrayBtn type="button" onClick={gotoBack}>뒤로가기</GrayBtn>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Chat;
