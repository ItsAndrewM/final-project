import styled from "styled-components";
import { BiCameraMovie, BiUserCircle } from "react-icons/bi";
import { RiFilePaper2Line } from "react-icons/ri";
import LogoIcon from '../assets/film-labs-icon.png'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";

//navbar is persistent throughout each page
//displays a search bar, a logo that redirects to home and a film, list and account link
const Navbar = () => {
    const { isAuthenticated } = useAuth0();
    const [searchData, setSearchData ] = useState();

    const searchRef = useRef();
    const navigate = useNavigate();

    //handle search is passed through props to collect information typed int he search bar
    const handleSearch = (key, value) => {
        setSearchData({
            ...searchData,
            [key]: value
        })
    }

    //handle submit handles whether a user has clicked on movies or person. if neither is pressed, movies is the default and the search bar is reset
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchData.category === 'movies') {
            navigate(`/search/movies/${searchData.data}`)
        }
        if (searchData.category === 'person') {
            navigate(`/search/people/${searchData.data}`)
        }
        else {
            navigate(`/search/movies/${searchData.data}`)
        }
        searchRef.current.reset();
    }

    return (
        <Wrapper>
            <LeftSide>
                <NavItem to='/'>
                    <Logo src={`${LogoIcon}`} />
                    <StyledH1>FILM LABS</StyledH1>
                </NavItem>
            </LeftSide>
            <Middle>
                <SearchBar>
                    <SearchInput handleSearch={handleSearch} searchRef={searchRef} handleSubmit={handleSubmit}/>
                </SearchBar>
            </Middle>
            <RightSide>
                <StyledIcon>
                    <NavItem to='/movies'>
                        <StyledCameraIcon />
                        <SmallerH>FILMS</SmallerH>
                    </NavItem>
                </StyledIcon>
                <StyledIcon>
                    <NavItem to='/lists'>
                        <StyledRiFilePaper2Line />
                        <SmallerH>Lists</SmallerH>
                    </NavItem>
                </StyledIcon>
                <StyledIcon>
                    {/* if the user is logged in, this link will redirect/show 2 different states */}
                    {!isAuthenticated ? 
                    <NavItem to='/register'>
                        <StyledUserCircle />
                        <SmallerH>Sign Up</SmallerH>
                    </NavItem>
                    :
                    <NavItem to='/account'>
                        <StyledUserCircle />
                        <SmallerH>ACCOUNT</SmallerH>
                    </NavItem>
                    }
                </StyledIcon>
            </RightSide>
        </Wrapper>
    );
}

const StyledRiFilePaper2Line = styled(RiFilePaper2Line)`
    color: white;
    width: 35px;
    height: auto;
    transition: .2s;
    padding-bottom: 10px;
`

const Wrapper = styled.div`
    width: 100%; 
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    background-color: var(--accent-primary-color);
    padding: 0;
    box-shadow: rgba(16, 55, 120, 0.3) 0px 1px 2px 0px, rgba(21, 31, 48, 0.15) 0px 1px 3px 1px;
`

const RightSide = styled.div`
    width: 33%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const Middle = styled.div`
    width: 33%;
    display: flex;
    justify-content: center;
    height: auto;
    align-items: center;
`

const LeftSide = styled.div`
    width: 33%;
    display: flex;
    justify-content: flex-start;
    height: auto;
    align-items: center;
`

const StyledH1 = styled.h1`
    font-size: 50px;
    transition: .2s;
    width: auto;
    text-align: center;
`

const SmallerH = styled.p`
    font-size: 20px;
    transition: .2s;
    width: auto;
    text-align: center;
    text-transform: uppercase;
    &:hover {
        opacity: .75;
    }
`

const SearchBar = styled.div`
    width: 65%;
`

const Logo = styled.img`
    width: 60px;
    height: auto;
    padding: 0;
    transition: .2s;
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const StyledIcon = styled.div`
    width: auto;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledCameraIcon = styled(BiCameraMovie)`
    color: white;
    width: 40px;
    height: 40px;
    transition: .2s;
    padding-bottom: 10px;

`

const StyledUserCircle = styled(BiUserCircle)`
    color: white;
    padding-bottom: 5px;
    width: 40px;
    height: 40px;
    transition: .2s;

`




export default Navbar;