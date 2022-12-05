import { useContext, useState } from "react";
import styled from "styled-components";
import { MoviesContext } from "./MoviesContext";
import PopularMovie from "./PopularMovie";
import { PopularPagination } from "./PopularPagination";

//this page displays the popular movies category
const Popular = () => {
    const {popular} = useContext(MoviesContext);
    const [paginatedPopular, setPaginatedPopular] = useState([]);
    
    return (
        <Wrapper>
            <StyledTitle>Popular Movies:</StyledTitle>
            {paginatedPopular.map((movie) => {
                return (
                    <PopularMovie key={movie.id} movie={movie} />
                )
            })}
            <PopularPagination setPaginatedPopular={setPaginatedPopular} />
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

export default Popular;