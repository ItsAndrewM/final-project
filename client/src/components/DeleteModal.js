import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
//component is used to delete a review madeby the user
const DeleteModal = ({item, setDeleteReview, deleteReview}) => {
    const {action} = useContext(UserContext);
    const [review, setReview] = useState();
    const [deleteSuccessful, setDeleteSuccessful] = useState(false)

    //styling for the modal
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

    //function to handle closing the modal
    const handleClose = (e) => {
        e.preventDefault();
        setDeleteReview(false);
    }

    //function handles when user clicks to confirm deleting the review they've made
    const handleDelete = (e) => {
        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_FILMLABS_URL}/movie/${item.movie.id}/review`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_details: {
                    avatar_path: item.author_details.avatar_path,
                    rating: item.author_details.rating,
                },
                author: item.author,
                content: item.content,
                created_at: new Date().toISOString(),
                movie: item.movie,
                id: item.movie.id
            }),
        })
        .then((data) => {
            console.log(data)
            return data.json();
        })
        .then((data) => {
            console.log(data)
            if (data.status === 200) {
                //reducer/context called when successful delete to refetch database
                action.receiveNewReview(data.data);
                setDeleteSuccessful(true)
                setReview(data.data)
            }
            else {
                window.alert("delete unsuccessful")
                return data;
            }
        })
    }

    return (
        <Modal open={deleteReview} onClose={handleClose}>
            <Box sx={style}>
                <Wrapper>
                    {!deleteSuccessful ? 
                    <>
                    <StyledH>Delete review:</StyledH>
                    <StyledP>Are you sure you want to do delete your review for <StyledSpan>{item.movie.title}?</StyledSpan></StyledP>
                    <ButtonWrapper>
                        <Button onClick={(e) => handleDelete(e)}>Yes</Button>
                        <Button onClick={handleClose}>No</Button>
                    </ButtonWrapper>
                    </>
                    :
                    <>
                    <StyledH>Delete successful</StyledH>
                    <StyledP>You deleted your review for <StyledSpan></StyledSpan></StyledP>
                    <ButtonWrapper>
                        <Button onClick={handleClose}>Close</Button>
                    </ButtonWrapper>
                    </>
                    }
                </Wrapper>
            </Box>
        </Modal>
    );
}

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
`

const Button = styled.button`
  font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
    text-transform: uppercase;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
`

const StyledH = styled.h1`
    color: black;
    text-transform: uppercase;
    margin: 15px 0px 25px 0px;
`

const StyledP = styled.p`
    color: black;
    line-height: 20px;
    
`

const StyledSpan = styled.span`
    color: black;
    text-decoration: underline;
    font-weight: bold;
`
export default DeleteModal;