import { LoginAPI } from "../../service/userservice";
import { toast } from "react-toastify";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const USER_REFRESH = "USER_REFRESH";
export const USER_LOGOUT = "USER_LOGOUT";

export const handleloginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN })

        let arr = await LoginAPI(email.trim(), password);
        if (arr && arr.token) {

            localStorage.setItem("token", arr.token);
            localStorage.setItem("email", email.trim());

            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email.trim(), token: arr.token }
            })
        } else {
            //error
            if (arr && arr.status === 400) {
                toast.error(arr.data.error);
            }
            dispatch({
                type: FETCH_USER_ERROR
            })
        }
    }
}
export const handlelogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}
export const handleRefreshRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        })
    }
}