import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import posterNotFound from "../assets/poster_not_found.png"
import StarRating from "./StarRating";

//displays movies that were searched for
const SearchResult = ({film}) => {
    const [showMore, setShowMore] = useState(false);
    //state displays more of a movies overview if it's longer than 100 chracters

    return (
        <Wrapper>
            <ImgWrapper>
                {!film.poster_path ? 
                <Img src={`${posterNotFound}`} />
                :
                <NavItem to={`/movie/${film.title}`} state={{id: film.id}}>
                    <Img src={`http://image.tmdb.org/t/p/w92/${film.poster_path}`} />
                </NavItem>    
                }
            </ImgWrapper>
            <TextWrapper>
                <NavItemTitle to={`/movie/${film.title}`} state={{id: film.id}}>
                    <FilmName><FilmNameSpan>{film.title}</FilmNameSpan></FilmName>
                </NavItemTitle>
                <FilmYear>({film.release_date.split("-")[0]})</FilmYear>
                {!showMore ?
                <FilmDesc>{film.overview.substring(0, 100)}<ShowMoreButton onClick={() => setShowMore(!showMore)}>show more</ShowMoreButton></FilmDesc>
                :
                <FilmDesc>{film.overview}<ShowMoreButton onClick={() => setShowMore(false)}>show less</ShowMoreButton></FilmDesc>
                }
                <StarRating vote_average={film.vote_average} />
            </TextWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid black;
`

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
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
    width: 66%;
    height: auto;
`

const FilmName = styled.p`
    color: black;
    text-transform: uppercase;
    
`

const FilmNameSpan = styled.span`
    &:hover {
        border-bottom: 1px solid black;
    }
`

const FilmYear = styled.p`
    margin-top: 5px;
    color: black;
    font-size: 13px;
`

const FilmDesc = styled.p`
    margin-top: 15px;
    color: black;
    font-family: 'Lora Bold';
    font-size: 12px;
`

const ShowMoreButton = styled.button`
    background-color: inherit;
    border: none;
    color: black;
    transition: .2s;
    &:hover {
        color: var(--accent-primary-color);
    }
`
export default SearchResult;