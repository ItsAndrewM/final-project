import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import HomeRecommend from "./HomeRecommend";
import Recommend from "./Recommend";
import { UserContext } from "./UserContext";

//compnent for featured recommended movies for a specific movie.  only 5 random movies are show, and it changes each time the page is refreshed
const HomePageRecommended = () => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const {userReviews, userLists, userListsKeys, listState, state} = useContext(UserContext);
    

    useEffect(() => {
        // const lastIndex = userListsKeys.length - 1;
        fetch(`${process.env.FILMLABS_URL}/movie/${userLists.lists[userListsKeys[0]][0].id}/recommendations`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setRecommendedMovies(data.data);
        })
        .catch((error) => {
            return error;
        })
    }, [state, userLists])
    
    if (recommendedMovies.length !== 0) {
        return (
            <>
            {recommendedMovies.map((film, index) => {
                return (
                        <HomeRecommend key={index} film={film} index={index} />
                )
            })

            }
            </>
        );
    }
    else {
        <StyledP>1 sec</StyledP>
    }
}

const StyledP = styled.p`
    color: black;
`

export default HomePageRecommended;