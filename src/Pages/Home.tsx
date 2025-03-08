import styled from "styled-components";
import Chat from "../Components/Chat";
import Communities from "./Community/Communities";
import SideMenu from "../Components/SideMenu";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1fr 0.3fr;
    padding: 1rem;
`;

const Title = styled.h2`
    font-size: 3rem;
    margin-top: 5rem;
    padding-bottom: 3rem;
    text-align: center;
`;


function Home() {
    return (
        <>
            <Title>Welcome League Of Legend Community</Title>
            <Wrapper>
                <SideMenu />
                <Communities />
                <Chat />
            </Wrapper >
        </>

    );
}

export default Home;
