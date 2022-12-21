import Axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_SUCCESS } from "../constants/userConstants";


export const register = (name, email, dob, gender, password, batch) => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload:{name, email, dob, gender, password, batch}});
    try{
        const {data} = await Axios.post('/api/users/register', {name, email, dob, gender, password, batch});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}