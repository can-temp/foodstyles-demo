import Color from 'assets/color';
import Images from 'assets/images';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, Image, Pressable, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteCard, duplicateCard, shareCard } from 'state/card/actions';
import { Card } from 'state/types';
import CardView from './CardView';
import Semibold from './text/Semibold';
import Text from './text/Text';


type CardOptionsProps = {
    card: Card,
    onClose: () => void,
    style:StyleProp<ViewStyle>,
};
function CardOptions(props:CardOptionsProps){
    const [animation1] = useState(new Animated.Value(0));
    const [animation2] = useState(new Animated.Value(0));
    const [animation3] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.spring(animation1, {
            toValue: 1,
            useNativeDriver: true,
            damping: 12
        }).start();
        Animated.spring(animation2, {
            toValue: 1,
            delay: 80,
            damping: 12,
            useNativeDriver: true
        }).start();
        Animated.spring(animation3, {
            toValue: 1,
            delay: 160,
            damping: 12,
            useNativeDriver: true
        }).start();
    }, []);
    const dispatch = useDispatch();
    const share = () => {
        dispatch(shareCard(props.card.id));
        props.onClose();
    }
    const duplicate = () => {
        dispatch(duplicateCard(props.card.id));
        props.onClose();
    }
    const remove = () => {
        Alert.alert('Confirm delete', 'This will delete Food Style and all its settings', [
            {
                onPress: () => {
                    dispatch(deleteCard(props.card.id));
                },
                style: 'destructive',
                text: 'Delete'
            },
            {
                text: 'Cancel'
            }
        ])
        
        props.onClose();
    }
    return <View style={[styles.container, props.style]}>
        <CardView card={props.card} isOpen onButtonPress={props.onClose} />
        <View style={styles.options}>
            <Animated.View style={{ transform: [{ scale: animation1 }]}}>
                <Pressable style={styles.button} onPress={share}>
                    <Semibold style={styles.buttonText}>Share</Semibold>
                    <Image source={Images.share}/>
                </Pressable>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: animation2 }]}}>
                <Pressable style={styles.button} onPress={duplicate}>
                    <Semibold style={styles.buttonText}>Duplicate</Semibold>
                    <Image source={Images.duplicate}/>
                </Pressable>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: animation3 }]}}>
                <Pressable style={styles.button} onPress={remove}>
                    <Semibold style={styles.buttonText}>Delete</Semibold>
                    <Image source={Images.delete}/>
                </Pressable>
            </Animated.View>
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
        
    },
    options: {
        marginTop: 5,
        paddingHorizontal: 18,
        alignItems: 'flex-end'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: -2.2
    },
    buttonText: {
        color: Color.greenTeal,
        fontSize: 16,
        top: -2
    }
});

export default CardOptions;