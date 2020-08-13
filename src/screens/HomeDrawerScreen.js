import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';
import FundWalletScreen from './FundWalletScreen';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';



function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Support/FAQs" onPress={() => console.log('support')} />
            <DrawerItem label="Logout" onPress={() => console.log('logged out')} labelStyle={{ color: "#CE0303" }} />
        </DrawerContentScrollView>
    );
}


const HomeDrawer = createDrawerNavigator();


const HomeDrawerScreen = () => {
    return (
        <HomeDrawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 30 },
            }}
            drawerStyle={{
                borderRadius: 10,
                width: 240,
                alignItems: "center",
            }}
        >
            <HomeDrawer.Screen name="Home " component={HomeScreen} />
            <HomeDrawer.Screen name="My mooves" component={HistoryScreen} />
            <HomeDrawer.Screen name="Wallet" component={FundWalletScreen} />
        </HomeDrawer.Navigator>

    );
};

export default HomeDrawerScreen