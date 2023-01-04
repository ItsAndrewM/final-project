import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

//this modal handles deleting the entire list belonging to a logged in user
const DeleteListModal = ({deleteList, setDeleteList, title}) => {
    const {action} = useContext(UserContext);
    const [review, setReview] = useState();
    const [deleteSuccessful, setDeleteSuccessful] = useState(false)
    const {user} = useAuth0();

    //styling for the modal since it's super annoying to style without it
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

    //function handles closing the modal
    const handleClose = (e) => {
        e.preventDefault();
        setDeleteList(false);
    }

    //function handles when a user clicks the delete button, fetch request is sent to delete the individual lists using the user's email and list name as a paramater
    const handleDelete = (e) => {
        e.preventDefault();
        
        fetch(`${process.env.FILMLABS_URL}/users/${user.email}/lists`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: user.email,
                list_name: title
            }),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            if (data.status === 200) {
                //reducer action is used to trigger a new provider/context fetch request
                action.receiveNewReview(data.data);
                //set state to show the user that the delete was successful
                setDeleteSuccessful(true)
            }
            else {
                window.alert("delete unsuccessful")
            }
        })
    }

    return (
        <Modal open={deleteList} onClose={handleClose}>
            <Box sx={style}>
                <Wrapper>
                    {!deleteSuccessful ? 
                    <>
                    <StyledH>Delete List:</StyledH>
                    <StyledP>Are you sure you want to do delete your list: <StyledSpan>{title}?</StyledSpan></StyledP>
                    <ButtonWrapper>
                        <Button onClick={(e) => handleDelete(e)}>Yes</Button>
                        <Button onClick={handleClose}>No</Button>
                    </ButtonWrapper>
                    </>
                    :
                    <>
                    <StyledH>Delete successful</StyledH>
                    <StyledP>You deleted your list<StyledSpan></StyledSpan></StyledP>
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
export default DeleteListModal;