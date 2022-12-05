import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const pageSize = 5;

//this component is a reuseable component for adding pagination to an array when displaying it and since a lot of my pages contain arrays it was important to make one that's reusable
export const AltPagination = ({setIncomingPagination, array}) => {
    const [pagination, setPagination] = useState({
        count: 0, 
        from: 0, 
        to: pageSize
    });

    //above is the intitial state of the component and below is the useEffect that triggers when the array prop is changes or the index of from and to change
    useEffect(() => {
        //theyre are then sliced to make sure to only show 5 items on the page
        setPagination({...pagination, count: Number(array.length)});
        setIncomingPagination(array.slice(pagination.from, pagination.to));
        
    }, [array, pagination.from, pagination.to])

    //this function allows the user to move through the array 
     const handlePageChange = (e, page) => {
        const from = (page - 1) * pageSize;
        const to = (page -1) * pageSize + pageSize;
        setPagination({...pagination, from: from, to: to})
    }

    return (
        <Wrapper>
            <Pagination count={Math.ceil(pagination.count / pageSize)} onChange={handlePageChange} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`