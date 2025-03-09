import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 1rem;
    height: 50rem;
    width: 20rem;
    padding: 2rem;
`;

export default function SideMenu() {
    return (
        <>
            <Wrapper>
                <h1>정보</h1>
                <h1>커뮤니티</h1>
                <h1>E-Sports</h1>
            </Wrapper>
        </>
    )
}