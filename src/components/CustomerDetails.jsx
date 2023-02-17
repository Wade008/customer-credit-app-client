
import {MultiTitle} from "./styled/CustomStyles";
import { useParams } from "react-router-dom"

function CustomerDetails() {


    const { custId } = useParams()
    console.log(custId)
    
    return (
        <MultiTitle>Update a customer</MultiTitle>
    )


}

export default CustomerDetails