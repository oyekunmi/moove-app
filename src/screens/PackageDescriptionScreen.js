import React from 'react';
import { View, StyleSheet, Keyboard, Text, StatusBar, Button, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { normalize } from '../normalizeFont';
import { signOut, changePackageInfo } from '../redux/actions';
import AddressField from '../components/AddressField';
import RedButton from '../components/RedButton';
import Title from '../components/Title';
import SourceAddress from '../components/SourceAddress';
import DeliveryAddress from '../components/DeliveryAddress';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    // backgroundColor: '#132535',
    flexGrow: 1,
  
  },
  packageContainer: {
  },
  packageLabel: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
    // color: "#FFF",
  },
  packageInput: {
    backgroundColor: "#e6e6e6",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(20),
    alignSelf: "center",
    width: '100%',
  },
  // button: {
  //   position: 'absolute',
  //   left: normalize(18),
  //   right: normalize(18),
  //   bottom: normalize(10),
  // },
})

export default function PackageDescriptionScreen({ navigation }) {
  const dispatch = useDispatch()
  const trip = useSelector(state => state.trip)
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const onContinue = () => {
    if (!trip.package) {
      return;
    }
    navigation.navigate('MooveVerification')
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

  StatusBar.setBackgroundColor("#ffffff");
  StatusBar.setBarStyle("dark-content");
  
  console.log("here");

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>

        <Title
          showBackButton={true}
          title={"package description"}
          subTitle={"One more step. Enter your package description"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18),}} />

        <View style={styles.content}>

          <SourceAddress theme="dark-content" />
          <DeliveryAddress theme="dark-content" />

          <View style={styles.packageContainer}>
            <Text style={styles.packageLabel}>Package Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={styles.packageInput}
              value={trip.package}
              onChangeText={text => dispatch(changePackageInfo(text))}
              autoFocus />
          </View>

          <RedButton
            title="Complete moove request"
            buttonStyle={styles.button}
            onPress={onContinue} />

        </View>

      </ScrollView>

    </>
  );

}