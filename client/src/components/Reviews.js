import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import { UserContext } from "./UserContext";

//all reviews for a movie are fetch in this component
const Reviews = ({location}) => {
    const [reviews, setReviews] = useState([]);
    const {state} = useContext(UserContext);
    
    //both user and existing reviews are collected
    useEffect(() => {
        Promise.all([
        fetch(`/movie/${location.state.id}/reviews`),
        fetch(`/movie/${location.state.id}/userReviews`),
        ])
        .then(([data, dataMongo]) => {
            return Promise.all([data.json(), dataMongo.json()]);
        })
        .then(([data, dataMongo]) => {
            //reviews are then amalgamated and sorted
            const reviewsArr = [...data.data, ...dataMongo.data];
            const sortedReviews = reviewsArr.sort(function(x, y) {
                return x.created_at - y.created_at
            })
            //the sorted array is then set in state
            setReviews(sortedReviews);
        })
        .catch((error) => {
            return error;
        })
        //app rerenders whenever a new item is added to the reviews so that a fetch is triggered to gather any new reviews to rerender them
        //it should happen each time somethhing is added as it's possible other user could add reviews around the same time
    }, [location, state])

    if (reviews.length !== 0) {
        return (
        <Wrapper>
        {reviews.map((review, index) => {
            return (
                <Review key={index} review={review} index={index} length={reviews.length}/>
            );
        })}
        </Wrapper>
        )
    }
    else {
        return (
        <StyledP></StyledP>
        )
    }
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column-reverse;
`

const StyledP = styled.p`
    color: black;
    text-align: center;
    margin-top: 10px;
`

export default Reviews;