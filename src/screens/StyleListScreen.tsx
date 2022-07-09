import Color from 'assets/color';
import Images from 'assets/images';
import CardView from 'components/CardView';
import BackgroundGradient from 'components/visual/BackgroundGradient';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Image, LayoutRectangle, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearShareLink, createCard, getCards } from 'state/card/actions';
import { cardsSelector, lastShareLinkIdSelector } from 'state/card/selectors';
import { Card } from 'state/types';
import { BlurView, BlurViewProperties, VibrancyView } from "@react-native-community/blur";
import CardOptions from 'components/CardOptions';
import Bold from 'components/text/Bold';
import Share from 'react-native-share';
import { getRandomName } from 'utils/card';

type SelectionOverlayProps = {
    card:Card,
    fromCoords:LayoutRectangle,
    onClosePress: () => void
}

function SelectionOverlay(props:SelectionOverlayProps){
    console.log(props.fromCoords)
    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 150
        }).start();
    }, [])
    return <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFillObject, {opacity: animation}]}>
            <BlurView blurType='ultraThinMaterialLight' style={StyleSheet.absoluteFill}></BlurView>
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: [1, 1.012, 1]
                })
            }
        ]}]}>
            <CardOptions card={props.card} onClose={props.onClosePress} style={[StyleSheet.absoluteFillObject, {top: props.fromCoords.y}]} />

        </Animated.View>
    </View>
}


function StyleListScreen(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCards());
    }, []);
    const [selectedCard, setSelectedCard] = useState<Card>();
    const [selectedViewCoords, setSelectedViewCoords] = useState<LayoutRectangle>();
    const [isShareOpen, setShareOpen] = useState(false);
    const cards = useSelector(cardsSelector);
    const lastShareId = useSelector(lastShareLinkIdSelector);

    useEffect(() => {
        if(lastShareId && !isShareOpen){
            setShareOpen(true);
            const url = `https://cards.foodstyles.com/${lastShareId}`;
            // this doesn't look exactly as in the screenshot because it's populated from the server and the metadata isn't populated.
            (async () => {
                try{
                   await Share.open({
                        url,
                    })
                }finally{
                    dispatch(clearShareLink());
                    setShareOpen(false);
                }
            })();
        }
    }, [lastShareId])
   
    const onPressCreate = () => {
        dispatch(createCard(getRandomName()));
    }

    const onPressCard = (card:Card, from:LayoutRectangle) => {
        setSelectedViewCoords(from);
        setSelectedCard(card);
    }

    const onDismissCard = () => {
        setSelectedCard(undefined);
        setSelectedViewCoords(undefined);
    }

    return <View style={styles.container}>
        <StatusBar animated barStyle={'light-content'} />
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.gradientContainer}>
                <BackgroundGradient />
            </View>
            <View style={styles.topArea}>
                <Pressable style={styles.topButton}>
                    <Image source={Images.logo}></Image>
                </Pressable>
            </View>
            <View style={styles.content}>
                <FlatList<Card> style={styles.list} contentContainerStyle={styles.listContent} data={cards} renderItem={({item}) => <CardView card={item} onButtonPress={(from) => onPressCard(item, from)} />}>
                </FlatList>
            </View>
        </SafeAreaView>
        <View style={styles.bottomArea}>
            <Pressable style={styles.createCardContainer} onPress={onPressCreate}>
                <SafeAreaView>
                        <View style={styles.createCardInnerContainer}>
                            <View style={styles.createCardIconContainer}>
                                <Image source={Images.add} />
                            </View>
                            <Bold>New Food Style</Bold>
                        </View>
                </SafeAreaView>
                <View style={styles.bottomWhiteStrip}/>
            </Pressable>
        </View>
        {
            selectedCard ? <SelectionOverlay card={selectedCard} fromCoords={selectedViewCoords!} onClosePress={onDismissCard} /> : null
        }
    </View>
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Color.background
    },
    gradientContainer:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
    list: {
    },
    topArea: {
        height: 50
    },
    topButton: {
        paddingHorizontal: 19,
        top: 9
    },
    content:{
        flex: 1,
        paddingTop: 17,
    },
    listContent: {
        paddingBottom: 80
    },
    bottomArea: {
        position: 'absolute',
        left: 0,
        bottom: 5,
        right: 0,
    },

    createCardContainer: {
        paddingHorizontal: 18,
        marginBottom: 6
    },

    createCardInnerContainer: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 11,
        paddingRight: 18,
        paddingLeft: 8,
        flexDirection: 'row',
        fontSize: 18,
        borderRadius: 6,
        shadowColor: '#b0b0b066',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 2},
        alignItems: 'center',
        height: 46,
        bottom: -1
    },

    createCardIconContainer: {
        top: 2.5,
        left: -2,
        width: 36,
        marginRight: 1
    },

    bottomWhiteStrip: {
        backgroundColor: 'white',
        shadowColor: '#00000030',
        shadowRadius: 8,
        shadowOpacity: 1,
        shadowOffset: {height: 0, width: 0},
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -126,
        height: 155,
        zIndex: -1
    }


});

export default StyleListScreen;