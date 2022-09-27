import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'white'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    description: {
        width: '100%',
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

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(1).fill(0)
    const rows = blankRows?.map( (x, i) => 
        <View style={styles.row} >
            <Text style={styles.description}></Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace