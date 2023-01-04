import { Modal, Rating } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import EditRating from "./EditRating";
import { UserContext } from "./UserContext";

//modal to edit a previously made review, also allows the user to re rate a movie out of 5
const EditModal = ({item, setEdit, edit}) => {
    const [userRating, setUserRating] = useState();
    const [review, setReview] = useState();
    const [update, setUpdate] = useState(false);
    const {action} = useContext(UserContext);

    //function handles whenever the review is changed
    const handleChange = (key, value) => {
        setReview({...review, 
            [key]: value,
            'rating': userRating*2    
        })
    }
    //styling for modal
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

    //function for closing modal
    const handleClose = (e) => {
        e.preventDefault();
        setEdit(false);
    }

    //function to handle submitting the review edit
    const handleClick = (e) => {
        e.preventDefault();
        
        fetch(`${process.env.FILMLABS_URL}/movie/${item.movie.id}/review`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_details: {
                    avatar_path: item.avatar_path,
                    rating: review.rating,
                },
                author: item.author,
                content: review.content,
                created_at: new Date().toISOString(),
                movie: item.movie,
                id: item.movie.id
            }),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            if (data.status === 200) {
                setUpdate(true);
                action.receiveNewReview(data.data);
            }
            else {
                window.alert("update unsuccessful")
                console.log(data)
            }
        })
    }

    return (
        <Modal open={edit} onClose={handleClose}>
            <Box sx={style}>
                <StarWrapper>
                    <StyledBsStarFill/><RatingP>{userRating}</RatingP>
                </StarWrapper>
                    <StarWrapper>
                        <EditRating setUserRating={setUserRating} />
                    </StarWrapper>
                    {!update ? 
                    <>
                    <StyledTextArea onChange={(e) => handleChange("content", e.target.value)}></StyledTextArea>
                    <ButtonWrapper>
                        <SubmitButton onClick={handleClick}>Submit</SubmitButton>
                    </ButtonWrapper>
                    </>
                    :
                    <>
                    <StyledP>Review updated, you said:</StyledP>
                    <StyledP>{review.content}</StyledP>
                    </>
                    }
                    
                    
            </Box>
        </Modal>
    );
}

const RatingP = styled.p`
    position: absolute;
    margin-top: -65px;
    z-index: 999;
    font-weight: bold;
`

const StyledBsStarFill = styled(BsStarFill)`
    width: 60px;
    height: auto;
    z-index: -1;
    position: absolute;
    margin-top: -70px;
    color: var(--accent-primary-color);
`

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 100px;
    font-family: var(--body-font-family);
    padding: 10px;
    border-radius: 10px;
    &:focus {
        outline: 3px solid var(--accent-primary-color);
    }
`

const StarWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const SubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledP = styled.p`
    width: 100%;
    color: black;
`
export default EditModal;