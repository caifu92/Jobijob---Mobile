import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, TouchableHighlight, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { CustomInput, ProgressiveImage } from '@components'
import * as Services from '@services'
import * as Actions from '@redux/actions'
import Images from '@assets/image'
import styles from './style'

const SettingsScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [localImage, setLocalImage] = useState('');

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Services.Profile.getInfo()
                .then(res => {
                    setFirstname(res.firstname);
                    setLastname(res.lastname);
                    setEmail(res.email);
                    setPhone(res.phone);
                    setAddress(res.address);
                    setAge(res.age);
                    setProfileImage(res.image);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        });
        return unsubscribe;
    }, []);

    const onProfileImageEdit = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            alert('Entschuldigung, wir benötigen eine Kameraerlaubnis, damit dies funktioniert.');
        } else {
            let image = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true
            });
            if (!image.cancelled) {
                setLocalImage(image.base64);
            }
        }
    }

    const onPressLogout = () => {
        props.dispatch(Actions.Auth.logout())
            .then(() => {
                props.navigation.navigate('Login');
            });
    }

    const onSaveProfile = () => {
        if (!firstname || !lastname || !email || !phone || !address || !age) {
            setIsError(true);
            setErrorMessage('Füllen Sie die erforderlichen Felder aus.');
            return;
        }

        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) == false) {
            setIsError(true);
            setErrorMessage('Die E-Mail sollte eine gültige Adresse sein.');
            return;
        }

        if (/^\d+$/.test(age) == false) {
            setIsError(true);
            setErrorMessage('Das Alter sollte gültig sein.');
            return;
        }
        // PASSWORD
        if (password || passwordConfirm) {
            if (password.length < 6) {
                setIsError(true);
                setErrorMessage('Das Passwort sollte mindestens 6 Zeichen lang sein.');
                return;
            } else {
                if (password != passwordConfirm) {
                    setIsError(true);
                    setErrorMessage('Die Passwortbestätigung stimmt nicht überein.');
                    return;
                }
            }
        }

        setIsError(false);
        setErrorMessage('');
        
        setIsSaving(true);
        Services.Profile.saveInfo({
            info_type: 'basic',
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            address: address,
            age: age,
            password: password,
            image: localImage
        }).then(res => {
            Alert.alert(res.message);
            setIsSaving(false);
        }).catch(err => {
            console.log(err);
            setIsSaving(false);
        });
    }
    
    return (
        <ScrollView style={styles.wrapper} >
            <View style={styles.header}>
                <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Profile')}>
                    <View style={{flexDirection: "row"}}>
                        <Image source={Images.LeftDirection} style={styles.directionImage} />
                        <Text style={styles.headline}>EINSTELLUNGEN</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" onPress={() => onPressLogout()}>
                    <Image source={Images.Logout} style={styles.logoutImage} />
                </TouchableHighlight>
            </View>
            {isLoading ? (
                <ActivityIndicator style={{paddingTop: 50}} color="#999999" />
            ) : (
                <>
                    <View style={styles.basicInfoWrapper}>
                        <View>
                            <ProgressiveImage 
                                source={localImage ? {url: `data:image/gif;base64,${localImage}`} : (profileImage ? { uri: profileImage } : Images.DefaultProfileImage )} 
                                style={styles.profileImage} />
                            <View style={styles.profileImageEditButtonWrapper}>
                                <TouchableHighlight underlayColor="transparent" onPress={onProfileImageEdit}>
                                    <View style={styles.profileImageEditButton}>
                                        <Image source={Images.Edit} style={{padding: 10}}/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                            <CustomInput 
                                value={firstname}
                                onChangeText={setFirstname}
                                style={styles.inputFirstname} 
                                placeholder="Vorname" />
                            <CustomInput 
                                value={lastname}
                                onChangeText={setLastname}
                                style={styles.inputLastname} 
                                placeholder="Nachname" />
                        </View>
                        <CustomInput 
                            value={email}
                            onChangeText={setEmail}
                            style={styles.mb15} 
                            placeholder="E-Mail" />
                        <CustomInput 
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.mb15} 
                            placeholder="Telefonnummer" />
                        <CustomInput 
                            value={address}
                            onChangeText={setAddress}
                            style={styles.mb15} 
                            placeholder="Adresse" />
                        <CustomInput 
                            value={age}
                            onChangeText={setAge}
                            style={styles.mb15} 
                            placeholder="Alter" />
                        <CustomInput 
                            value={password}
                            onChangeText={setPassword}
                            style={styles.mb15} 
                            secureTextEntry={true}
                            placeholder="Passwort" />
                        <CustomInput 
                            value={passwordConfirm}
                            onChangeText={setPasswordConfirm}
                            style={styles.mb15} 
                            secureTextEntry={true}
                            placeholder="Passwort Bestätigung" />
                        {isError && (
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        )}
                        <View style={styles.saveButtonWrapper}>
                            {isSaving ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <TouchableHighlight underlayColor="transparent" onPress={onSaveProfile}>
                                    <Text style={styles.saveButtonText}>Speichern</Text>
                                </TouchableHighlight>
                            )}
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

export default connect()(SettingsScreen);
