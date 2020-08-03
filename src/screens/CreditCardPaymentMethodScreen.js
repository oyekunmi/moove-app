import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(5),
    alignSelf: "center",
    width: '100%',
  },
	content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,
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
					fontIcon={{
						name: 'long-arrow-left',
						color: '#ffffff',
						size: 14,
					}}
					title={'make card payment'}
					headerOptionHandler={() => navigation.goBack()}
					subTitle={'Enter your card details'}
					subTitleStyle={{ fontSize: normalize(22) }}
					containerStyle={{ paddingHorizontal: normalize(18) }}
				/>

        <View style={styles.content}>

          <View
						style={{
							...styles.contentInputContainer,
							marginTop: normalize(40),
						}}>
						<Text style={styles.contentLabel}>Card Number</Text>
						<TextInput
							style={styles.contentInput}
							placeholder='XXXX XXXX XXXX XXXX'
						/>
					</View>

					<View style={styles.contentInputContainer}>
						<Text style={styles.contentLabel}>
							Card holder's full name
						</Text>
						<TextInput
							style={styles.contentInput}
							placeholder='E.g Ayo Musa Okoro'
						/>
					</View>

					<View style={styles.dateAndCvv}>
						<View
							style={{
								...styles.contentInputContainer,
								width: '30%',
								marginRight: normalize(30),
							}}>
							<Text style={styles.contentLabel}>Expiry Date</Text>
							<TextInput
								style={styles.contentInput}
								placeholder='MM/YY'
							/>
						</View>
						<View
							style={{
								...styles.contentInputContainer,
								width: '30%',
							}}>
							<Text style={styles.contentLabel}>CVV</Text>
							<TextInput
								style={styles.contentInput}
								placeholder='XXX'
							/>
						</View>
					</View>

          <RedButton title="Make Payment" buttonStyle={styles.button} onPress={onContinue} />

        </View>

      </ScrollView>
    </>
  );
}