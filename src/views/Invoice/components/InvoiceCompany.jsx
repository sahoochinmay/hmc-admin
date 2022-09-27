import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent:'space-between',
    marginTop: 10,
  },
  InvoiceCompanyDetails: {
    paddingRight: '10%'
  },
  companyName: {
    fontSize: "13",
    fontWeight: "bold",
  },
  invoiceDateContainer: {
    // marginLeft: "22%",
    // marginTop: "30px",
  },
  billTo: {
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique'
},
});

const InvoiceCompany = ({ data }) => {
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.invoiceDateContainer}>
      <Text style={styles.billTo}>Bill To:</Text>
        <Text>{data?.customerName}</Text>
        <Text>A.B.N:44610768388</Text>
        <Text>Reg No:&nbsp;{data?.regNo}</Text>
        <Text>Car:&nbsp;{data?.makeOfCar}</Text>
        <Text>Car Model:&nbsp;{data?.carModel}</Text>
        <Text>Speedo Reading:&nbsp;{data?.speedoReading} km</Text>
      </View> */}
      <View style={styles.InvoiceCompanyDetails}>
      <Text style={styles.companyName}>
          Yassin & Sons Pty Ltd T/A Auto Vision Services
        </Text>
        {/* <Text style={styles.companyName} ></Text> */}
        <Text>16 LILY STREET</Text>
        <Text>Coburg North, VIC 3058</Text>
        <Text>045 051 3480</Text>
        <Text>mtanveer565@yahoo.com</Text>
        {/* <Text>Invoice No:&nbsp;{data?.regNo}</Text>
        <Text>Date:&nbsp;{data?.date}</Text> */}
      </View>
    </View>
  );
};

export default InvoiceCompany;
