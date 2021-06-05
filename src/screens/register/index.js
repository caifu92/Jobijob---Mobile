import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, Dimensions, TouchableHighlight, Alert, ActivityIndicator } from 'react-native'
import { CustomInput, CustomSelect } from '@components'
import * as Services from '@services'
import * as Actions from '@redux/actions'
import styles from './style'

const RegisterScreen = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const onPressRegister = () => {
        if (!firstname || !lastname || !email || !password || !cpassword) {
            Alert.alert('Pflichtfelder eingeben.');
            return;
        }

        const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEx.test(email)) {
            Alert.alert('E-Mail muss eine gültige Adresse sein.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Passwort muss mindestens 6 Zeichen lang sein');
            return;
        }

        if (password != cpassword) {
            Alert.alert('Passwortbestätigung stimmt nicht überein');
            return;
        }

        setIsRegistering(true);
        Services.Auth.signup({ 
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }).then(res => {
            props.dispatch(Actions.Auth.signup(res.token))
                .then(() => {
                    props.navigation.navigate('Profile');
                    setIsRegistering(false);
                });
        })
        .catch(err => {
            console.log(err);
            setIsRegistering(false);
        });
    }

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
                            placeholder="Vorname"
                            autoCapitalize='none'
                            onChangeText={setFirstname} />
                        <CustomInput 
                            style={styles.inputLastname} 
                            placeholder="Nachname"
                            autoCapitalize='none'
                            onChangeText={setLastname} />
                    </View>
                    <CustomInput 
                        style={styles.inputEmail} 
                        placeholder="E-Mail"
                        autoCapitalize='none'
                        onChangeText={setEmail} />
                    <CustomInput 
                        style={styles.inputPassword} 
                        placeholder="Passwort"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={setPassword} />
                    <CustomInput 
                        style={styles.inputPasswordConfirmation} 
                        placeholder="Passwort Bestätigung"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={setCPassword} />
                    <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.loginButtonText}>Sie haben bereits ein Konto?</Text>
                    </TouchableHighlight>
                    <View style={styles.registerButtonWrapper}>
                        {isRegistering ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <TouchableHighlight underlayColor="transparent" onPress={onPressRegister}>
                                <Text style={styles.registerButtonText}>Registrieren</Text>
                            </TouchableHighlight>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default connect()(RegisterScreen);
