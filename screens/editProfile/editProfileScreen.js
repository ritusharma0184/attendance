import { ScrollView, StyleSheet, Text, View, Image, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/button'

const EditProfileScreen = ({ navigation }) => {

    const [fullName, setFullName] = useState('Samantha Smith');
    const [email, setEmail] = useState('samanthasmith@gmail.com');
    const [mobileNo, setMobileNo] = useState('(+444) 148-8563');
    const [password, setPassword] = useState('1245789635852');
    const [showChangePicOptionsSheet, setshowChangePicOptionsSheet] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Account' navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {profilePicWithChangIcon()}
                    {fullNameInfo()}
                    {emailInfo()}
                    {mobileNoInfo()}
                    {passwordInfo()}
                    {updateButton()}
                </ScrollView>
            </View>
            {changeOptionSheet()}
        </View>
    )

    function changeOptionSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showChangePicOptionsSheet}
                onRequestClose={() => { setshowChangePicOptionsSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setshowChangePicOptionsSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{
                                backgroundColor: Colors.whiteColor,
                                borderTopLeftRadius: Sizes.fixPadding * 3.0,
                                borderTopRightRadius: Sizes.fixPadding * 3.0
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center', margin: Sizes.fixPadding * 2.5 }}>
                                Choose Option
                            </Text>
                            {changePicOptionShort({ onPress: () => { }, iconName: 'camera', bgColor: '#009688', option: 'Camera' })}
                            {changePicOptionShort({ onPress: () => { }, iconName: 'images', bgColor: '#00A7F7', option: 'Gallery' })}
                            {changePicOptionShort({ onPress: () => { }, iconName: 'trash', bgColor: '#DD5A5A', option: 'Remove Photo' })}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function changePicOptionShort(props) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setshowChangePicOptionsSheet(false); props.onPress() }}
                style={{
                    ...CommonStyles.rowAlignCenter,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding * 2.0
                }}>
                <View style={{
                    ...styles.changePicOptionIconWrapper,
                    backgroundColor: props.bgColor,
                }}>
                    <Ionicons
                        name={props.iconName}
                        color={Colors.whiteColor}
                        size={20}
                    />
                </View>
                <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.grayColor15Regular, flex: 1 }}>
                    {props.option}
                </Text>
            </TouchableOpacity>
        )
    }

    function updateButton() {
        return (
            <Button
                buttonText='Update'
                onPress={() => { navigation.pop() }}
                style={{ marginVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Password
                </Text>
                <TextInput
                    placeholder='Enter Password'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                    clearTextOnFocus={false}
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function mobileNoInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <TextInput
                    placeholder='Enter Mobile Number'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={mobileNo}
                    onChangeText={setMobileNo}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                    keyboardType='phone-pad'
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

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Full Name
                </Text>
                <TextInput
                    placeholder='Enter Full Name'
                    placeholderTextColor={Colors.lightGrayColor}
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    selectionColor={Colors.primaryColor}
                />
                <View style={styles.divider} />
            </View>
        )
    }

    function profilePicWithChangIcon() {
        return (
            <View style={{ alignSelf: 'center', marginTop: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Image
                    source={require('../../assets/images/users/user12.png')}
                    style={{
                        width: 100.0,
                        height: 100.0,
                        borderRadius: 50.0,
                    }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setshowChangePicOptionsSheet(true) }}
                    style={styles.changePicIconWrapper}
                >
                    <Ionicons
                        name='camera'
                        color={Colors.whiteColor}
                        size={14}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default EditProfileScreen

const styles = StyleSheet.create({
    changePicIconWrapper: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.center,
        borderWidth: 3.0,
        borderColor: Colors.whiteColor,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    textFieldStyle: {
        ...Fonts.blackColor16Medium,
        padding: 0,
        marginTop: Sizes.fixPadding + 5.0
    },
    divider: {
        marginTop: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        height: 1.0
    },
    changePicOptionIconWrapper: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        ...CommonStyles.center
    }
})