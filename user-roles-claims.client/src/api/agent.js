import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/store";


axios.defaults.baseURL=process.env.REACT_APP_API_URL;
axios.defaults.withCredentials=true;

axios.interceptors.request.use(config=>{
    const token=store.getState().account.user?.accessToken;
    if(token) config.headers.Authorization=`Bearer ${token}`;
    return config;
})

const requests={
    get:(url)=>axios.get(url),
    post:(url, body={})=>axios.post(url,body),
    update:(url, body={})=>axios.put(url,body),
    delete:(url)=>axios.delete(url),
}

const User={
    get:()=>requests.get('user/login'),
    postLogin:(body)=>requests.post(`user/login`, body),
    postRegister:(body)=>requests.post(`user/register`, body)
}

const Pages={
    get:()=>requests.get('pages'),
    post:(body)=>axios.post(`pages`,body)
}

const Roles={
    get:()=>requests.get('roles'),
    post:(body)=>axios.post(`roles`,body)
}

const agent={
    User,
    Pages,
    Roles
}

export default agent;