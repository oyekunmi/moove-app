import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import GreenButton from '../components/GreenButton';





const styles = StyleSheet.create({
    content: {
        paddingHorizontal: normalize(2),
        paddingVertical: normalize(5),
        flexGrow: 1,

    },
    logoContainer: {
        width: '100%',
        height: normalize(50),
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: normalize(5),
        position: "absolute",
        top: '9%',
        left: '30%',
        zIndex: 1
    },
    image: {
        resizeMode: 'contain',
        width: '50%',
        height: '100%',
        marginTop: normalize(10)
    },
    historyInput: {
        backgroundColor: "#efefef",
        borderRadius: normalize(20),
        textAlignVertical: "top",
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15),
        marginHorizontal: normalize(8),
        marginTop: normalize(15),
        width: '93%',
    },
    
    descriptionDetails: {
        fontFamily: "Roboto",
        color: "#545252"
    },

    tripCost: {
        fontSize: normalize(19),
        fontWeight: 'bold',
        marginTop: normalize(130),
        marginBottom: normalize(14)
    },
    date: {
        fontWeight: 'bold',
        marginTop: normalize(10)
    },
    descriptionTitles: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        marginTop: normalize(10),
        paddingTop: normalize(10)

    },
    button: {
        marginTop: normalize(20),
        alignSelf: "center",
        width: '90%',
      
      },


});


export default function HistoryDetailScreen({ navigation, route }) {
    const { moove_id, pick_up, delivery_location, date, cost } = route.params;

    return (

        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
            <View style={styles.content}>
            <Title
                title={"past mooves"}
                fontIcon='arrow_back'
                headerOptionHandler={() => navigation.goBack()}
                subTitle={"Moove MV" + moove_id}
                subTitleStyle={{ fontSize: normalize(22), flex: 1 }}
                containerStyle={{ paddingHorizontal: normalize(10) }} />
            <View style={styles.logoContainer}>
                <Image
                    style={styles.image}
                    fadeDuration={0}
                    resizeMode={'contain'}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <View style={styles.historyInput}>
                <Text style={styles.date}>
                    {date}
                </Text>
                <Text style={styles.descriptionTitles}>
                    Pick-up Location
                </Text>
                <Text style={styles.descriptionDetails}>{pick_up}</Text>
                <Text style={styles.descriptionTitles}>
                    Delivery Location
                </Text>
                <Text style={styles.descriptionDetails}>{delivery_location}</Text>
                <Text style={styles.tripCost}>
                    You Paid - N{cost}
                </Text>

            </View>
            <GreenButton
                title="Back to History"
                buttonStyle={styles.button}
                onPress={() => {
                    navigation.goBack();
                }}>
            </GreenButton>
            <RedButton
                title="Go to Dashboard"
                buttonStyle={styles.button}
                onPress={() => {
                    navigation.navigate('Home')
                }}>
            </RedButton>



            </View>

        </ScrollView>






    );
}