import { FETCH_USER_ERROR, FETCH_USER_LOGIN, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH } from "../actions/userActions";

const INITIAL_STATE = {
    count: {
        email: '',
        auth: null,
        token: '',
    },
    loadingAPI: false,
    isError: false
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {
                ...state,
                loadingAPI: true,
                isError: false
            };

        case FETCH_USER_SUCCESS:
            console.log(">> check action", action);
            return {
                ...state,
                count: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                loadingAPI: false,
                isError: false

            };
        case FETCH_USER_ERROR:

            return {
                ...state,
                count: {
                    auth: false,
                },
                loadingAPI: false,
                isError: true


            };
        case USER_LOGOUT:
            localStorage.removeItem("token")
            localStorage.removeItem("email")
            return {
                ...state,
                count: {
                    email: '',
                    token: '',
                    auth: false
                },
            }

        case USER_REFRESH:
            return {
                ...state,
                count: {
                    email: localStorage.getItem("email"),
                    token: localStorage.getItem("token"),
                    auth: true
                },
            }

        default: return state;

    }

};

export default userReducer;