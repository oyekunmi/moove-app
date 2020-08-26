import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import TextField from '../components/TextInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
  },
  content: {
    paddingHorizontal: normalize(18),
		flexGrow: 1,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'red',
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(5),
    alignSelf: "center",
    width: '100%',
  },
	contentInputContainer: {
		marginVertical: normalize(5),
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
		paddingHorizontal: normalize(10),
		marginVertical: normalize(5),
	},
	dateAndCvv: {
		display: 'flex',
		flexDirection: 'row',
    marginBottom: 'auto',
  },
})

export default function CreditCardPayment({ navigation }) {

  const onContinue = () => {
    navigation.navigate("ActiveMooveDetails")
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
						<TextField
							placeholder="XXXX XXXX XXXX XXXX"
							label="Card Number"
							value={''}
							onchangeText={() => {}}
							onBlur={() => {}}
							/>
					</View>

					<View style={styles.contentInputContainer}>
						<TextField
							placeholder='E.g Ayo Musa Okoro'
							label="Card holder's full name"
							value={''}
							onchangeText={() => {}}
							onBlur={() => {}}
							/>
					</View>

					<View style={styles.dateAndCvv}>
						<View
							style={{
								...styles.contentInputContainer,
								width: '30%',
								marginRight: normalize(30),
							}}>
							<TextField
								placeholder='MM/YY'
								label="Expiry Date"
								value={''}
								onchangeText={() => {}}
								onBlur={() => {}}
								/>
						</View>
						<View
							style={{
								...styles.contentInputContainer,
								width: '30%',
							}}>
							<TextField
								placeholder='XXX'
								label="CVV"
								value={''}
								onchangeText={() => {}}
								onBlur={() => {}}
								/>
						</View>
					</View>

          <RedButton title="Make Payment" buttonStyle={styles.button} onPress={onContinue} />

        </View>

      </ScrollView>
    </>
  );
}