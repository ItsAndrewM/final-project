import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CrewDetailsGenres from "./CrewDetailsGenres";
import Loading from "./Loading";
import Mapped from "./Mapped";

//this page displays information regarding various crew members.  Like directors, cinematographers, etc.
const CrewDetails = () => {
    const [crew, setCrew] = useState()
    const location = useLocation();
    const [crewCredits, setCrewCredits] = useState([]);
    const [castCredits, setCastCredits] = useState([]);
    const [backdrop, setBackdrop] = useState();
    const [showCast, setShowCast] = useState(false)
    const [showCrew, setShowCrew] = useState(true)
    const [showGenre, setShowGenre] = useState(false)
    const [showProduction, setShowProduction] = useState(false)
    const [birthday, setBirthday] = useState();
    const [options, setOptions] = useState({ year: 'numeric', month: 'long', day: 'numeric' })
    const [age, setAge] = useState();

    //similiar to actors, this displays the age of a crew
    const getAge = (date) => {
        const today = new Date();
        const birthdate = date;
        const age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        return age;
    }

    //fetching crew data from a useLocation hook to get the id
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FILMLABS_URL}/actor/${location.state.id}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setCrew(data.data);
            const birthdate = new Date(data.data.birthday)
            setBirthday(birthdate.toLocaleString(undefined, options))
            setAge(getAge(new Date(data.data.birthday)))
        })
        .catch((error) => {
            return error;
        })
    }, [location])

    //then, if they appeared in movies as a cast member or crew member is fetched
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FILMLABS_URL}/actor/${location.state.id}/movie_credits`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setCrewCredits(data.data.crew);
            setCastCredits(data.data.cast);
            data.data.crew.find((movie) => {
                //check for first existing backdrop
                if (movie.backdrop_path !== null) {
                    return setBackdrop(movie.backdrop_path)
                }
            })
        })
        .catch((error) => {
            return error;
        })
    }, [crew])

    if (crew && crewCredits) {
        return (
            <Wrapper>
                {backdrop && 
                <StyledHeroImage style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${backdrop})`}}></StyledHeroImage>
                }
                <ElementWrapper>
                <LeftWrapper>
                </LeftWrapper>
                <InfoWrapper>

                    <TitleWrapper>
                    <ImgWrapper>
                        <Img src={`http://image.tmdb.org/t/p/w154${crew.profile_path}`} />
                    </ImgWrapper>
                        <StyledTitle>{crew.name}</StyledTitle>
                        <StyledDirector>
                            <StyledYear>Birthdate: {birthday}</StyledYear>
                            <StyledYear>Age: {age}</StyledYear>
                        </StyledDirector>
                        <StyledDirector><StyledP>Known for: <StyledSpan>{crew.known_for_department}</StyledSpan></StyledP></StyledDirector>
                    </TitleWrapper>
                    <DescriptionWrapper>
                        <StyledDescription>{crew.biography}</StyledDescription>
                    </DescriptionWrapper>
                    <ButtonWrapper>
                        {castCredits.length !== 0 &&
                        <DepartmentButton onClick={() => {setShowCast(!showCast); setShowCrew(false); setShowGenre(false); setShowProduction(false)}} style={showCast ? {color: 'yellow'} : {color: 'white'}}>Cast</DepartmentButton>
                        }
                        <DepartmentButton onClick={() => {setShowCrew(!showCrew); setShowCast(false); setShowGenre(false); setShowProduction(false)}} style={showCrew ? {color: 'yellow'} : {color: 'white'}}>Crew</DepartmentButton>
                        <DepartmentButton onClick={() => {setShowGenre(!showGenre); setShowCast(false); setShowCrew(false); setShowProduction(false)}} style={showGenre ? {color: 'yellow'} : {color: 'white'}}>Genre</DepartmentButton>
                    </ButtonWrapper>
                    <DepartmentWrapper style={{display: showCast === false ? 'none' : null}}>
                        {castCredits.length !== 0 &&
                        <StyledHeader>Casted in:</StyledHeader>}
                        <Mapped credits={castCredits} />
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showCrew === false ? 'none' : null}}>
                        <StyledHeader>Crew in:</StyledHeader>
                        <Mapped credits={crewCredits} />
                    </DepartmentWrapper>
                    <DepartmentWrapper style={{display: showGenre === false ? 'none' : null}}>
                        <StyledHeader>Genre:</StyledHeader>
                        <CrewDetailsGenres crewCredits={crewCredits} />
                    </DepartmentWrapper>
                </InfoWrapper>
                <RightWrapper>
                </RightWrapper>
                </ElementWrapper>
            </Wrapper>
        );
    }
    else {
        <Loading />
    }
}

const ImgWrapper = styled.div`
    margin-top: -150px;
    margin-right: 10px;
`

const Img = styled.img`
    border: 5px solid var(--accent-primary-color);
    border-radius: 5px;
`

const StyledSpan = styled.span`
    text-decoration: underline;
`

const Wrapper = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 25px;
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
    justify-content: flex-start;
    align-items: flex-start;
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

const LeftWrapper = styled.div`
    widtH: 25%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
`

const RightWrapper = styled.div`
    widtH: 25%;
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
    width: 100%;
    color: grey;
    font-size: 15px;
    margin-right: 10px;
`

const StyledDirector = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
`

const DescriptionWrapper = styled.div`
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
`



export default CrewDetails;