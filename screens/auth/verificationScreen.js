import { ScrollView, StyleSheet, Text, Modal, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../components/myStatusBar'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import { Touchable } from '../../components/touchable'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/button'
import { OtpInput } from 'react-native-otp-entry';
import { Circle } from 'react-native-animated-spinkit';

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState("");
    const [isLoading, setisLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {otpInfo()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {sentInfo()}
                    {otpFields()}
                    {continueButton()}
                </ScrollView>
            </View>
            {loadingDialog()}
        </View>
    )

    function loadingDialog() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.dialogStyle}
                        >
                            <View style={{ ...CommonStyles.center }}>
                                <Circle size={50} color={Colors.primaryColor} style={{ marginTop: Sizes.fixPadding - 5.0 }} />
                                <Text style={{ ...Fonts.grayColor15Regular, marginTop: Sizes.fixPadding + 10.0 }}>
                                    Please wait...
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function otpFields() {
        return (
            <View>
                <OtpInput
                    numberOfDigits={4}
                    focusColor={Colors.primaryColor}
                    onTextChange={text => {
                        if (text.length == 4) {
                            setotpInput(text);
                            Keyboard.dismiss();
                            setisLoading(true);
                            setTimeout(() => {
                                setisLoading(false);
                                navigation.push('BottomTabBar')
                            }, 2000);
                        }
                    }}
                    theme={{
                        containerStyle: { ...styles.otpFieldWrapper },
                        inputsContainerStyle: { justifyContent: 'space-between' },
                        pinCodeContainerStyle: { ...styles.textFieldStyle },
                        pinCodeTextStyle: { ...Fonts.blackColor16Medium },
                        focusStickStyle: { height: 25 },
                        focusedPinCodeContainerStyle: { borderWidth: 0, borderBottomWidth: 1.0, borderBottomColor: Colors.primaryColor }
                    }}
                />
            </View>
        )
    }

  /*   function continueButton() {
        return (
            <Button
                onPress={() => {
                    setisLoading(true);
                    setTimeout(() => {
                        setisLoading(false);
                        navigation.push('MarkAttendance')
                    }, 2000);
                }}
                buttonText='Continue'
                style={{ margin: Sizes.fixPadding * 2.0 }}
            />
        )
    } */

    function sentInfo() {
        return (
            <Text style={{ ...Fonts.grayColor15Regular, lineHeight: 22.0, margin: Sizes.fixPadding * 2.0 }}>
                An authentication code has been sent to {`\n`}
                (+444) 148-8563
            </Text>
        )
    }

    function otpInfo() {
        return (
            <View style={styles.otpInfoWrapper}>
                <Touchable
                    onPress={() => { navigation.pop() }}
                    style={{ marginTop: Sizes.fixPadding - 8.0, }}
                >
                    <Ionicons
                        name='chevron-back'
                        color={Colors.blackColor}
                        size={24}
                    />
                </Touchable>
                <Text style={{ ...Fonts.blackColor22Bold, flex: 1, marginLeft: Sizes.fixPadding * 1.5 }}>
                    OTP Authentication
                </Text>
            </View>
        )
    }
}

export default VerificationScreen

const styles = StyleSheet.create({
    otpInfoWrapper: {
        ...CommonStyles.rowAlignCenter,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    dialogStyle: {
        backgroundColor: Colors.whiteColor,
        width: '80%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding * 2.0,
    },
    otpFieldWrapper: {
        margin: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
    },
    textFieldStyle: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1.0,
        borderBottomColor: Colors.lightGrayColor,
        width: screenWidth / 6.0,
        height: 35.0,
    },
})