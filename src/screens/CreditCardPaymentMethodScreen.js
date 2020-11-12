import React, { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, ScrollView, Image,Alert, StatusBar } from 'react-native';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import TextField from '../components/TextInput';
import { isAppLoading,riderFound, isBtnDisabled, tripCreated} from '../redux/actions';
import { findRider } from '../utils/helpers/api';


const styles = StyleSheet.create({
  container: {
	backgroundColor: '#132535',
	paddingTop: normalize(25)
  },
  content: {
		paddingHorizontal: normalize(18),
		marginTop: normalize(85),
		flexGrow: 1,
  },
  button: {
    marginBottom: normalize(20),
    marginTop: normalize(5),
    alignSelf: "center",
    width: '100%',
  },
	contentInputContainer: {
		marginVertical: normalize(15),

	},
	contentLabel: {
		color: '#F1F1F1',
		fontFamily: 'Roboto_400Regular',
		fontSize: normalize(14),
		marginVertical: normalize(5),
	},
	contentInput: {
		backgroundColor: '#E3E3EC',
		borderRadius: normalize(20),
		height: normalize(40),
		fontSize: normalize(14),
		marginVertical: normalize(5),
	},
	dateAndCvv: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 'auto',	
	},
	visaMasterCardIcon: {
		position: 'absolute',
		right: '5%',
		top: '47%',
		zIndex: 500,
	}
})

StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor('#132535');

export default function CreditCardPayment({ navigation, route }) {

	const common = useSelector(state => state.common);
	const dispatch = useDispatch();

	const [cardNumber, setCardNumber]   = useState('');
	const [holdersName, setHoldersName] = useState('');
	const [expiryDate, setExpiryDate]   = useState('');
	const [cvv, setCvv]                 = useState('');
	const {recipient_name, recipient_phone_number, start_location, end_location, 
		package_description, who_pays, latitude, longitude,paymentMethod
	  } = route.params;
	const token = useSelector(state => state.auth.userToken);


	const formatCardNumber = () => {
		const pattern = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
		const filteredNumber = cardNumber.replace(/[^\d]/g, '')

		const result = filteredNumber.replace(pattern, (pattern, $1, $2, $3, $4) =>
			[$1, $2, $3, $4].filter(value => !!value).join(' ')
		);

		setCardNumber(result);
	}

	useEffect(() => {
		(cardNumber.length === 0 || holdersName.length === 0 || expiryDate.length === 0 || cvv.length === 0) ? dispatch(isBtnDisabled(true)): dispatch(isBtnDisabled(false))
	}, [cardNumber, holdersName, expiryDate, cvv])

	const startMoove = async () => {
		dispatch(isAppLoading(true));
		try{
		const response= await findRider(recipient_name, recipient_phone_number, start_location, end_location, package_description, who_pays, latitude, longitude , paymentMethod, token);
			dispatch(riderFound({ riderPhone:response.riderDetails.phone_number, riderName: response.riderName}));
			dispatch(tripCreated(response.trip));
			navigation.navigate("ActiveMooveDetails") ;
		}
		catch(error){
		  if (error.response) {
		    if(error.response.data.message){
		      Alert.alert('Opps! sorry, ', error.response.data.message);
		    }	
		  } else if (error.request) {
		    Alert.alert('An error has occurred', 'Network error, Please try again.');
		  } else {
		    Alert.alert('An error has occurred', error.message);
		  }
	
		}
		dispatch(isAppLoading(false));
	  }

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Title
					showBackButton={true}
					statusBarStyle='light-content'
					fontIcon='arrow_back_light'
					title={'make card payment'}
					headerOptionHandler={() => navigation.goBack()}
					subTitle={'Enter your card details'}
					subTitleStyle={{ fontSize: normalize(22) }}
					containerStyle={{ paddingHorizontal: normalize(18) }}
				/>

        <View style={styles.content}>

          <View>
						<Image source={require('../../assets/visa-mastercard-icon.png')} style={styles.visaMasterCardIcon} />
						<TextField
							maxLength={19}
							placeholder="XXXX XXXX XXXX XXXX"
							label="Card Number"
							value={cardNumber}
							onChangeText={setCardNumber}
							labelColor="#F1F1F1"
							onBlur={formatCardNumber}
						/>
					</View>

					<View style={styles.contentInputContainer}>
						<TextField
							placeholder='E.g Ayo Musa Okoro'
							label="Card holder's full name"
							value={holdersName}
							onChangeText={setHoldersName}
							labelColor="#F1F1F1"
							/>
					</View>

					<View style={styles.dateAndCvv}>
						<View
							style={{
								...styles.contentInputContainer,
								width: '32%',
								marginRight: normalize(30),
							}}>
							<TextField
								placeholder='MM/YY'
								label="Expiry Date"
								value={expiryDate}
								labelColor="#F1F1F1"
								onChangeText={setExpiryDate}
								/>
						</View>
						<View
							style={{
								...styles.contentInputContainer,
								width: '30%',
							}}>
							<TextField
								maxLength={3}
								placeholder='XXX'
								label="CVV"
								value={cvv}
								labelColor="#F1F1F1"
								onChangeText={setCvv}
								/>
						</View>
					</View>

					<RedButton
						title="Make Payment"
						buttonStyle={styles.button}
						onPress={startMoove}
						disabled={common.isBtnDisabled}
					/>

        </View>

      </ScrollView>
    </>
  );
}