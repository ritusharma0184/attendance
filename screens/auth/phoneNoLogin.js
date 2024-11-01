import { BackHandler, Platform, ScrollView, StyleSheet, Image, Text, TextInput, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';
import { ExitToast } from '../../components/exitToast';
import { Colors, Sizes, Fonts, CommonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/button';
import { Touchable } from '../../components/touchable';

const PhoneNoLogin = ({ navigation }) => {

    const [backClickCount, setBackClickCount] = useState(0);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [securePassword, setSecurePassword] = useState(true);

    const backAction = () => {
        if (Platform.OS === "ios") {
            navigation.addListener("beforeRemove", (e) => {
                e.preventDefault();
            });
        } else {
            backClickCount == 1 ? BackHandler.exitApp() : _spring();
            return true;
        }
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            navigation.addListener("gestureEnd", backAction);
            return () => {
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                navigation.removeListener("gestureEnd", backAction);
            };
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {signinInfo()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {userNameOrEmailInfo()}
                    {/* {passwordInfo()} */}
                    {signinButton()}
                    {/* {socialMediaOptions()} */}
                </ScrollView>
                {dontAccountInfo()}
            </View>
            {backClickCount == 1 ? <ExitToast /> : null}
        </View>
    )

    function dontAccountInfo() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter, ...CommonStyles.center, margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Don’t have an account? { }
                </Text>
                <Touchable onPress={() => { navigation.push('Signup') }} >
                    <Text style={{ ...Fonts.primaryColor15Medium }}>
                        Sign Up
                    </Text>
                </Touchable>
            </View>

        )
    }

    function socialMediaOptions() {
        return (
            <View style={{ ...CommonStyles.center, marginHorizontal: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor15Regular, textAlign: 'center', marginHorizontal: Sizes.fixPadding }}>
                    Or continue using social media
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginVertical: Sizes.fixPadding * 2.0 }}>
                    <View style={{ ...styles.socialOptionWrapper, backgroundColor: Colors.purpleColor, }}>
                        <Image
                            source={require('../../assets/images/icons/facebook.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ ...styles.socialOptionWrapper, backgroundColor: Colors.skyColor, }}>
                        <Image
                            source={require('../../assets/images/icons/twitter.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ ...styles.socialOptionWrapper, backgroundColor: Colors.redColor, }}>
                        <Image
                            source={require('../../assets/images/icons/google.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    function signinButton() {
        return (
            <Button
                onPress={() => { navigation.push('Verification') }}
                buttonText='Sign In'
                style={{ marginVertical: Sizes.fixPadding * 4.0, }}
            />
        )
    }

    /* function passwordInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Password
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="lock-open"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Password'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        secureTextEntry={securePassword}
                    />
                    <MaterialIcons
                        name={securePassword ? 'visibility' : "visibility-off"}
                        size={16}
                        color={Colors.blackColor}
                        onPress={() => { setSecurePassword(!securePassword) }}
                        style={{ marginLeft: Sizes.fixPadding + 2.90 }}
                    />
                </View>
                <View style={styles.divider} />
            </View>
        )
    } */

    function userNameOrEmailInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Please enter your mobile number
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="call"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter your mobile number'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={userName}
                        onChangeText={setUserName}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.divider} />
            </View>
        )
    }

    function signinInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding * 3.0,
                    marginBottom: Sizes.fixPadding * 2.0
                }}
            >
                <Text style={{ ...Fonts.blackColor22Bold }}>
                    Let’s Sign You In
                </Text>
                <Text style={{ ...Fonts.grayColor15Regular, marginTop: Sizes.fixPadding }}>
                    Welcome back, you’ve been missed!
                </Text>
            </View>
        )
    }
}

export default PhoneNoLogin

const styles = StyleSheet.create({
    textFieldStyle: {
        ...Fonts.blackColor16Medium,
        padding: 0,
        flex: 1,
        marginLeft: Sizes.fixPadding + 2.0
    },
    divider: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        height: 1.0
    },
    socialOptionWrapper: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        ...CommonStyles.center,
        marginHorizontal: Sizes.fixPadding
    }
})