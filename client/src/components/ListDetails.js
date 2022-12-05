import { NavLink } from "react-router-dom";
import styled from "styled-components";
import StarRating from "./StarRating";
import posterNotFound from "../assets/poster_not_found.png"
import { useState } from "react";
import { AltPagination } from "./AltPagination";

//this page handles all renders made by previous list map and displays image, title, star rating, year of release
const ListDetails = ({list}) => {
    const [pagination, setPagination] = useState([]);
    //above state handles pagination and the movies to display in that pagination

    return (
        <>
            {pagination.map((listItem, index) => {
                return (
                <SmallWrapper key={index}>
                    <ImgWrapper>
                        {!listItem.movie.poster_path ? 
                        <Img src={`${posterNotFound}`} />
                        :
                        <NavItem to={`/movie/${listItem.movie.title}`} state={{id: listItem.movie.id}}>
                            <Img src={`http://image.tmdb.org/t/p/w154/${listItem.movie.poster_path}`} />
                        </NavItem>    
                        }
                    </ImgWrapper>
                    <TextWrapper>
                        <NavItemTitle to={`/movie/${listItem.movie.title}`} state={{id: listItem.movie.id}}>
                            <FilmName><FilmNameSpan>{listItem.movie.title}</FilmNameSpan></FilmName>
                        </NavItemTitle>
                        <FilmYear>({listItem.movie.release_date.split("-")[0]})</FilmYear>
                        <StarWrapper>
                            <StarRating vote_average={listItem.movie.vote_average} />
                        </StarWrapper>
                    </TextWrapper>
                </SmallWrapper>
                )
            })
            }
            <AltPagination setIncomingPagination={setPagination} array={list.list}/>
            </>
    );
}

const SmallWrapper = styled.div`
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
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
export default ListDetails;