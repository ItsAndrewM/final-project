import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GenreContext } from "./GenreContext";

//search bar for searching movies by genre
//genres are stored in the genre context (which include genre names and Id's)
const GenreBar = () => {
    const {genres} = useContext(GenreContext)
    const navigate = useNavigate();

    //whenever a change in the selected genre is made, this function handles that change
    //by getting index of the selected genre and then passing the genre through state and useNavigate
    const handleChange = (e) => {
        e.preventDefault();
        const index = e.target.selectedIndex-1
        const selectedGenre = genres[index]
        if (selectedGenre !== undefined) {
            navigate(`/movies/genre/${selectedGenre.name}`, {state: selectedGenre})
        }
    }

    if (genres) {
        return (
            <StyledForm>
                <StyledLabel>Select a genre:</StyledLabel>
                <StyledSelect onChange={handleChange}>
                    <StyledOption defaultValue={{ label: "Select a genre below:", value: 'Select a genre below:'}}>Select a genre below:</StyledOption>
                    {genres.map((genre) => {
                        return (
                            <StyledOption key={genre.id} name={genre.name} value={genre.id}>{genre.name}</StyledOption>
                        )
                    })}
                    
                </StyledSelect>
            </StyledForm>
        );
    }
    else {
        <div>
            1 sec
        </div>
    }
}

const StyledForm = styled.form`
    font-family: 'Fugaz One Regular';
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const StyledLabel = styled.label`
    margin-right: 10px;
`

const StyledSelect = styled.select`
    border-radius: 25px;
    width: 30%;
    text-align: center;
`

const StyledOption = styled.option`
    text-transform: uppercase;
    font-family: 'Roboto Regular';
    text-align: center;
`

export default GenreBar;