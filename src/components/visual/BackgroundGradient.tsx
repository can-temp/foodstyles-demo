import Color from 'assets/color';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


function BackgroundGradient(){
    return  <View style={styles.container}>
                <LinearGradient 
            start={{x:0,y:0}} 
            end={{x:1,y:0}} 
            colors={[Color.orangish, Color.maize]} style={styles.topGradient}></LinearGradient>
              <LinearGradient 
            start={{x:0,y:0}} 
            end={{x:0,y:1}} 
            locations={[0, 0.26, 0.83, 1]}
            colors={['#ffffff00', '#fdfdfd33', '#f9f9f9d9', '#f8f8f8']} style={styles.faderGradient}></LinearGradient>
        </View>

}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: Color.background,
    },
    topGradient:{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: 157,
    },
    faderGradient:{
        position: 'absolute',
        left: 0,
        top: 79,
        right: 0,
        height: 80,
    }
});

export default BackgroundGradient;