import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, Dimensions, TouchableHighlight, Alert, ActivityIndicator } from 'react-native'
import { CustomInput, CustomSelect } from '@components'
import * as Services from '@services'
import * as Actions from '@redux/actions'
import styles from './style'

const LoginScreen = (props) => {
    const [isLogging, setIsLogging] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = () => {
        if (!email || !password) {
            Alert.alert('Pflichtfelder eingeben.');
            return;
        }

        const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEx.test(email)) {
            Alert.alert('E-Mail muss eine gültige Adresse sein.');
            return;
        }

        setIsLogging(true);
        Services.Auth.signin({ email: email, password: password})
            .then(async (res) => {
                props.dispatch(Actions.Auth.signin(res.token))
                    .then(() => {
                        props.navigation.navigate('Profile');
                        setIsLogging(false);
                    });
            })
            .catch(err => {
                console.log(err);
                setIsLogging(false);
            });
    }

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
                        placeholder="E-Mail"
                        autoCapitalize='none'
                        onChangeText={setEmail} />
                    <CustomInput 
                        style={styles.inputPassword} 
                        placeholder="Passwort"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={setPassword} />
                    <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Register')}>
                        <Text style={styles.registerButtonText}>Sie haben noch keinen Account?</Text>
                    </TouchableHighlight>
                    <View style={styles.loginButtonWrapper}>
                        {isLogging ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <TouchableHighlight underlayColor="transparent" onPress={onPressLogin}>
                                <Text style={styles.loginButtonText}>Anmeldung</Text>
                            </TouchableHighlight>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return { authReducers: state.authReducers };
}

export default connect(mapStateToProps)(LoginScreen);
