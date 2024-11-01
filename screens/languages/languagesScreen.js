import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, CommonStyles } from '../../constants/styles'
import MyStatusBar from '../../components/myStatusBar'
import { Header } from '../../components/header'
import { Button } from '../../components/button'

const languagesList = [
    {
        id: '1',
        language: 'English',
    },
    {
        id: '2',
        language: 'Hindi',
    },
    {
        id: '3',
        language: 'Chinese',
    },
    {
        id: '4',
        language: 'Arabic',
    },
    {
        id: '5',
        language: 'French',
    },
];

const LanguagesScreen = ({ navigation }) => {

    const [selectedLanguageIndex, setselectedLanguageIndex] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                <Header header='Languages' navigation={navigation} />
                {languages()}
            </View>
        </View>
    )

    function languages() {
        const renderItem = ({ item, index }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setselectedLanguageIndex(index)}
                    style={{ ...CommonStyles.rowAlignCenter, justifyContent: 'space-between' }}
                >
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {item.language}
                    </Text>
                    <View
                        style={{
                            borderColor: selectedLanguageIndex == index ? Colors.primaryColor : Colors.lightGrayColor,
                            ...styles.radioButtonStyle,
                        }}
                    >
                        {
                            selectedLanguageIndex == index
                                ?
                                <View style={styles.selectedRadioButtonStyle} />
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
                {index == languagesList.length - 1 ? null : <View style={styles.divider} />}
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={languagesList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding, paddingBottom: Sizes.fixPadding * 2.0 }}
                />
                <Button
                    buttonText='Update'
                    onPress={() => { navigation.pop() }}
                    style={{ margin: Sizes.fixPadding * 2.0 }}
                />
            </View>
        )
    }
}

export default LanguagesScreen

const styles = StyleSheet.create({
    selectedRadioButtonStyle: {
        width: 9.0,
        height: 9.0,
        borderRadius: 4.5,
        backgroundColor: Colors.primaryColor
    },
    radioButtonStyle: {
        borderWidth: 1.0,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        ...CommonStyles.center
    },
    divider: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginVertical: Sizes.fixPadding * 2.0,
        opacity: 0.1,
    }
})