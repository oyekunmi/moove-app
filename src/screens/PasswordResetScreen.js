import React from 'react';
import { View, StyleSheet, Text, Image, TextInput } from 'react-native';
import { normalize } from '../normalizeFont';
import WhiteButton from '../components/WhiteButton';
import { ScrollView } from 'react-native-gesture-handler';
import Title from '../components/Title';


export default function PasswordResetScreen() {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#CE0303',
            paddingHorizontal: normalize(18),

        },
        lockLogoContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: normalize(30)
        },
        lockLogo: {
            width: normalize(141),
            height: normalize(141),
            resizeMode: 'contain',
        },
        contentInputContainer: {
            marginVertical: normalize(5),
        },
        contentIconInput: {
            backgroundColor: '#E3E3EC',
            borderRadius: normalize(20),
            height: normalize(40),
            fontSize: normalize(14),
            paddingHorizontal: normalize(40),
            marginVertical: normalize(9),

        },
        icon: {
            padding: 10,
            marginVertical: 48,
            marginHorizontal: 20,
            position: 'absolute',
            zIndex: 2
        },
        lastButton: {
            marginVertical: normalize(70),
            marginBottom: normalize(5),
            
        },
        inputLabel: {
            color : "#F1F1F1",
        }

    })

    return (
        <ScrollView style={styles.container}>
            <Title
                title="password reset"
                statusBarStyle="light-content"
                subTitle="enter a secure password"
                subTitleStyle={{ fontSize: normalize(22) }}
                containerStyle={{ paddingHorizontal: normalize(18) }}
            />

            <View style={styles.content}>

                <View style={styles.lockLogoContainer}>
                    <Image source={require('./../../assets/forgotpass.png')} style={styles.lockLogo} />
                </View>

                <View>
                    <View style={styles.contentInputContainer}>
                        <Text style = {styles.inputLabel}>Email</Text>
                        <Image style={styles.icon} source={require('./../../assets/email-vector.png')} />
                        <TextInput
                            style={styles.contentIconInput}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <Text style = {styles.inputLabel}>New Password</Text>
                        <Image style={styles.icon} source={require('./../../assets/lock-vector.png')} />
                        <TextInput
                            style={styles.contentIconInput}
                        />
                    </View>
                    <View style={styles.contentInputContainer}>
                        <Text style = {styles.inputLabel}>Confirm Password </Text>
                        <Image style={styles.icon} source={require('./../../assets/lock-vector.png')} />
                        <TextInput
                            style={styles.contentIconInput}
                        />
                    </View>

                </View>
                <WhiteButton
                    title="Update Password"
                    buttonStyle={styles.lastButton}
                >
                </WhiteButton>

            </View>

        </ScrollView>
    )





}