import React from 'react'
import { TextInput } from 'react-native'
import styles from './style'

const CustomInput = (props) => {
    return (
        <TextInput {...props} style={[props.style, styles.input]} />
    )
}

export default CustomInput;
