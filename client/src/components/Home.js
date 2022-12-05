import { useContext } from "react";
import styled from "styled-components";
import HeroImage from "./HeroImage";
import HomePageRecommended from "./HomePageRecommended";
import { UserContext } from "./UserContext";

//homepage which contains hero image
const Home = () => {
    const {userLists} = useContext(UserContext)
    return (
        <Wrapper>
            <HeroImage />
            <ElementWrapper>
                {Object.keys(userLists).length !== 0 ?
                <>
                <StyledH>Recommended Movies for you!</StyledH>
                <HomePageRecommended />
                </>
                :
                <></>
                }
            </ElementWrapper>
        </Wrapper>
    );
}

const StyledH = styled.h1`
    color: black;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;
    text-transform: uppercase;
`

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`

const ElementWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 100px;
`
export default Home;