import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Dashboard, ListAlt, Fastfood } from "@material-ui/icons";
import SideBarItem from "../utils/SideBarItem.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  activeTab: {
    color: "white",
    background: "#3f51b5",
    padding: "3px",
    borderRadius: "5px",
  },
  iconBox: {
    transform: "scale(1.2)",
    overflow: "hidden",
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const role = "admin";
  useEffect(() => {
    console.log(window.location.pathname);
    SideBarItem?.forEach((sb) => {
      if (window.location.pathname?.includes(sb?.url)) {
        setActiveTab(sb?.name);
        return;
      }
    });
  }, []);

  switch (role) {
    case "admin":
      return (
        <div className="text secondary__bg">
          {SideBarItem.map((data) => {
            return (
              <ListItem button onClick={() => setActiveTab(data?.name)} component={Link} to={data?.url}>
                <ListItemIcon className={data?.name === activeTab ? classes.iconBox : null}>
                  {
                    {
                      Dashboard: <Dashboard className={`${data?.name === activeTab ? classes.activeTab : "primary__color"}`} />,
                      Invoice: <ListAlt className={`${data?.name === activeTab ? classes.activeTab : "primary__color"}`} />,
                      Foods: <Fastfood className={`${data?.name === activeTab ? classes.activeTab : "primary__color"}`} />,
                    }[data?.name]
                  }
                </ListItemIcon>
                <ListItemText primary={data?.name} />
              </ListItem>
            );
          })}
        </div>
      );
    default:
      return null;
  }
};

export const secondaryListItems = <div></div>;
