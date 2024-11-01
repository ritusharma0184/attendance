import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import { Switch } from '../../components/switch'

const vibrateOptions = ['Off', 'Default', 'Short', 'Long'];

const NotificationsScreen = ({ navigation }) => {

    const [messageNotoPriority, setMessageNotoPriority] = useState(true);
    const [messageReactionNoti, setMessageReactionNoti] = useState(true);
    const [groupNotoPriority, setGroupNotoPriority] = useState(true);
    const [groupReactionNoti, setGroupReactionNoti] = useState(true);
    const [showVibrateDialog, setShowVibrateDialog] = useState(false);
    const [selctedVibrateIndex, setSelctedVibrateIndex] = useState(1);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Notifications' navigation={navigation} />
                {messageInfo()}
                {divider()}
                {callsInfo()}
                {divider()}
                {groupInfo()}
            </View>
            {vibrateDialog()}
        </View>
    )

    function callsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Calls
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setShowVibrateDialog(true) }}
                    style={{ marginTop: Sizes.fixPadding * 2.0 }}
                >
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Vibrate
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                        {vibrateOptions[selctedVibrateIndex]}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function groupInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Groups
                </Text>
                {groupPriorityNotiInfo()}
                {groupReactionNotiInfo()}
            </View>
        )
    }

    function vibrateDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showVibrateDialog}
                onRequestClose={() => { setShowVibrateDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowVibrateDialog(false); }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.dialogStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Bold }}>
                                Vibrate
                            </Text>
                            {
                                vibrateOptions.map((item, index) => (
                                    <View
                                        key={`${index}`}
                                        style={{ ...CommonStyles.rowAlignCenter, marginTop: Sizes.fixPadding * 2.0 }}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => { setSelctedVibrateIndex(index); setShowVibrateDialog(false) }}
                                            style={{ ...CommonStyles.rowAlignCenter }}
                                        >
                                            <View
                                                style={{
                                                    ...styles.radioButtonStyle,
                                                    borderColor: selctedVibrateIndex == index ? Colors.primaryColor : Colors.lightGrayColor,
                                                }}
                                            >
                                                {
                                                    selctedVibrateIndex == index ?
                                                        <View style={styles.radioButtonInnerCircle} />
                                                        :
                                                        null
                                                }
                                            </View>
                                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium, flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function groupReactionNotiInfo() {
        return (
            <View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding * 2.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            Reaction Notifications
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            Show notifications for reactions to messages you send
                        </Text>
                    </View>
                    <Switch value={groupReactionNoti} setValue={() => { setGroupReactionNoti(!groupReactionNoti) }} />
                </View>
            </View>
        )
    }

    function groupPriorityNotiInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding * 2.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            Use high priority notifications
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            Show previews of notifications at the top of the screen
                        </Text>
                    </View>
                    <Switch value={groupNotoPriority} setValue={() => { setGroupNotoPriority(!groupNotoPriority) }} />
                </View>
            </View>
        )
    }

    function divider() {
        return (
            <View style={styles.divider} />
        )
    }

    function messageInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Messages
                </Text>
                {messagePriorityNotiInfo()}
                {messageReactionNotiInfo()}
            </View>
        )
    }

    function messageReactionNotiInfo() {
        return (
            <View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding * 2.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            Reaction Notifications
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            Show notifications for reactions to messages you send
                        </Text>
                    </View>
                    <Switch value={messageReactionNoti} setValue={() => { setMessageReactionNoti(!messageReactionNoti) }} />
                </View>
            </View>
        )
    }

    function messagePriorityNotiInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding * 2.0 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                            Use high priority notifications
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                            Show previews of notifications at the top of the screen
                        </Text>
                    </View>
                    <Switch value={messageNotoPriority} setValue={() => { setMessageNotoPriority(!messageNotoPriority) }} />
                </View>
            </View>
        )
    }
}

export default NotificationsScreen

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        opacity: 0.1,
        margin: Sizes.fixPadding * 2.0
    },
    radioButtonStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        borderWidth: 1.0,
        ...CommonStyles.center,
    },
    radioButtonInnerCircle: {
        backgroundColor: Colors.primaryColor,
        width: 9.0,
        height: 9.0,
        borderRadius: 4.5,
        backgroundColor: Colors.primaryColor
    },
    dialogStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: '85%',
        alignSelf: 'center',
        padding: Sizes.fixPadding * 2.0,
    }
})