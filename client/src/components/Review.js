import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import StarRating from "./StarRating";

//this component handles the other reviews made for a movie.
//several checks are done on each users profile and review/rating
//profile pics sometimes fail to load and have to be handled with a default pic
//if the author has an email address it in it's handled by splitting the address at the '@'

const Review = ({review, index, length}) => {
    const [showMore, setShowMore] = useState(false);
    const [date, setDate] = useState(new Date(review.created_at));
    const [options, setOptions] = useState({ year: 'numeric', month: 'long', day: 'numeric' })
    const [reviewerProfilePic, setReviewerProfilePic] = useState(review.author_details.avatar_path);
    const [reviewAuthor, setReviewAuthor] = useState(review.author);
    useEffect(() => {
        if (review.author_details.avatar_path) {
            if (review.author_details.avatar_path[0] === '/') {
                let sliced = review.author_details.avatar_path.slice(1);
                if (sliced.includes('gravatar') === false) {
                    sliced = `https://image.tmdb.org/t/p/w45/${sliced}`;
                    setReviewerProfilePic(sliced);
                }
                else {
                    setReviewerProfilePic(sliced);
                }
            }
            else {
                setReviewerProfilePic(review.author_details.avatar_path);
            }
        }
        else {
            setReviewerProfilePic('https://www.gravatar.com/avatar/1kks3YnVkpyQxzw36CObFPvhL5f.jpg');
        }

        if (review.author.includes('@') == true) {
            const splitAuthor = review.author.split('@');
            setReviewAuthor(splitAuthor[0]);
        }
    }, [review])
    if (index+1 === length) {
        return (
            <Wrapper>
                <ImgWrapper>
                    <Img src={reviewerProfilePic}/>
                </ImgWrapper>
                <TextWrapper>
                    <TitleWrapper>
                        <StyledTitle>{reviewAuthor}</StyledTitle>
                        {review.author_details.rating &&
                        <StarWrapper>
                            <StarRating vote_average={review.author_details.rating} />
                        </StarWrapper>
                        }
                    </TitleWrapper>
                    {review.content.length <= 75 ?
                    <StyledP>{review.content}</StyledP>
                    :
                    <>
                    {!showMore ? 
                        <StyledP>{review.content.substring(0, 75)}<ShowMoreButton onClick={() => setShowMore(!showMore)}>show more</ShowMoreButton></StyledP>
                        :
                        <StyledP>{review.content}<ShowMoreButton onClick={() => setShowMore(false)}>show less</ShowMoreButton></StyledP>
                    }
                    </>
                    }
                    <StyledDate>{date.toLocaleString(undefined, options)}</StyledDate>
                </TextWrapper>
            </Wrapper>
        );
    }
    else {
        return (
            <FinalWrapper>
                <ImgWrapper>
                    <Img src={reviewerProfilePic}/>
                </ImgWrapper>
                <TextWrapper>
                    <TitleWrapper>
                        <StyledTitle>{reviewAuthor}</StyledTitle>
                        {review.author_details.rating &&
                        <StarWrapper>
                            <StarRating vote_average={review.author_details.rating} />
                        </StarWrapper>
                        }
                    </TitleWrapper>
                    {review.content.length <= 75 ?
                    <StyledP>{review.content}</StyledP>
                    :
                    <>
                    {!showMore ? 
                    <StyledP>{review.content.substring(0, 75)}<ShowMoreButton onClick={() => setShowMore(!showMore)}>show more</ShowMoreButton></StyledP>
                    :
                    <StyledP>{review.content}<ShowMoreButton onClick={() => setShowMore(false)}>show less</ShowMoreButton></StyledP>
                    }
                    </>
                    }
                    <StyledDate>{date.toLocaleString(undefined, options)}</StyledDate>
                </TextWrapper>
            </FinalWrapper>
        );
    }
    
}

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const StarWrapper = styled.div`
    /* width: 50%; */
`

const FinalWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid black;

`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const ImgWrapper = styled.div`
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Img = styled.img`
    width: 60px;
    border-radius: 50%;
    height: 60px;
`

const StyledDate = styled.p`
    font-size: 12px;
    color: grey;
    margin-bottom: 5px;
`

const TextWrapper = styled.div`
    width: 100%;
`
const StyledTitle = styled.h1`
    margin-top: 5px;
    color: black;
    margin-bottom: 5px;
    margin-right: 15px;
    /* width: 50%; */
`


const StyledP = styled.p`
    color: black;
    font-size: 15px;
    margin-bottom: 5px;
    line-height: 20px;

`

const ShowMoreButton = styled.button`
    margin-left: 5px;
    background-color: inherit;
    border: none;
    color: var(--accent-primary-color);
    transition: .2s;
    border-radius: 5px;
    &:hover {
        color: white;
        background-color: var(--accent-primary-color);
    }
`
export default Review;