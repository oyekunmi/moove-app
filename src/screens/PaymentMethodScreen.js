import React from 'react';
import { View, StyleSheet, Keyboard, Text, StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cancelTripRequest } from '../redux/actions';
import AddressField from '../components/AddressField';
import PlainButton from '../components/PlainButton';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import currency from '../currency';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

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
    alignItems: "center",
    marginVertical: normalize(20),
  },
  paymentContainer: {
    justifyContent: "center",
    flexGrow:1
  },
  costLabel: {
    color: "#908F8F",
    fontFamily: 'Roboto_700Bold',
    marginVertical: normalize(10),
  },
  costValue: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(44),

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

  radioButton: {
    borderRadius: normalize(50),
    backgroundColor: "#253A4D",
    color: "#FFF",
    padding: normalize(10),
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
})

export default function PaymentMethodScreen({ navigation }) {
  const trip = useSelector(state => state.trip)

  const onContinue = () => {
    navigation.navigate("ActiveMooveDetails")
  }

  var radio_props = [
    { label: 'CASH', value: 0 },
    { label: 'VISA/MASTERCARD', value: 1 }
  ];

  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("#132535");
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Title
          showBackButton={true}
          statusBarStyle="light-content"
          fontIcon={{name: 'long-arrow-left', color: "#ffffff", size: 14 }}
          title={"pay for your moove"}
          orderId="MV100002"
          subTitle={"Please make payment for moove"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18),}} />

        <View style={styles.content}>

          <View style={styles.costContainer}>
            <Text style={styles.costValue}>{currency(trip.cost)}</Text>
          </View>

          <View style={styles.paymentContainer}>
            <Text style={styles.costLabel}>Choose payment method</Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#132535"}
              selectedButtonColor={'#CE0303'}
              animation={true}
              buttonSize={10}
              labelColor='#FFF'
              selectedLabelColor='#FFF'
              onPress={(value) => { }}
              radioStyle={styles.radioButton}
            />
          </View>

          <RedButton title="Proceed" buttonStyle={styles.button} onPress={onContinue} />

        </View>

      </ScrollView>
    </>
  );

}