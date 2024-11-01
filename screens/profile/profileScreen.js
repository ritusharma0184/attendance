import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Touchable } from '../../components/touchable';

const ProfileScreen = ({ navigation }) => {

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {header()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {userInfo()}
                {divider()}
                {profileOptions()}
            </ScrollView>
            {logoutDialog()}
        </View>
    )

    function logoutDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogoutDialog}
                onRequestClose={() => { setShowLogoutDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowLogoutDialog(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.dialogStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Bold }}>
                                Are you sure you want logout?
                            </Text>
                            <View style={{ ...CommonStyles.rowAlignCenter, justifyContent: 'flex-end', marginTop: Sizes.fixPadding * 2.0 }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => { setShowLogoutDialog(false) }}
                                    style={{ ...styles.dialogButtonStyle, marginRight: Sizes.fixPadding * 2.0 }}
                                >
                                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <Touchable
                                    onPress={() => { setShowLogoutDialog(false); navigation.push('Signin') }}
                                    style={{ ...styles.dialogButtonStyle, backgroundColor: Colors.primaryColor }}
                                >
                                    <Text style={{ ...Fonts.whiteColor16Medium }}>
                                        Yes, Logout
                                    </Text>
                                </Touchable>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function profileOptions() {
        return (
            <View>
                {optionShort({ onPress: () => { navigation.push('EditProfile') }, iconName: 'person', option: 'Account', bgColor: 'rgba(236, 64, 122, 0.1)', color: Colors.pinkColor })}
                {optionShort({ onPress: () => { navigation.push('Notifications') }, iconName: 'notifications', option: 'Notifications', bgColor: 'rgba(66, 165, 245, 0.1)', color: Colors.blueColor })}
                {optionShort({ onPress: () => { navigation.push('Settings') }, iconName: 'settings', option: 'Settings', bgColor: 'rgba(38, 166, 154, 0.1)', color: Colors.greenColor })}
                {optionShort({ onPress: () => { }, iconName: 'people', option: 'Invite Friends', bgColor: 'rgba(255, 112, 67, 0.1)', color: Colors.orangeColor })}
                {optionShort({ onPress: () => { navigation.push('DataAndStorage') }, iconName: 'folder', option: 'Data and Storage', bgColor: 'rgba(236, 64, 122, 0.1)', color: Colors.pinkColor })}
                {optionShort({ onPress: () => { setShowLogoutDialog(true) }, iconName: 'log-out', option: 'Logout', bgColor: 'rgba(66, 165, 245, 0.1)', color: Colors.blueColor })}
            </View>
        )
    }

    function optionShort(props) {
        return (
            <Touchable
                onPress={() => { props.onPress() }}
                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.5 }}
            >
                <View style={{ ...styles.optionIconWrapper, backgroundColor: props.bgColor }}>
                    <Ionicons
                        name={props.iconName}
                        color={props.color}
                        size={20}
                    />
                </View>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium, flex: 1, marginLeft: Sizes.fixPadding * 2.0 }}>
                    {props.option}
                </Text>
            </Touchable>
        )
    }

    function divider() {
        return (
            <View style={styles.divider} />
        )
    }

    function userInfo() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={require('../../assets/images/users/user12.png')}
                    style={{ width: 80.0, height: 80.0, borderRadius: 40.0 }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold, }}>
                        Samantha Smith
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor15Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                        samanthasmith@gmail.com
                    </Text>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ ...Fonts.blackColor22Bold, margin: Sizes.fixPadding * 2.0 }}>
                Profile
            </Text>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.5
    },
    optionIconWrapper: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        ...CommonStyles.center,
    },
    dialogButtonStyle: {
        borderWidth: 1.0,
        borderColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0
    },
    dialogStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: '90%',
        alignSelf: 'center',
        padding: Sizes.fixPadding * 2.0
    }
})