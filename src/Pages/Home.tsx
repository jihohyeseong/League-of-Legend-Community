import styled from "styled-components";
import Chat from "../Components/Chat";
import Communities from "../Components/Communities";
import SideMenu from "../Components/SideMenu";
import img from "../Assets/Images/lol.jpeg"

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;

const Title = styled.div`
    font-size: 3rem;
    padding: 5rem;
    text-align: center;
    color: white;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
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
