import { useLocation } from "react-router-dom";

const Show = () => {
    const location = useLocation()
    return (
        <div>
            {location.state.id}
        </div>
    );
}
 
export default Show;