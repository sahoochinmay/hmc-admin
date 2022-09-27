import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer:{
        flexDirection: 'row',
        marginTop: 10,
    },
    reportTitle:{
        color: '#ff3300',
        letterSpacing: 2,
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight:"900"
    }
  });


  const InvoiceTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default InvoiceTitle