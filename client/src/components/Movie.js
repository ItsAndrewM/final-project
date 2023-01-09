import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import Cast from "./Cast";
import Crew from "./Crew";
import Genres from "./Genres";
import ListModal from "./ListModal";
import Loading from "./Loading";
import Production from "./Production";
import Ratings from "./Ratings";
import Recomended from "./Recomended";
import Reviews from "./Reviews";
import StarRating from "./StarRating";
import {AiFillEye, AiOutlineEye} from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

//this component is for when a link for a movie is clicked. this page renders and displays actors in the movie, crew working on the movie, 
//the genre and production company as well as reccomended movies and any review that have been made
const Movie = () => {
    const [result, setResult] = useState();
    const [resultCredits, setResultCredits] = useState();
    const [open, setOpen] = useState(false);
    const [showCast, setShowCast] = useState(true);
    const [showCrew, setShowCrew] = useState(false);
    const [showGenre, setShowGenre] = useState(false);
    const [showProduction, setShowProduction] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showRecommended, setShowRecommended] = useState(false);
    const [seen, setSeen] = useState(false);
    const {isAuthenticated} = useAuth0();

    const location = useLocation();

    //function handles modal closing
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    }

    //fetch handles the movies information like posters, backdrops, id, overview, etc
    useEffect(() => {
        setSeen(false)
        //if a movie has been seen by a user it can be clicked on and marked as seen if not, page resets state on a rerender
        fetch(`${process.env.REACT_APP_FILMLABS_URL}/movie/${location.state.id}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            //result state contains all data about a specific movie
            setResult(data.data);
        })
        .catch((error) => {
            return error;
        })
    }, [location])

    //this fetch is for any credits for actors AND crew for a specific movie
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FILMLABS_URL}/movie/${location.state.id}/credits`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setResultCredits(data.data)
        })
        .catch((error) => {
            return error;
        })
    }, [result])

    if (result && resultCredits) {
        return (
            <Wrapper>
                <StyledHeroImage style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${result.backdrop_path})`}}></StyledHeroImage>
                <ElementWrapper>
                <InfoWrapper>
                    <TitleWrapper>
                        <StyledTitle>{result.title}</StyledTitle>
                        <StyledYear>{result.release_date.split("-")[0]}</StyledYear>
                        <StyledDirector><StyledP>Directed by:</StyledP> {resultCredits.crew.map((element) => {
                            //this section maps crew credits and finds the director(s) of a specific movie and adds a link to them
                            if (element.job === "Director") {
                                return (
                                    <NavItem key={element.id} to={`/crew/${element.name}`} state={{id: element.id}}>
                                        <StyledP>{element.name}</StyledP>
                                    </NavItem>
                                    );
                            }
                            
                        })}</StyledDirector>
                        {/* this secttion handles the stars that show up next to a movies title */}
                        <StarRating vote_average={result.vote_average} />
                        <StyledYear> {result.vote_count}</StyledYear>
                        <MarkAsSeen onClick={() => setSeen(!seen)}>
                            {!seen ?
                            <StyledAiOutlineEye />
                            :
                            <StyledAiFillEye />
                            }
                        </MarkAsSeen>
                    </TitleWrapper>
                    <DescriptionWrapper>
                        <StyledTagLine>{result.tagline}</StyledTagLine>
                        <StyledDescription>{result.overview}</StyledDescription>
                    </DescriptionWrapper>
                    <ListWrapper>
                        {isAuthenticated &&
                        <ListModal open={open} setOpen={setOpen} result={result} handleClose={handleClose}/>
                        }
                    </ListWrapper>
                    {/* the below section handles when a button is clicked and whether it shows crew, cast, production, reviews or reccomedations for a movie */}
                    <ButtonWrapper>
                        <DepartmentButton onClick={() => {setShowCast(!showCast); setShowRecommended(false); setShowReviews(false); setShowCrew(false); setShowGenre(false); setShowProduction(false)}} style={showCast ? {color: 'yellow'} : {color: 'white'}}>Cast</DepartmentButton>
                        <DepartmentButton onClick={() => {setShowCrew(!showCrew); setShowRecommended(false); setShowReviews(false); setShowCast(false); setShowGenre(false); setShowProduction(false)}} style={showCrew ? {color: 'yellow'} : {color: 'white'}}>Crew</DepartmentButton>
                        <DepartmentButton onClick={() => {setShowGenre(!showGenre); setShowRecommended(false); setShowReviews(false); setShowCast(false); setShowCrew(false); setShowProduction(false)}} style={showGenre ? {color: 'yellow'} : {color: 'white'}}>Genre</DepartmentButton>
                        <DepartmentButton onClick={() => {setShowProduction(!showProduction); setShowRecommended(false); setShowReviews(false); setShowGenre(false); setShowCast(false); setShowCrew(false)}} style={showProduction ? {color: 'yellow'} : {color: 'white'}}>Production</DepartmentButton>
                        <DepartmentButton onClick={() => {setShowRecommended(!showRecommended); setShowReviews(false); setShowProduction(false); setShowGenre(false); setShowCast(false); setShowCrew(false)}} style={showRecommended ? {color: 'yellow'} : {color: 'white'}}>Recommended</DepartmentButton>
                        <DepartmentButton onClick={() => {setShowReviews(!showReviews); setShowGenre(false); setShowCast(false); setShowCrew(false); setShowProduction(false); setShowRecommended(false)}} style={showReviews ? {color: 'yellow'} : {color: 'white'}}>Reviews</DepartmentButton>
                    </ButtonWrapper>
                    <DepartmentWrapper style={{display: showCast === false ? 'none' : null}}>
                        <StyledHeader>Cast:</StyledHeader>
                        <Cast resultCredits={resultCredits} />
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showCrew === false ? 'none' : null}}>
                        <StyledHeader>Crew:</StyledHeader>
                        <Crew resultCredits={resultCredits} />
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showGenre === false ? 'none' : null}}>
                        <StyledHeader>Genre:</StyledHeader>
                        <Genres result={result} />
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showProduction === false ? 'none' : null}}>
                        <StyledHeader>Production:</StyledHeader>
                        <Production result={result} />
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showRecommended === false ? 'none' : null}}>
                        <StyledHeader>Other Films like <StyledSpan>{result.title}:</StyledSpan></StyledHeader>
                        <Recomended location={location}/>
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showReviews === false ? 'none' : null}}>
                        <StyledHeader>Reviews:</StyledHeader>
                        <Ratings title={result.title} id={result.id} result={result}/>
                        <Reviews location={location}/>
                    </DepartmentWrapper>
                </InfoWrapper>
                </ElementWrapper>
            </Wrapper>
        );
    }
    else {
        return (
            <LoadingWrapper>
                <Loading />
            </LoadingWrapper>
        )
    }
}

const MarkAsSeen = styled.button`
    background-color: inherit;
    border: none;
    width: auto;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`
const StyledAiOutlineEye = styled(AiOutlineEye)`
    color: var(--accent-primary-color);
    width: 30px;
    height: auto;
`

const StyledAiFillEye = styled(AiFillEye)`
    color: var(--accent-primary-color);
    width: 30px;
    height: auto;
`

const ListWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledSpan = styled.span`
    text-decoration: underline;
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    width: auto;
    height: auto;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
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
    min-height: 700px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledHeroImage = styled.div`
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;
    width: 100%;
`

const ElementWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
`

const InfoWrapper = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    width: 50%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

const DepartmentButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    border: none;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
    &:active {
        color: yellow;
    }
`

const StyledTitle = styled.h1`
    color: black;
    text-transform: uppercase;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 30px;
`

const StyledP = styled.p`
    font-size: 15px;
    color: black;
    font-weight: bold;
    margin-right: 5px;
`

const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const StyledYear = styled.p`
    color: grey;
    font-size: 15px;
    margin-right: 10px;
`

const StyledDirector = styled.div`
    display: flex;
`

const DescriptionWrapper = styled.div`
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const StyledTagLine = styled.p`
    color: black;
    font-size: 15px;
    width: 100%;
    font-weight: bold;
    margin-bottom: 5px;
`

const StyledDescription = styled.p`
    color: black;
    width: 100%;
    line-height: 25px;
`

const DepartmentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`

const StyledHeader = styled.h1`
    text-transform: uppercase  ;
    color: black;
    margin: 0;
    padding: 0;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
`

export default Movie;