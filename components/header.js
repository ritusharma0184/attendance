
import { Text, View } from 'react-native'
import React from 'react'
import { Sizes, Colors, CommonStyles, Fonts } from '../constants/styles'
import { Touchable } from './touchable'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Header = (props) => {
    return (
        <View style={{ ...CommonStyles.rowAlignCenter, margin: Sizes.fixPadding * 2.0 }}>
            <Touchable onPress={() => { props.navigation.pop() }} >
                <Ionicons
                    name='chevron-back'
                    color={Colors.blackColor}
                    size={24}
                />
            </Touchable>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor22Bold, marginLeft: Sizes.fixPadding * 2.0, flex: 1, }}>
                {props.header}
            </Text>
        </View>
    )
}