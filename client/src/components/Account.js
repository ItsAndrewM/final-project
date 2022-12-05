import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListItem from "./ListItem";
import { UserContext } from "./UserContext";
import { UserReviewPagination } from "./UserReviewPagination";
import UserReviews from "./UserReviews";

//This component is for the Accounts page and will display the Account holders name, any reviews they've made as well as lists they created.  They can also
//edit and delete reviews, lists here and sign out
const Account = () => {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    const [reviewPagination, setReviewPagination] = useState([]);
    const [keys, setKeys ] = useState([]);
    const {userReviews, userLists, listState, state} = useContext(UserContext);
    console.log(userLists)
    const navigate = useNavigate();


    //this useeffect triggers whenever a review or list is changed by using a reducer and useContext
    useEffect(() => {
        if (userLists) {
            setKeys(Object.keys(userLists.lists))
        }
    }, [listState, state, userReviews, userLists])

    //function that handlers the user signout, will redirect to home page
    const handleSignOut = (e) => {
        e.preventDefault();
        logout();
    }

    // useEffect(() => {
    // setKeys(Object.keys(userLists.lists))
        
    // }, [userReviews, userLists])

    return (
        <Wrapper>
            {!isAuthenticated ? 
            <ElementWrapper>
                <SubmitButton onClick={() => navigate("/register")}>Register here</SubmitButton>
            </ElementWrapper>
            :
            <ElementWrapper>
                <NameAndPic>
                    <StyledH1>Welcome back, {user.nickname}</StyledH1>
                    <StyledImgWrapper>
                        <StyledProfilePic src={`${user.picture}`}/>
                    </StyledImgWrapper>
                </NameAndPic>
                <ReviewsWrapper>
                        {userReviews.length === 0 ? 
                        <></>
                    :
                    <>
                    <StyledTitle>Your Reviews:</StyledTitle>
                    <ReviewWrapper>
                    {reviewPagination.map((item, index) => {
                        return (
                            <UserReviews item={item} key={index} />
                        )
                    })}
                    <UserReviewPagination setReviewPagination={setReviewPagination} />
                    </ReviewWrapper>
                    </>
                    }
                </ReviewsWrapper>
                {keys.length === 0  ? 
                    <></>
                    :
                    <ListWrapper>
                    <StyledTitle>Your Lists:</StyledTitle>
                    {keys.map((item, index) => {
                        return (
                            <ListItem key={index} item={item} index={index} />
                        )
                    })}
                    </ListWrapper>
                }
                <ButtonWrapper>
                    <SubmitButton onClick={handleSignOut}>Sign Out</SubmitButton>
                </ButtonWrapper>
            </ElementWrapper>
        }
        </Wrapper>
    );
}

const StyledTitle = styled.h1`
    color: black;
    width: 85%;
    color: black;
    text-align: center;
    margin-bottom: 15px;
    text-transform: uppercase;
    border-bottom: 1px solid black;
    padding-bottom: 10px;

`

const ListWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 100vw;
    height: auto;
`

const ElementWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
`

const ReviewWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const ReviewsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
`

const NameAndPic = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledH1 = styled.h1`
    color: black;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;
`

const StyledImgWrapper = styled.div`

`

const StyledProfilePic = styled.img`
    border-radius: 50%;
    width: 60px;
    margin-left: 15px;
`

const SubmitButton = styled.button`
    width: 10%;
    text-transform: uppercase;
    background-color: var(--accent-primary-color);
    color: white;
    font-size: 18px;
    padding: 10px 25px;
    border: none;
    border-radius: 10px;
    justify-content: center;
    cursor: pointer;
    transition: .2s;
    margin-bottom: 20px;
    margin-top: 20px;
    font-weight: bold;
    &:hover {
        opacity: .75;
    }
`

export default Account;