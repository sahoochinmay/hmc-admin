import React, { useState } from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft, PowerSettingsNew,FiberManualRecord } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { MainListItems } from "./layouts/ListItems";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "./redux/action/auth.action";
// components
import {Dashboard, Invoice, Ticket} from "./views/index";
import profileImage from './assets/images/profile.jpg'
import { AddTicket, EditTicket, TicketDetails } from "./views/Ticket/components";

// function Copyright() {
//   return (
//     <Typography
//       variant="body2"
//       color="textSecondary"
//       align="center"
//       style={{ marginTop: "20px" }}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="">
//       Auto Vision Services
//       </Link>
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // background: "rgb(235,42,42)",
    // background:
      // "linear-gradient(90deg, rgba(235,42,42,1) 8%, rgba(186,55,187,1) 52%, rgba(0,172,255,1) 100%)",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 15,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  profileDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px 0",
    position: "relative",
  },
  imgDiv: {
    height: "55px",
    width: "55px",
    borderRadius: "50%",
    border: "3px solid #5B63FE",
    backgroundColor: "#ff4377",
  },
  status: {
    color: "#5B63FE",
    position: "absolute",
    left: "130px",
    top: "55px",
  },
}));
const Router = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const {user, isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  //   role for divison
  // const role = "admin";
  //   check auth
  // if (!isLoggedIn) {
  //   props.history.push("/");
  //   return <p>Pleasae Login</p>;
  // }
  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSignOutClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOutClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(authSignOut());
    props.history.push("/");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Auto Vision Services
          </Typography>
          <IconButton onClick={handleSignOutClick} color="inherit">
            <PowerSettingsNew />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleSignOutClose}
          >
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {open && (
          <div className={classes.profileDiv} >
            <img src={profileImage} alt="" className={classes.imgDiv} />
              <FiberManualRecord className={classes.status} />
            <small
              style={{
                margin: "5px 0",
                fontSize: "15px",
              }}
              className="text"
            >
              {user?.email}
            </small>
          </div>
        )}
        <List>
          <MainListItems />
        </List>
        <Divider />
        <Divider style={{ marginBottom: "180px" }} />
        {/* {open && <CopyRight className={classes.copyRightOpen} />} */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <>
            <Route exact path="/home/" component={Dashboard} />
            <Route exact path="/home/ticket" component={Ticket} />
            <Route exact path="/home/ticket/add" component={AddTicket} />
            <Route exact path="/home/ticket/edit" component={EditTicket} />
            <Route exact path="/home/ticket/detail" component={TicketDetails} />
            <Route exact path="/home/invoice" component={Invoice} />
          </>
        </Switch>
      </main>
    </div>
  );
};

export default Router;
