import { Image, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, FlatList, } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';
import { GiftedChat } from 'react-native-gifted-chat'
import { MessageView, LocationView, ImagesView } from '../../components/commonMessage';
import { Menu } from 'react-native-material-menu';

const loginUserId = 1;

const messagesList = [
    {
        _id: 1,
        text: 'Share PDF file sara',
        createdAt: new Date(Date.UTC(2024, 2, 19, 17, 20, 0)),
        user: { _id: loginUserId, },
        sent: true,
        received: false,
    },
    {
        _id: 2,
        location: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
        createdAt: new Date(Date.UTC(2024, 2, 19, 17, 10, 0)),
        user: { _id: 2, name: 'Sara' },
    },
    {
        _id: 3,
        text: 'Did anyone complete DBMS assignment?',
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 10, 0)),
        user: { _id: 4, name: 'Rita' },
    },
    {
        _id: 4,
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 9, 0)),
        text: 'Whats going on? 🤔',
        user: { _id: 3, name: 'Malik' },
    },
    {
        _id: 5,
        text: 'Hey everyone! 🖐',
        images: [
            {
                id: '1',
                image: require('../../assets/images/photos/1.png')
            },
            {
                id: '2',
                image: require('../../assets/images/photos/2.png')
            },
            {
                id: '3',
                image: require('../../assets/images/photos/3.png')
            },
            {
                id: '4',
                image: require('../../assets/images/photos/4.png')
            }
        ],
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 8, 0)),
        user: { _id: 3, name: 'Malik' },
    },
    {
        _id: 6,
        text: 'Hey Guys, Whats up! 🖐🖐',
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 5, 0)),
        user: { _id: loginUserId },
        sent: true,
        received: true,
    },
]

const GroupChatScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [messages, setMessages] = useState(messagesList)
    const [typeMessage, setTypeMessage] = useState('');
    const [showSendOptionsSheet, setShowSendOptionsSheet] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (route.params?.selectedPhotos) {
            setSelectedPhotos(route.params.selectedPhotos);
        }
    }, [route?.params?.selectedPhotos]);

    useEffect(() => {
        if (route.params?.location) {
            onSend({
                _id: Math.round(Math.random() * 1000000),
                createdAt: new Date(),
                location: route.params.location,
                user: { _id: 1 },
            }, true);
        }
    }, [route?.params?.location]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const renderBubble = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return <LocationView props={props} messageIn='group' />;
        }
        else if (currentMessage.images) {
            return <ImagesView props={props} messageIn='group' />
        }
        return <MessageView props={props} messageIn='group' />;
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {messagesInfo()}
            </View>
            {optionsSheet()}
        </View>
    )

    function selectedPhotoInfo() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding - 9.0 }}>
                <Image
                    source={item.image}
                    style={{ width: screenWidth / 4.5, height: screenWidth / 4.5, }}
                />
                <MaterialIcons
                    name='close'
                    color={Colors.whiteColor}
                    size={18}
                    style={{ position: 'absolute', top: 5.0, right: 5.0 }}
                    onPress={() => { setSelectedPhotos(selectedPhotos.filter((i) => i.id !== item.id)) }}
                />
            </View>
        )
        return (
            <View style={{ position: 'absolute', bottom: 85.0, left: 0, right: 0, backgroundColor: Colors.whiteColor }}>
                <FlatList
                    data={selectedPhotos}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 1.9 }}
                />
            </View>
        )
    }

    function optionsSheet() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showSendOptionsSheet}
                onRequestClose={() => { setShowSendOptionsSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowSendOptionsSheet(false); }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={styles.sheetStyle}
                        >
                            {sheetOptionShort({ iconName: 'camera-alt', option: 'Camera', onPress: () => { navigation.push('SelectPhoto', { sendIn: 'group' }) }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'image', option: 'Gallery', onPress: () => { navigation.push('SelectPhoto', { sendIn: 'group' }) }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'insert-drive-file', option: 'Document', onPress: () => { }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'location-pin', option: 'Location', onPress: () => { navigation.push('SelectLocation', { sendIn: 'group' }) }, })}
                            <Text
                                onPress={() => { setShowSendOptionsSheet(false) }}
                                style={{ ...Fonts.primaryColor17Bold, alignSelf: 'center', marginTop: Sizes.fixPadding * 2.0 }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function sheetOptionShort(props) {
        return (
            <Touchable
                onPress={() => {
                    setShowSendOptionsSheet(false);
                    props.onPress();
                }}
                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
            >
                <MaterialIcons name={props.iconName} size={22} color={Colors.lightGrayColor} />
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                    {props.option}
                </Text>
            </Touchable>
        )
    }

    function messagesInfo() {
        return (
            <View style={styles.messagesWrapper}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{ _id: 1 }}
                    renderAvatar={null}
                    renderBubble={renderBubble}
                    minInputToolbarHeight={85}
                    renderFooter={() => {
                        return (
                            <View style={styles.footerWrapStyle}>
                                <Ionicons
                                    name='chatbox-ellipses-outline'
                                    color={Colors.grayColor}
                                    size={20}
                                />
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding }}>
                                    Sara is typing..
                                </Text>
                            </View>
                        )
                    }}
                    listViewProps={{
                        showsVerticalScrollIndicator: false,
                        contentContainerStyle: {
                            paddingTop: selectedPhotos.length !== 0 ? 90.0 : 0,
                            paddingBottom: Sizes.fixPadding * 1.5
                        }
                    }}
                    renderInputToolbar={(props) => {
                        const { messageIdGenerator, user, onSend } = props
                        return (
                            <View>
                                {selectedPhotos.length == 0 ? null : selectedPhotoInfo()}
                                <View style={styles.messageFieldWrapper}>
                                    <MaterialIcons
                                        name='add'
                                        color={Colors.whiteColor}
                                        size={24}
                                        onPress={() => { setShowSendOptionsSheet(true) }}
                                    />
                                    <TextInput
                                        placeholder='Write something...'
                                        placeholderTextColor={Colors.whiteColor}
                                        value={typeMessage}
                                        onChangeText={setTypeMessage}
                                        cursorColor={Colors.whiteColor}
                                        selectionColor={Colors.whiteColor}
                                        style={styles.messageFieldStyle}
                                    />
                                    <MaterialIcons
                                        onPress={() => {
                                            if (selectedPhotos.length !== 0) {
                                                onSend({
                                                    text: typeMessage.trim(),
                                                    createdAt: new Date(),
                                                    images: selectedPhotos,
                                                    user: user,
                                                    sent: true,
                                                    received: false,
                                                    _id: messageIdGenerator
                                                }, true);
                                                setTypeMessage('');
                                                setSelectedPhotos([]);
                                            }
                                            else {
                                                if (typeMessage) {
                                                    onSend({
                                                        text: typeMessage.trim(),
                                                        user: user,
                                                        sent: true,
                                                        received: false,
                                                        _id: messageIdGenerator
                                                    }, true);
                                                    setTypeMessage('');
                                                }
                                            }
                                        }}
                                        name='send'
                                        color={Colors.whiteColor}
                                        size={22}
                                    />
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View
                style={{
                    ...CommonStyles.rowAlignCenter,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding * 3.0
                }}
            >
                <Touchable onPress={() => { navigation.pop() }}>
                    <Ionicons
                        name='chevron-back'
                        color={Colors.whiteColor}
                        size={24}
                    />
                </Touchable>
                <Image
                    source={item.image}
                    style={styles.userImageWrapper}
                />
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold }}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor15Regular, marginTop: Sizes.fixPadding - 7.0 }}>
                        You, Malik, Sara, Hakeem, Jane...
                    </Text>
                </View>
                <Menu
                    visible={showMenu}
                    anchor={<Ionicons
                        name='ellipsis-vertical'
                        color={Colors.whiteColor}
                        size={20}
                        onPress={() => { setShowMenu(true) }}
                    />}
                    onRequestClose={setShowMenu}
                >
                    <View style={{
                        backgroundColor: Colors.whiteColor,
                        borderRadius: Sizes.fixPadding,
                        paddingVertical: Sizes.fixPadding * 2.0
                    }}>
                        {meuOptionSort({ iconName: 'add', option: 'Add People to Chat', size: 22, onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'volume-mute', option: 'Mute Chat', onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'star', option: 'Stared Messages', size: 18, onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'notifications-off', option: 'Snooze', onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'trash', option: 'Delete Group', onPress: () => { } })}
                        <View style={styles.menuDivider} />
                        {meuOptionSort({ iconName: 'log-out', option: 'Leave Group', onPress: () => { } })}
                    </View>
                </Menu>
            </View>
        )
    }

    function meuOptionSort(props) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowMenu(false)}
                style={{ ...CommonStyles.rowAlignCenter, marginHorizontal: Sizes.fixPadding * 2.0 }}
            >
                <View style={{ width: 20.0, height: 20.0, ...CommonStyles.center }}>
                    <Ionicons
                        name={props.iconName}
                        color={Colors.lightGrayColor}
                        size={props.size ? props.size : 20}
                    />
                </View>
                <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                    {props.option}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default GroupChatScreen;

const styles = StyleSheet.create({
    userImageWrapper: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        marginHorizontal: Sizes.fixPadding + 5.0
    },
    messagesWrapper: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 4.0,
        borderTopRightRadius: Sizes.fixPadding * 4.0,
        overflow: 'hidden',
    },
    messageFieldWrapper: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        ...CommonStyles.rowAlignCenter,
        borderRadius: Sizes.fixPadding * 5.0,
        margin: Sizes.fixPadding * 2.0,
    },
    sheetDivider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1,
        marginVertical: Sizes.fixPadding + 5.0
    },
    sheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 3.0,
    },
    footerWrapStyle: {
        opacity: 0.4,
        ...CommonStyles.rowAlignCenter,
        marginBottom: Sizes.fixPadding * 1.5,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    menuDivider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    messageFieldStyle: {
        padding: 0,
        flex: 1,
        ...Fonts.whiteColor15Regular,
        marginHorizontal: Sizes.fixPadding
    }
})