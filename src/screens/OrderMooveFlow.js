import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderMooveDashboardScreen from './OrderMooveDashboardScreen';
import OrderMoovePackageDescriptionScreen from './OrderMoovePackageDescriptionScreen';
import OrderMoovePackageVerificationScreen from './OrderMoovePackageVerificationScreen';
import OrderMoovePaymentMethodScreen from './OrderMoovePaymentMethodScreen';

const Navigator = createStackNavigator();

const OrderMooveFlow = () => {

    return (
       <Navigator.Navigator headerMode="none">
           <Navigator.Screen name="OrderMooveDashboard" component={OrderMooveDashboardScreen} />
           <Navigator.Screen name="OrderMoovePackageDescription" component={OrderMoovePackageDescriptionScreen} />
           <Navigator.Screen name="OrderMoovePackageVerification" component={OrderMoovePackageVerificationScreen} />
           <Navigator.Screen name="OrderMoovePaymentMethods" component={OrderMoovePaymentMethodScreen} />
       </Navigator.Navigator>
    );
}

export default OrderMooveFlow;