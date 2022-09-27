import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  TextareaAutosize,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import { updateTicket } from "../../../redux/action/ticket.action";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1500,
  },
  tableHeading: {
    border: "0.5px solid gray",
    fontWeight: "bold",
  },
  tablePriceHeading: {
    border: "0.5px solid gray",
    borderRight: "none",
    fontWeight: "bold",
  },
  tableActionHeading: {
    border: "0.5px solid gray",
    borderLeft: "none",
  },
  indexBox: {
    border: "0.5px solid gray",
    width: "20px",
  },
  descriptionBox: {
    border: "0.5px solid gray",
    padding: "5px",
    width: "40%",
  },
  descriptionInput: {
    width: "100%",
    border: "none",
    outline: "none",
  },
  quantityBox: {
    border: "0.5px solid gray",
    padding: "5px",
    width: "15%",
  },
  unitPriceBox: {
    border: "0.5px solid gray",
    padding: "5px",
    width: "15%",
  },
  actionBox: {
    border: "0.5px solid gray",
    width: "20px",
  },
  addNewButton: {
    textTransform: "none",
    height: "fit-content",
    fontWeight: "700",
  },
});


const EditTicket = (props) => {
  let data = props.location?.data;
  if (!data) {
    props.history.push("/home/ticket");
  }
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [customerName, setCustomerName] = useState(data?.customerName);
  const [regNo, setRegNo] = useState(data?.regNo);
  const [makeOfCar, setMakeOfCar] = useState(data?.makeOfCar);
  const [model, setModel] = useState(data?.carModel);
  const [speedoReading, setSpeedoReading] = useState(data?.speedoReading);
  const [btnDisable, setBtnDisable] = useState(true);
  const [work, setWork] = useState([...data?.work]);
  const [date, setDate] = useState(data?.date);
  const [payment, setPayment] = useState(data?.payment);
  const [phoneNo, setPhoneNo] = useState(data?.phone);
  const [address, setAddress] = useState(data?.address);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gstTotal, setGstTotal] = useState(0);
  const onDescriptionChange = (index, value) => {
    let currentData = [...work];
    currentData[index] = {
      ...currentData[index],
      description: value,
    };
    setWork([...currentData]);
  };
  const onQuantityChange = (index, value) => {
    let currentData = [...work];
    let currentQuantity = `${parseInt(value)}`;
    if (currentQuantity === "NaN") {
      currentQuantity = "";
    }
    let price = currentPrice(
      currentQuantity,
      currentData[index]?.unitPrice,
      currentData[index]?.gstValue
    );
    currentData[index] = {
      ...currentData[index],
      quantity: currentQuantity,
      price: price,
    };
    setWork([...currentData]);
  };
  const onUnitPriceChange = (index, value) => {
    let currentData = [...work];
    let currentUnitPrice = `${roundFloat(value, 2)}`;
    if (currentUnitPrice === "NaN") {
      currentUnitPrice = "";
    }
    let price = currentPrice(
      currentData[index]?.quantity,
      currentUnitPrice,
      currentData[index]?.gstValue
    );
    currentData[index] = {
      ...currentData[index],
      unitPrice: currentUnitPrice,
      price: price,
    };
    setWork([...currentData]);
  };
  const onGstValueChange = (index, value) => {
    let currentData = [...work];
    let currentGstValue = `${roundFloat(value, 2)}`;
    if (currentGstValue === "NaN") {
      currentGstValue = "";
    }
    let price = currentPrice(
      currentData[index]?.quantity,
      currentData[index]?.unitPrice,
      currentGstValue
    );
    currentData[index] = {
      ...currentData[index],
      gstValue: currentGstValue,
      price: price,
    };
    setWork([...currentData]);
  };
  const currentPrice = (quantity, unitPrice, gstValue) => {
    if (quantity !== "" && unitPrice !== "" && gstValue !== "") {
      let intQuantity = parseInt(quantity);
      let floatUnitPrice = parseFloat(unitPrice);
      let floatGstValue = parseFloat(gstValue);
      let SubTotal = floatUnitPrice * intQuantity;
      let GstTotal = roundFloat(
        SubTotal * intQuantity * (floatGstValue * 0.01),
        2
      );
      let price = roundFloat(SubTotal + GstTotal, 2);
      return `${price}`;
    }
    return "";
  };
  const removeRow = (index) => {
    let currentWork = [...work];
    currentWork.splice(index, 1);
    setWork([...currentWork]);
  };
  const addNewRow = () => {
    setWork([
      ...work,
      {
        description: "",
        quantity: "",
        unitPrice: "",
        gstValue: "",
        price: "",
      },
    ]);
  };
  // add admin
  const handleTicketAdd = () => {
    history.push("/home/ticket");
    dispatch(
      updateTicket({
        id: data?._id,
        val: {
          customerName: customerName,
          regNo: regNo,
          makeOfCar: makeOfCar,
          carModel: model,
          speedoReading: speedoReading,
          work: work,
          date: date,
          payment:payment,
          phone: phoneNo,
          address: address
        },
      })
    );
  };
  //negative value check
  useEffect(() => {
    if (speedoReading < 0) {
      setSpeedoReading(speedoReading + "-");
    }
  }, [speedoReading]);
  //button activation
  useEffect(() => {
    if (
      customerName === "" ||
      regNo === "" ||
      makeOfCar === "" ||
      model === "" ||
      speedoReading === "" ||
      speedoReading === undefined ||
      work?.length === 0 ||
      phoneNo === undefined ||
      address === ""
    ) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [customerName, speedoReading, regNo,model, makeOfCar, work,phoneNo,address]);
  // convert to number
  function roundFloat(num,n){
    return parseFloat(Number(Math.round(parseFloat(num+'e'+n)) + 'e-'+ n)?.toFixed(n))
  }
  // fix to 2 decimal place string
  function twoDecimalString(str){
    return str?.toFixed(2);
  }
  // total price calculation
  useEffect(() => {
    let subVal = 0;
    let gstVal = 0;
    let totalVal = 0;
    work?.forEach((val) => {
      if (
        val?.unitPrice !== "" &&
        val?.quantity !== "" &&
        val?.gstValue !== ""
      ) {
        let UnitTotal = parseFloat(val?.unitPrice) * parseInt(val?.quantity);
        subVal = subVal + UnitTotal;
        gstVal =
          gstVal +
          roundFloat(
            UnitTotal *
              parseInt(val?.quantity) *
              (parseFloat(val?.gstValue) * 0.01),
            2
          );
        totalVal = totalVal + parseFloat(val?.price);
      }
    });
    setSubTotal(roundFloat(subVal, 2));
    setGstTotal(roundFloat(gstVal, 2));
    setTotalPrice(roundFloat(totalVal, 2));
  }, [work]);
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <ArrowBack
        style={{
          cursor: "pointer",
        }}
        onClick={() => history.push("/home/ticket")}
      />
      <Box ml={3}>
        <h3>Edit Repair Ticket</h3>
        <TextField
          required
          type="text"
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value.toUpperCase())}
        />
        <br />
        <br />
        <TextField
          required
          type="text"
          label="Reg. No"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value.toUpperCase())}
        />
        <br />
        <br />
        <TextField
          required
          type="text"
          label="Make Of Car"
          value={makeOfCar}
          onChange={(e) => setMakeOfCar(e.target.value.toUpperCase())}
        />
         <br />
        <br />
        <TextField
          required
          type="text"
          label="Car Model"
          value={model}
          onChange={(e) => setModel(e.target.value.toUpperCase())}
        />
        <br />
        <br />
        <NumberFormat
          value={speedoReading}
          displayType={"text"}
          thousandSeparator={true}
          onValueChange={(values) => {
            const { formattedValue, value } = values;
            setSpeedoReading(value);
          }}
          renderText={(value) => (
            <TextField
              required
              value={value}
              label="Speedo Reading"
              helperText="In Km"
              onChange={(e) => setSpeedoReading(e.target.value)}
            />
          )}
        />
        <br />
        <br />
        <label>Date&nbsp;&nbsp;</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <br />
        <PhoneInput
          placeholder="Phone number"
          value={phoneNo}
          defaultCountry="AU"
          style={{
            width: "90%",
            maxWidth: "200px",
          }}
          onChange={setPhoneNo}
        />
        <br />
        <label>Address:</label><br/>
        <TextareaAutosize
          style={{
            width: "90%",
            maxWidth: "200px",
            marginTop: "10px",
            padding: '7px'
          }}
          rowsMin={3}
          placeholder="Address here..."
          value={address}
          onChange={(e) =>setAddress(e.target.value)}
        />
        <br />
        <br />
        <h3>Work List</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeading}>Sl.</TableCell>
                <TableCell className={classes.tableHeading}>
                  Description
                </TableCell>
                <TableCell className={classes.tableHeading} align="center">
                  Quantity
                </TableCell>
                <TableCell className={classes.tableHeading} align="center">
                  Unit Price
                </TableCell>
                <TableCell className={classes.tableHeading} align="center">
                  GST<small>(in %)</small>
                </TableCell>
                <TableCell className={classes.tablePriceHeading} align="center">
                  Price
                </TableCell>
                <TableCell className={classes.tableActionHeading}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {work.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.indexBox}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.descriptionBox}
                  >
                    <TextareaAutosize
                      className={classes.descriptionInput}
                      value={row?.description}
                      onChange={(e) =>
                        onDescriptionChange(index, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="left" className={classes.quantityBox}>
                    <input
                      type="number"
                      className="numberInput"
                      value={row?.quantity}
                      onChange={(e) => onQuantityChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="left" className={classes.unitPriceBox}>
                    <input
                      type="number"
                      className="numberInput"
                      value={row?.unitPrice}
                      onChange={(e) => onUnitPriceChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="left" className={classes.unitPriceBox}>
                    <input
                      type="number"
                      className="numberInput"
                      value={row?.gstValue}
                      onChange={(e) => onGstValueChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center" className={classes.unitPriceBox}>
                    {row?.price}
                  </TableCell>
                  <TableCell className={classes.actionBox}>
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => removeRow(index)}
                    >
                      x
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <section className="tableBottom">
            <Button
              variant="outlined"
              className={classes.addNewButton}
              color="primary"
              onClick={addNewRow}
            >
              Add New Work
            </Button>
            <section className="totalCalculation">
              <h4>
                SubTotal: <span style={{ float: "right" }}>${subTotal}</span>
              </h4>
              <h4>
                GST:<span style={{ float: "right" }}>${gstTotal}</span>
              </h4>
              <hr />
              <h3>
                Total:<span style={{ float: "right" }}>${totalPrice}</span>
              </h3>
              <hr />
            </section>
          </section>
        </TableContainer>
        <br />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment</FormLabel>
          <RadioGroup
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            defaultValue="Balance"
          >
            <FormControlLabel
              value="Paid"
              control={<Radio color="primary" />}
              label="Paid"
            />
            <FormControlLabel
              value="Balance"
              control={<Radio color="primary" />}
              label="Balance"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <Button
          disabled={btnDisable}
          variant="contained"
          color="primary"
          onClick={handleTicketAdd}
        >
          Update
        </Button>
        <p>{btnDisable ? "* Please fill all the field." : null}</p>
      </Box>
    </Box>
  );
};

export default EditTicket;
