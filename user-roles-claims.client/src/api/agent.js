import axios from "axios";

axios.defaults.baseURL=process.env.REACT_APP_API_URL;
// axios.defaults.withCredentials=true;

// axios.interceptors.request.use(config=>{
//     const token=store.getState().account.user?.accessToken;
//     if(token) config.headers.Authorization=`Bearer ${token}`;
//     return config;
// })

const requests={
    get:(url)=>axios.get(url),
    post:(url, body={})=>axios.post(url,body),
    update:(url, body={})=>axios.put(url,body),
    delete:(url)=>axios.delete(url),
}

const User={
    get:()=>requests.get('users'),
    post:(body)=>requests.post(`users/login`, body),
    postRegister:(body)=>requests.post(`users/register`, body)
}

const Pages={
    get:()=>requests.get('pages'),
    post:(body)=>axios.post(`pages`,body)
}

const Roles={
    get:()=>requests.get('roles'),
    getUsersRoles:()=>requests.get('roles/users'),
    getUserRolesByEmail:(email)=>requests.get(`roles/user/${email}`),
    post:(body)=>axios.post(`roles`,body),
    postAddUserToRole:(body)=>axios.post(`roles/add`, body)
}

const agent={
    User,
    Pages,
    Roles
}

export default agent;