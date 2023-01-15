import styled from "styled-components";
import logoNoBackground from "../assets/logo-no-background.png"
import { useAuth0 } from "@auth0/auth0-react";

//page displays for a user to log in or register for the site.  regsitering allows the user to make list, reviews and track movies they've seen
const Register = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    //function that redirects to a log in//account creation page
    const handleClick = (e) => {
        e.preventDefault();
        loginWithRedirect();
    }

    //handles sign out
    const handleSignOut = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <Wrapper>
            <ElementWrapper>
                <LeftSideImg src={`${logoNoBackground}`} />
                <LeftSideText>
                    <Text>Start logging those movies today.</Text>
                    <Text>Everyone's dying to know what you really thought of Ghostbusters (2016)</Text>
                </LeftSideText>
                {!isAuthenticated ?
                <SubmitButton onClick={handleClick}>Create Account</SubmitButton>
                :
                <SubmitButton onClick={handleSignOut}>Logout</SubmitButton>
                }
            </ElementWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const ElementWrapper = styled.div`
    width: 100%;
    background-color: var(--accent-primary-color);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const LeftSideImg = styled.img`
    margin-top: 100px;
    width: 700px;
    height: auto;
`
const LeftSideText = styled.div`
`

const Text = styled.p`
    text-transform: uppercase;
    margin: 15px;
`

const SubmitButton = styled.button`
    width: 20%;
    text-transform: uppercase;
    background-color: var(--primary-color);
    color: black;
    font-size: 18px;
    padding: 10px 25px;
    border: none;
    border-radius: 10px;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
    margin-bottom: 20px;
    margin-top: 20px;

    &:hover {
        opacity: .75;
    }
`




export default Register;