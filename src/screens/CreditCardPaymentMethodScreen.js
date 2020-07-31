import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Text,TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import RedButton from '../components/RedButton';
import { normalize } from '../normalizeFont';
import Title from '../components/Title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132535',
    paddingHorizontal: normalize(18),
  },
  content: {
    justifyContent: "center",
  },
  contentInputContainer: {
    marginVertical: normalize(5),
  },
  contentLabel: {
    color: '#F1F1F1',
    fontFamily: 'Roboto_400Regular',
    fontSize: normalize(14),
    marginVertical: normalize(5),
  },
  contentInput: {
    backgroundColor: '#E3E3EC',
    borderRadius: normalize(20),
    height: normalize(40),
    fontSize: normalize(14),
    paddingHorizontal: normalize(10),
    marginVertical: normalize(5),
  },
  dateAndCvv: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 'auto'
  }
})

export default function CreditCardPaymentMethodScreen({ navigation }) {

  const onContinue = () => {
    navigation.navigate("ActiveMooveDetails")
  }

  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("#132535");
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Title
          showBackButton={true}
          statusBarStyle="light-content"
          fontIcon={{name: 'long-arrow-left', color: "#ffffff", size: 14 }}
          title={"make card payment"}
          headerOptionHandler={() => navigation.goBack()}
          subTitle={"Enter your card details"}
          subTitleStyle={{ fontSize: normalize(22) }}
          containerStyle={{ paddingHorizontal: normalize(18),}} />

         <View style={{...styles.contentInputContainer, marginTop: normalize(40) }}>
            <Text style={styles.contentLabel}>Card Number</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="XXXX XXXX XXXX XXXX"
            />
          </View>

          <View style={styles.contentInputContainer}>
            <Text style={styles.contentLabel}>Card holder's full name</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="E.g Ayo Musa Okoro"
            />
          </View>

          <View style={styles.dateAndCvv}>
            <View style={{...styles.contentInputContainer, width: '30%', marginRight: normalize(30)}}>
              <Text style={styles.contentLabel}>Expiry Date</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="MM/YY"
              />
            </View>
              <View style={{...styles.contentInputContainer, width: '30%' }}>
                <Text style={styles.contentLabel}>CVV</Text>
                <TextInput
                  style={styles.contentInput}
                  placeholder="XXX"
                />
              </View>
          </View>

        <View style={styles.content}>

          <RedButton title="Proceed" buttonStyle={styles.button} onPress={onContinue} />

        </View>

      </ScrollView>
    </>
  );

}