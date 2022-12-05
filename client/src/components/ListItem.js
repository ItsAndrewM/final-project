import { useContext, useState } from "react";
import styled from "styled-components";
import { AltPagination } from "./AltPagination";
import { UserContext } from "./UserContext";
import UserListItem from "./UserListItem";
import { FaTrashAlt } from "react-icons/fa";
import DeleteListModal from "./DeleteListModal";

//a movie list made by a user to be displayed on the users account page and will display a button for when a user wants to remove the item from their list/account
const ListItem = ({item, index}) => {
    const [pagination, setPagination] = useState([]);
    //above handles items displayed for pagination
    const {userLists} = useContext(UserContext);
    const [deleteList, setDeleteList] = useState(false)
    //when an item is ready to be deleted, user will click button to change state to display the modal
    
    if (userLists.lists[item]) {
        return (
            <>  
                <TitleWrapper>
                    <StyledP key={index}>{item}</StyledP>
                    <DeleteButton onClick={()=>setDeleteList(!deleteList)}><FaTrashAlt /></DeleteButton>
                    <DeleteListModal deleteList={deleteList} setDeleteList={setDeleteList} title={item}/>
                </TitleWrapper>
                <UserListItemWrapper>
                {pagination.map((listItem, index) => {
                    return (
                        <UserListItem key={index} listItem={listItem} title={item}/>
                    )
                })
                }
                <AltPagination setIncomingPagination={setPagination} array={userLists.lists[item]} />
                </UserListItemWrapper>
            </>
        );
    }
    else {
        return (
        <></>
        )
    }
  
}

const DeleteButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    color: var(--primary-color);
    background-color: var(--accent-primary-color);
    border-radius: 5px;
    margin: 10px 5px 15px 10px;
    padding: 5px 10px 5px 10px;
    border: none;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .75;
    }

`

const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledP = styled.h1`
    color: black;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 18px;
`

const UserListItemWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`
export default ListItem;