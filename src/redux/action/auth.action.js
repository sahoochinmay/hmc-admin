import { AUTH_SIGNIN, AUTH_SIGNOUT } from "../constant/auth.constant"
import { showAlert, loadingStart, loadingEnd } from "./global.action"
import { auth } from "../../config/firebase"

export const authSignIn = ({ email, password }) => dispatch => {
  dispatch(loadingStart())
  auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      dispatch({
        type: AUTH_SIGNIN,
        payload: res.user
      })
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Logged in Successfully."
        })
      )
      dispatch(loadingEnd())
    })
    .catch(err => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message
        })
      )
      dispatch(loadingEnd())
    })

}

export const authSignOut = () => dispatch => {
  dispatch(loadingStart())
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: AUTH_SIGNOUT,
        payload: null
      })
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Logged out successfully."
        })
      )
      dispatch(loadingEnd())
    })
    .catch(err => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message
        })
      )
      dispatch(loadingEnd())
    })
}
