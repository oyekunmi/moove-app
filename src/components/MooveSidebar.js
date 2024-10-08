import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { normalize } from '../normalizeFont';
import { signOut } from '../redux/actions';
import { BorderlessButton } from 'react-native-gesture-handler';

const MooveSiderbar = (props, dispatch, authState) => {
	const logoutUser = async () => { 
		await AsyncStorage.removeItem('userDetails');
		dispatch(signOut());
		props.navigation.navigate('SignIn', { 'logoutUser': true });
	};

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.container}>

			<View style={styles.sideHeader}>
				<Image
					style={styles.logo}
					source={require('../../assets/logo.png')}
				/>
				<Text style={styles.userName}> {authState.name}</Text>
				<Text style={styles.userPhone}> {authState.phone}</Text>
			</View>

			<View style={styles.menu}>
				<DrawerItemList labelStyle={styles.itemLabel} activeTintColor="#CE0303"  {...props} />
			</View>

			<BorderlessButton onPress={logoutUser} style={styles.logoutContainer}>
				<Text style={styles.logoutText}>Logout</Text>
			</BorderlessButton>

		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		height: '100%',
	},
	sideHeader: {
		// flex: 1,
		alignItems: 'center',
	},
	logo: {
		resizeMode: 'contain',
		width: normalize(100),
		height: normalize(80),
	},
	userName: {
		fontSize: normalize(21),
		fontFamily: 'Roboto_900Black',
		color: '#181818',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	userPhone: {
		color: '#545252',
		fontSize: normalize(12),
		fontFamily: 'Roboto_400Regular',
		marginVertical: normalize(10),
	},
	viewProfile: {
		fontSize: normalize(12),
		color: '#2B4257',
		fontFamily: 'Roboto_700Bold',
		fontWeight: '700',
		lineHeight: normalize(14),
		textTransform: 'uppercase',
	},
	menu: {
		flex: 2,
		paddingVertical: normalize(40),
	},
	itemLabel: {
		textTransform: 'uppercase',
		fontFamily: 'Roboto_900Black',
		fontWeight: "900",
	},
	logoutContainer: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: normalize(20),
	},
	logoutText: {
		fontFamily: 'Roboto_400Regular',
		color: '#CE0303',
		fontSize: normalize(12),
		lineHeight: normalize(19),
	},
});

export default MooveSiderbar;