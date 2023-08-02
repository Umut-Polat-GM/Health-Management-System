import axios from "axios";

const getAllSpcialization =  () => {
    
   
    return axios.get("http://localhost:3001/api/users/getAllSpecialization");

}

export default getAllSpcialization
