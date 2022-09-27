import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    indexs:{
        width: '4%',
        textAlign: 'left',
        paddingLeft: "2px"
    },
    description: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '11%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    gst: {
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    price:{
        width: '13%'
    }
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.indexs}>Sl.No</Text>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.qty}>Quantity</Text>
        <Text style={styles.rate}>Unit Price</Text>
        <Text style={styles.gst}>GST</Text>
        <Text style={styles.price} >Price</Text>
    </View>
  );
  
  export default InvoiceTableHeader