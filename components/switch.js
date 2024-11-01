import { TouchableOpacity, StyleSheet, View } from "react-native"
import { Colors,Sizes } from "../constants/styles";

export const Switch = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { props.setValue() }}
            style={{
                ...styles.switchStyle,
                backgroundColor: props.value ? Colors.primaryColor : Colors.lightGrayColor,
            }}
        >
            <View style={{ ...styles.switchCircleStyle, alignSelf: props.value ? 'flex-end' : 'flex-start' }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    switchStyle: {
        width: 36.0,
        borderRadius: Sizes.fixPadding * 3.0,
        height: 20.0,
        justifyContent: 'center'
    },
    switchCircleStyle: {
        width: 14.0,
        height: 14.0,
        borderRadius: 7.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 6.0,
    },
});