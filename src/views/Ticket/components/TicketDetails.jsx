import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const TicketDetails = (props) => {
  let data = props.location?.data;
  if (!data) {
    props.history.push("/home/ticket");
  }
  const [subTotal, setSubTotal] = useState(0);
  const [gstTotal, setGstTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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
    data?.work?.forEach((val) => {
      if (val?.unitPrice !== "" && val?.quantity !== "" && val?.gstValue !== "") {
        let UnitTotal = parseFloat(val?.unitPrice) * parseInt(val?.quantity);
        subVal = subVal + UnitTotal;
        gstVal = gstVal +  roundFloat(
          UnitTotal * parseInt(val?.quantity) * (parseFloat(val?.gstValue) * 0.01),
          2
        )
        totalVal = totalVal + parseFloat(val?.price)
      }
    });
    setSubTotal(roundFloat(subVal,2));
    setGstTotal(roundFloat(gstVal,2));
    setTotalPrice(roundFloat(totalVal,2));
  }, []);
  return (
    <Box component={Paper} m={2} p={2} elevation={3}>
      <ArrowBack
        style={{
          cursor: "pointer",
        }}
        onClick={() => props.history.push("/home/ticket")}
      />
      <Box ml={3}>
        <Button style={{
          float:"right",
          textTransform: "none",
          border: "1px solid "
        }} color="primary" 
        onClick={() =>props.history.push({
          pathname: "/home/invoice",
          data: data
        })}
        >Print Invoice</Button>
        <h2>Ticket Details</h2>
        <p>
          <strong>ID:</strong>&nbsp;{data?._id}
        </p>
        <p>
          <strong>Company/Customer Name:</strong>&nbsp;{data?.customerName}
        </p>
        <p>
          <strong>Reg. No:</strong>&nbsp;{data?.regNo}
        </p>
        <p>
          <strong>Make Of Car:</strong>&nbsp;{data?.makeOfCar}
        </p>
        <p>
          <strong>Car Model:</strong>&nbsp;{data?.carModel}
        </p>
        <p>
          <strong>Car No:</strong>&nbsp;{data?.carNo}
        </p>
        <p>
          <strong>Speedo Reading:</strong>&nbsp;{data?.speedoReading} km
        </p>
        {/* <p>
          <strong>Payment:</strong>&nbsp;{data?.payment}
        </p> */}
        <p>
          <strong>Date:</strong>&nbsp;{data?.date}
        </p>
        <p>
          <strong>Phone Number:</strong>&nbsp;{data?.phone}
        </p>
        <p>
          <strong>Address:</strong>&nbsp;{data?.address}
        </p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>
                    Index&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description
                  </strong>
                </TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price (Each in $)</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.work?.map((row, index) => (
                <TableRow key={row?.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {row?.description}
                  </TableCell>
                  <TableCell>{row?.quantity}</TableCell>
                  <TableCell>${row?.unitPrice}</TableCell>
                  <TableCell>{row?.gstValue}%</TableCell>
                  <TableCell>${row?.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><strong>SubTotal:</strong></TableCell>
                <TableCell><strong>${subTotal}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><strong>GST Total:</strong></TableCell>
                <TableCell><strong>${gstTotal}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><strong>Total Price:</strong></TableCell>
                <TableCell><strong>${totalPrice}</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><strong>Payment:</strong></TableCell>
                <TableCell><strong>{data?.payment}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TicketDetails;
