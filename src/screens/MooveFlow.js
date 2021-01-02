import React from 'react';
import {
	createDrawerNavigator
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import MooveSiderbar from '../components/MooveSidebar';
import OrderMooveFlow from './OrderMooveFlow';
import MooveHistoryFlow from './MooveHistoryFlow';

const Moove = createDrawerNavigator();

const MooveFlow = () => {

	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<Moove.Navigator
			drawerType={'front'}
			drawerContent={ props => MooveSiderbar(props, dispatch, auth) }>

			<Moove.Screen name='OrderMooveFlow' component={OrderMooveFlow}
				options={{
					drawerLabel: 'Order Moove',
					drawerIcon: () => <MaterialIcons name="directions-bike" size={24} color="black" />
				}}
			/>

			<Moove.Screen name='MooveHistoryFlow' label="History" component={MooveHistoryFlow}
				options={{
					drawerLabel: 'My Mooves',
					drawerIcon: () => <FontAwesome name="history" size={24} color="black" />
				}}
			/>
			
		</Moove.Navigator>
	);
};

export default MooveFlow;
 