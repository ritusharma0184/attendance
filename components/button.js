import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Sizes, Colors, CommonStyles, Fonts } from '../constants/styles'
import { Touchable } from './touchable'

export const Button = (props) => {
    return (
        <Touchable
            onPress={props.onPress}
            style={{ ...styles.buttonStyle, ...props.style }}
        >
            <Text style={{ ...Fonts.whiteColor18Bold }}>
                {props.buttonText}
            </Text>
        </Touchable>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        ...CommonStyles.center,
        padding: Sizes.fixPadding * 1.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        ...CommonStyles.buttonShadow,
    }
})