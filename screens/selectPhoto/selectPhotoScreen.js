import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles, screenWidth } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../../components/touchable';
import { Menu, MenuItem } from 'react-native-material-menu';

const photosList = [
    {
        id: '1',
        image: require('../../assets/images/photos/1.png'),
        selected: false,
    },
    {
        id: '2',
        image: require('../../assets/images/photos/2.png'),
        selected: false,
    },
    {
        id: '3',
        image: require('../../assets/images/photos/3.png'),
        selected: false,
    },
    {
        id: '4',
        image: require('../../assets/images/photos/4.png'),
        selected: false,
    },
    {
        id: '5',
        image: require('../../assets/images/photos/5.png'),
        selected: false,
    },
    {
        id: '6',
        image: require('../../assets/images/photos/6.png'),
        selected: false,
    },
    {
        id: '7',
        image: require('../../assets/images/photos/7.png'),
        selected: false,
    },
    {
        id: '8',
        image: require('../../assets/images/photos/8.png'),
        selected: false,
    },
    {
        id: '9',
        image: require('../../assets/images/photos/9.png'),
        selected: false,
    },
    {
        id: '10',
        image: require('../../assets/images/photos/10.png'),
        selected: false,
    },
    {
        id: '11',
        image: require('../../assets/images/photos/11.png'),
        selected: false,
    },
    {
        id: '12',
        image: require('../../assets/images/photos/12.png'),
        selected: false,
    },
    {
        id: '30',
        image: require('../../assets/images/photos/30.png'),
        selected: false,
    },
    {
        id: '31',
        image: require('../../assets/images/photos/31.png'),
        selected: false,
    },
    {
        id: '32',
        image: require('../../assets/images/photos/32.png'),
        selected: false,
    },
    {
        id: '33',
        image: require('../../assets/images/photos/33.png'),
        selected: false,
    },
    {
        id: '13',
        image: require('../../assets/images/photos/13.png'),
        selected: false,
    },
    {
        id: '14',
        image: require('../../assets/images/photos/14.png'),
        selected: false,
    },
    {
        id: '15',
        image: require('../../assets/images/photos/15.png'),
        selected: false,
    },
    {
        id: '16',
        image: require('../../assets/images/photos/16.png'),
        selected: false,
    },
    {
        id: '17',
        image: require('../../assets/images/photos/17.png'),
        selected: false,
    },
    {
        id: '18',
        image: require('../../assets/images/photos/18.png'),
        selected: false,
    },
    {
        id: '19',
        image: require('../../assets/images/photos/19.png'),
        selected: false,
    },
    {
        id: '20',
        image: require('../../assets/images/photos/20.png'),
        selected: false,
    },
    {
        id: '21',
        image: require('../../assets/images/photos/21.png'),
        selected: false,
    },
    {
        id: '22',
        image: require('../../assets/images/photos/22.png'),
        selected: false,
    },
    {
        id: '23',
        image: require('../../assets/images/photos/23.png'),
        selected: false,
    },
    {
        id: '24',
        image: require('../../assets/images/photos/24.png'),
        selected: false,
    },
    {
        id: '25',
        image: require('../../assets/images/photos/25.png'),
        selected: false,
    },
    {
        id: '26',
        image: require('../../assets/images/photos/26.png'),
        selected: false,
    },
    {
        id: '27',
        image: require('../../assets/images/photos/27.png'),
        selected: false,
    },
    {
        id: '28',
        image: require('../../assets/images/photos/28.png'),
        selected: false,
    },
    {
        id: '29',
        image: require('../../assets/images/photos/29.png'),
        selected: false,
    },
    {
        id: '34',
        image: require('../../assets/images/photos/34.png'),
        selected: false,
    },
    {
        id: '35',
        image: require('../../assets/images/photos/35.png'),
        selected: false,
    },
    {
        id: '36',
        image: require('../../assets/images/photos/36.png'),
        selected: false,
    },
];

const mediaOptions = ['Camera', 'Gallery'];

const SelectPhotoScreen = ({ navigation, route }) => {

    const sendIn = route.params?.sendIn;

    const [photos, setPhotos] = useState(photosList);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMediaOption, setselectedMediaOption] = useState(mediaOptions[0]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {photosInfo()}
            </View>
            {selectedInfo()}
        </View>
    )

    function selectedInfo() {

        const selectedPhotos = photos.filter((item) => item.selected);

        return (
            selectedPhotos.length == 0
                ?
                null
                :
                <Touchable
                    onPress={() => {
                        sendIn == 'personal'
                            ?
                            navigation.navigate({
                                name: "PersonalChat",
                                params: { selectedPhotos: selectedPhotos },
                                merge: true,
                            })
                            :
                            navigation.navigate({
                                name: "GroupChat",
                                params: { selectedPhotos: selectedPhotos },
                                merge: true,
                            })
                    }}
                    style={styles.selectedPhotoInfoWrapper}
                >
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Bold, flex: 1 }}>
                        {selectedPhotos.length} Selected
                    </Text>
                    <View style={styles.forwardIconWrapper}>
                        <MaterialIcons
                            name='keyboard-arrow-right'
                            color={Colors.primaryColor}
                            size={24}
                        />
                    </View>
                </Touchable>
        )
    }

    function updatePhotos({ id }) {
        const updatesList = photos.map((item) => {
            if (item.id == id) {
                return { ...item, selected: !item.selected }
            }
            else {
                return item
            }
        })
        setPhotos(updatesList);
    }

    function photosInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    updatePhotos({ id: item.id })
                }}
                style={{ flex: 1, margin: Sizes.fixPadding - 9.0, }}
            >
                <Image
                    source={item.image}
                    style={{ width: '100%', height: screenWidth / 4.3, maxWidth: screenWidth / 4.53 }}
                />
                {
                    item.selected
                        ?
                        <View style={styles.selectedImageOverlay}>
                            <Ionicons
                                name='checkmark-circle-outline'
                                size={24}
                                color={Colors.whiteColor}
                                style={{ margin: Sizes.fixPadding - 5.0 }}
                            />
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={photos}
                renderItem={renderItem}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 1.9, paddingBottom: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Menu
                    visible={showMenu}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { setShowMenu(true) }}
                            style={styles.headerSelectedOptionWrapper}
                        >
                            <Text numberOfLines={1} style={{ ...Fonts.primaryColor16Medium, maxWidth: screenWidth / 2.5, }}>
                                {selectedMediaOption}
                            </Text>
                            <Ionicons
                                name='chevron-down'
                                color={Colors.primaryColor}
                                size={20}
                                style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                            />
                        </TouchableOpacity>
                    }
                    onRequestClose={setShowMenu}
                >
                    <View style={{ backgroundColor: Colors.whiteColor, borderRadius: Sizes.fixPadding, }}>
                        {
                            mediaOptions.map((item, index) => (
                                <MenuItem
                                    key={`${index}`}
                                    onPress={() => { setShowMenu(false); setselectedMediaOption(item) }}
                                    textStyle={{ ...Fonts.blackColor16Medium }}
                                >
                                    {item}
                                </MenuItem>
                            ))
                        }
                    </View>
                </Menu>
                <Touchable
                    onPress={() => { navigation.pop() }}
                >
                    <Ionicons
                        name='close'
                        color={Colors.blackColor}
                        size={24}
                    />
                </Touchable>
            </View>
        )
    }
}

export default SelectPhotoScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        ...CommonStyles.rowAlignCenter,
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    headerSelectedOptionWrapper: {
        ...CommonStyles.rowAlignCenter,
        backgroundColor: Colors.lightPrimaryColor,
        borderRadius: Sizes.fixPadding * 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    selectedImageOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, right: 0,
        backgroundColor: 'rgba(39, 73, 109, 0.6)'
    },
    forwardIconWrapper: {
        width: 29.0,
        height: 29.0,
        borderRadius: 14.5,
        backgroundColor: Colors.whiteColor,
        ...CommonStyles.center
    },
    selectedPhotoInfoWrapper: {
        ...CommonStyles.rowAlignCenter,
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20,
        backgroundColor: Colors.primaryColor,
        padding: Sizes.fixPadding + 5.0
    },
    menuDivider: {
        backgroundColor: Colors.grayColor,
        opacity: 0.1,
        height: 1.0,
        marginVertical: Sizes.fixPadding + 5.0
    }
})