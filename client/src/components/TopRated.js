import { useContext, useState } from "react";
import styled from "styled-components";
import { MoviesContext } from "./MoviesContext";
import TopRatedMovie from "./TopRatedMovie";
import { TopRatedPagination } from "./TopRatedPagination";

//renders top rated featured movies
const TopRated = () => {
    const [paginatedTopRated, setPaginatedTopRated] = useState([])
    return (
        <Wrapper>
            <StyledTitle>Top Rated Movies:</StyledTitle>
            {paginatedTopRated.map((movie) => {
                return (
                    <TopRatedMovie key={movie.id} movie={movie} />
                )
            })}
            <TopRatedPagination setPaginatedTopRated={setPaginatedTopRated} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid black;
`

const StyledTitle = styled.h1`
    color: black;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
    text-transform: uppercase;
`
export default TopRated;