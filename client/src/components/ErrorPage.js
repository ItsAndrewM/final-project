import styled from "styled-components";
import Loading from "./Loading";

//page used for a url not recognized in routes
const ErrorPage = () => {
    return ( 
        <Wrapper>
            <StyledH>Uh Oh! That URL does not exist!</StyledH>
            <Loading />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledH = styled.h1`
    color: black;
    text-transform: uppercase;
    margin-bottom: 10px;
`
export default ErrorPage;