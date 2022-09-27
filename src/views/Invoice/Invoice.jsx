import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { MainInvoice } from "./components";

const Invoice = (props) => {
  let data = props.location?.data;
    if (!data) {
      props.history.push("/home/ticket");
    }
  console.log(data)
  return (
    <PDFViewer width="100%" height="100%" >
      <MainInvoice data={data} />
    </PDFViewer>
  );
};

export default Invoice;
