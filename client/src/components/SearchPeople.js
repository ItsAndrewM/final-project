import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PeopleSearchResult from "./PeopleSearchResult";

//component handles searching for people instead of movies
const SearchPeople = () => {
    const {person} = useParams();
    const [searchResults, setSearchResults] = useState([]);

    //handles fetching people (includes cast and crew)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FILMLABS_URL}/search/people/${person}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setSearchResults(data.data)
        })
    }, [person])

    return (
        <Wrapper>
            <ResultsWrapper>
                <ResultsAmount>There are {searchResults.length} results matching "{person}"</ResultsAmount>
                {searchResults.map(((result, index) => {
                    return (
                        <PeopleSearchResult key={index} result={result} />
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
export default SearchPeople;