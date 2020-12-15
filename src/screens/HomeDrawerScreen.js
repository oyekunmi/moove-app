import React from 'react';
import {
	TouchableOpacity,
	View,
	StyleSheet,
	Image,
	Text,
	Platform,
} from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';
import FundWalletScreen from './FundWalletScreen';
import { normalize } from '../normalizeFont';
import { signOut } from '../redux/actions';
import HistoryDetailScreen from './HistoryDetailScreen';

const CustomDrawerContent = (props, dispatch, authState) => {
	const logoutUser = async () => {
		await AsyncStorage.removeItem('userDetails');
		dispatch(signOut());
		props.navigation.navigate('Home', { 'logoutUser': true });
	};

	return (
		<View style={styles.container}>
			<View style={{ height: '90%' }}>
				<DrawerContentScrollView {...props}>
					<View style={styles.logoContainer}>
						<Image
							style={styles.image}
							fadeDuration={0}
							resizeMode={'contain'}
							source={require('../../assets/logo.png')}
						/>
					</View>

					<View style={styles.profileContainer}>
						<View style={styles.profilePictureContainer}>
							<Image
								style={styles.profilePicture}
								fadeDuration={0}
								resizeMode={'contain'}
								// source={require()}
							/>
						</View>
						<View style={styles.userDetails}>
							<Text style={styles.userName}>
								{authState.name}
							</Text>
							<Text style={styles.userPhone}>
								{authState.phone}
							</Text>
							<TouchableOpacity
								style={styles.userProfileContainer}>
								<Text style={styles.UserProfile}>
									View Profile
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.menu}>
						<View style={styles.contactUsContainer}>
							<TouchableOpacity
								style={styles.drawerTextContainer}
								onPress={() => {
									props.navigation.navigate('My mooves');
								}}>
								<Text style={styles.drawerText}>My Mooves</Text>
							</TouchableOpacity>
						</View>

						<View
							style={[
								styles.contactUsContainer,
								styles.drawerTextTopDivider,
							]}>
							<TouchableOpacity
								style={styles.drawerTextContainer}
								onPress={() => {
									props.navigation.navigate('Wallet');
								}}>
								<Text style={styles.drawerText}>Wallet</Text>
							</TouchableOpacity>
						</View>

						<View
							style={[
								styles.contactUsContainer,
								styles.drawerTextTopDivider,
							]}>
							<TouchableOpacity
								style={styles.drawerTextContainer}
								onPress={() => {
									console.log(
										props.navigation.navigate('Home'),
									);
								}}>
								<Text style={styles.drawerText}>
									Support/FAQs
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</DrawerContentScrollView>
			</View>

			<TouchableOpacity
				style={styles.logoutContainer}
				onPress={logoutUser}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const HomeDrawer = createDrawerNavigator();

const HomeDrawerScreen = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<HomeDrawer.Navigator
			drawerContent={(props) =>
				CustomDrawerContent(props, dispatch, auth)
			}
			drawerContentOptions={{
				activeTintColor: '#e91e63',
				itemStyle: { marginVertical: 30 },
			}}
			overlayColor='transparent'
			drawerStyle={{
				borderTopRightRadius: normalize(15),
				// marginTop: normalize(16),
				borderBottomRightRadius: normalize(15),
				width: normalize(240),
				elevation: 5,
				backgroundColor: '#FFFFFF',
			}}>
			<HomeDrawer.Screen name='Home' component={HomeScreen} />
			<HomeDrawer.Screen name='My mooves' component={HistoryScreen} />
			<HomeDrawer.Screen name='Wallet' component={FundWalletScreen} />
			<HomeDrawer.Screen name='HistoryDetails' component={HistoryDetailScreen} />
		</HomeDrawer.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logoContainer: {
		width: '100%',
		height: normalize(50),
		alignItems: 'center',
		justifyContent: 'center',
		padding: normalize(5),
	},
	image: {
		resizeMode: 'contain',
		width: '80%',
		height: '100%',
	},
	contactUsContainer: {
		width: '90%',
		alignSelf: 'center',
	},
	logoutContainer: {
		width: '100%',
		flex: 2,
		height: normalize(40),
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: normalize(20),
	},
	drawerText: {
		color: '#51504D',
		fontSize: normalize(13),
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		width: '80%',
		lineHeight: normalize(15),
	},
	drawerTextTopDivider: {
		borderTopWidth: 2,
		borderColor: '#DADADA',
		borderStyle: 'solid',
	},
	logoutText: {
		fontFamily: 'Roboto_900Black',
		color: '#CE0303',
		fontSize: normalize(16),
		lineHeight: normalize(19),
		fontWeight: 'bold',
	},
	profileContainer: {
		display: 'flex',
		alignItems: 'center',
		marginTop: normalize(51),
	},
	profilePictureContainer: {
		borderWidth: normalize(2),
		borderStyle: 'solid',
		borderColor: '#929090',
		backgroundColor: '#C4C4C4',
		borderRadius: normalize(100),
		height: normalize(95),
		width: normalize(95),
	},
	userDetails: {
		marginTop: normalize(14),
	},
	userName: {
		fontSize: normalize(21),
		fontFamily: 'Roboto_900Black',
		color: '#181818',
		fontWeight: 'bold',
		lineHeight: normalize(25),
	},
	userPhone: {
		color: '#545252',
		fontSize: normalize(12),
		fontFamily: 'Roboto_400Regular',
		lineHeight: normalize(14),
		marginTop: normalize(3),
		textAlign: 'center',
	},

	userProfileContainer: {
		marginTop: normalize(5),
		marginBottom: normalize(50),
	},

	UserProfile: {
		fontSize: normalize(12),
		color: '#2B4257',
		fontFamily: 'Roboto_700Bold',
		fontWeight: 'bold',
		lineHeight: normalize(14),
		textAlign: 'center',
	},
	drawerTextContainer: {
		height: normalize(60),
		justifyContent: 'center',
	},
});

export default HomeDrawerScreen;
