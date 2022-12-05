import { useContext, useState } from "react";
import styled from "styled-components";
import { MoviesContext } from "./MoviesContext";
import UpcomingMovie from "./UpcomingMovie";
import { UpcomingPagination } from "./UpcomingPagination";

//upcoming featured movies
const Upcoming = () => {
    const {upcoming} = useContext(MoviesContext);
    const [paginatedUpcoming, setPaginatedUpcoming] = useState([])

    return (
        <Wrapper>
            <StyledTitle>Upcoming Movies:</StyledTitle>
            {paginatedUpcoming.map((movie) => {
                return (
                    <UpcomingMovie key={movie.id} movie={movie} />
                )
            })}
            <UpcomingPagination setPaginatedUpcoming={setPaginatedUpcoming} />
        </Wrapper>

    );
}

const Wrapper = styled.div`
    width: 100%;
    min-width: 420px;
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
export default Upcoming;