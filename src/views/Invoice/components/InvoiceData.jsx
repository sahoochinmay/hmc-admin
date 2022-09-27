import { View,Text,StyleSheet } from '@react-pdf/renderer'
import React from 'react'
const borderColor = '#000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        border: 1,
        alignItems: 'left',
        fontStyle: 'bold',
    },
    invoice:{
        width: '20%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        padding: 5,
    },
    invoiceNO: {
        width: '35%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        padding: 5,
        display: 'flex',
        flexDirection: 'row'
    },
    dateLabel: {
        width: '20%',
        textAlign: 'right',
        padding: 5,
    },
    date: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'left',
        padding: 5,
    },
  });

const InvoiceData = ({data}) => {
    return (
        <View style={styles.row}>
            <Text style={styles.invoice} >INVOICE NO:</Text>
            <Text style={styles.invoiceNO}>{data?.regNo}</Text>
            <Text style={styles.dateLabel}>Date:</Text>
            <Text style={styles.date}>{data?.date}</Text>
        </View>
    )
}

export default InvoiceData
