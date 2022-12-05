import styled from "styled-components";
import StarRating from "./StarRating";
import posterNotFound from "../assets/poster_not_found.png"
import { useState } from "react";
import { NavLink } from "react-router-dom";

//component for the rendering of the random reccomended movies
const Recommend = ({film, index}) => {
    const [showMore, setShowMore] = useState(false);
    if (index !== 4) {
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
                    <FilmDesc>{film.overview}<ShowMoreButton onClick={() => setShowMore(!showMore)}>show less</ShowMoreButton></FilmDesc>
                    }
                    <StarRating vote_average={film.vote_average} />
                </TextWrapper>
            </Wrapper>
            );
        }
        else {
            return (
                <FinalWrapper>
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
                        <FilmDesc>{film.overview}<ShowMoreButton onClick={() => setShowMore(!showMore)}>show less</ShowMoreButton></FilmDesc>
                        }
                        <StarRating vote_average={film.vote_average} />
                    </TextWrapper>
                </FinalWrapper>
                );
        }
}

const FinalWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
`

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    padding-top: 5px;
    padding-bottom: 5px;
`

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    /* padding-bottom: 5px; */
`

const TextWrapper = styled.div`
    width: 66%;
    height: auto;
`

const FilmName = styled.h1`
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
    margin-top: 10px;
    color: black;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 5px;
`

const ShowMoreButton = styled.button`
    margin-left: 5px;
    background-color: inherit;
    border: none;
    color: var(--accent-primary-color);
    transition: .2s;
    border-radius: 5px;
    &:hover {
        color: white;
        background-color: var(--accent-primary-color);
    }
`

export default Recommend;