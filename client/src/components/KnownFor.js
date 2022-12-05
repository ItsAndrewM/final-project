import { NavLink } from "react-router-dom";
import styled from "styled-components";


//whenever a crew or actor is searched, 3 movies are added to the search to show what they are probably known for 
//the conditional rendering is just to provide the border bottom between renders
const KnownFor = ({movie, index}) => {
    if (index === 2) {
        return (
            <>
            {movie.media_type === 'movie' ?
                <NavItem to={`/movie/${movie.title}`} state={{id: movie.id}} >
                    <Wrapper>
                        <StyledTitle>{movie.title}</StyledTitle>
                        <StyledP>{movie.release_date}</StyledP>
                        <StyledP>Media: {movie.media_type}</StyledP>
                    </Wrapper>
                </NavItem>
                :
                <NavItem to={`/show/${movie.name}`} state={{id: movie.id}} >
                    <Wrapper>
                        <StyledTitle>{movie.name}</StyledTitle>
                        <StyledP>{movie.first_air_date}</StyledP>
                        <StyledP>Media: {movie.media_type}</StyledP>
                    </Wrapper>
                </NavItem>  
        }          
        </> 
        );
    }
    else {
        return (
            <>
            {movie.media_type === 'movie' ?
                <NavItem to={`/movie/${movie.title}`} state={{id: movie.id}} >
                    <FirstWrapper>
                        <StyledTitle>{movie.title}</StyledTitle>
                        <StyledP>{movie.release_date}</StyledP>
                        <StyledP>Media: {movie.media_type}</StyledP>
                    </FirstWrapper>
                </NavItem>
                :
                <NavItem to={`/show/${movie.name}`} state={{id: movie.id}} >
                    <FirstWrapper>
                        <StyledTitle>{movie.name}</StyledTitle>
                        <StyledP>{movie.first_air_date}</StyledP>
                        <StyledP>Media: {movie.media_type}</StyledP>
                    </FirstWrapper>
                </NavItem>  
        }          
        </>    
        )
    }

}

const FirstWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid black;
    padding-bottom: 5px;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 5px;

`

const StyledTitle = styled.p`
    text-transform: uppercase;
    color: black;
    font-size: 16px;
    width: 100%;
`

const StyledP = styled.p`
    color: black;
    font-size: 15px;
    width: 100%;
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    width: 100%;
    height: auto;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`
export default KnownFor;