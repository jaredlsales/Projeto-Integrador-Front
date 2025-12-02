import axios from "axios"

//Instância Axios configurada
const apiLocal = axios.create({
    baseURL:"http://localhost:3333"
})


export default apiLocal