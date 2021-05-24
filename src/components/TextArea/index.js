import React from 'react'
import { TextInput } from 'react-native'
import styles from './style'

const TextArea = (props) => {
    return (
        <TextInput {...props} multiline={true} numberOfLines={4} style={[props.style, styles.input]} />
    )
}

export default TextArea;
