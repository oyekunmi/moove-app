import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Icon, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../components/Title';
import TextField from '../components/TextInput';
import { isAppLoading, isBtnDisabled } from '../redux/actions';
import axios from 'axios';
// import { addCardDetails } from '../utils/helpers/api';
// import { checkErrorHandler } from '../utils/helpers/validation_wrapper';



export default function AddCardScreen({ navigation }) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const token =  auth.userToken;
    console.log(token);
    
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');



    // const handleChange = (evt) => {
    //     const fieldHandlers = [setCardNumber, setCardName,setCvv, setCardExpiry ]; 
    //     for (let handler of fieldHandlers) {
    //         handler(evt.target.value)   ;
    //   }
    // }

    const addCard = () => {
        dispatch(isBtnDisabled(true));
        dispatch(isAppLoading(true));
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        const bodyParameters = {
            'card_number': cardNumber,
            'card_name':cardName, 
            'expiration_date':cardExpiry,
            'cvv': cvv
        };
        
        axios.post('http://127.0.0.1:8000/api/auth/add-card',
          bodyParameters,
          config
        ).then(console.log).catch(console.log);

        dispatch(isAppLoading(false));
        
         navigation.navigate('AddCardSuccess');
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#132535',
            paddingHorizontal: normalize(18),

        },
        form: {
            marginTop: normalize(50),
        },

        label: {
            fontSize: normalize(14),
            color: '#FFFFFF',
            fontFamily: 'Roboto_400Regular',
            margin: 15
        },
        icon: {
            alignSelf: "flex-end",
            width: normalize(55),
            right: '4%',
            top: '12%',
            position: 'absolute',
            zIndex: 2,
        },
        dualInput: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        contentInputContainer: {
            marginVertical: normalize(5),
        },
        contentLabel: {
            fontFamily: 'Roboto_400Regular',
            fontSize: normalize(14),
            marginVertical: normalize(5),
        },
        lastButton: {
            marginTop: 180
        },

    })
    return (
        <ScrollView style={styles.container}>
            <Title
                title="add a card"
                fontIcon="arrow_back_light"
                statusBarStyle="light-content"
                subTitle="Let’s add your card in a jiffy"
                subTitleStyle={{ fontSize: normalize(22) }}
                headerOptionHandler={() => navigation.goBack()}
            />
            <View >

                <View style={styles.form}>

                    <View style={styles.contentInputContainer}>
                        <Text style={styles.label}>Card Number</Text>
                        <Image source={require('./../../assets/visa-mastercard-icon.png')} style={styles.icon} />
                        <TextField
                            name="card_number"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                        />
                        <Text style={styles.label}>Card holder's full name</Text>

                        <TextField
                            name="card_name"
                            placeholder="Ayo Okoro Musa"
                            value={cardName}
                            onChangeText={setCardName}
                        />
                        <View style={styles.dualInput}>
                            <Text style={styles.label}>Expiry Date</Text>
                            <Text style={{ ...styles.label, marginRight: 142 }}>CVV</Text>
                        </View>

                        <View style={{ ...styles.dualInput, marginRight: 110 }}>

                            <TextField
                                name="expiration_date"
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChangeText={setCardExpiry}
                            />

                            <TextField
                                name="cvv"
                                placeholder="XXX"
                                value={cvv}
                                style={{ ...styles.contentIconInput, marginLeft: 40 }}
                                onChangeText={setCvv}
                            />
                        </View>
                        <RedButton
                            title="Add Card"
                            // disabled={common.isBtnDisabled}
                            buttonStyle={styles.lastButton}
                        onPress={addCard}
                        >
                        </RedButton>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}