import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
//component is used to edit a list by removing movies from the list madeby the user
const EditListModal = ({item, setEdit, edit, title}) => {
    const {action} = useContext(UserContext);
    const {user} = useAuth0();
    const [review, setReview] = useState();
    const [deleteSuccessful, setDeleteSuccessful] = useState(false)

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

    //function for removing item from a list
    const handleDelete = (e) => {
        e.preventDefault();
        
        fetch(`${process.env.FILMLABS_URL}/users/${item.author}/lists`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...item,
                list_name: title
            }),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            console.log(data)
            if (data.status === 200) {
                //redcucer and context fucntion to trigger a refetch for the context
                action.receiveNewReview(data.data);
                //state will display info for the successful delete
                setDeleteSuccessful(true)
            }
            else {
                window.alert("delete unsuccessful")
                return data;
            }
        })
    }

    return (
        <Modal open={edit} onClose={handleClose}>
            <Box sx={style}>
                <Wrapper>
                    {!deleteSuccessful ? 
                    <>
                    <StyledH>Edit List Movie:</StyledH>
                    <StyledP>Are you sure you want to do remove <StyledSpan>{item.movie.title}</StyledSpan> from your list: <StyledSpan>{title}</StyledSpan>?</StyledP>
                    <ButtonWrapper>
                        <Button onClick={(e) => handleDelete(e)}>Yes</Button>
                        <Button onClick={handleClose}>No</Button>
                    </ButtonWrapper>
                    </>
                    :
                    <>
                    <StyledH>Item Removed Successfully</StyledH>
                    <StyledP>You removed movie from {title}<StyledSpan></StyledSpan></StyledP>
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
export default EditListModal;