import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Text, TextInput, StatusBar, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddressField from '../components/AddressField';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';
import currency from '../currency';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132535',
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,
    justifyContent: 'space-between',
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
    marginVertical: normalize(25),
  },
  costLabel: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(16),
    fontWeight: 'bold'
  },
  costValue: {
    color: "#FFF",
    fontFamily: 'Roboto_700Bold',
    fontSize: normalize(44),
    fontWeight: 'bold'
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(15),
    alignSelf: "center",
    width: '100%',
  },
  cancelButtonStyle: {
    fontFamily: 'Roboto_700Bold',
    color: "#FFF",
    fontSize: normalize(16),
    lineHeight: normalize(19)
  },
  DeliveryItemDescription: {
    height: normalize(71),
    backgroundColor: '#1E3040',
    borderRadius: normalize(15),
    paddingVertical: normalize(10)
  },
  packageDescriptionLabel: {
    color: '#DADADA',
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    paddingHorizontal: normalize(14),
    fontWeight: 'bold',
  },
  packageDescriptionInput: {
    marginHorizontal: normalize(14),
    color: '#D1D1D1',
    fontSize: normalize(13),
    fontWeight: 'normal',
    marginBottom:normalize(10)
  },
  deliveryLocation: {
    height: normalize(80),
    marginVertical: normalize(7),
    borderRadius: normalize(15),
    display: 'flex',
    backgroundColor: "#1E3040"
  },
  deliveryContent: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: normalize(14),
    paddingTop: normalize(30),
    paddingBottom:normalize(35),
  },
  deliveryLocationLabel: {
    fontSize: normalize(14),
    fontFamily: 'Roboto_500Medium',
    marginBottom: normalize(10),
    marginTop: normalize(18),
    color:'#DADADA'
  },
  deliveryLocationDetails: {
    fontSize: normalize(13),
    color:'#DADADA',
    fontFamily: 'Roboto_400Regular',
    lineHeight: normalize(15)
  },
  mb9: {
    marginBottom: normalize(9),
  }
})

export default function MooveVerificationScreen({ navigation, route }) {
  const trip = useSelector(state => state.trip);
  const auth = useSelector(state=>state.auth);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  
  const onContinue = async () => {
    navigation.navigate("PaymentMethod", {
      recipient_name: trip.recipientName, recipient_phone_number: trip.recipientPhone, start_location : trip.source, 
      end_location: trip.destination, package_description: trip.package, who_pays: "REQUESTER",
      latitude :trip.sourceCoord.latitude, longitude :trip.sourceCoord.longitude
    })
    
  }


  useEffect(() => {
    
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
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
        <Title
          showBackButton={true}
          statusBarStyle="light-content"
          title={"verify your request"}
          fontIcon="arrow_back_light"
          headerOptionHandler={() => navigation.goBack()}
          subTitle={"Are the details below correct?"}
          titleStyle ={{color: '#F1F1F1'}}
          subTitleStyle={{ fontSize: normalize(20,) }}
          containerStyle={{ paddingHorizontal: normalize(18), }} />

        <View style={styles.content}>
          <View>
          <View >
              <View style={styles.deliveryLocation}>
                <View style={styles.deliveryContent}>
                <Text style={styles.deliveryLocationLabel} >Pick-up Location</Text>
                <Text style={styles.deliveryLocationDetails}>{trip.source}</Text>
                </View>
              </View>
            </View>
            <View style={styles.mb9}>
              <View style={styles.deliveryLocation}>
                <View style={styles.deliveryContent}>
                <Text style={styles.deliveryLocationLabel} >Delivery Location</Text>
                <Text style={styles.deliveryLocationDetails}>{trip.destination}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.mb9}>
              <AddressField
                value={trip.recipientPhone}
                label="Recipient Phone Number"
                editable={false}
                multiline={true}
                customStyle={{ color: '#D1D1D1', backgroundColor: '#1E3040'}}
                labelStyle={{ color: '#DADADA' }}
                placeholder="enter destination address"
              />
            </View>
            <View style={styles.mb9}>
              <AddressField
                value={trip.recipientName}
                label="Recipient Name"
                editable={false}
                multiline={true}
                customStyle={{ color: '#D1D1D1', backgroundColor: '#1E3040'}}
                labelStyle={{ color: '#DADADA' }}
                placeholder="enter destination address"
              />
            </View>

            <View style={styles.DeliveryItemDescription}>
              <Text style={styles.packageDescriptionLabel}>Delivery Item(s) Description</Text>
              <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={styles.packageDescriptionInput}
                  value={trip.package}
                  editable={false} />
            </View>
          </View>
          <View>
            <RedButton
              title="Proceed"
              buttonStyle={styles.button}
              onPress={onContinue} />
            {/* <PlainButton
              title="Cancel/Reset Moove"
              titleStyle={styles.cancelButtonStyle}
              buttonStyle={styles.button}
              onPress={onCancelTripRequest} /> */}
          </View>

        </View>

      </ScrollView>
    </>
  );

}