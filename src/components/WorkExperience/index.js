import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native'
import { CustomInput, CustomSelect, TextArea, CustomCheckbox } from '@components'
import Images from '@assets/image'
import styles from './style'

const screenWidth = Dimensions.get('window').width;

const MONTHS = [
    { label: 'Januar', value: 1 },
    { label: 'Februar', value: 2 },
    { label: 'März', value: 3 },
    { label: 'April', value: 4 },
    { label: 'Kann', value: 5 },
    { label: 'Juni', value: 6 },
    { label: 'Juli', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'Oktober', value: 10 },
    { label: 'November', value: 11 },
    { label: 'Dezember', value: 12 }
];

const EDUCATION_LEVEL = [
    { label: 'No Diploma', value: 'No Diploma' },
    { label: 'Secondary School', value: 'Secondary School' },
    { label: `Bachelor's Degree`, value: `Bachelor's Degree` },
    { label: "Master's Degree", value: "Master's Degree" },
    { label: 'Doctoral Degree', value: 'Doctoral Degree' }
];

var YEARS = [];
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;

for (let i = currentYear; i >= 1970; i --)
    YEARS.push({ label: `${i}`, value: i });

const WorkExperience = (props) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState({
        id: null,
        job_title: '',
        company_name: '',
        from_month: 1,
        from_year: 1970,
        currently_working: false,
        to_month: 1,
        to_year: 1970,
        description: ''
    });

    useEffect(() => {
        setIsEditMode(props.isEditMode);
    }, [props.isEditMode]);

    useEffect(() => {
        setData({
            ...props.data,
            from_month: parseInt(props.data.from_month),
            from_year: parseInt(props.data.from_year),
            currently_working: props.data.currently_working == '0' ? false : true,
            to_month: parseInt(props.data.to_month),
            to_year: parseInt(props.data.to_year),
        });
        
        if (props.data.isNew) {
            setIsEditMode(true);
        }
    }, [props.data]);
    
    onUpdateField = (field, value) => {
        setData({ ...data, [field]: value });
    }

    onSaveEdit = () => {
        // JOB TITLE
        if (!data.job_title) {
            setIsError(true);
            setErrorMessage('Die Berufsbezeichnung ist erforderlich.');
            return;
        }
        // COMPANY NAME
        if (!data.company_name) {
            setIsError(true);
            setErrorMessage('Der Firmenname ist erforderlich.');
            return;
        }
        // FROM DATE
        if (!data.from_month || !data.from_year) {
            setIsError(true);
            setErrorMessage('Das Ab-Datum ist erforderlich.');
            return;
        }
        if (data.from_year == currentYear && data.from_month > currentMonth) {
            setIsError(true);
            setErrorMessage('Das Ab-Datum sollte früher als heute sein.');
            return;
        }
        // TO DATE
        if (!data.currently_working) {
            if (!data.to_month || !data.to_year) {
                setIsError(true);
                setErrorMessage('Das Ab-Datum ist erforderlich.');
                return;
            }
            if (data.to_year == currentYear && data.to_month > currentMonth) {
                setIsError(true);
                setErrorMessage('Das bisherige sollte früher als heute sein.');
                return;
            }
            if (data.to_year < data.from_year || (data.to_year == data.from_year && data.to_month < data.from_month)) {
                setIsError(true);
                setErrorMessage('Das Datum sollte später als ab dem Datum sein.');
                return;
            }
        }
        setIsError(false);
        setErrorMessage('');
        setIsEditMode(!isEditMode);
        data.isNew = false;
        props.onSave ? props.onSave(data) : '';
    }

    onCancelEdit = () => {
        if (props.data.isNew) {
            props.onDelete ? props.onDelete(props.data.id) : '';
        } else {
            setData(props.data);
            setIsEditMode(!isEditMode);
        }
    }

    onDelete = () => {
        props.onDelete ? props.onDelete(data.id) : '';
    }

    return (
        <View style={props.style}>
            {!isEditMode ? (
                <>
                    <View style={styles.wrapper}>
                        <Text style={styles.jobTitle}>{data.job_title}</Text>
                        <Text style={styles.companyName}>{data.company_name}</Text>
                        <Text style={styles.period}>{MONTHS[data.from_month - 1].label} {data.from_year} - {data.currently_working ? 'Jetzt' : `${MONTHS[data.to_month - 1].label} ${data.to_year}`}</Text>
                        <Text style={styles.description}>{data.description}</Text>
                        <View style={styles.editButton}>
                            <TouchableHighlight underlayColor="transparent" onPress={() => { setIsEditMode(!isEditMode) }} >
                                <View style={styles.circleButton}>
                                    <Image source={Images.Edit} />
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.deleteButton}>
                            <TouchableHighlight underlayColor="transparent" onPress={onDelete} >
                                <View style={styles.circleButton}>
                                    <Image source={Images.Delete} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.wrapper}>
                    <CustomInput 
                        onChangeText={value => onUpdateField('job_title', value)}
                        value={data.job_title}
                        style={styles.mb10} 
                        placeholder="Berufsbezeichnung" />
                    <CustomInput 
                        onChangeText={value => onUpdateField('company_name', value)}
                        value={data.company_name}
                        style={styles.mb10} 
                        placeholder="Name der Firma" />
                    <View style={styles.dateWrapper}>
                        <CustomSelect 
                            onValueChange={value => onUpdateField('from_month', value)} 
                            value={data.from_month}
                            width={(screenWidth - 100) * 0.48}
                            items={MONTHS} 
                            placeholder={{ label: 'Von', value: null }} />
                        <CustomSelect 
                            onValueChange={value => onUpdateField('from_year', value)} 
                            value={data.from_year}
                            width={(screenWidth - 100) * 0.48}
                            items={YEARS} 
                            placeholder={{ label: 'Jahr', value: null }} />
                    </View>
                    {!data.currently_working && (
                        <>
                            <View style={styles.dateWrapper}>
                                <CustomSelect 
                                    onValueChange={value => onUpdateField('to_month', value)} 
                                    value={data.to_month}
                                    width={(screenWidth - 100) * 0.48}
                                    items={MONTHS} 
                                    placeholder={{ label: 'Zu', value: null }} />
                                <CustomSelect 
                                    onValueChange={value => onUpdateField('to_year', value)} 
                                    value={data.to_year}
                                    width={(screenWidth - 100) * 0.48}
                                    items={YEARS} 
                                    placeholder={{ label: 'Jahr', value: null }} />
                            </View>
                        </>
                    )}
                    <CustomCheckbox 
                        text="Arbeite gerade hier"
                        onPress={value => onUpdateField('currently_working', value)} 
                        style={styles.checkboxcurrently_working}
                        isChecked={data.currently_working} />
                    <TextArea 
                        onChangeText={value => onUpdateField('description', value)}
                        value={data.description}
                        placeholder="Beschreibung" />
                    {isError && (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    )}
                    <View style={styles.checkButton}>
                        <TouchableHighlight underlayColor="transparent" onPress={onSaveEdit} >
                            <View style={styles.circleButton}>
                                <Image source={Images.Check} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.cancelButton}>
                        <TouchableHighlight underlayColor="transparent" onPress={onCancelEdit} >
                            <View style={styles.circleButton}>
                                <Image source={Images.Close} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            )}
        </View>
    )
}

export default WorkExperience;
