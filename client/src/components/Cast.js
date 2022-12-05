import styled from "styled-components";
import {BsStarFill} from 'react-icons/bs'
import { NavLink } from "react-router-dom";

//this component displays the cast in a movie but also because the array of actors is ordered by billing, I check the index to see if a actor is in the "0, 1, 2" spot
//if they are they get a star next to their name to indicate top billing
const Cast = ({resultCredits}) => {
    return (
        <>
        {resultCredits.cast.map((castMember) => {
            return (
                <NavItem key={castMember.id} to={`/actor/${castMember.name}`} state={{id: castMember.id}} >
                    <IndividualCastWrapper >
                    {castMember.order === 0 && (
                        <>
                        <StyledP><BsStarFill />{castMember.name}</StyledP>
                        </>
                    )
                    }
                    {castMember.order === 1 && (
                        <>
                        <StyledP><BsStarFill /><BsStarFill />{castMember.name}</StyledP>
                        </>
                    )
                    }
                    {castMember.order === 2 && (
                        <>
                        <StyledP><BsStarFill /><BsStarFill /><BsStarFill />{castMember.name}</StyledP>
                        </>
                    )
                    }
                    {castMember.order > 2 && (
                        <>
                        <StyledP>{castMember.name}</StyledP>
                        </>
                    )
                    }
                    </IndividualCastWrapper>
                </NavItem>
            );
        })}
        </>
    );
}

const IndividualCastWrapper = styled.div`

`

const StyledP = styled.p`
    width: auto;
    color: black;
    padding: 0;
    margin: 0;
    border: 1px solid black;
    margin-right: 5px;
    padding: 5px;
    transition: .2s;
    margin-top: 2px;
    margin-bottom: 2px;
    &:hover {
        background-color: var(--accent-primary-color);
        color: white;
    }
`

const NavItem = styled(NavLink) `
    text-decoration: none;
    width: auto;
    height: auto;

`
export default Cast;