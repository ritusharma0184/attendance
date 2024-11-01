import moment from 'moment';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../constants/styles';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const loginUserId = 1;

const bgColor = [
    Colors.orangeColor,
    Colors.pinkColor,
    Colors.blueColor,
    Colors.greenColor,
];

export function getRandomColor() {
    var item = bgColor[Math.floor(Math.random() * bgColor.length)];
    return item
}

export const MessageView = ({ props, messageIn }) => {
    return (
        <View style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding }}>
            {
                messageIn == 'group'
                    ?
                    (props?.previousMessage?.user?._id == props.currentMessage.user._id) || props.currentMessage.user._id == loginUserId
                        ?
                        null
                        :
                        <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Medium, color: getRandomColor(), }}>
                            {props.currentMessage.user.name}
                        </Text>
                    :
                    null
            }
            <View style={{
                ...styles.messageChatBox,
                borderTopLeftRadius: props.currentMessage.user._id != loginUserId ? 0 : Sizes.fixPadding * 3.0,
                borderTopRightRadius: props.currentMessage.user._id != loginUserId ? Sizes.fixPadding * 3.0 : 0,
                alignSelf: props.currentMessage.user._id != loginUserId ? 'flex-start' : 'flex-end',
                backgroundColor: props.currentMessage.user._id != loginUserId ? Colors.extraLightGrayColor : Colors.lightPrimaryColor
            }}>
                <Text style={{ ...Fonts.blackColor15Regular }}>
                    {props.currentMessage.text}
                </Text>
            </View>
            <View
                style={{
                    ...CommonStyles.rowAlignCenter,
                    alignSelf: props.currentMessage.user._id != loginUserId ? 'flex-start' : 'flex-end',
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {moment(new Date(props.currentMessage.createdAt).toUTCString()).format('hh:mm a')}
                </Text>
                {
                    props.currentMessage.user._id == loginUserId
                        ?
                        <Ionicons
                            name={props.currentMessage.sent && props.currentMessage.received ? 'checkmark-done' : 'checkmark'}
                            color={Colors.primaryColor}
                            size={20}
                            style={{ marginLeft: Sizes.fixPadding - 2.0 }}
                        />
                        :
                        null
                }
            </View>
        </View>
    )
}

export const LocationView = ({ props, messageIn }) => {
    const openMaps = () => {
        const url = `http://maps.google.com/?q=${props.currentMessage.location.latitude},${props.currentMessage.location.longitude}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                console.error('An error occurred', err);
            });
    };
    return (
        <View style={{ marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding + 5.0, }}>
            {
                messageIn == 'group'
                    ?
                    (props?.previousMessage?.user?._id == props.currentMessage.user._id) || props.currentMessage.user._id == loginUserId
                        ?
                        null
                        :
                        <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Medium, color: getRandomColor(), }}>
                            {props.currentMessage.user.name}
                        </Text>
                    :
                    null
            }
            <View
                style={{
                    ...styles.locationChatBox,
                    borderTopLeftRadius: props.currentMessage.user._id != loginUserId ? 0 : Sizes.fixPadding * 3.0,
                    borderTopRightRadius: props.currentMessage.user._id != loginUserId ? Sizes.fixPadding * 3.0 : 0,
                    alignSelf: props.currentMessage.user._id != loginUserId ? 'flex-start' : 'flex-end',
                    backgroundColor: props.currentMessage.user._id != loginUserId ? Colors.extraLightGrayColor : Colors.lightPrimaryColor
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={openMaps}
                    style={styles.locationWrapper}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ height: '100%', width: '100%' }}
                        region={{
                            latitude: props.currentMessage.location.latitude,
                            longitude: props.currentMessage.location.longitude,
                            latitudeDelta: 0.025,
                            longitudeDelta: 0.025
                        }}
                        annotations={[
                            {
                                latitude: props.currentMessage.location.latitude,
                                longitude: props.currentMessage.location.longitude,
                            },
                        ]}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    />
                </TouchableOpacity>
                <Text style={{ ...Fonts.grayColor14Regular, marginVertical: Sizes.fixPadding }}>
                    You shared your live location for 1 hour.
                </Text>
                <Text style={{ ...Fonts.primaryColor14Medium }}>
                    Stop Sharing
                </Text>
            </View>
            <View
                style={{
                    ...CommonStyles.rowAlignCenter,
                    alignSelf: props.currentMessage.user._id != loginUserId ? 'flex-start' : 'flex-end',
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {moment(new Date(props.currentMessage.createdAt).toUTCString()).format('hh:mm a')}
                </Text>
                {
                    props.currentMessage.user._id == loginUserId
                        ?
                        <Ionicons
                            name={props.currentMessage.sent && props.currentMessage.received ? 'checkmark-done' : 'checkmark'}
                            color={Colors.primaryColor}
                            size={20}
                            style={{ marginLeft: Sizes.fixPadding - 2.0 }}
                        />
                        :
                        null
                }
            </View>
        </View>
    );
};

export const ImagesView = ({ props, messageIn }) => {
    return (
        <View style={{ marginHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding + 5.0, }}>
            {
                messageIn == 'group'
                    ?
                    (props?.previousMessage?.user?._id == props.currentMessage.user._id) || props.currentMessage.user._id == loginUserId
                        ?
                        null
                        :
                        <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Medium, color: getRandomColor(), }}>
                            {props.currentMessage.user.name}
                        </Text>
                    :
                    null
            }
            <View style={{
                ...styles.imagesChatBox,
                borderTopLeftRadius: props.currentMessage.user._id != loginUserId ? 0 : Sizes.fixPadding * 3.0,
                borderTopRightRadius: props.currentMessage.user._id != loginUserId ? Sizes.fixPadding * 3.0 : 0,
                alignSelf: props.currentMessage.user._id != loginUserId ? 'flex-start' : 'flex-end',
                backgroundColor: props.currentMessage.user._id != loginUserId ? Colors.extraLightGrayColor : Colors.lightPrimaryColor
            }}>
                <View style={{ ...CommonStyles.rowAlignCenter, }}>
                    {
                        props.currentMessage.images.slice(0, 3).map((item, index) => (
                            <View
                                key={`${index}`}
                                style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: screenWidth / 5,
                                        height: screenWidth / 5,
                                        borderRadius: Sizes.fixPadding + 5.0,
                                    }}
                                />
                                {
                                    props.currentMessage.images.length > 3 && index == 2
                                        ?
                                        <View style={styles.messageImageOverlay}>
                                            <Text style={{ ...Fonts.whiteColor18Bold }}>
                                                +{props.currentMessage.images.length - 3}
                                            </Text>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                        ))
                    }
                </View>
                {
                    props.currentMessage.text ?
                        <Text
                            style={{
                                ...Fonts.blackColor15Regular,
                                marginHorizontal: Sizes.fixPadding - 5.0,
                                marginTop: Sizes.fixPadding
                            }}
                        >
                            {props.currentMessage.text}
                        </Text>
                        :
                        null
                }
            </View>
            <View
                style={{
                    ...CommonStyles.rowAlignCenter,
                    alignSelf: props.currentMessage.user._id != loginUserId ? 'flex-start' : 'flex-end',
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {moment(new Date(props.currentMessage.createdAt).toUTCString()).format('hh:mm a')}
                </Text>
                {
                    props.currentMessage.user._id == loginUserId
                        ?
                        <Ionicons
                            name={props.currentMessage.sent && props.currentMessage.received ? 'checkmark-done' : 'checkmark'}
                            color={Colors.primaryColor}
                            size={20}
                            style={{ marginLeft: Sizes.fixPadding - 2.0 }}
                        />
                        :
                        null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageImageOverlay: {
        ...CommonStyles.center,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: Sizes.fixPadding + 5.0,
        backgroundColor: 'rgba(39, 73, 109, 0.6)'
    },
    imagesChatBox: {
        padding: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
    locationChatBox: {
        width: '100%',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
    locationWrapper: {
        overflow: 'hidden',
        width: '100%',
        height: 100.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    },
    messageChatBox: {
        marginBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding * 3.0,
    },
});