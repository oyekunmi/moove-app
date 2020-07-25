import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, Text, StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cancelTripRequest } from '../redux/actions';
import AddressField from '../components/AddressField';
import PlainButton from '../components/PlainButton';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import currency from '../currency';
import SourceAddress from '../components/SourceAddress';
import DeliveryAddress from '../components/DeliveryAddress';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,
  },
  packageContainer: {
  },
  label: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },
  packageInput: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
  },
  costContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: normalize(20),
  },
  costLabel: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
  },
  costValue: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(32),
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(5),
    alignSelf: "center",
    width: '100%',
  },
  cancelButtonStyle: {
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
  },
})

export default function MooveVerificationScreen({ navigation }) {
  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const onContinue = () => {
    navigation.navigate("PaymentMethod")
  }

  const onCancelTripRequest = () => {
    dispatch(cancelTripRequest())
    navigation.navigate('Home')
  }

  React.useEffect(() => {

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("#132535");
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Title
          showBackButton={true}
          statusBarStyle="light-content"
          title={"verify your request"}
          subTitle={"Are the details below correct?"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18), }} />

        <View style={styles.content}>

          <SourceAddress />
          <DeliveryAddress />

          <AddressField
            defaultValue={trip.package}
            label="Delivery item(s) description"
            editable={false}
            multiline={true}
            // numberOfLines={3}
            textAlignVertical="top"
            labelStyle={{ color: "#FFF" }}
            inputStyle={{ color: "#D1D1D1" }}
            containerStyle={{ backgroundColor: "#1E3040" }}
          />

          <View style={styles.costContainer}>
            <Text style={styles.costLabel}>Your delivery cost</Text>
            <Text style={styles.costValue}>{currency(trip.cost)}</Text>
          </View> 
 
          <RedButton   
            title="Yes! start moove"
            buttonStyle={styles.button}
            onPress={onContinue} />

          <PlainButton
            title="Cancel moove"
            titleStyle={styles.cancelButtonStyle}
            buttonStyle={styles.button}
            onPress={onCancelTripRequest} />

        </View>

      </ScrollView>
    </>
  );

}