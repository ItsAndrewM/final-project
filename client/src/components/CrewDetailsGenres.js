import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Genre from "./Genre";
import { GenreContext } from "./GenreContext";

//component displays the genres of a crew member.  It gathers all genres and removes duplicates
const CrewDetailsGenres = ({crewCredits}) => {
    const {genres} = useContext(GenreContext);
    const [genreNames, setGenreNames] = useState([]);
    const newArr = [];
    const otherArr = [];
    //credits are iterated through and checked if they include the genre id, if they dont then theyre pushed into an array
    useEffect(() => {
        crewCredits.forEach((movie) => {
            movie.genre_ids.forEach((genreId) => {
                if (newArr.includes(genreId) === false) {
                    newArr.push(genreId)
                }
                return newArr;
            })
        })
        //that array is then iterated through and because it only contains ids, it's checked against all existing genres which appear in their own individual objects in an array
        //if they dont appear in the new array, they're pushed into it and then set in state
        newArr.forEach((genreId) => {
            const found = genres.find((genre) => {
                return genre.id === genreId
            })
            otherArr.push(found);
        })
        setGenreNames(otherArr)
    }, [crewCredits])

    if (genreNames) {
        return (
            <Wrapper>
                {genreNames.map((genre) => {
                    return (
                    <Genre genre={genre} />
                    )
                })}
            </Wrapper>
        );
    }
    
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`
export default CrewDetailsGenres;