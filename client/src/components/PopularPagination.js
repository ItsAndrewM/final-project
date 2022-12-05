import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MoviesContext } from "./MoviesContext";

const pageSize = 5;

//this page handles the pagination for the popular movies based on the pagesize count, the length of the popular array and when a user clicks the "next" button
export const PopularPagination = ({setPaginatedPopular}) => {
    const {popular} = useContext(MoviesContext);
    const [pagination, setPagination] = useState({
        count: 0, 
        from: 0, 
        to: pageSize
    });
    

    
    useEffect(() => {
        setPagination({...pagination, count: popular.length});
        setPaginatedPopular(popular.slice(pagination.from, pagination.to));
        
    }, [popular, pagination.from, pagination.to])

    const handlePageChange = (e, page) => {
        const from = (page - 1) * pageSize;
        const to = (page -1) * pageSize + pageSize;
        setPagination({...setPagination, from: from, to: to})
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