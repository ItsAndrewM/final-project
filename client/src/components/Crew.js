import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

//component fetches crew information for a movie and then sorts through the crew and arranges each into their respective department to display on the page

const Crew = ({resultCredits}) => {
    const [departmentsArr, setDepartmentsArr] = useState([]);
    const [departmentsObj, setDepartmentsObj] = useState({});
    const newArr = [];
    //first, the crew credits are iterated through and checked if they include a department from the departments array.
    //if they dont, the crew department gets pushed into the array to avoid including duplicates
    //this is also not hardcoded as some movies have different departments
    useEffect(() => {
        resultCredits.crew.forEach((crew) => {
            if (newArr.includes(crew.department) === false) {
                newArr.push(crew.department)
            }
            return newArr;
        });
        //the array is then set in state and iterated through and assigned as a key to an object
        setDepartmentsArr(newArr);
        const newObj = {};
        newArr.forEach((department) => {
            newObj[department] = [];
        })
        //then crew members are added to their respective department in an array 
        resultCredits.crew.forEach((crew) => {
            newObj[crew.department].push(crew);
        })
        setDepartmentsObj(newObj);
    }, [resultCredits])

    return (
        <Wrapper>
        <CrewWrapper>
            {departmentsArr.map((department, index) => {
                return (
                    <IndividualCrewWrapper key={index}>
                        <Title>{department}:</Title>
                        {departmentsObj[department].map((element, index) => {
                            return (
                                <NavItem key={index} to={`/crew/${element.name}`} state={{id: element.id}}>
                                    <StyledP>{element.name}</StyledP>
                                </NavItem>
                            )
                        })}
                    </IndividualCrewWrapper>
                    )
            })}
        </CrewWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

const CrewWrapper = styled.div`
    width: 100%;
`

const IndividualCrewWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    width: auto;
    height: auto;
`

const StyledP = styled.p`
    width: auto;
    color: black;
    padding: 0;
    margin: 0;
    border: 1px solid black;
    margin-right: 5px;
    padding: 5px;
    transition: .2s;
    margin-top: 2px;
    margin-bottom: 2px;
    &:hover {
        background-color: var(--accent-primary-color);
        color: white;
    }
`

const Title = styled.h1`
    color: black;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 10px;
`


export default Crew;