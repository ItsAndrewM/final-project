import styled from "styled-components";
import Genre from "./Genre";

//genre page that handles mapping the genres and genre id's
const Genres = ({result}) => {
    return (
        <Wrapper>
            {result.genres.map((genre) => {
                return (
                <Genre key={genre.id} genre={genre} />
                )
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`

export default Genres;