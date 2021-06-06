import React, { useState, useEffect } from 'react'
import { ActivityIndicator, ScrollView, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native'
import { CustomInput, CustomSelect } from '@components'
import * as Services from '@services'
import Images from '@assets/image'
import styles from './style'

const screenWidth = Dimensions.get('window').width;

const JobDetailScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobInfo, setJobInfo] = useState({});
    const { jobId } = props.route.params;

    useEffect(() => {
        Services.Job.getById(jobId)
            .then(res => {
                setJobInfo(res);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [jobId]);

    return (
        <>
            <View style={styles.simple.header}>
                <Text style={styles.simple.headerText}>JobiJob</Text>
            </View>
            <ScrollView style={styles.jobItem.wrapper}>
                {isLoading ? (
                    <ActivityIndicator color="#999999" />
                ) : (
                    <>
                        <View style={{flexDirection: 'row'}}>
                            <Image 
                                source={Images.DefaultProfileImage} 
                                style={styles.jobItem.companyLogo} />
                            <View>
                                <Text style={styles.jobItem.jobTitle}>{jobInfo.title}</Text>
                                <Text style={styles.jobItem.companyName}>{jobInfo.company.name}</Text>
                            </View>
                        </View>
                        <View style={styles.jobItem.tagList}>
                            {jobInfo.tags.split(',').map((tag, index) => {
                                return (
                                    <View style={styles.jobItem.tagWrapper} key={index}>
                                        <Text style={styles.jobItem.tagText}>{tag}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <Text style={styles.jobItem.description}>{jobInfo.description}</Text>
                        <View style={styles.jobItem.applyButtonWrapper}>
                            <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Applicant', { jobId: jobInfo.id, jobTitle: jobInfo.title, companyName: jobInfo.company.name })}>
                                <Text style={styles.jobItem.applyButtonText}>Jetzt bewerben</Text>
                            </TouchableHighlight>
                        </View>
                    </>
                )}
            </ScrollView>
        </>
    );
}

export default JobDetailScreen;
