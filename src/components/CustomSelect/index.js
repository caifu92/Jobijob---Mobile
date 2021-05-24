import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { StyleSheet } from 'react-native'

const CustomSelect = (props) => {
    const styles = StyleSheet.create({
        inputIOS: {
            backgroundColor: '#EBEBEC',
            height: 45,
            paddingHorizontal: 10,
            width: props.width,
        },
        inputAndroid: {
            backgroundColor: '#EBEBEC',
            height: 45,
            paddingHorizontal: 10,
            width: props.width
        }
    });

    return (
        <RNPickerSelect {...props} style={styles} />
    )
}

export default CustomSelect;
