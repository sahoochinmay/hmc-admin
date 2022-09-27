import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Delete, Add, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "../../contextApi/Context";
import { v4 } from "uuid";
import { foodsRef } from "../../config/firebase";
import { loadingEnd, loadingStart, showAlert } from "../../redux/action/global.action";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalForm: {
    width: "400px",
  },
  buttonCol: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));
 
const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // NOTE: add
  const [addModal, setAddModal] = useState(false);
  const [add_name, setAdd_name] = useState("");
  const [add_url, setAdd_url] = useState("");
  const [add_type, setAdd_type] = useState("");
  const [add_price, setAdd_price] = useState("");
  const { foods, setFoods } = useGlobalContext();
  // NOTE: delete
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    dispatch(loadingStart());
    let arr = [];
    foodsRef
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push(doc.data());
        });
        setFoods([...arr]);
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
  const addFood = async () => {
    if (add_name === "" || add_url === "" || add_type === "" || add_price === "") {
      dispatch(
        showAlert({
          type: "error",
          msg: "Please enter all mandatory fields.",
        })
      );
      return;
    }
    setAddModal(false);
    dispatch(loadingStart());
    let id = v4();
    foodsRef
      .doc(id)
      .set({
        _id: id,
        name: add_name,
        image: add_url,
        size: add_type,
        price: add_price,
      })
      .then((docs) => {
        dispatch(
          showAlert({
            type: "success",
            msg: "😄 Food added successfully.",
          })
        );
        dispatch(loadingEnd());
        setFoods([
          ...foods,
          {
            _id: id,
            name: add_name,
            image: add_url,
            size: add_type,
            price: add_price,
          },
        ]);
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
  const deleteFood = async (id) => {
    dispatch(loadingStart());
    foodsRef
      .doc(id)
      .delete()
      .then((docs) => {
        dispatch(
          showAlert({
            type: "success",
            msg: "😄 Ticket removed successfully.",
          })
        );
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
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <MaterialTable
        title="Foods"
        columns={[
          {
            title: "Image",
            field: "image",
            render: (rowData) => (
              <img
                alt="food_image"
                src={rowData?.image}
                style={{
                  widht: "50px",
                  height: "50px",
                  marginLeft: "20px",
                }}
              />
            ),
          },
          { title: "Name", field: "name" },
          { title: "Size", field: "size" },
          { title: "Price", field: "price" },
        ]}
        data={foods}
        components={{
          Action: (props) => {
            switch (props?.action?.icon) {
              case "add":
                return (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    size="small"
                    variant="contained"
                    color="primary"
                    style={{
                      textTransform: "none",
                    }}
                  >
                    <Add /> Add Food
                  </Button>
                );
              case "edit":
                return (
                  <Edit
                    onClick={(event) => props.action.onClick(event, props.data)}
                    style={{
                      cursor: "pointer",
                      margin: "0 10px",
                    }}
                  />
                );
              case "delete":
                return (
                  <Delete
                    onClick={(event) => props.action.onClick(event, props.data)}
                    style={{
                      cursor: "pointer",
                      margin: "0 10px",
                    }}
                  />
                );
              default:
                return (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    variant="contained"
                    style={{ textTransform: "none" }}
                    size="small"
                  >
                    default
                  </Button>
                );
            }
          },
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Add Food",
            isFreeAction: true,
            onClick: (event, rowData) => {
              setAddModal(true);
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Food",
            onClick: (event, rowData) => {
              // history.push({
              //   pathname: "/home/ticket/edit",
              //   data: rowData,
              // });
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Food",
            onClick: (event, rowData) => {},
          },
        ]}
        options={{
          pageSize: 10,
          actionsColumnIndex: -1,
          exportButton: true,
          exportAllData: true,
          headerStyle: { fontWeight: "bold", color: "white", background: "#3f51b5" },
        }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addModal}
        onClose={() => setAddModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ textAlign: "center" }}>
              Add Food
            </h2>
            <div className={classes.modalForm}>
              <TextField
                required
                type="text"
                label="Food Name"
                style={{ width: "100%", marginBottom: "10px" }}
                value={add_name}
                onChange={(e) => setAdd_name(e.target.value)}
              />
              <TextField
                required
                type="text"
                label="Image URL"
                style={{ width: "100%", marginBottom: "20px" }}
                value={add_url}
                onChange={(e) => setAdd_url(e.target.value)}
              />
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={add_price}
                  onChange={(e) => setAdd_price(e.target.value.replace(/[^0-9]/g, ""))}
                  startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                />
              </FormControl>
              <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup aria-label="type" name="type" value={add_type} onChange={(e) => setAdd_type(e.target.value)}>
                  <FormControlLabel value="Half" control={<Radio color="primary" />} label="Half" />
                  <FormControlLabel value="Full" control={<Radio color="primary" />} label="Full" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className={classes.buttonCol}>
              <Button variant="contained" onClick={() => setAddModal(false)} color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={() => addFood()}>
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Index;
