import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView,Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PlainButton from '../components/PlainButton';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import currency from '../currency';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { findRider } from '../utils/helpers/api';
import { tripCreated } from '../redux/actions';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#132535',
		paddingTop: normalize(20)
	},
	content: {
		paddingHorizontal: normalize(18),
		flexGrow: 2,
		justifyContent: 'space-between',
	},
	packageContainer: {},
	label: {
		marginVertical: normalize(10),
		paddingHorizontal: normalize(15),
		fontFamily: 'Roboto_700Bold',
		color: '#FFF',
	},
	packageInput: {
		backgroundColor: '#e6e6e6',
		borderRadius: normalize(20),
		textAlignVertical: 'top',
		paddingVertical: normalize(10),
		paddingHorizontal: normalize(15),
	},
	costContainer: {
		alignItems: 'center',
		marginVertical: normalize(35),
	},
	paymentContainer: {
		justifyContent: 'center',
		flexGrow: 1,
	},
	costLabel: {
		color: '#908F8F',
		fontFamily: 'Roboto_700Bold',
		marginVertical: normalize(16),
	},
	costValue: {
		color: '#FFF',
		fontFamily: 'Roboto_700Bold',
    fontSize: normalize(44),
    fontWeight: 'bold'
	},
	button: {
		marginBottom: normalize(15),
		marginTop: normalize(5),
		alignSelf: 'center',
		width: '100%',
		
	},
	cancelButtonStyle: {
		fontFamily: 'Roboto_700Bold',
		color: '#FFF',
	},

	radioButton: {
		borderRadius: normalize(15),
		height: normalize(45),
		marginBottom: normalize(14),
		backgroundColor: '#253A4D',
		color: '#FFF',
		padding: normalize(10),
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default function PaymentMethodScreen({ navigation, route }) {
	const trip = useSelector((state) => state.trip);
	const [cashInputIndex, setCashInputIndex] = useState(0);
	const [showProceedButton, setShowProceedButton] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('');
	const dispatch = useDispatch();
	const {recipient_name, recipient_phone_number, start_location, end_location, 
	  package_description, who_pays, latitude, longitude
	} = route.params;
	const token = useSelector(state => state.auth.userToken);
	
	const onContinue = () => {
		navigation.navigate('CreditCardPayment');
	};

	const startMoove = async () => {
		try{
		 await findRider(recipient_name, recipient_phone_number, start_location, end_location, 
			package_description, who_pays, latitude, longitude , paymentMethod, token);
			console.log(findRider());
			dispatch(tripCreated())
			navigation.navigate("ActiveMooveDetails") ;
		}
		catch(error){
		  console.log('in catch')
		  if (error.response) {
		    console.log('i have a response')
		    if(error.response.data.message){
		      console.log('i have an error message :')
		      console.log(error.response.data)
		      Alert.alert('An error has occurred', error.response.data.message);
		    }	
		  } else if (error.request) {
		    console.log(error.request);
		    Alert.alert('An error has occurred', 'Network error, Please try again.');
		  } else {
		    console.log('Error', error.message);
		    Alert.alert('An error has occurred', error.message);
		  }
	
		}
		
	  }
	

	const setSelectedPaymentMethod = useCallback((value) => {
		setCashInputIndex(value);
	},[cashInputIndex]);

	const radio_props = [
		{ label: 'CASH', value: 0 },
		{ label: 'VISA/MASTERCARD', value: 1 },
	];

	useEffect(()=>{
		console.log(trip);
		console.log(token);
		radio_props[cashInputIndex].label === 'CASH' ?
		[setPaymentMethod('CASH'),  setShowProceedButton(false)]
		 :[setPaymentMethod('CARD'),setShowProceedButton(true)];
	}); 

	
	StatusBar.setBarStyle('light-content');
	StatusBar.setBackgroundColor('#132535');
	return (
		<>
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ flexGrow: 1 }}>
				<Title
					showBackButton={true}
					statusBarStyle='light-content'
					fontIcon='arrow_back_light'
					title={'pay for your moove'}
					headerOptionHandler={() => navigation.goBack()}
					orderId='MV100002'
					subTitle={'Please make payment for moove:'}
					subTitleStyle={{ fontSize: normalize(22) }}
					titleStyle ={{color: '#908F8F'}}
					containerStyle={{ paddingHorizontal: normalize(18) }}
				/>

				<View style={styles.content}>
					<View>
						<View style={styles.costContainer}>
							<Text style={styles.costValue}>
								{currency(trip.cost)}
							</Text>
						</View>

						<View style={styles.paymentContainer}>
							<Text style={styles.costLabel}>
								Choose payment method
							</Text>
							<RadioForm formHorizontal={false} animation={true}>
								{radio_props.map((obj, i) => (
									<RadioButton
										labelHorizontal={true}
										key={i}
										style={styles.radioButton}>
										<RadioButtonLabel
											obj={obj}
											index={i}
											labelHorizontal={true}
											onPress={setSelectedPaymentMethod}
											labelStyle={{
												color: '#DADADA',
                        fontFamily: 'Roboto_500Medium',
                        fontSize: normalize(14)
											}}
											labelWrapStyle={{}}
										/>
										<RadioButtonInput
											obj={obj}
											index={i}
											isSelected={cashInputIndex === i}
											onPress={setSelectedPaymentMethod}
											buttonInnerColor={'#CE0303'}
											buttonOuterColor={'#253A4D'}
											buttonStyle={{
												backgroundColor:
													cashInputIndex === i
														? '#CE0303'
														: '#132535',
											}}
										/>
									</RadioButton>
								))}
							</RadioForm>
						</View>
					</View>
				{ showProceedButton ?
					<RedButton
						title='Proceed'
						buttonStyle={styles.button}
						onPress={onContinue}
					/>
				:
		
					<RedButton
						title='Start My Moove'
						buttonStyle={styles.button}
						onPress={startMoove}
					/>
				}
				</View>
			</ScrollView>
		</>
	);
}