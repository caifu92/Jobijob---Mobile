import React, { useState } from 'react'
import { ScrollView, View, Text, Image, TouchableHighlight } from 'react-native'
import { WorkExperience, Education, CustomInput } from '@components'

import Images from '@assets/image'
import styles from './style'

const ProfileScreen = (props) => {
    const [currentSkillInput, setCurrentSkillInput] = useState('');
    const [skills, setSkills] = useState(['aaa', 'bbb']);
    const [indexWE, setIndexWE] = useState(-1);
    const [indexEducation, setIndexEducation] = useState(-1);
    const [workExperience, setWorkExperience] = useState([{
        id: 1,
        jobTitle: `Software Engineer`,
        companyName: `Icicle Technologies`,
        fromMonth: 3,
        fromYear: 2013,
        currentlyWorking: false,
        toMonth: 5,
        toYear: 2019,
        description: `Built rich front-end applications, user interactive (UI) web pages using HTML5, CSS3, and Bootstrap Build a healthy care web-app that requires using google calendar APIs, AWS services, payment system using stripe.-- Creating React.js / Redux front-end UI, and Node.js applications for backend. Maintaining Parent and child elements by using State and Props in React.js. Skilled in leading frameworks as React.js to build high-quality, scalable and reusable components.---Used services to read data from remote server using React.JS Used React.js library functions for the logical implementation part at client side for all the application. Maintained states in the stores and dispatched the actions using redux. Implemented flux pattern by using redux framework as a core dependency. Build user Authentication system using Auth0 API.`
    }]);
    const [education, setEducation] = useState([{
        level: 'No Diploma',
        field: 'Computer Science',
        school: 'Tsinghua Universeity',
        fromMonth: 3,
        fromYear: 2013,
        currentlyAttending: false,
        toMonth: 5,
        toYear: 2019,
    }]);

    const onAddWorkExperience = () => {
        var tmp = [...workExperience];
        tmp.splice(0, 0, {
            id: indexWE,
            jobTitle: '',
            companyName: '',
            fromMonth: 1,
            fromYear: 1970,
            currentlyWorking: false,
            toMonth: 1,
            toYear: 1970,
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
            fromMonth: 1,
            fromYear: 1970,
            currentlyAttending: false,
            toMonth: 1,
            toYear: 1970,
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

    const onSaveProfile = () => {
        console.log(workExperience, education, skills);
    }
    
    return (
        <ScrollView style={styles.wrapper} >
            <View style={styles.header}>
                <Text style={styles.jobTitle}>Bewerben für <Text style={{color: '#74C37C'}}>UI Designer</Text></Text>
                <Text style={styles.companyName}>Thinkubul Thumb</Text>
            </View>
            <View style={styles.card} >
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
                                data={value} 
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
                                data={value} 
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
                <TouchableHighlight underlayColor="transparent" onPress={onSaveProfile}>
                    <View style={styles.saveButtonWrapper}>
                        <Text style={styles.saveButtonText}>Speichern</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;
