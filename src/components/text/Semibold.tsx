import Color from 'assets/color';
import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import Text from './Text';

function Semibold(props:TextProps){
    return <Text {...props} style={[styles.bold, props.style]} />
}


const styles = StyleSheet.create({
    bold:{
        fontFamily: 'ProximaNovaA-SemiBold',
        color: Color.textColor
    }
});

export default Semibold;