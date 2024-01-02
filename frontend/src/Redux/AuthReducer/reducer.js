import { LOGIN, LOGOUT } from "./actionType"
const initState = {
    isAuth: false,
    token: "",
    user: {}
}
export const AuthReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN: {
            return { ...state, isAuth: true, token: payload.token, user: payload.userDetails }
        }
        case LOGOUT: {
            return { ...state, isAuth: false, token: "", userDetails: {} }
        }
        default: {
            return state
        }
    }
}