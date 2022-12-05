import styled from "styled-components";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'
import { useEffect, useState } from "react";

//this component takes in the average rating of a movie and renders the amount of stars it should have by dividing the average rating by 2 and rounding to the nearest half
const StarRating = ({vote_average}) => {
    const [voteAverage, setVoteAverage] = useState(0);

    //function handles rounding the average to out of 5
    const roundAvg = (val) => {
        return (Math.round(val/0.5) * 0.5).toFixed(1);
    }

    //triggeres anytime a new vote is added
    useEffect(() => {
        const newAvg = vote_average/2;
        setVoteAverage(roundAvg(newAvg));
    }, [vote_average])

    return (
        <Wrapper>
            {voteAverage <= 0.5 && 
            (
                <>
                    <StyledText></StyledText>
                    {/* <StyledBsStar /><StyledBsStar /><StyledBsStar /><StyledBsStar /><StyledBsStar /> */}
                </>
            )}
            {voteAverage > 0.0 && voteAverage < 1 &&  
            (
                <>
                    <StyledBsStarHalf /><StyledBsStar /><StyledBsStar /><StyledBsStar /><StyledBsStar />
                </>
            )}
            {voteAverage > 0.0 && voteAverage <= 1 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStar /><StyledBsStar /><StyledBsStar /><StyledBsStar />
                </>
            )}
            {voteAverage > 1 && voteAverage <= 1.5 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarHalf /><StyledBsStar /><StyledBsStar /><StyledBsStar />
                </>
            )}
            {voteAverage > 1.5 && voteAverage <= 2 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStar /><StyledBsStar /><StyledBsStar />
                </>
            )}
            {voteAverage > 2 && voteAverage <= 2.5 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStarHalf /><StyledBsStar /><StyledBsStar />
                </>
            )}
            {voteAverage > 2.5 && voteAverage <= 3 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStar /><StyledBsStar />
                </>
            )}
            {voteAverage > 3 && voteAverage <= 3.5 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStarHalf /><StyledBsStar />
                </>
            )}
            {voteAverage > 3.5 && voteAverage <= 4 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStar />
                </>
            )}
            {voteAverage > 4 && voteAverage <= 4.5 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStarHalf />
                </>
            )}
            {voteAverage > 4.5 && voteAverage <= 5 && 
            (
                <>
                    <StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill /><StyledBsStarFill />
                </>
            )}           
        </Wrapper>
    );
}

const Wrapper = styled.div`

`

const StyledBsStarFill = styled(BsStarFill)`
    color: var(--accent-primary-color);
`

const StyledBsStarHalf = styled(BsStarHalf)`
    color: var(--accent-primary-color);
`

const StyledBsStar = styled(BsStar)`
    color: var(--accent-primary-color);
`

const StyledText = styled.p`
    color: black;
`
export default StarRating;