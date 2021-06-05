import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, Image, TouchableHighlight, ActivityIndicator, Alert } from 'react-native'
import { WorkExperience, Education, CustomInput } from '@components'
import * as Services from '@services'
import Images from '@assets/image'
import styles from './style'

const ApplicantScreen = (props) => {
    const { jobId, jobTitle, companyName } = props.route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [currentSkillInput, setCurrentSkillInput] = useState('');
    const [skills, setSkills] = useState(['aaa', 'bbb']);
    const [indexWE, setIndexWE] = useState(-1);
    const [indexEducation, setIndexEducation] = useState(-1);
    const [workExperience, setWorkExperience] = useState([]);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            if (props.authReducers.isLoggedIn == false) {
                props.navigation.navigate('Login');
                return;
            }

            setIsLoading(true);
            Services.Job.getApplicantStatus(jobId)
                .then(res => {
                    setIsApplied(res.applied);
                })
                .catch(err => console.log(err));                
            Services.Profile.getInfo()
                .then(res => {
                    setWorkExperience(res.work_experience);
                    setEducation(res.education);
                    setSkills(res.skill ? res.skill.split(',') : []);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        });
    }, [props.authReducers.isLoggedIn]);

    const onAddWorkExperience = () => {
        var tmp = [...workExperience];
        tmp.splice(0, 0, {
            id: indexWE,
            job_title: '',
            company_name: '',
            from_month: 1,
            from_year: 1970,
            currently_working: false,
            to_month: 1,
            to_year: 1970,
            description: '',
            isNew: true
        });
        setWorkExperience(tmp);
        setIndexWE(indexWE - 1);
    }

    const onSaveWorkExperience = (data) => {
        for (let i = 0; i < workExperience.length; i ++) {
            if (workExperience[i].id == data.id) {
                workExperience[i] = { ...data };
                return;
            }
        }
    }

    const onDeleteWorkExperience = (id) => {
        setWorkExperience(workExperience.filter(value => { return value.id != id; }));
    }

    const onAddEducation = () => {
        var tmp = [...education];
        tmp.splice(0, 0, {
            id: indexEducation,
            level: 'No Diploma',
            field: '',
            school: '',
            from_month: 1,
            from_year: 1970,
            currently_attending: false,
            to_month: 1,
            to_year: 1970,
            isNew: true
        });
        setEducation(tmp);
        setIndexEducation(indexEducation - 1);
    }

    const onSaveEducation = (data) => {
        for (let i = 0; i < education.length; i ++) {
            if (education[i].id == data.id) {
                education[i] = { ...data };
                return;
            }
        }
    }

    const onDeleteEducation = (id) => {
        setEducation(education.filter(value => { return value.id != id; }));
    }

    const onAddSkill = () => {
        if (currentSkillInput) {
            var tmp = [...skills];
            tmp.push(currentSkillInput);
            setSkills(tmp);
            setCurrentSkillInput('');
        }
    }

    const onDeleteSkill = (skill) => {
        setSkills(skills.filter((value, index) => { return value != skill; }));
    }

    const onSubmitApplication = () => {
        setIsSubmitting(true);
        Services.Job.applyJob(jobId, {
            arr_work_experience: JSON.stringify(workExperience),
            arr_education: JSON.stringify(education),
            arr_skill: JSON.stringify(skills)
        }).then(res => {
            Alert.alert(res.message);
            setIsApplied(true);
            setIsSubmitting(false);
        }).catch(err => {
            console.log(err);
            setIsSubmitting(false);
        });
    }
    
    return (
        <ScrollView style={styles.wrapper} >
            <View style={styles.header}>
                <Text style={styles.jobTitle}>Bewerben für </Text>
                <Text style={[{...styles.jobTitle}, {color: '#74C37C'}]}>{jobTitle}</Text>
                <Text style={styles.companyName}>{companyName}</Text>
            </View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.card} >
                    {isApplied ? (
                        <Text>Du hast dich bereits beworben.</Text>
                    ) : (
                        <>
                            <View style={styles.workExperienceList}>
                                <View style={styles.sectionHeadlineWrapper}>
                                    <Text style={styles.sectionHeadlineText}>Berufserfahrung</Text>
                                    <View style={styles.addNewButtonWrapper}>
                                        <TouchableHighlight underlayColor="transparent" onPress={() => onAddWorkExperience()}>
                                            <View style={styles.addNewButton}>
                                                <Image source={Images.Add} />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                {workExperience.length == 0 && (
                                    <Text style={styles.mb20}>Keine Ausbildung.</Text>
                                )}
                                {workExperience.map((value, index) => {
                                    return (
                                        <WorkExperience 
                                            data={{...value}}
                                            isNew={value.isNew ? true : false} 
                                            style={styles.mb20} 
                                            key={JSON.stringify(value)} 
                                            onSave={onSaveWorkExperience}
                                            onDelete={onDeleteWorkExperience} />
                                    )
                                })}
                            </View>
                            <View style={styles.educationList}>
                                <View style={styles.sectionHeadlineWrapper}>
                                    <Text style={styles.sectionHeadlineText}>Bildung</Text>
                                    <View style={styles.addNewButtonWrapper}>
                                        <TouchableHighlight underlayColor="transparent" onPress={() => onAddEducation()}>
                                            <View style={styles.addNewButton}>
                                                <Image source={Images.Add} />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                {education.length == 0 && (
                                    <Text style={styles.mb20}>Keine Ausbildung.</Text>
                                )}
                                {education.map((value, index) => {
                                    return (
                                        <Education 
                                            data={{...value}}
                                            style={styles.mb20} 
                                            key={JSON.stringify(value)} 
                                            onSave={onSaveEducation}
                                            onDelete={onDeleteEducation} />
                                    )
                                })}
                            </View>
                            <View style={styles.skillList}>
                                <View style={styles.sectionHeadlineWrapper}>
                                    <Text style={styles.sectionHeadlineText}>Wissen / Kompetenzen</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <CustomInput
                                        value={currentSkillInput}
                                        onChangeText={value => { setCurrentSkillInput(value) }}
                                        style={styles.inputSkill} />
                                    <TouchableHighlight underlayColor="transparent" onPress={onAddSkill} style={{width:'10%', height: 45}}>
                                        <Text style={styles.addSkillButton}>+</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {skills.map((value, index) => {
                                        return (
                                            <TouchableHighlight underlayColor="transparent" onPress={() => { onDeleteSkill(value) }} key={JSON.stringify({index:index, value:value})}>
                                                <View style={styles.skillWrapper}>
                                                    <Text style={styles.skillText}>{value}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        );
                                    })}
                                </View>
                            </View>
                            <View style={styles.saveButtonWrapper}>
                                {isSubmitting ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <TouchableHighlight underlayColor="transparent" onPress={onSubmitApplication}>
                                        <Text style={styles.saveButtonText}>Einreichen</Text>
                                    </TouchableHighlight>
                                )}
                            </View>
                        </>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return { authReducers: state.authReducers };
}

export default connect(mapStateToProps)(ApplicantScreen);
