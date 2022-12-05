import styled from "styled-components";
import {BsStarFill, BsStar} from 'react-icons/bs'
import { useState } from "react";

//component is for the stars shown in the edit of the review
//stars highlight depending on how many are hovered over using a mouseenter/mouseLeave function
const EditRating = ({setUserRating}) => {
    const [starOne, setStarOne] = useState(false);
    const [starTwo, setStarTwo] = useState(false);
    const [starThree, setStarThree] = useState(false);
    const [starFour, setStarFour] = useState(false);
    const [starFive, setStarFive] = useState(false);
    const [ratingMade, setRatingMade] = useState(false)

    //sets the amount of stars selecting once clicked
    const handleClick = (e) => {
        console.log(e.currentTarget.value)
        setUserRating(e.currentTarget.value); 
        setRatingMade(!ratingMade)
    }

    //star state is changed depending on when theyre hovered over, each star needs a state to hover over.  if the fifth star is hovered over then all 5 stars are coloured
    //each star changes the type of star once hovered from filled to unfilled
    return (
        <>  
        <StarButton value={1} style={{color: starOne === true && 'var(--accent-primary-color)'}}
            onMouseEnter={() => {setStarOne(true); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)}} 
            onMouseLeave={() => {if (ratingMade === false) {setStarOne(false); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)} else {setStarOne(true); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)}}}
            onClick={handleClick}
            >
            {starOne === true ?
                <StyledBsStarFill/>
                :
                <StyledBsStar />
            }
        </StarButton>
        <StarButton value={2} style={{color: starTwo === true && 'var(--accent-primary-color)'}}
            onMouseEnter={() => {setStarOne(true); setStarTwo(true); setStarThree(false); setStarFour(false); setStarFive(false)}} 
            onMouseLeave={() => {if (ratingMade === false) {setStarOne(false); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)} else {setStarOne(true); setStarTwo(true); setStarThree(false); setStarFour(false); setStarFive(false)}}}
            onClick={handleClick}
            >
            {starTwo === true ?
                <StyledBsStarFill/>
                :
                <StyledBsStar />
            }
        </StarButton>
        <StarButton value={3} style={{color: starThree === true && 'var(--accent-primary-color)'}}
            onMouseEnter={() => {setStarOne(true); setStarTwo(true); setStarThree(true); setStarFour(false); setStarFive(false)}} 
            onMouseLeave={() => {if (ratingMade === false) {setStarOne(false); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)} else {setStarOne(true); setStarTwo(true); setStarThree(true); setStarFour(false); setStarFive(false)}}}
            onClick={handleClick}
            >
            {starThree === true ?
                <StyledBsStarFill/>
                :
                <StyledBsStar />
            }
        </StarButton>
            <StarButton value={4} style={{color: starFour === true && 'var(--accent-primary-color)'}}
                onMouseEnter={() => {setStarOne(true); setStarTwo(true); setStarThree(true); setStarFour(true); setStarFive(false)}} 
                onMouseLeave={() => {if (ratingMade === false) {setStarOne(false); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)} else {setStarOne(true); setStarTwo(true); setStarThree(true); setStarFour(true); setStarFive(false)}}}
                onClick={handleClick}
            >
            {starFour === true ?
                <StyledBsStarFill/>
                :
                <StyledBsStar />
            }
        </StarButton>
        <StarButton value={5} style={{color: starFive === true && 'var(--accent-primary-color)'}}
                onMouseEnter={() => {setStarOne(true); setStarTwo(true); setStarThree(true); setStarFour(true); setStarFive(true)}} 
                onMouseLeave={() => {if (ratingMade === false) {setStarOne(false); setStarTwo(false); setStarThree(false); setStarFour(false); setStarFive(false)} else {setStarOne(true); setStarTwo(true); setStarThree(true); setStarFour(true); setStarFive(true)}}}
                onClick={handleClick}
                >
            {starFive === true ?
                <StyledBsStarFill/>
                :
                <StyledBsStar />
            }
        </StarButton>
        </>
    );
}

const StarButton = styled.button`
    border: none;
    background-color: inherit;
    color: var(--accent-primary-color);
`

const StyledBsStarFill = styled(BsStarFill)`
    width: 40px;
    height: auto;
    color: var(--accent-primary-color);
`

const StyledBsStar = styled(BsStar)`
    width: 40px;
    height: auto;
    color: var(--accent-primary-color);
`
export default EditRating;