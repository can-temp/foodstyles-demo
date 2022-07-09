import Color from 'assets/color';
import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import Text from './Text';

function Bold(props:TextProps){
    return <Text {...props} style={[styles.bold, props.style]} />
}


const styles = StyleSheet.create({
    bold:{
        fontFamily: 'ProximaNovaA-Bold',
        color: Color.textColor
    }
});

export default Bold;