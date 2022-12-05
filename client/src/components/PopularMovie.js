import { NavLink } from "react-router-dom";
import styled from "styled-components";
import StarRating from "./StarRating";
import posterNotFound from "../assets/poster_not_found.png"

//this page renders the popular movies
const PopularMovie = ({movie}) => {
    return (
        <Wrapper>
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
        </Wrapper>
    );
}

const Wrapper = styled.div`
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
export default PopularMovie;