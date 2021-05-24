import React from 'react'
import { ScrollView, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native'

import { CustomInput, CustomSelect } from '@components'
import styles from './style'

const RegisterScreen = (props) => {
    return (
        <View style={styles.screenWrapper}>
            <View style={styles.header}>
                <Text style={styles.headerText}>JobiJob</Text>
            </View>
            <View style={styles.registerForm}>
                <View style={styles.card}>
                    <Text style={styles.headline}>Registrieren</Text>
                    <Text style={styles.description}>Geben Sie die Details unten ein *</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <CustomInput 
                            style={styles.inputFirstname} 
                            placeholder="Vorname" />
                        <CustomInput 
                            style={styles.inputLastname} 
                            placeholder="Nachname" />
                    </View>
                    <CustomInput 
                        style={styles.inputEmail} 
                        placeholder="E-Mail" />
                    <CustomInput 
                        style={styles.inputPassword} 
                        placeholder="Passwort" />
                    <CustomInput 
                        style={styles.inputPasswordConfirmation} 
                        placeholder="Passwort Bestätigung" />
                    <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.loginButtonText}>Sie haben bereits ein Konto?</Text>
                    </TouchableHighlight>
                    <View style={styles.registerButtonWrapper}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => console.log('search')}>
                            <Text style={styles.registerButtonText}>Registrieren</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default RegisterScreen;
