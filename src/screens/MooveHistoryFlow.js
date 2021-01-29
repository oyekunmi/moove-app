import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MooveHistoryListScreen from './MooveHistoryListScreen';
import MooveHistoryOrderStatusScreen from './MooveHistoryOrderStatusScreen';
import MooveHistoryOrderDetailScreen from './MooveHistoryOrderDetailScreen';
import MooveHistoryOrderTrackScreen from './MooveHistoryOrderTrackScreen'

const Navigator = createStackNavigator();

const MooveHistoryFlow = () => {

    return (
        <Navigator.Navigator headerMode="none">
            <Navigator.Screen name="MooveHistoryList" component={MooveHistoryListScreen} />
            <Navigator.Screen name="MooveHistoryOrderStatus" component={MooveHistoryOrderStatusScreen} />
            <Navigator.Screen name="MooveHistoryOrderDetail" component={MooveHistoryOrderDetailScreen} />
            <Navigator.Screen name="MooveHistoryOrderTrackScreen" component={MooveHistoryOrderTrackScreen} />
        </Navigator.Navigator>
    );
};

export default MooveHistoryFlow;