import { useContext } from "react";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import TopRated from "./TopRated";
import Popular from "./Popular";
import { MoviesContext } from "./MoviesContext";
import Loading from "./Loading";
import GenreBar from "./GenreBar";

//this page handles displaying featured movies in 3 different categories as well as a search bar for different genres
const Movies = () => {
    const {popular, upcoming, topRated} = useContext(MoviesContext);

    if (popular && upcoming && topRated) {
        return (
            <Wrapper>
                <StyledH>Browse Movies by the following:</StyledH>
                <GenreBarWrapper>
                    <GenreBar />
                </GenreBarWrapper>
                <Upcoming />
                <TopRated />
                <Popular />
            </Wrapper>
        );
    }
    else {
        <LoadingWrapper>
            <Loading />
        </LoadingWrapper>
    }
}

const StyledH = styled.h1`
    color: black;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    margin-top: 20px;
    font-size: 30px;
`

const GenreBarWrapper = styled.div`
    height: 100px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`   

const Wrapper = styled.div`
    width: 100vw;
    height: auto;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;

`

export default Movies;