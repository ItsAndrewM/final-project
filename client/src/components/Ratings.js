import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import { BsStarFill } from "react-icons/bs";
import { UserContext } from "./UserContext";

//this component handles the actual rating made by a user
const Ratings = ({title, id, result}) => {
    const navigate = useNavigate();

    const [userRating, setUserRating] = useState();
    const [writeRating, setWriteRating] = useState(false)
    const [review, setReview] = useState();

    const [open, setOpen] = useState(false);
    const [reviewSet, setReviewSet] = useState(false);
    const [justReviewed, setJustReviewed] = useState();

    const [found, setFound] = useState();
    
    const {userReviews, action} = useContext(UserContext);
    const { user, isAuthenticated } = useAuth0();
    
    //this useffect checks if a rating already exists and if a review made by the current user exist, it doesnt display the rating button
    useEffect(() => {
        const foundReview = userReviews.find((review) => {
            if (review.movie.id === result.id) {
                return review
            }
        })
        setFound(foundReview);
    }, [userReviews])

    //style for the modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #1EBBD7',
        boxShadow: 24,
        p: 4,
    };

    //function to handle when a rating is made, ratings are always multiplied by 2 as that's what the original API was structured with
    const handleChange = (key, value) => {
        setReview({...review, 
            [key]: value,
            'rating': userRating*2    
        })
    }

    //function to handle opening the modal
    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    //function to close modal
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
        setReviewSet(false);
    }

    //function to submit the review to the backend and database
    const handleClick = (e) => {
        e.preventDefault();
        if (!review.content) {
            setReview({
                content: '',
                rating: userRating*2
            })
        }
        fetch(`${process.env.FILMLABS_URL}/movie/${id}/review`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_details: {
                    avatar_path: user.picture,
                    rating: review.rating,
                },
                author: user.email,
                content: review.content,
                created_at: new Date().toISOString(),
                movie: result
            }),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            if (data.status === 200) {
                //if the review is added successfully, then the following happens:
                window.alert('review posted successfully');
                //reducer is triggered to cause a refetch for the reviews of a movie, adding the review to the current list
                action.receiveNewReview(data.data.review[0])
                setJustReviewed(data.data.review[0]);
                //adds a state so the review can be referenced below, shows what the user wrote
                setOpen(false);
                //closes the current modal and opens a secondary modal
                setReviewSet(true)
            }
            else {
                window.alert('something went wrong!')
            }
        })
        .catch((error) => {
            return error;
        });
    }

    if (isAuthenticated) {
        return (
            <Wrapper>
                <ButtonWrapper>
                    {found ? 
                    <StyledH></StyledH>
                    :
                    <>
                    <StyledButton onClick={handleOpen}><StyledPlusIcon /></StyledButton>
                    <StyledReviewH>Review This movie</StyledReviewH>
                    </>
                    }

                </ButtonWrapper>
                <Modal open={open} onClose={handleClose} >
                        <Box sx={style}>
                        <ReviewWrapper>
                        <StyledBsStarFill/><RatingP>{userRating}</RatingP>
                            <StyledH>{title}</StyledH>
                        </ReviewWrapper>
                        <StarWrapper>
                            <Rating setUserRating={setUserRating}/>
                        </StarWrapper>
                        <ButtonWrapper>
                            <StyledButton onClick={() => setWriteRating(!writeRating)}><StyledPlusIcon /></StyledButton>
                            <StyledReviewH>Write a review</StyledReviewH>
                        </ButtonWrapper>
                        <TextWrapper style={{display: writeRating === false && 'none'}}>
                            <StyledTextArea onChange={(e) => handleChange("content", e.target.value)}></StyledTextArea>
                        </TextWrapper>
                        <ButtonWrapper>
                            <SubmitButton onClick={handleClick}>
                                Submit Review
                            </SubmitButton>
                        </ButtonWrapper>
                    </Box>  
                </Modal>

                <Modal open={reviewSet} onClose={handleClose} >
                    <Box sx={style}>
                        <TextWrapper >
                            {justReviewed && <>
                            <StyledH>Review Set for <StyledSpan>{justReviewed.movie.title}</StyledSpan></StyledH>
                            <StyledP>You said: <StyledSpan> {justReviewed.content}</StyledSpan></StyledP>
                            
                            </>
                            }
                        </TextWrapper>
                        <ButtonWrapper>
                            <SubmitButton onClick={handleClose} >
                                Close
                            </SubmitButton>
                        </ButtonWrapper>
                    </Box>
                </Modal>
                {/* <ReviewWrapper style={{display: writeRating === false ? 'none' : null}}> */}
            </Wrapper>
        );
    }
    <Wrapper style={{display: 'none'}}>
        <StyledButton onClick={() => navigate('/register')}>Sign In to review</StyledButton>
    </Wrapper>
}

const StyledReviewH = styled.h1`
    color: black;
    text-transform: uppercase;
    margin-left: 10px;
    text-align: center;
`

const StyledSpan = styled.span`
    text-decoration: underline;
    text-transform: uppercase;
`

const StyledBsStarFill = styled(BsStarFill)`
    width: 60px;
    height: auto;
    z-index: -1;
    position: absolute;
    margin-top: -100px;
    color: var(--accent-primary-color);
`

const SubmitButton = styled.button`
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

const RatingP = styled.p`
    position: absolute;
    margin-top: -95px;
    z-index: 999;
    font-weight: bold;
`

const StarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    padding: 5px;
    flex-wrap: wrap;
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

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

const ReviewWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledP = styled.p`
    color: black;
`

const StyledH = styled.h1`
    width: 100%;
    color: black;
    text-transform: uppercase;
    margin-left: 10px;
    text-align: center;
    margin-bottom: 20px;
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

const StyledPlusIcon = styled(AiFillPlusCircle)`
    color: var(--accent-primary-color);
    width: 25px;
    height: 25px;
`
export default Ratings;