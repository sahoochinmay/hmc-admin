import { v4 } from "uuid";
import { ticketRef } from "../../config/firebase";
import { FETCH_TICKET, RELOAD_TICKET } from "../constant/ticket.constant";
import { loadingEnd, loadingStart, showAlert } from "./global.action";

export const fetchTicket = () => (dispatch) => {
  dispatch(loadingStart());
  let arr = [];
  ticketRef
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch({
        type: FETCH_TICKET,
        payload: arr,
      });
      dispatch(loadingEnd());
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch(loadingEnd());
    });
};

export const addTicket = (data) => (dispatch) => {
  dispatch(loadingStart());
  let id = v4();
  ticketRef
    .doc(id)
    .set({
      _id: id,
      ...data,
    })
    .then((docs) => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Ticket added successfully.",
        })
      );
      dispatch({
        type: RELOAD_TICKET,
        payload: null,
      });
      dispatch(loadingEnd());
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch(loadingEnd());
    });
};

export const removeTicket = (id) => (dispatch) => {
  dispatch(loadingStart());
  ticketRef
    .doc(id)
    .delete()
    .then((docs) => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Ticket removed successfully.",
        })
      );
      dispatch({
        type: RELOAD_TICKET,
        payload: null,
      });
      dispatch(loadingEnd());
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch(loadingEnd());
    });
};

export const updateTicket = ({ id, val }) => (dispatch) => {
  dispatch(loadingStart());
  ticketRef
    .doc(id)
    .update({
      ...val,
    })
    .then((docs) => {
      dispatch(
        showAlert({
          type: "success",
          msg: "😄 Ticket updated successfully.",
        })
      );
      dispatch({
        type: RELOAD_TICKET,
        payload: null,
      });
      dispatch(loadingEnd());
    })
    .catch((err) => {
      dispatch(
        showAlert({
          type: "error",
          msg: err.message,
        })
      );
      dispatch(loadingEnd());
    });
};
