import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

// const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    // borderBottomColor: "#bff0fd",
    // borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ items }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [gstTotal, setGstTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // convert to number
  function roundFloat(num,n){
    return parseFloat(Number(Math.round(parseFloat(num+'e'+n)) + 'e-'+ n).toFixed(n))
  }
  // fix to 2 decimal place string
  // function (str){
  //   return str.toFixed(2);
  // }
  // total price calculation
  useEffect(() => {
    let subVal = 0;
    let gstVal = 0;
    let totalVal = 0;
    items?.forEach((val) => {
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
  }, []);
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>Sub-Total</Text>
        <Text style={styles.total}>{subTotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>GST-Total</Text>
        <Text style={styles.total}>{gstTotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Total</Text>
        <Text style={styles.total}>{totalPrice}</Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
