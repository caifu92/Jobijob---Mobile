import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { StyleSheet } from 'react-native'

const CustomSelect = (props) => {
    const styles = StyleSheet.create({
        inputIOS: {
            borderWidth: 1,
            borderColor: '#EBEBEC',
            backgroundColor: '#EBEBEC',
            height: 45,
            paddingHorizontal: 10,
            width: props.width,
        },
        inputAndroid: {
            borderWidth: 1,
            borderColor: '#EBEBEC',
            backgroundColor: '#EBEBEC',
            color: 'black',
            height: 45,
            paddingHorizontal: 10,
            width: props.width
        }
    });

    return (
        <RNPickerSelect {...props} useNativeAndroidPickerStyle={false} style={styles} />
    )
}

export default CustomSelect;
