import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import posterNotFound from "../assets/poster_not_found.png"
import KnownFor from "./KnownFor";
import StarRating from "./StarRating";

//this page handles the results when a user searches for a person.  it displays best known for movies/shows as well as a small amount of personal information. they are also 
//ranked in order of popularity ie. more popular people at the top of the array
const PeopleSearchResult = ({result}) => {
    if (result.profile_path) {
        return (
            <Wrapper>
                <ImgWrapper>
                    {result.known_for_department ==="Acting" ?
                    <>
                    <NavItemTitle to={`/actor/${result.name}`} state={{id: result.id}}>
                        <StyledTitle>{result.name}</StyledTitle>
                    </NavItemTitle>
                    <NavItem to={`/actor/${result.name}`} state={{id: result.id}}>
                        <Img src={`http://image.tmdb.org/t/p/w92${result.profile_path}`} />
                    </NavItem>   
                    <StyledP>Known for: <StyledSpan>{result.known_for_department}</StyledSpan></StyledP>
                    </> 
                    :
                    <>
                    <NavItemTitle to={`/crew/${result.name}`} state={{id: result.id}}>
                        <StyledTitle>{result.name}</StyledTitle>
                    </NavItemTitle>
                    <NavItem to={`/crew/${result.name}`} state={{id: result.id}}>
                        <Img src={`http://image.tmdb.org/t/p/w92${result.profile_path}`} />
                    </NavItem>
                    <StyledP>Known for: <StyledSpan>{result.known_for_department}</StyledSpan></StyledP>
                    </>
                    }
                    
                </ImgWrapper>

                <KnownForWrapper>
                    {result.known_for.map((movie, index) => {
                        return (
                            <KnownFor id={movie.id} movie={movie} index={index} />
                        )
                    })}
                </KnownForWrapper>

            </Wrapper>
        );
    }
    else {
        return (
            <Wrapper>
            <ImgWrapper>
                {result.known_for_department ==="Acting" ?
                <>
                <NavItemTitle to={`/actor/${result.name}`} state={{id: result.id}}>
                    <StyledTitle>{result.name}</StyledTitle>
                </NavItemTitle>
                <Img src={posterNotFound} />
                <StyledP>Known for: <StyledSpan>{result.known_for_department}</StyledSpan></StyledP>
                </> 
                :
                <>
                <NavItemTitle to={`/crew/${result.name}`} state={{id: result.id}}>
                    <StyledTitle>{result.name}</StyledTitle>
                </NavItemTitle>
                <Img src={posterNotFound} />
                <StyledP>Known for: <StyledSpan>{result.known_for_department}</StyledSpan></StyledP>
                </>
                }
            </ImgWrapper>
            <KnownForWrapper>
                {result.known_for.map((movie, index) => {
                    return (
                        <KnownFor id={movie.id} movie={movie} index={index} />
                    )
                })}
            </KnownForWrapper>
        </Wrapper>
        )
    }
}

const StyledSpan = styled.span`
    text-decoration: underline;
    font-weight: bold;
`

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`

const KnownForWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
`

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 20%;
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const NavItemTitle = styled(NavLink)`
    width: 100%;
    text-decoration: none;
    transition: .2s;
    &:hover {
        opacity: .75;

    }
`

const Img = styled.img`
    padding-bottom: 5px;
`

const TextWrapper = styled.div`
    width: 33%;
    height: auto;
    border: 1px solid black;
`

const StyledTitle = styled.h1`
    color: black;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 5px;
    &:hover {
        text-decoration: underline;
    }
`

const StyledP = styled.p`
    color: black;
    font-size: 12px;
`

export default PeopleSearchResult;