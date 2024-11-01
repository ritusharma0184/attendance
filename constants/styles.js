import { Dimensions } from "react-native"

export const Colors = {
    primaryColor: '#27496D',
    whiteColor: '#FFFFFF',
    blackColor: '#000000',
    grayColor: '#484848',
    lightGrayColor: 'rgba(72, 72, 72, 0.5)',
    lightPrimaryColor: 'rgba(39, 73, 109, 0.1)',
    extraLightGrayColor: 'rgba(72, 72, 72, 0.05)',
    purpleColor: '#3C5A9A',
    skyColor: '#2DAAE1',
    redColor: '#DD4F43',
    pinkColor: '#EC407A',
    blueColor: '#42A5F5',
    greenColor: '#26A69A',
    orangeColor: '#FF7043',
    cyanColor: '#26C6DA',
    yellowColor: '#FFA726',
    wineColor: '#7E57C2',
    parrotColor: '#29C825',
}

export const Sizes = {
    fixPadding: 10.0
}

export const FontFamily = {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    muktaRegular: 'Mukta-Regular',
    muktaBold: 'Mukta-Bold',
}

export const Fonts = {

    whiteColor20MuktaRegular: {
        color: Colors.whiteColor,
        fontSize: 20.0,
        fontFamily: FontFamily.muktaRegular,
    },

    whiteColor20MuktaBold: {
        color: Colors.whiteColor,
        fontSize: 20.0,
        fontFamily: FontFamily.muktaBold,
    },

    whiteColor15Regular: {
        color: Colors.whiteColor,
        fontSize: 15.0,
        fontFamily: FontFamily.regular,
    },

    whiteColor14Medium: {
        color: Colors.whiteColor,
        fontSize: 14.0,
        fontFamily: FontFamily.medium,
    },

    whiteColor16Medium: {
        color: Colors.whiteColor,
        fontSize: 16.0,
        fontFamily: FontFamily.medium,
    },

    whiteColor18Bold: {
        color: Colors.whiteColor,
        fontSize: 18.0,
        fontFamily: FontFamily.bold,
    },

    whiteColor20Bold: {
        color: Colors.whiteColor,
        fontSize: 20.0,
        fontFamily: FontFamily.bold,
    },

    blackColor15Regular: {
        color: Colors.blackColor,
        fontSize: 15.0,
        fontFamily: FontFamily.regular,
    },

    blackColor16Regular: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: FontFamily.regular,
    },

    blackColor16Medium: {
        color: Colors.blackColor,
        fontSize: 16.0,
        fontFamily: FontFamily.medium,
    },

    blackColor18Medium: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: FontFamily.medium,
    },

    blackColor18Bold: {
        color: Colors.blackColor,
        fontSize: 18.0,
        fontFamily: FontFamily.bold,
    },

    blackColor20Bold: {
        color: Colors.blackColor,
        fontSize: 20.0,
        fontFamily: FontFamily.bold,
    },

    blackColor22Bold: {
        color: Colors.blackColor,
        fontSize: 22.0,
        fontFamily: FontFamily.bold,
    },

    grayColor14Regular: {
        color: Colors.grayColor,
        fontSize: 14.0,
        fontFamily: FontFamily.regular,
    },

    grayColor15Regular: {
        color: Colors.grayColor,
        fontSize: 15.0,
        fontFamily: FontFamily.regular,
    },

    grayColor16Regular: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: FontFamily.regular,
    },

    grayColor16Medium: {
        color: Colors.grayColor,
        fontSize: 16.0,
        fontFamily: FontFamily.medium,
    },

    primaryColor14Medium: {
        color: Colors.primaryColor,
        fontSize: 14.0,
        fontFamily: FontFamily.medium,
    },

    primaryColor15Medium: {
        color: Colors.primaryColor,
        fontSize: 15.0,
        fontFamily: FontFamily.medium,
    },

    primaryColor16Medium: {
        color: Colors.primaryColor,
        fontSize: 16.0,
        fontFamily: FontFamily.medium,
    },

    primaryColor17Bold: {
        color: Colors.primaryColor,
        fontSize: 17.0,
        fontFamily: FontFamily.bold,
    },

    primaryColor18Bold: {
        color: Colors.primaryColor,
        fontSize: 18.0,
        fontFamily: FontFamily.bold,
    },

    primaryColor22Bold: {
        color: Colors.primaryColor,
        fontSize: 22.0,
        fontFamily: FontFamily.bold,
    },

    redColor15Regular: {
        color: Colors.redColor,
        fontSize: 15.0,
        fontFamily: FontFamily.regular,
    },

    lightGrayColor15Regular:{
        color: Colors.lightGrayColor,
        fontSize: 15.0,
        fontFamily: FontFamily.regular,
    }
}

export const CommonStyles = {
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowAlignCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonShadow: {
        shadowColor: Colors.primaryColor,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10.0 },
        shadowRadius: 20.0,
        elevation: 5.0,
    }
}

export const screenWidth = Dimensions.get('window').width;

export const screenHeight = Dimensions.get('window').height;