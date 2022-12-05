import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShapeOfWater from "../assets/imgs/shapeOfWater.jpg"
import { useAuth0 } from "@auth0/auth0-react";

//hero image for the homepage 
const HeroImage = () => {
    const { isAuthenticated } = useAuth0(); 
    const navigate = useNavigate();

    //slick handler, depending on if the user is logged in or not the link links to 2 different pages
    const handleClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate('/account')
        }
        else {
            navigate('/registration')
        }
    }

    return (
        <Wrapper>
            <HeroTextWrapper>
                <HeroText>Movies you forget to remember with faces you never forget.</HeroText>
                <HeroText>Log movies you've seen, enjoyed or hated and Keep track of films you're just dieing to see.</HeroText>
                {!isAuthenticated ? 
                <HeroButton onClick={handleClick}>get started</HeroButton>
                :
                <HeroButton onClick={handleClick}>view profile</HeroButton>
                }
            </HeroTextWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    background-image: url(${ShapeOfWater});
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 70%;
    border: none;
    box-shadow: rgba(16, 55, 120, 0.3) 0px 1px 2px 0px, rgba(21, 31, 48, 0.15) 0px 1px 3px 1px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`

const HeroTextWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const HeroText = styled.p`
    font-size: 40px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 40px;
`

const HeroButton = styled.button`
    text-transform: uppercase;
    background-color: var(--accent-primary-color);
    color: white;
    font-size: 18px;
    padding: 10px 25px;
    border: none;
    border-radius: 10px;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
    margin-bottom: 20px;

    &:hover {
        opacity: .75;
    }

`
export default HeroImage;