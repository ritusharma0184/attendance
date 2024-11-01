import { Image, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';
import { GiftedChat } from 'react-native-gifted-chat'
import { ImagesView, LocationView, MessageView } from '../../components/commonMessage';

const loginUserId = 1;

const messagesList = [
    {
        _id: 1,
        text: 'I don’t have any special plan',
        createdAt: new Date(Date.UTC(2024, 2, 19, 17, 20, 0)),
        sent: true,
        received: false,
        user: { _id: loginUserId },
    },
    {
        _id: 2,
        text: 'What are you doing this weekend?',
        createdAt: new Date(Date.UTC(2024, 2, 19, 17, 10, 0)),
        user: { _id: 2 },
    },
    {
        _id: 3,
        text: 'I am also good 😊',
        createdAt: new Date(Date.UTC(2024, 2, 19, 17, 10, 0)),
        user: { _id: 2 },
    },
    {
        _id: 4,
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 9, 0)),
        text: 'i’m fine... How are you?',
        sent: true,
        received: true,
        user: { _id: loginUserId },
    },
    {
        _id: 5,
        text: 'How are you?',
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 8, 0)),
        user: { _id: 2 },
    },
    {
        _id: 6,
        text: 'Hey Samantha 🖐',
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 5, 0)),
        user: { _id: 2 },
    },
    {
        _id: 7,
        text: 'Hey, Whats up! 🖐🖐',
        createdAt: new Date(Date.UTC(2024, 2, 11, 17, 4, 0)),
        user: { _id: loginUserId },
        sent: true,
        received: true,
    },
]

const PersonalChatScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [messages, setMessages] = useState(messagesList)
    const [typeMessage, setTypeMessage] = useState('');
    const [showSendOptionsSheet, setShowSendOptionsSheet] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);

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
            return <LocationView props={props} messageIn='personal' />;
        }
        else if (currentMessage.images) {
            return <ImagesView props={props} messageIn='personal' />
        }
        return <MessageView props={props} messageIn='personal' />;
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <MyStatusBar />
            {header()}
            <View style={{ flex: 1 }}>
                {messagesInfo()}
            </View>
            {optionsSheet()}
        </View>
    )

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
                            {sheetOptionShort({ iconName: 'camera-alt', option: 'Camera', onPress: () => { navigation.push('SelectPhoto', { sendIn: 'personal' }) }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'image', option: 'Gallery', onPress: () => { navigation.push('SelectPhoto', { sendIn: 'personal' }) }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'insert-drive-file', option: 'Document', onPress: () => { }, })}
                            <View style={styles.sheetDivider} />
                            {sheetOptionShort({ iconName: 'location-pin', option: 'Location', onPress: () => { navigation.push('SelectLocation', { sendIn: 'personal' }) }, })}
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
                        Online
                    </Text>
                </View>
                <Touchable
                    onPress={() => { navigation.push('VideoCall') }}
                    style={{ ...styles.callAndVideoButton, marginHorizontal: Sizes.fixPadding + 5.0, }}
                >
                    <Ionicons
                        name='videocam'
                        color={Colors.primaryColor}
                        size={17}
                    />
                </Touchable>
                <Touchable
                    onPress={() => { navigation.push('AudioCall') }}
                    style={styles.callAndVideoButton}
                >
                    <Ionicons
                        name='call'
                        color={Colors.primaryColor}
                        size={17}
                    />
                </Touchable>

                <TouchableOpacity
                    activeOpacity={0.8}
                   
                >
                    <Image
                        source={require('../../assets/images/icons/add.png')}
                        style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default PersonalChatScreen

const styles = StyleSheet.create({
    callAndVideoButton: {
        width: 28.0,
        height: 28.0,
        borderRadius: 14.0,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.center
    },
    userImageWrapper: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        marginHorizontal: Sizes.fixPadding + 5.0
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
    footerWrapStyle: {
        opacity: 0.4,
        ...CommonStyles.rowAlignCenter,
        marginBottom: Sizes.fixPadding * 1.5,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    messageFieldStyle: {
        padding: 0,
        flex: 1,
        ...Fonts.whiteColor15Regular,
        marginHorizontal: Sizes.fixPadding
    }
})