import { NavLink } from "react-router-dom";
import styled from "styled-components";
import StarRating from "./StarRating";
import posterNotFound from "../assets/poster_not_found.png"
import { FaTrashAlt } from "react-icons/fa";
import EditListModal from "./EditListModal";
import { useState } from "react";

//individual renders of list items that appear on the users account page
const UserListItem = ({listItem, title}) => {
    const [edit, setEdit] = useState(false)
    return (
            <SmallWrapper>
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
                        <EditButtonWrapper>
                            <EditButton onClick={() => setEdit(!edit)}><FaTrashAlt /></EditButton>
                            <EditListModal item={listItem} setEdit={setEdit} edit={edit} title={title} />
                        </EditButtonWrapper>
                        <FilmYear>({listItem.movie.release_date.split("-")[0]})</FilmYear>
                        <StarWrapper>
                            <StarRating vote_average={listItem.movie.vote_average} />
                        </StarWrapper>
                    </TextWrapper>
                </SmallWrapper>
    );
}

const EditButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    margin: 10px 5px 10px 5px;
    padding: 5px 10px 5px 10px;
    border: none;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const EditButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

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

export default UserListItem;