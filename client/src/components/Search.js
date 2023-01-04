import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchResult from "./SearchResult";

//component that handles whenever a movie is searched through the search bar and mapps the results
const Search = () => {
    const {movie} = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`${process.env.FILMLABS_URL}/search/movies/${movie}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setSearchResults(data.data)
        })
    }, [movie])

    return (
        <Wrapper>
            <ResultsWrapper>
                <ResultsAmount>There are {searchResults.length} movies matching "{movie}"</ResultsAmount>
                {searchResults.map((film => {
                    return (
                        <SearchResult key={film.id} film={film} />
                    )
                }))}
            </ResultsWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ResultsWrapper = styled.div`
    margin-top: 20px;
    width: 50%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`

const ResultsAmount = styled.p`
    text-transform: uppercase;
    color: black;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
`

const Results = styled.div`

`

export default Search;