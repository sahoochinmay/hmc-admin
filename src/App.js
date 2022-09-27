import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { closeAlert } from "./redux/action/global.action";
// Initial Routes
import secondRoute from './Router'
import { Auth } from "./views";

const App = () => {
  const dispatch = useDispatch();
  const { flag, type, msg, loading } = useSelector(
    (state) => state.globalReducer
  );
  useEffect(() => {
    // Pre-requisites data to be load
  }, []);
  // alert close using redux
  const handleAlertClose = () => {
    dispatch(closeAlert());
  };
  return (
    <Router>
      <Backdrop style={{ zIndex: "10000", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={flag} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/home/" component={secondRoute} />
      </Switch>
    </Router>
  );
};

export default App;
