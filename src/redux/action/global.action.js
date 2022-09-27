import {
  ALERT_END,
  ALERT_START,
  LOADING_END,
  LOADING_START
} from "../constant/global.constant"

export const showAlert = ({ type, msg }) => dispatch => {
  dispatch({
    type: ALERT_START,
    payload: {
      type: type,
      msg: msg
    }
  })
}
export const closeAlert = () => dispatch => {
  dispatch({
    type: ALERT_END,
    payload: null
  })
}

export const loadingStart = () => dispatch => {
  dispatch({
    type: LOADING_START,
    payload: null
  })
}

export const loadingEnd = () => dispatch => {
  dispatch({
    type: LOADING_END,
    payload: null
  })
}
