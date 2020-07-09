import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/actions';
import { useSafeArea } from 'react-native-safe-area-context';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const insets = useSafeArea();

  return (
    // <SafeAreaView> 
       <View
      style={{
        // paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
      }}
    >
        <Text>Signed in!dssdsdfsd</Text>
        <Button title="Sign out" onPress={() => dispatch(signOut())} />
      </View>
    // </SafeAreaView>
  );
}

export default HomeScreen;