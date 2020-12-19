import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
} from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';

import { normalize } from '../normalizeFont';
import { signOut } from '../redux/actions';
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const CustomDrawerContent = (props, dispatch, authState) => {
	const logoutUser = async () => {
		await AsyncStorage.removeItem('userDetails');
		dispatch(signOut());
		props.navigation.navigate('Home', { 'logoutUser': true });
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

			<BorderlessButton onPress={logoutUser} style={styles.logoutContainer}><Text style={styles.logoutText}>Logout</Text></BorderlessButton>

		</DrawerContentScrollView>

	);
};

const HomeDrawer = createDrawerNavigator();

const HomeDrawerScreen = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<HomeDrawer.Navigator
			drawerType={'front'}
			drawerContent={(props) =>
				CustomDrawerContent(props, dispatch, auth)
			}
			
		>
			<HomeDrawer.Screen name='Home' component={HomeScreen} 
				options={{ 
					drawerLabel: 'Order Moove', 
					drawerIcon: () => <MaterialIcons name="directions-bike" size={24} color="black" /> 
				}}
			/>
			<HomeDrawer.Screen name='History' label="History" component={HistoryScreen}
				options={{ 
					drawerLabel: 'My Mooves', 
					drawerIcon: () => <FontAwesome name="history" size={24} color="black" /> 
				}}
			/>
		</HomeDrawer.Navigator>

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
		fontWeight: 'bold',
		lineHeight: normalize(14),
		textTransform: 'uppercase',
	},
	menu: {
		flex:2,
		paddingVertical: normalize(40),
	},
	itemLabel: {
		textTransform: 'uppercase',
		fontFamily: 'Roboto_400Regular',
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

export default HomeDrawerScreen;
