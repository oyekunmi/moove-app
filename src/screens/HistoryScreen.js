import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import Title from '../components/Title';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';

const styles = StyleSheet.create({
  container: {
  },
  content: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(10),
    flexGrow: 1,

  },
  historyContainer: {
  },
  historyLabel: {
    marginVertical: normalize(10),
    paddingHorizontal: normalize(15),
    fontFamily: 'Roboto_700Bold',
  },
  historyInput: {
    backgroundColor: "#efefef",
    borderRadius: normalize(20),
    textAlignVertical: "top",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    height: normalize(85),
    marginTop: normalize(15),
  },
  button: {
    marginBottom: normalize(10),
    marginTop: normalize(20),
    alignSelf: "center",
    width: '100%',
  },
});



function HistoryScreen({ navigation }) {

  const toggleDrawerHandler = () => {
    // The drawer should be toggled here
    navigation.openDrawer();
    // console.log('Drawer handler');
  }




  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
      <Title
        title={"past mooves"}
        fontIcon={{ name: "bars", color: "#DADADA", size: 20 }}
        headerOptionHandler={toggleDrawerHandler}
        subTitle={"Moove history "}
        subTitleStyle={{ fontSize: normalize(26) }}
        containerStyle={{ paddingHorizontal: normalize(18) }} />
      <View style={styles.content}>


        <View style={styles.historyContainer}>
          {/* <Text style={styles.historyLabel}>Delivery Item Description</Text> */}
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={styles.historyInput}
            value=""
            onChangeText={text => dispatch(changePackageInfo(text))}
            autoFocus />
        </View>
        <View style={styles.historyContainer}>
          {/* <Text style={styles.historyLabel}>Delivery Item Description</Text> */}
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={styles.historyInput}
            value=""
            onChangeText={text => dispatch(changePackageInfo(text))}
            autoFocus />
        </View>
        <View style={styles.historyContainer}>
          {/* <Text style={styles.historyLabel}>Delivery Item Description</Text> */}
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={styles.historyInput}
            value=""
            onChangeText={text => dispatch(changePackageInfo(text))}
            autoFocus />
        </View>
        <View style={styles.historyContainer}>
          {/* <Text style={styles.historyLabel}>Delivery Item Description</Text> */}
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={styles.historyInput}
            value=""
            onChangeText={text => dispatch(changePackageInfo(text))}
            autoFocus />
        </View>

        <RedButton
          title="Go to Dashboard"
          buttonStyle={styles.button}
        />

      </View>





    </ScrollView>
  );
}

export default HistoryScreen