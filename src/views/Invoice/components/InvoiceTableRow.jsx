import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        fontStyle: 'bold',
    },
    indexs:{
        width: '4%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        padding: 2,
    },
    description: {
        width: '46%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        padding: 3,
        display: 'flex',
        flexDirection: 'row'
    },
    qty: {
        width: '11%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    gst: {
        textAlign: 'right',
        paddingRight: 8,
        width: '13%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    price:{
        textAlign: 'right',
        paddingRight: 8,
        width: '13%'
    }
  });
  // fix to 2 decimal place string
  function twoDecimalString(str){
    return str.toFixed(2);
  }

const InvoiceTableRow = ({items}) => {
    const rows = items?.map( (item,index) => 
        <View style={styles.row}>
            <Text style={styles.indexs} >{index+1}</Text>
            <Text style={styles.description}>{item?.description}</Text>
            <Text style={styles.qty}>{item?.quantity}</Text>
            <Text style={styles.rate}>{item?.unitPrice}</Text>
            <Text style={styles.gst}>{item?.gstValue}</Text>
            <Text style={styles.price} >{item?.price}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableRow