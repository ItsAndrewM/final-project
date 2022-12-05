import { NavLink } from "react-router-dom";
import styled from "styled-components";
import StarRating from "./StarRating";
import posterNotFound from "../assets/poster_not_found.png"
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { UserContext } from "./UserContext";

const UserReviews = ({item, index}) => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleteReview, setDeleteReview] = useState(false);
    const {userReviews} = useContext(UserContext);

    useEffect(() => {
        
    }, [userReviews, item])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #1EBBD7',
        boxShadow: 24,
        p: 4,
    };

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    }
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    }
    
    return (
        <Wrapper>
            <ImgWrapper>
                {!item.movie.poster_path ? 
                <Img src={`${posterNotFound}`} />
                :
                <NavItem to={`/movie/${item.movie.title}`} state={{id: item.movie.id}}>
                    <Img src={`http://image.tmdb.org/t/p/w154/${item.movie.poster_path}`} />
                </NavItem>    
                }
            </ImgWrapper>
            <TextWrapper>
                <NavItemTitle to={`/movie/${item.movie.title}`} state={{id: item.movie.id}}>
                    <FilmName><FilmNameSpan>{item.movie.title}</FilmNameSpan></FilmName>

                </NavItemTitle>
                <EditButtonWrapper>
                    <EditButton onClick={() => setEdit(!edit)}><FaEdit /></EditButton>
                    <EditButton onClick={() => setDeleteReview(!deleteReview)}><FaTrashAlt /></EditButton>
                    <DeleteModal item={item} setDeleteReview={setDeleteReview} deleteReview={deleteReview} />
                    <EditModal item={item} setEdit={setEdit} edit={edit} />
                </EditButtonWrapper>
                <FilmYear>({item.movie.release_date.split("-")[0]})</FilmYear>
                <StarWrapper>
                    {/* <Rating>Your Rating:</Rating> */}
                    <StarRating vote_average={item.author_details.rating} />
                </StarWrapper>
                <ButtonWrapper>
                    <ReviewButton onClick={handleOpen}>View Review</ReviewButton>
                    <Modal open={open} onClose={handleClose} >
                        <Box sx={style}>
                            <StyledH>Your <StyledSpan>{item.movie.title}</StyledSpan> Review:</StyledH>
                            <StyledP>{item.content}</StyledP>
                        </Box>
                    </Modal>
                </ButtonWrapper>
            </TextWrapper>
        </Wrapper>
    );
}

const StyledSpan = styled.span`
    text-decoration: underline;
`

const EditButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

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

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ReviewButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    border: none;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const StyledH = styled.h1`
    color: black;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
`

const StyledP = styled.p`
    color: black;
    width: 100%;
    text-align: center;
`

const Wrapper = styled.div`
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 15px;
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

const Rating = styled.h1`
    color: black;
    text-transform: uppercase;
    text-align: center;
    margin-right: 5px;
`
export default UserReviews;