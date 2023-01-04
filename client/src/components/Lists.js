import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { UserContext } from "./UserContext";

//fetch made to add a movie to a new/existing list
const Lists = ({result}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    //displays whether a select option should be disabled or not (includes inputs)
    const {userLists, action, listState, userListsKeys} = useContext(UserContext);
    const [listName, setListName] = useState();
    //form data for the list_name. everytime one is added or selected it overrides the other making it so the user cant add 2
    const {user} = useAuth0();
    
    //ref clears the input field when a existing list name is selected for further error handling
    const ref = useRef();

    //rerenders page anytime a change in lsit context is made
    useEffect(() => {

    }, [listState])

    //function to handle changee
    const handleChange = (key, value) => {
        setListName({...listName,
            [key]: value,
        })
    }

    //this function handles submitting the new list item to add to the existing or new list the list item is submitted to the database 
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.FILMLABS_URL}/users/${user.email}/lists`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author_details: {
                    avatar_path: user.picture,
                },
                author: user.email,
                created_at: new Date().toISOString(),
                movie: result,
                list_name: listName.list_name
            }),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            if (data.status === 200) {
                //alert is given to show list item was added (item is added to 2 seperate collections)
                window.alert('movie added to list successfully');
                //reducer is then used to update state
                action.receiveNewList(data.data)
            }
            else {
                window.alert('something went wrong!')
            }
        })
        .catch((error) => {
            return error;
        });
    }
    
    if (userListsKeys) {
        return (
            <Wrapper>
                <StyledForm>
                    <StyledH>Pick from an existing list or create a new list</StyledH>
                    <InputWrapper>
                        <StyledLabel>Enter a new list name:</StyledLabel>
                        <StyledInput ref={ref} onChange={(e) => handleChange("list_name", e.currentTarget.value)} disabled={isDisabled}/>
                    </InputWrapper>
                    <SelectWrapper>
                        <StyledLabel >Add to existing list</StyledLabel>
                        <StyledSelect onChange={(e)=> {handleChange('list_name', e.currentTarget.value); ref.current.value=''}}>
                            <StyledOption  defaultValue value=''>Select from existing lists</StyledOption>
                            {userListsKeys.map((key, index) => {
                                return (
                                    <StyledOption key={index} value={key}>{key}</StyledOption>
                                )
                            })}    
                        </StyledSelect>
                    </SelectWrapper>
                    <ButtonWrapper>
                        <SubmitButton onClick={handleSubmit}>Add to list</SubmitButton>
                    </ButtonWrapper>
                </StyledForm>
            </Wrapper>
        );
    }
    else {
        <Loading />
    }
    
}

const StyledH = styled.h1`
    width: 100%;
    color: var(--accent-primary-color);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px;
`

const SubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }
`

const StyledLabel = styled.label`
    text-align: right;
    font-family: var(--body-font-family);
`

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
`

const SelectWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
`

const StyledInput = styled.input`
    width: 59%;
    padding: 0;
    margin: 0;
    outline: none;
    border: 1px solid var(--accent-primary-color);
    padding: 2px 0px 2px 10px;
    transition: .2s;
    border-radius: 5px;
    color: black;
    &:focus {
        color: black;
        border: 2px solid var(--accent-secondary-color);
    }

`

const StyledSelect = styled.select`
    width: 61%;
    border: 1px solid var(--accent-primary-color);
    padding: 2px;
    transition: .2s;
    border-radius: 5px;
    color: black;
    &:focus {
        color: black;
        border: 2px solid var(--accent-secondary-color);
    }
`

const StyledOption = styled.option`
    color: black;
`
export default Lists;