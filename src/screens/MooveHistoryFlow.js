import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MooveHistoryListScreen from './MooveHistoryListScreen';
import MooveHistoryOrderStatusScreen from './MooveHistoryOrderStatusScreen';
import MooveHistoryOrderDetailScreen from './MooveHistoryOrderDetailScreen';
import MooveHistoryOrderTrackScreen from './MooveHistoryOrderTrackScreen'

const Navigator = createStackNavigator();

const MooveHistoryFlow = ({ navigation, route }) => {

    return (
        <Navigator.Navigator headerMode="none">
            <Navigator.Screen name="MooveHistoryList" component={MooveHistoryListScreen}  initialParams={route.params}   />
            <Navigator.Screen name="MooveHistoryOrderStatus" component={MooveHistoryOrderStatusScreen}  initialParams={route.params}  />
            <Navigator.Screen name="MooveHistoryOrderDetail" component={MooveHistoryOrderDetailScreen}  initialParams={route.params}   />
            <Navigator.Screen name="MooveHistoryOrderTrackScreen" component={MooveHistoryOrderTrackScreen}  initialParams={route.params}   />
        </Navigator.Navigator>
    );
};

export default MooveHistoryFlow;