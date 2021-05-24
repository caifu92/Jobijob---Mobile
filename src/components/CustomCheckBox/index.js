import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox"

const CustomCheckbox = (props) => {
    return (
        <BouncyCheckbox {...props} 
            size={18} 
            fillColor="#3D4043"
            iconStyle={{ borderColor: "#9EA3AE"}}
            textContainerStyle={{ marginLeft: 7}}
            textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,                
            }}
            />
    )
}

export default CustomCheckbox;
