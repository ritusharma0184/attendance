import { Image, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import { Button } from '../../components/button'

const HelpAndSupportScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Help And Support' navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {appLogoAndHelpInfo()}
                    {nameInfo()}
                    {emailInfo()}
                    {messageInfo()}
                    {submitButton()}
                </ScrollView>
            </View>
        </View>
    )

    function submitButton() {
        return (
            <Button
                buttonText='Submit'
                onPress={() => { navigation.pop() }}
                style={{ marginVertical: Sizes.fixPadding * 3.0 }}
            />
        )
    }

    function messageInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Message
                </Text>
                <TextInput
                    placeholder='Enter Message'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={message}
                    onChangeText={setMessage}
                    style={{ ...styles.textFieldStyle, paddingTop: 0 }}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    multiline
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Email
                </Text>
                <TextInput
                    placeholder='Enter Email'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    keyboardType='email-address'
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function nameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Name
                </Text>
                <TextInput
                    placeholder='Enter Name'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={name}
                    onChangeText={setName}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function appLogoAndHelpInfo() {
        return (
            <View style={{ ...CommonStyles.center, margin: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={require('../../assets/images/app_icon.png')}
                    style={styles.appLogoStyle}
                />
                <Text style={{ ...Fonts.primaryColor22Bold, marginTop: Sizes.fixPadding }}>
                    How can we help?
                </Text>
            </View>
        )
    }
}

export default HelpAndSupportScreen

const styles = StyleSheet.create({
    appLogoStyle: {
        width: 50.0,
        height: 50.0,
        resizeMode: 'contain',
        tintColor: Colors.primaryColor
    },
    textFieldStyle: {
        ...Fonts.blackColor16Medium,
        padding: 0,
        marginTop: Sizes.fixPadding
    },
    divider: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        height: 1.0
    },
})