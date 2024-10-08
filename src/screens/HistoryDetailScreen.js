import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import GreenButton from '../components/GreenButton';
import currency from '../currency';


const styles = StyleSheet.create({
    content: {
        paddingHorizontal: normalize(2),
        paddingVertical: normalize(5),
        flexGrow: 1,

    },
    historyInput: {
        backgroundColor: "#efefef",
        borderRadius: normalize(20),
        textAlignVertical: "top",
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15),
        alignSelf: "center",
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
        marginTop: normalize(15),
        marginBottom: normalize(14)
    },
    tripStatus: {
        fontWeight: 'bold',
        color: '#D65A5A',
        alignSelf: 'center',
        marginVertical: normalize(30)
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
        alignSelf: "center",
        width: '90%',
        height: '7%'

    },


});


export default function HistoryDetailScreen({ navigation, route }) {
    const { moove_id, pick_up, delivery_location, tripStatus, date, cost, recipientPhone, packageDescription } = route.params;

    return (

        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
            <View style={styles.content}>
                <Title
                    title={"past mooves"}
                    fontIcon='arrow_back'
                    headerOptionHandler={() => navigation.goBack()}
                    subTitle={"Moove MV" + moove_id + "\ndetails"}
                    subTitleStyle={{ fontSize: normalize(22), flex: 1 }}
                    containerStyle={{ paddingHorizontal: normalize(20) }} />
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
                    <Text style={styles.descriptionTitles}>
                        Recipient Phone Number
                </Text>
                    <Text style={styles.descriptionDetails}>{recipientPhone}</Text>
                    <Text style={styles.descriptionTitles}>
                        Package description
                </Text>
                    <Text style={styles.descriptionDetails}>{packageDescription}</Text>
                    <Text style={styles.tripCost}>
                        You Paid - {currency(cost)}
                    </Text>

                </View>
                <Text style={styles.tripStatus}>
                    {tripStatus}
                </Text>

            </View>

        </ScrollView>






    );
}