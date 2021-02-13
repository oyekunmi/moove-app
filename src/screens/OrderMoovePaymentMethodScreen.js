import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
import { isAppLoading, tripCreated } from '../redux/actions';

export default function OrderMoovePaymentMethodScreen({ navigation, route }) {
	const trip = useSelector(state => state.trip);
	const [paymentMethod, setPaymentMethod] = useState('CASH');
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.userToken);

	const startMoove = async () => {
		dispatch(isAppLoading(true));
		
		findRider(trip.recipientName, trip.recipientPhone, trip.source, trip.destination, trip.package, "REQUESTER", trip.sourceCoord.latitude, trip.sourceCoord.longitude, paymentMethod, token)
		.then( response => {
			const result = response.data.data;
			dispatch(tripCreated(result));
			navigation.navigate("MooveHistoryFlow", { screen: 'MooveHistoryOrderStatus', order: result, backScreen: 'MooveHistoryList' });
			dispatch(isAppLoading(false));
		},
		err => {
			if (err.response?.data?.message) {
				Alert.alert('Opps! sorry, ', error.response.data.message);
			} else if (err.request) {
				Alert.alert('An error has occurred', 'Network error, Please try again.');
			} else {
				Alert.alert('An error has occurred', err.message);
			}
			dispatch(isAppLoading(false));

		});
		
	}

	const radio_props = [
		{ label: 'CASH', value: 0 },
		// { label: 'VISA/MASTERCARD', value: 1 },
	];

	useEffect(() => {
		setPaymentMethod('CASH')
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor="#132535" />
			<Title
				showBackButton={true}
				statusBarStyle='light-content'
				fontIcon='arrow_back_light'
				title={'pay for your moove'}
				headerOptionHandler={() => navigation.goBack()}
				subTitle={'Choose your payment method'}
				subTitleStyle={{ fontSize: normalize(20), paddingTop: normalize(10) }}
				titleStyle={{ color: '#F1F1F1' }}
				containerStyle={{ paddingHorizontal: normalize(18) }}
			/>

			<View style={styles.content}>
				<View>
					<View style={styles.costContainer}>
						<Text style={styles.costInfo}>
							Your delivery cost
							</Text>
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
										buttonInnerColor={'#CE0303'}
										buttonOuterColor={'#253A4D'}
										buttonStyle={{
											backgroundColor: '#CE0303'
										}}
									/>
								</RadioButton>
							))}
						</RadioForm>
					</View>
				</View>
				<RedButton
					title='Start My Moove'
					buttonStyle={styles.button}
					onPress={startMoove}
				/>
			</View>
		</ScrollView>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#132535',
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
		fontFamily: 'Roboto_400Regular',
		fontStyle: 'normal',
		marginVertical: normalize(16),
	},
	costValue: {
		color: '#FFF',
		fontFamily: 'Roboto_700Bold',
		fontSize: normalize(44),
		fontWeight: 'bold'
	},
	costInfo: {
		color: '#FFF',
		fontFamily: 'Roboto_700Bold',
		fontSize: normalize(17),
		fontWeight: 'bold',
		marginVertical: normalize(10)
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