import { NavLink } from "react-router-dom";
import styled from "styled-components";

//this component renders the different production companies involved with an actor or movies
const Production = ({result}) => {
    return (
        <Wrapper>
            {result.production_companies.map((company) => {
                return (
                    <NavItem key={company.id} to={`/movies/production/${company.name}`} state={{id: company.id}}>
                        <StyledP>{company.name}</StyledP>
                    </NavItem>
                )
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
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
    width: 100%;
    height: auto;

`
export default Production;