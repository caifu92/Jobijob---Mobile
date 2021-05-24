import React from 'react'
import { ScrollView, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native'

import { CustomInput, CustomSelect } from '@components'
import styles from './style'

const LoginScreen = (props) => {
    return (
        <View style={styles.screenWrapper}>
            <View style={styles.header}>
                <Text style={styles.headerText}>JobiJob</Text>
            </View>
            <View style={styles.loginForm}>
                <View style={styles.card}>
                    <Text style={styles.headline}>Anmeldung</Text>
                    <Text style={styles.description}>Geben Sie die Details unten ein *</Text>
                    <CustomInput 
                        style={styles.inputEmail} 
                        placeholder="E-Mail" />
                    <CustomInput 
                        style={styles.inputPassword} 
                        placeholder="Passwort" />
                    <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Register')}>
                        <Text style={styles.registerButtonText}>Sie haben noch keinen Account?</Text>
                    </TouchableHighlight>
                    <View style={styles.loginButtonWrapper}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => console.log('search')}>
                            <Text style={styles.loginButtonText}>Anmeldung</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;
