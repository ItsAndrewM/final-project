import { NavLink } from "react-router-dom";
import styled from "styled-components";

//items mapped from mapped are sent through this and assign a link and p tag to display on page
const MappedItem = ({other}) => {
    return (
        <NavItem to={`/movie/${other.title}`} state={{id: other.id}}>
            <Wrapper>
                <StyledP>{other.title}</StyledP>
            </Wrapper>
        </NavItem>
    )
}

const Wrapper = styled.div`

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
export default MappedItem;