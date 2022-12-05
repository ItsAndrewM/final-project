import SearchIcon  from '@mui/icons-material/Search';
import styled from "styled-components";


//component for rendering the search bar that displays in the navbar inlcuding the select options
const SearchInput = ({handleSearch, searchRef, handleSubmit}) => {

    //when enter is pressed, the  handle submit is "pressed"
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    return (
        <StyledForm ref={searchRef} onSubmit={handleSubmit}>
            <StyledIconWrapper >
                <SubmitButton type='submit'>
                    <StyledIcon />
                </SubmitButton>
            </StyledIconWrapper>
            <StyledSelect onChange={(e) => handleSearch("category", e.target.value)}>
                <StyledOption defaultValue={{ label: "search category:", value: 'search category:'}}>Search category:</StyledOption>
                <StyledOption name='movies' value='movies' >Movies</StyledOption>
                <StyledOption name='person' value='person' >Person</StyledOption>
            </StyledSelect>
            <StyledInput name="data" type="text" placeholder="SEARCH HERE" onChange={(e) => handleSearch("data", e.target.value)} onKeyDown={handleKeyDown}/>
        </StyledForm>
    );
}

const StyledSelect = styled.select`
    color: white;
    background-color: inherit;
    border: none;
    width: 70%;
    margin-left: 10px;
    font-family: 'Fugaz One Regular';
    text-transform: uppercase;
    outline: none;
`

const StyledOption = styled.option`
    background-color: inherit;
    font-family: 'Fugaz One Regular';
`

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    transition: .2s;
    &:hover {
        background-color: var(--accent-secondary-color);
        border: 1px solid var(--primary-color);
    }
`

const SubmitButton = styled.button`
    background-color: inherit;
    border: none;
    margin: 0;
    padding: 0;
    margin-left: 10px;
`

const StyledIcon = styled(SearchIcon)`
    color: var(--primary-color);
`

const StyledIconWrapper = styled.div`
`

const StyledInput = styled.input`
    border: none;
    background-color: inherit;
    color: var(--primary-color);
    width: 100%;
    &::placeholder {
        color: var(--primary-color);
        text-align: center;
        font-family: 'Fugaz One Regular';
    }
    &:focus {
        outline: none;
        border-bottom: 1px solid var(--primary-color);

    }

`
export default SearchInput;
