 import { StyleSheet, Text, View, Image, FlatList, Platform, BackHandler } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { Sizes, screenWidth, Fonts, Colors, CommonStyles } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { ExitToast } from '../../components/exitToast';
import MyStatusBar from '../../components/myStatusBar';
import { Touchable } from '../../components/touchable';

 const onboardingScreenList = [
    {
        id: '1',
        title: 'Send Free Message',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor pretium auctor nisl.',
        image: require('../../assets/images/onboarding/onboarding1.png')
    },
    {
        id: '2',
        title: 'Connect Your Frineds',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor pretium auctor nisl.',
        image: require('../../assets/images/onboarding/onboarding2.png')
    },
    {
        id: '3',
        title: 'Make Group Chat',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet tempor pretium auctor nisl.',
        image: require('../../assets/images/onboarding/onboarding3.png')
    },
];

const OnboardingScreen = ({ navigation }) => {

    const listRef = useRef();
    const [currentScreen, setCurrentScreen] = useState(0);
    const [backClickCount, setBackClickCount] = useState(0);

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

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ animated: true, index: index });
        setCurrentScreen(index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {onboardingContent()}
                {indicators()}
                {skipNextAndLoginText()}
            </View>
            {backClickCount == 1 ? <ExitToast /> : null}
        </View>
    )

     function skipNextAndLoginText() {
        return (
            <View style={styles.skipNextAndLoginTextWrapper}>
                <Touchable onPress={() => { currentScreen == 2 ? null : navigation.push("Signin") }} >
                    <Text style={currentScreen == 2 ? { color: 'transparent' } : { ...Fonts.grayColor16Medium }}>
                        
                    </Text>
                </Touchable>
                <Touchable
                    onPress={() => {
                        currentScreen == 2
                            ? navigation.push("Signin")
                            : scrollToIndex({ index: currentScreen + 1 });
                    }}
                >
                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                        {currentScreen == 2 ? 'Login' : 'Next'}
                    </Text>
                </Touchable>
            </View>
        )
    }
 
     function indicators() {
        return (
            <View style={{ ...CommonStyles.rowAlignCenter, justifyContent: 'center', margin: Sizes.fixPadding * 5.0 }}>
                {onboardingScreenList.map((item, index) => {
                    return (
                        <View
                            key={`${item.id}`}
                            style={currentScreen == index ? { ...styles.selectedIndicatorStyle } : { ...styles.indicatorStyle }}
                        />
                    );
                })}
            </View>
        )
    } 

    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentScreen(pageNum);
    }

    function onboardingContent() {
        const renderItem = ({ item }) => (
            <View style={styles.onboardingContentWrapper}>
                <View style={{ flex: 1, ...CommonStyles.center }}>
                    <Image
                        source={item.image}
                        style={{ width: '100%', height: screenWidth - 50, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ ...CommonStyles.center, marginHorizontal: Sizes.fixPadding * 3.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor20Bold, textAlign: 'center' }}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={2} style={{ lineHeight: 22.0, marginTop: Sizes.fixPadding + 5.0, ...Fonts.grayColor15Regular, textAlign: 'center' }}>
                        {item.description}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                ref={listRef}
                data={onboardingScreenList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
            />
        )
    }
}

export default OnboardingScreen

const styles = StyleSheet.create({
    onboardingContentWrapper: {
        flex: 1,
        width: screenWidth,
        height: "100%",
        overflow: "hidden",
    },
    selectedIndicatorStyle: {
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 5.0
    },
    indicatorStyle: {
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.lightGrayColor,
        marginHorizontal: Sizes.fixPadding - 5.0
    },
    skipNextAndLoginTextWrapper: {
        ...CommonStyles.rowAlignCenter,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between'
    }
}) 