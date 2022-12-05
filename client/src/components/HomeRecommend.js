import styled from "styled-components";
import StarRating from "./StarRating";
import Loading from "./Loading"
import posterNotFound from "../assets/poster_not_found.png"
import { useState } from "react";
import { NavLink } from "react-router-dom";

//component for the rendering of the random reccomended movies but styled for the home page
const HomeRecommend = ({film, index}) => {
    const [showMore, setShowMore] = useState(false);
    if (film) {
            return (
                <Wrapper>
                <ImgWrapper>
                    {!film.poster_path ? 
                    <Img src={`${posterNotFound}`} />
                    :
                    <NavItem to={`/movie/${film.title}`} state={{id: film.id}}>
                        <Img src={`http://image.tmdb.org/t/p/w154/${film.poster_path}`} />
                    </NavItem>    
                    }
                </ImgWrapper>
                <TextWrapper>
                    <NavItemTitle to={`/movie/${film.title}`} state={{id: film.id}}>
                        <FilmName><FilmNameSpan>{film.title}</FilmNameSpan></FilmName>
                    </NavItemTitle>
                    <FilmYear>({film.release_date.split("-")[0]})</FilmYear>
                    <StarWrapper>
                        <StarRating vote_average={film.vote_average} />
                    </StarWrapper>
                </TextWrapper>
            </Wrapper>
            );
        }
        else {
            return (
                 <Loading />
                );
        }
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
        text-decoration: underline;;
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

export default HomeRecommend;