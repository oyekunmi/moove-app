import React from 'react'
import { StyleSheet, Image,Text, View } from 'react-native';
import RedButton from './RedButton';
import { normalize } from '../normalizeFont';
import Title from './Title';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132535',
        flex: 1,
        paddingHorizontal: normalize(10),

    },
    text: {
        color: '#F1F1F1',
        fontSize: normalize(15),
        marginHorizontal: normalize(50),
        marginVertical: normalize(70),
        textAlign: "center"
    },
    button: {
        backgroundColor: '#CE0303',
        marginBottom: normalize(5)
    },
    title: {
        fontSize: normalize(14),
        color: '#F1F1F1',
        fontFamily: 'Roboto_400Regular',
        paddingTop: normalize(20)
    },
    subTitle: {
        fontSize: normalize(28),
        marginTop: 15,
        fontFamily: 'Roboto_900Black',
        color: '#FFFFFF',
    },
    image: {
        alignSelf:"center",
        marginTop: normalize(85),
    },
    lastButton: {
        width:'100%',
        marginVertical:normalize(50)       
        
    },
})

const SuccessAlert = ({
    title,
    text,
    subTitle,
    buttonTitle,
    routeTo,
    headerOptionHandler,
    fontIcon
}) => {
    return (
        <ScrollView style={styles.container}>
            <Title
                title={title}
                fontIcon={fontIcon}
                statusBarStyle="light-content"
                subTitle={subTitle}
                subTitleStyle={{ fontSize: normalize(22) }}
                containerStyle={{ paddingHorizontal: normalize(18) }}
                titleStyle={styles.title}
                headerOptionHandler={headerOptionHandler}
            />
            <Image style={styles.image} source={require('./../../assets/check-mark-icon.png')} />
            <View ><Text style={styles.text}>{text}</Text></View>
            <RedButton
                title={buttonTitle}
                buttonStyle = {styles.lastButton}
                onPress={routeTo}
            >
            </RedButton>

        </ScrollView>

    )
}

export default SuccessAlert;