import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MoviesContext } from "./MoviesContext";

const pageSize = 5;

//pagination for the top rated movies
export const TopRatedPagination = ({setPaginatedTopRated}) => {
    const {topRated} = useContext(MoviesContext);
    const [pagination, setPagination] = useState({
        count: 0, 
        from: 0, 
        to: pageSize
    });
    

    
    useEffect(() => {
        setPagination({...pagination, count: topRated.length});
        setPaginatedTopRated(topRated.slice(pagination.from, pagination.to));
        
    }, [topRated, pagination.from, pagination.to])

    const handlePageChange = (e, page) => {
        const from = (page - 1) * pageSize;
        const to = (page -1) * pageSize + pageSize;
        setPagination({...setPagination, from: from, to: to})
    }

    return (
        <Wrapper>
            <Pagination count={Math.ceil(pagination.count / pageSize)} onChange={handlePageChange}  />
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