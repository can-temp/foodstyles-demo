import React from 'react';
import { StyleSheet, Text as ReactText, TextProps } from 'react-native';

function Text(props:TextProps){
    return <ReactText {...props} style={[styles.text, props.style]} />
}


const styles = StyleSheet.create({
    text:{
        fontFamily: 'ProximaNova-Regular',
        fontSize: 18
    }
});

export default Text;