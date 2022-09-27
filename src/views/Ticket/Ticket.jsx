import React, { useEffect  , useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, CircularProgress, Button ,Modal , Fade} from "@material-ui/core";
import { Delete, Add, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { fetchTicket, removeTicket } from "../../redux/action/ticket.action";
import Moment from "moment";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonCol: {
    display: "flex",
    justifyContent: "space-evenly"
  }
}));

const Ticket = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [serverToDelete ,setServerToDelete] = useState()
  const { ticketList, reload } = useSelector((state) => state.ticketReducer);
  useEffect(() => {
    dispatch(fetchTicket());
  }, [dispatch, reload]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(ticketList)
  const handleDeleteServer = () =>{
    dispatch(removeTicket(serverToDelete?._id));
  }
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Backdrop style={{ zIndex: "10000", color: "#fff" }} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MaterialTable
        title="Invoice"
        columns={[
          { title: "Reg. No", field: "regNo" },
          { title: "Invoice. No", field: "regNo" },
          { title: "Name", field: "customerName" },
          {
            title: "Date",
            field: "date",
            render: (rowData) => (
              <p>{Moment(rowData?.date).format("DD-MM-YYYY")}</p>
            ),
          },
          {title:"Payment" , field:"payment"},
          { title: "Make of Car", field: "makeOfCar" },
          { title: "Model" , field: "carModel" },
          {
            title: "Details",
            field: "details",
            render: (rowData) => (
              <Button
                style={{
                  textTransform: "none",
                }}
                color="primary"
                variant="contained"
                onClick={() => {
                  history.push({
                    pathname: "/home/ticket/detail",
                    data: rowData,
                  });
                }}
              >
                Details
              </Button>
            ),
          },
        ]}
        data={ticketList}
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
                    <Add /> Add Invoice
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
              history.push({
                pathname: "/home/ticket/add",
              });
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Food",
            onClick: (event, rowData) => {
              history.push({
                pathname: "/home/ticket/edit",
                data: rowData,
              });
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Food",
            onClick: (event, rowData) => {
              handleOpen()
              setServerToDelete(rowData)
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          exportAllData:true,
          headerStyle:{fontWeight: "bold",
           color: "white" ,
          background: "#3f51b5"}
        }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Do you really want to delete the Ticket ?</h2>
            <div className={classes.buttonCol} >
              <Button onClick={handleClose} >No</Button><Button onClick={handleDeleteServer} >Yes</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Ticket;
