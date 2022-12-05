import { useLocation } from "react-router-dom";

const ProductionDetails = () => {
    const location = useLocation();

    return (
        <div>
            {location.state.id}
        </div>
    );
}
 
export default ProductionDetails;