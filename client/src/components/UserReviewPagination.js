import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const pageSize = 5;
//pagination for user reviews since every review is added to a single array instead of indiviual cases
export const UserReviewPagination = ({setReviewPagination}) => {
    const {userReviews} = useContext(UserContext);
    const [pagination, setPagination] = useState({
        count: 0, 
        from: 0, 
        to: pageSize
    });
    

    
    useEffect(() => {
        setPagination({...pagination, count: userReviews.length});
        setReviewPagination(userReviews.slice(pagination.from, pagination.to));
        
    }, [userReviews, pagination.from, pagination.to])

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