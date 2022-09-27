import {
  ALERT_START,
  ALERT_END,
  LOADING_END,
  LOADING_START
} from "../constant/global.constant"

const initialState = {
  flag: false,
  type: "",
  msg: "",
  loading: false
}

const globalReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ALERT_START:
      return {
        ...state,
        flag: true,
        type: payload.type,
        msg: payload.msg
      }
    case ALERT_END:
      return {
        ...state,
        flag: false,
        type: "",
        msg: ""
      }
    case LOADING_START:
      return {
        ...state,
        loading: true
      }
    case LOADING_END:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default globalReducer
