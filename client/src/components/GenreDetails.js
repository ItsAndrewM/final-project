import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import posterNotFound from "../assets/poster_not_found.png"
import GenreBar from "./GenreBar";
import Loading from "./Loading";
import StarRating from "./StarRating";

//page fetches an array of 20 movies of a specific genre depending on the URL
const GenreDetails = () => {
    const [clickedGenre, setClickedGenre] = useState();
    const location = useLocation();

    //use effect that handles the fetch from useLocation state.id
    useEffect(() => {
        fetch(`/movies/genre/${location.state.id}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setClickedGenre(data.data)
        })
        .catch((error) => {
            return error;
        })
        //anytime a new location is made, a new fetch is made
    }, [location])

    if (clickedGenre) {
        return (
            <Wrapper>
                <StyledH>Featured <StyledSpan>{location.state.name}</StyledSpan> Movies:</StyledH>
                <GenreBarWrapper>
                    <GenreBar />
                </GenreBarWrapper>
                <ElementWrapper>
                    {clickedGenre.map((movie) => {
                        return (
                            <MovieWrapper>
                                <ImgWrapper>
                                    {!movie.poster_path ? 
                                    <Img src={`${posterNotFound}`} />
                                    :
                                    <NavItem to={`/movie/${movie.title}`} state={{id: movie.id}}>
                                        <Img src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`} />
                                    </NavItem>    
                                    }
                                </ImgWrapper>
                                <TextWrapper>
                                    <NavItemTitle to={`/movie/${movie.title}`} state={{id: movie.id}}>
                                        <FilmName><FilmNameSpan>{movie.title}</FilmNameSpan></FilmName>
                                    </NavItemTitle>
                                    <FilmYear>({movie.release_date.split("-")[0]})</FilmYear>
                                    <StarWrapper>
                                        <StarRating vote_average={movie.vote_average} />
                                    </StarWrapper>
                                </TextWrapper>
                            </MovieWrapper>
                        )
                    })}
                </ElementWrapper>
                
            </Wrapper>
        );
    }
    else {
        return (
            <LoadingWrapper>
                <Loading />
            </LoadingWrapper>
        )
    }
}

const GenreBarWrapper = styled.div`
    height: 50px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

const StyledH = styled.h1`
    color: black;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 10px;
    margin-top: 20px;
    font-size: 30px;
`

const StyledSpan = styled.span`
    color: black;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    text-decoration: underline;
`

const Wrapper = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const LoadingWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ElementWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const MovieWrapper = styled.div`
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 15px;
    margin-right: 15px;
`

const ImgWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
`

const FilmName = styled.h1`
    color: black;
    text-transform: uppercase;
    text-align: center;
`

const FilmNameSpan = styled.span`
    &:hover {
        text-decoration: underline;
    }
`

const FilmYear = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
    font-size: 13px;
`

const StarWrapper = styled.div`
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default GenreDetails;