import { AUTH_SIGNIN, AUTH_SIGNOUT } from "../constant/auth.constant"

const initialState = {
  user: null,
  isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case AUTH_SIGNIN:
      return {
        ...state,
        user: payload,
        isLoggedIn: true
      }
    case AUTH_SIGNOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      }
    default:
      return state
  }
}

export default authReducer
