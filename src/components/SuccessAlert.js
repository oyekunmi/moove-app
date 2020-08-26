import React, { Children } from 'react'
import { StyleSheet, Image,Text, View } from 'react-native';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132535',
        flex: 1,
        paddingHorizontal: normalize(18),

    },
    text: {
        color: "#FFFFFF",
        fontSize: normalize(15),
        marginHorizontal: normalize(56),
        marginVertical: normalize(70),
        textAlign: "center"
    },
    button: {
        backgroundColor: '#CE0303',
        marginBottom: normalize(5)
    },
    title: {
        fontSize: normalize(14),
        color: '#FFFFFF',
        fontFamily: 'Roboto_400Regular',
    },
    subTitle: {
        fontSize: normalize(28),
        marginTop: 15,
        fontFamily: 'Roboto_900Black',
        color: '#FFFFFF',
    },
    image: {
        marginHorizontal: normalize(80),
        marginVertical: normalize(40),
    },
    lastButton: {
        marginVertical: normalize(70),
        marginBottom: normalize(5),
        
    },
})

const SuccessAlert = ({
    title,
    text,
    subTitle,
    buttonTitle,
    routeTo
}) => {
    return (
        <ScrollView style={styles.container}>
            <Title
                title={title}
                statusBarStyle="light-content"
                subTitle={subTitle}
                subTitleStyle={{ fontSize: normalize(22) }}
                containerStyle={{ paddingHorizontal: normalize(18) }}
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
export default SuccessAlert