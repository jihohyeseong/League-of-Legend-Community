import styled from "styled-components";
import Chat from "../Components/Chat";
import Communities from "../Components/Communities";
import SideMenu from "../Components/SideMenu";


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;




function Home() {
    return (
        <>
            <Wrapper>
                <SideMenu />
                <Communities />
                <Chat />
            </Wrapper >
        </>
    );
}

export default Home;
