import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Text, TextInput, StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cancelTripRequest } from '../redux/actions';
import AddressField from '../components/AddressField';
import PlainButton from '../components/PlainButton';
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
    marginTop: normalize(5),
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
  },
  mb9: {
    marginBottom: normalize(9),
  }
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
    navigation.push('Home')
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
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18), }} />

        <View style={styles.content}>
          <View>
            <View style={styles.mb9}>
              <AddressField
                value={trip.source}
                label="Pick-up Location"
                editable={false}
                multiline={true}
                customStyle={{ color: '#D1D1D1', backgroundColor: '#1E3040'}}
                labelStyle={{ color: '#DADADA' }}
                placeholder="enter source address"
              />
            </View>
            <View style={styles.mb9}>
              <AddressField
                value={trip.destination}
                label="Delivery Location"
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

            <View style={styles.costContainer}>
              <Text style={styles.costLabel}>Your delivery cost</Text>
              <Text style={styles.costValue}>{currency(trip.cost)}</Text>
            </View>
          </View>
          <View>
            <RedButton
              title="Yes! Start My Moovee"
              buttonStyle={styles.button}
              onPress={onContinue} />

            <PlainButton
              title="Cancel/Reset Moove"
              titleStyle={styles.cancelButtonStyle}
              buttonStyle={styles.button}
              onPress={onCancelTripRequest} />
          </View>

        </View>

      </ScrollView>
    </>
  );

}