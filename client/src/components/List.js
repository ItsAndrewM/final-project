import { useContext, useEffect} from "react";
import styled from "styled-components";
import ListDetails from "./ListDetails";
import { ListsContext } from "./ListsContext";
import Loading from "./Loading";
import { UserContext } from "./UserContext";

//list page to display all lists of different site users, anytime someone makes a list it will be added to this page
const List = () => {
    const {allLists} = useContext(ListsContext);
    const {state, listState} = useContext(UserContext);

    useEffect(() => {

    }, [state, listState])


    if (allLists) {
        return (
            <Wrapper>
                <StyledH>Community lists</StyledH>
                <ListWrapper>
                {allLists.map((list, index) => {
                    return (
                        <>
                            <ListName key={index}><ListNameSpan>{list.list_name}</ListNameSpan> by: {list.author.split('@')[0]}</ListName>
                            <ListDetails  key={index+1*9}list={list} />
                        </>
                    )
                })}
                </ListWrapper>
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

const KeyDiv = styled.div`

`

const ListNameSpan = styled.span`
    &:hover {
        text-decoration: underline;
    }
`

const ListName = styled.h1`
    color: black;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`

const StyledH = styled.h1`
    color: black;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 10px;
    margin-top: 20px;
    font-size: 30px;
`

const Wrapper = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const LoadingWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ListWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

export default List;