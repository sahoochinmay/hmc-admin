import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  vehicleContainer: {
    paddingRight: "10px",
    width: "40%"
  },
  companyName: {
    fontSize: "13",
    fontWeight: "bold",
  },
  billToContainer: {
    // marginLeft: "22%",
    // marginTop: "30px",
  },
  heading: {
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  vehicleData: {
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000",
    borderTop: "1px solid #000",
    flexDirection: "row",
    alignItems: "center",
    //   width: "10%"
  },
  label: {
    padding: "5px 3px 3px 5px",
    borderRight: "1px solid #000",
    width:"50%"
  },
  labelData: {
    padding: "5px 3px 3px 5px",
    width:"50%"
  },
  lastLabel: {
    padding: "5px 3px 3px 5px",
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000",
    width:"50%"
  },
  lastLabelData: {
    padding: "5px 3px 3px 5px",
    borderBottom: "1px solid #000",
    width:"50%"
  }
});

const BillTo = ({ data }) => (
  <View style={styles.mainContainer}>
    <View style={styles.billToContainer}>
      <Text style={styles.heading}>Customer Info:</Text>
      <Text>{data?.customerName}</Text>
      <Text>{data?.address}</Text>
      <Text>{data?.phone}</Text>
      <Text>A.B.N:44610768388</Text>
    </View>
    <View style={styles.vehicleContainer}>
      <Text style={styles.heading}>Vehicle Info:</Text>
      <View style={styles.vehicleData}>
        <Text style={styles.label}>Reg No:</Text>
        <Text style={styles.labelData}>{data?.regNo}</Text>
      </View>
      <View style={styles.vehicleData}>
        <Text style={styles.label}>Car:</Text>
        <Text style={styles.labelData}>{data?.makeOfCar}</Text>
      </View>
      <View style={styles.vehicleData}>
        <Text style={styles.label}>Car Model:</Text>
        <Text style={styles.labelData}>{data?.carModel}</Text>
      </View>
      <View style={styles.vehicleData}>
        <Text style={styles.lastLabel}>Speedo Reading:</Text>
        <Text style={styles.lastLabelData}>{data?.speedoReading}</Text>
      </View>
    </View>
  </View>
);

export default BillTo;
