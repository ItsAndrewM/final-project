import { useEffect, useState } from "react";
import styled from "styled-components";
import Recommend from "./Recommend";

//compnent for featured recommended movies for a specific movie.  only 5 random movies are show, and it changes each time the page is refreshed
const Recomended = ({location}) => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    useEffect(() => {
        fetch(`${process.env.FILMLABS_URL}/movie/${location.state.id}/recommendations`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setRecommendedMovies(data.data);
        })
        .catch((error) => {
            return error;
        })
    }, [location])
    
    if (recommendedMovies.length !== 0) {
        return (
            <>
            {recommendedMovies.map((film, index) => {
                return (
                    <Recommend key={index} film={film} index={index} />
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

export default Recomended;