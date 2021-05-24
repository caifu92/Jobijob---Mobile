import React, { useState } from 'react'
import { ScrollView, View, Text, Image, TouchableHighlight } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { WorkExperience, Education, CustomInput } from '@components'

import Images from '@assets/image'
import styles from './style'

const SettingsScreen = (props) => {
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

    const onProfileImageEdit = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            alert('Entschuldigung, wir benötigen eine Kameraerlaubnis, damit dies funktioniert.');
        } else {
            console.log('take a photo');
            let image = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true
            });
            if (!image.cancelled) {
                setLocalImage(image.base64);
                console.log(image);
            }
        }
    }

    const onSaveProfile = () => {

        // FIRST NAME
        if (!firstname) {
            setIsError(true);
            setErrorMessage('Der Vorname ist erforderlich.');
            return;
        }
        // LAST NAME
        if (!lastname) {
            setIsError(true);
            setErrorMessage('Der Nachname ist erforderlich.');
            return;
        }
        // EMAIL
        if (!email) {
            setIsError(true);
            setErrorMessage('Die E-Mail ist erforderlich.');
            return;
        } else {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) == false) {
                setIsError(true);
                setErrorMessage('Die E-Mail sollte eine gültige Adresse sein.');
                return;
            }
        }
        // PHONE
        if (!phone) {
            setIsError(true);
            setErrorMessage('Das Telefon ist erforderlich.');
            return;
        }
        // ADDRESS
        if (!address) {
            setIsError(true);
            setErrorMessage('Die Adresse ist erforderlich.');
            return;
        }
        // AGE
        if (!age) {
            setIsError(true);
            setErrorMessage('Das Alter ist erforderlich.');
            return;
        } else {
            if (/^\d+$/.test(age) == false) {
                setIsError(true);
                setErrorMessage('Das Alter sollte gültig sein.');
                return;
            }
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
        console.log('save');
    }
    
    return (
        <ScrollView style={styles.wrapper} >
            <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Profile')}>
                <View style={styles.header}>
                    <Image source={Images.LeftDirection} style={styles.directionImage} />
                    <Text style={styles.headline}>EINSTELLUNGEN</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.basicInfoWrapper}>
                <View>
                    <Image 
                        source={{url: localImage ? `data:image/gif;base64,${localImage}` : 'https://avatars.githubusercontent.com/u/10977864?s=88&u=7465a9f7c6cdf5ccca2fe46fd7f16d00e5f153d6&v=4'}} 
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
                <TouchableHighlight underlayColor="transparent" onPress={onSaveProfile}>
                    <View style={styles.saveButtonWrapper}>
                        <Text style={styles.saveButtonText}>Speichern</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

export default SettingsScreen;
