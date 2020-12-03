import React, { Component } from "react";
import {
  Button, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet,
  Text, TextInput, TouchableWithoutFeedback, View, ScrollView 
} from "react-native";
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions';
import { normalize } from '../normalizeFont';
import RedButton from '../components/RedButton';
import Link from '../components/Link';
import Title from '../components/Title';

function LoginScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView  style={styles.inner}>
            <Title
              title="welcome"
              subTitle="Let’s get you signed in"
            />

            <TextInput
              placeholder="Username 1"
              style={styles.input}
            />
            <TextInput
              placeholder="Username 2"
              style={styles.input}
            />
            <TextInput
              placeholder="Username 3 "
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
            />
            
            <TextInput
              placeholder="Confrim Password"
              style={styles.input}
            />
            <TextInput
              placeholder="Confrim Password"
              style={styles.input}
            />
            <TextInput
              placeholder="Confrim Password"
              style={styles.input}
            />
            <TextInput
              placeholder="Confrim Password"
              style={styles.input}
            />
            <TextInput
              placeholder="Confr im Password"
              style={styles.input}
            />
            <View style={styles.btnContainer}>
              <Button title="Submit" onPress={() => null} />
            </View>
            <View style={{ flex: 1 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
  },

  input: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default LoginScreen;