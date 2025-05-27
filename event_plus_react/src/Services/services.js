import axios from "axios";

const apiPorta = "5047";

//apilocal ela recebe o endereco da api
const apiLocal = `http://localhost:${apiPorta}/api/`;

//api que possui todo o codigo acima, nesta linha estou de fato declarando que a api e realmente tudo isso e pode ser declarada em outros lugares
const api = axios.create({
    baseURL: apiLocal
});

export default api; 