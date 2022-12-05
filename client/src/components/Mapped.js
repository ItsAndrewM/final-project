import MappedItem from "./MappedItem";

//credits are mapped through this component
const Mapped = ({credits}) => { 
    return (
        credits.map((movie) => {
            return (
                <MappedItem other={movie}/>
            )
        })
    )
};


export default Mapped;