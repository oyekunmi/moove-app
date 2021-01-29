import React from 'react';
import { StyleSheet, Image, Text, View, StatusBar } from 'react-native';
import RedButton from './RedButton';
import { normalize } from '../normalizeFont';
import Title from './Title';
import { ScrollView } from 'react-native-gesture-handler';

const Message = ({
    title,
    text,
    subTitle,
    buttonTitle,
    routeTo,
    headerOptionHandler,
    messageType,
    fontIcon
}) => {
    
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#132535" />
            <Title
                showBackButton={true}
                title={title}
                fontIcon="arrow_back_light"
                statusBarStyle="light-content"
                subTitle={subTitle}
                subTitleStyle={{ fontSize: normalize(22) }}
                containerStyle={{ paddingHorizontal: normalize(18) }}
                titleStyle={styles.title}
                headerOptionHandler={headerOptionHandler}
            />

            <View style={styles.content}>
                <Image style={styles.image} source={
                    messageType === "CANCELLED" ?
                    require('./../../assets/cancelled.png'):require('./../../assets/check-mark-icon.png')
                } /> 
                <View ><Text style={styles.text}>{text}</Text></View>
            </View>

            <RedButton
                title={buttonTitle}
                buttonStyle={styles.lastButton}
                onPress={routeTo}
            >
            </RedButton>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132535',
    },
    text: {
        color: '#F1F1F1',
        fontSize: normalize(15),
        textAlign: "center",
		fontFamily: 'Roboto_400Regular',
    },
    title: {
        color: '#F1F1F1',
    },
    content:{
        flexGrow:2, 
        alignItems: "center", 
        justifyContent: "center",
        paddingHorizontal: normalize(50),
    },
    image: {
        marginBottom: normalize(40),
    },
    //v2
    // content:{
    //     flexGrow:2, 
    //     alignItems: "center", 
    //     justifyContent: "space-evenly",
    //     paddingHorizontal: normalize(50)
    // },
    // image: {
    // },
    lastButton:  {
        marginBottom: normalize(10),
        marginTop: normalize(15),
        alignSelf: "center",
        width: '90%',
    },
})

export default Message;