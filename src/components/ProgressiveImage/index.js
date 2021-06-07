import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import styles from './style'

const ProgressiveImage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    
    return (
        <View>
            {isLoading && (
                <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color="#999999" />
                </View>
            )}
            <Image {...props} 
                onLoadStart={() => { setIsLoading(true)} }
                onLoadEnd={() => { setIsLoading(false)} }
                />
        </View>
    );
}

export default ProgressiveImage;
