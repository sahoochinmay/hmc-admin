import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import banner from "../../../assets/images/banner.png";
import { InvoiceTitle, InvoiceCompany, BillTo, InvoiceItemsTable } from ".";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import InvoiceTableFooter from "./InvoiceTableFooter";
import InvoiceData from "./InvoiceData";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: "100%",
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const MainInvoice = ({ data }) => {
  console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={banner} />
        <InvoiceTitle title="Invoice" />
        <InvoiceCompany data={data} />
        <InvoiceData data={data} />
        <BillTo data={data}/>
        <InvoiceItemsTable data={data} />
        <InvoiceTableFooter items={data?.work} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
};

export default MainInvoice;
