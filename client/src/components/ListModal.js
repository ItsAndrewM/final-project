import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";
import Lists from "./Lists";

//modal handles if a user wants to add a movie to a modal by selecting a list name from existing list or a new list name
const ListModal = ({open, setOpen, result, handleClose}) => {
//states above are for when the modal is to be open or closed, result is the movie currently being viewed

//below style is for the modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white',
        border: '2px solid #1EBBD7',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
        <ListButtonWrapper>
            <StyledButton onClick={() => setOpen(true)}><StyledAiFillPlusCircle /></StyledButton>
            <StyledH>Add to list</StyledH>
        </ListButtonWrapper>
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <ButtonWrapper>
                    <CloseButton onClick={handleClose}>x</CloseButton>
                </ButtonWrapper>
                <Lists result={result} />
            </Box>
        </Modal>
        </>
    );
}

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: -25px;
`

const CloseButton = styled.button`
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

const ListWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
`

const ListButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledH = styled.h1`
    color: var(--accent-primary-color);
    text-transform: uppercase;
    margin-left: 10px;
`

const StyledAiFillPlusCircle = styled(AiFillPlusCircle)`
    color: var(--accent-primary-color);
    width: 30px;
    height: auto;
`

const StyledButton = styled.button`
    background-color: inherit;
    border: none;
    width: auto;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

export default ListModal;