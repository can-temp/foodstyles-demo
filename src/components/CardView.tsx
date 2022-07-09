import Images from 'assets/images';
import React, { useRef } from 'react';
import { Image, LayoutRectangle, Pressable, StyleSheet, View } from 'react-native';
import { Card } from 'state/types';
import { findCoordinates } from 'utils/ui';
import Bold from './text/Bold';


type CardViewProps = {
    card: Card,
    onButtonPress: (from:LayoutRectangle) => void,
    isOpen?: boolean
};
function CardView(props:CardViewProps){
    const containerRef = useRef<View>(null);
    const onPress = async () => {
        const screenCoords = await findCoordinates(containerRef);
        props.onButtonPress(screenCoords)
    }
    return <View ref={containerRef} style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.textContainer}>
                <Bold style={styles.text}>{props.card.name}</Bold>
            </View>
            <Pressable style={styles.buttonContainer} onPress={onPress}>
                <Image source={props.isOpen ? Images.close : Images.options} />
            </Pressable>
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        marginBottom: 6,
    },
    text: {
    },
    textContainer: {
        marginRight: 24,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 18,
        flex: 1,
    },
    innerContainer: {
        paddingTop: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 6,
        shadowColor: '#b0b0b066',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 2},
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        width: 40,
        height: '100%',
        alignItems: 'center',
        paddingTop: 14,
        paddingRight: 12
    }
});

export default CardView;