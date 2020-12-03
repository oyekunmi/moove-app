import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { normalize } from '../normalizeFont';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../components/Title';
import RedButton from '../components/RedButton';

export default function SuccessScreen({ navigation, route }) {
	const { title, subTitle } = route.params;

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
			<Title
				title={title}
				fontIcon='arrow_back_light'
				statusBarStyle='light-content'
				subTitle={subTitle}
				subTitleStyle={{ fontSize: normalize(22) }}
				headerOptionHandler={() => navigation.goBack()}
			/>

			<View style={styles.content}>
				<View style={styles.checkMarkContainer}>
					<Image
						source={require('./../../assets/check-mark-icon.png')}
						style={styles.image}
					/>
				<View>
					<Text style={styles.successMessage}>
						Now your account is safe
					</Text>
				</View>
				</View>
			<RedButton
				title='Go To Login'
				buttonStyle={styles.lastButton}
				onPress={() => navigation.navigate('SignIn') }></RedButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#132535',
    paddingHorizontal: normalize(18),
	},
	content: {
    justifyContent: 'space-between',
    display: 'flex',
    flexGrow: 4
	},
	lastButton: {
    marginBottom: normalize(15)
	},
	image: {
		width: normalize(150),
		height: normalize(150),
	},
	checkMarkContainer: {
		display: 'flex',
		alignItems: 'center',
    marginTop: normalize(30),
	},
	successMessage: {
		textAlign: 'center',
		color: '#F1F1F1',
    fontSize: normalize(15),
    fontFamily: 'Roboto_400Regular',
		lineHeight: normalize(18),
    marginTop: normalize(44),
	},
});
