import axios from './axios';
const fetchallUser = (page) => {
    //use API to web Htt://reques.in
    //Call API
    return axios.get(`/api/users?page=${page}`);
}
const postcreatuser = (name, job) => {
    //use API de lay duoc ten va id
    //call api
    return axios.post("/api/users", { name, job });
}
const putupdateuser = (name, job) => {
    return axios.put("/api/users/2", { name, job })
}
const Deleteuser = (id) => {
    return axios.delete("api/users/2", { id })
}
//API of login
const LoginAPI = (email, password) => {
    return axios.post("/api/login", { email, password })
}
export { fetchallUser, postcreatuser, putupdateuser, Deleteuser, LoginAPI };