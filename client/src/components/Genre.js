import { NavLink } from "react-router-dom";
import styled from "styled-components";

//component for handling genres that are created 
//a link is created to allow for passing of the id for the genre
const Genre = ({genre}) => {
    return (
        <NavItem to={`/movies/genre/${genre.name}`} state={{id: genre.id}} >
            <StyledP>{genre.name}</StyledP>
        </NavItem>
    );
}

const NavItem = styled(NavLink)`
    text-decoration: none;
    width: auto;
    height: auto;
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
export default Genre;