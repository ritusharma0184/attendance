import { BackHandler, Platform, ScrollView, StyleSheet, Alert,Image, Text, TextInput, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';
import { ExitToast } from '../../components/exitToast';
import { Colors, Sizes, Fonts, CommonStyles } from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/button';
import { Touchable } from '../../components/touchable';

const SigninScreen = ({ navigation }) => {

    const [backClickCount, setBackClickCount] = useState(0);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [securePassword, setSecurePassword] = useState(true);

    const [userNameError, setUserNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [validationError, setValidationError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
        return emailRegex.test(email);
    };


    //const handleSignin = () => { 


       // const testEmail = 'abc@gmail.com';
        //const testPassword = '1234';
        async function handleSignin() {
            
        
       
        if (userName.trim() === '') {
            setUserNameError('Please enter email'); return false;
          
        }
        else {
            setUserNameError('');
            isValid = true;
        }
        if (!validateEmail(userName)) {
            setUserNameError('Please enter a valid email address'); return false;
            
        }
        else {
            setUserNameError('');
            isValid = true;
        }

        /* if (userName != testEmail) {
            setUserNameError('Email does not exist!'); return false;
           
        } else {
            setUserNameError('')
            isValid = true;
        } */


        if (password.trim() === "") {

            setPasswordError('Please enter password'); return false;
            isValid = false;
        }
        else {
            setPasswordError('')
            isValid = true;
        }

        /* if (password != testPassword) {
            setPasswordError('Invalid password'); return false;
        }
        else {
            setPasswordError('Invalid password')
            isValid = true;
        }
 */         

         if (isValid == true) {
            try{
                const response = await fetch("https://www.hdsoftwares.com/attendance/welcome/login",{
                    method:"POST",
                    headers: {
                        'Content-Type' :'application/Json',
                    },
                    body :JSON.stringify({
                        email:userName,
                        password:password
                    }),
                });

                const data = await response.json(); // Parse the response to JSON
                console.warn(data)
                if(data.status==1)
                {
                    navigation.push("MarkAttendance",{'name':data.fullname})
                }
                else{
                    Alert.alert(
                        "Alert", // Title of the alert
                        "Email or password does'nt exist", // Message in the alert
                        [
                           {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel" // Optional 'cancel' style
                          }, 
                          {
                            text: "OK", 
                            onPress: () => console.log
                          }
                        ],
                        { cancelable: true } // Optional: controls whether the alert can be dismissed by tapping outside of it
                      );
                }
               
            }
            catch (error) {
                 console.error('Error:', error);
               } 
        }

    
        
}




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
                    {passwordInfo()}
                    {signinButton()}
                    {/* {socialMediaOptions()} */}

                    <Text style={{ textAlign: "center", color: 'red', fontSize: 15 }}>{validationError ? validationError : ''}</Text>
                </ScrollView>

                {dontAccountInfo()}


            </View>
            {/* {backClickCount == 1 ? <ExitToast /> : null} */}

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


    function signinButton() {
        return (
            <View>
                <Button
                    onPress={() => handleSignin()}/* { navigation.push('MarkAttendance') }} */
                    buttonText='Sign In'
                    style={{ marginVertical: Sizes.fixPadding * 4.0, }}
                />

            </View>

        )
    }

    function passwordInfo() {
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
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <MaterialIcons
                        name={securePassword ? 'visibility' : "visibility-off"}
                        size={16}
                        color={Colors.blackColor}
                        onPress={() => { setSecurePassword(!securePassword) }}
                        style={{ marginLeft: Sizes.fixPadding + 2.90 }}
                    />
                </View>
                <View style={passwordError ? styles.dividerError : styles.divider} />
            </View>
        )
    }

    function userNameOrEmailInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Email
                </Text>
                <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding + 5.0 }}>
                    <Ionicons
                        name="person"
                        size={18}
                        color={Colors.blackColor}
                    />
                    <TextInput
                        placeholder='Enter Email'
                        placeholderTextColor={Colors.lightGrayColor}
                        value={userName}
                        onChangeText={setUserName}
                        style={styles.textFieldStyle}
                        cursorColor={Colors.primaryColor}
                        selectionColor={Colors.primaryColor}
                        keyboardType='email-address'
                    />
                    {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}
                </View>
                <View style={userNameError ? styles.dividerError : styles.divider} />
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

export default SigninScreen

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

    dividerError: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.redColor,
        height: 1.5,

    },

    errorText: {
        color: 'red',
        marginbottom: 20,
        //paddingBottom: 10
    },
    socialOptionWrapper: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        ...CommonStyles.center,
        marginHorizontal: Sizes.fixPadding
    }
})