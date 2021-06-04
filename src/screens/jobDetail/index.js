import React from 'react'
import { ScrollView, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native'

import { CustomInput, CustomSelect } from '@components'
import Images from '@assets/image'
import styles from './style'

const screenWidth = Dimensions.get('window').width;

const JobDetailScreen = (props) => {
    return (
        <>
            <View style={styles.simple.header}>
                <Text style={styles.simple.headerText}>JobiJob</Text>
            </View>
            <View style={styles.jobItem.wrapper}>
                <View style={{flexDirection: 'row'}}>
                    <Image 
                        source={Images.DefaultProfileImage} 
                        style={styles.jobItem.companyLogo} />
                    <View>
                        <Text style={styles.jobItem.jobTitle}>Product Designer</Text>
                        <Text style={styles.jobItem.companyName}>Thinkful GmbH</Text>
                    </View>
                </View>
                <View style={styles.jobItem.tagList}>
                    <View style={styles.jobItem.tagWrapper}>
                        <Text style={styles.jobItem.tagText}>Full Time</Text>
                    </View>
                    <View style={styles.jobItem.tagWrapper}>
                        <Text style={styles.jobItem.tagText}>Min 2 year</Text>
                    </View>
                    <View style={styles.jobItem.tagWrapper}>
                        <Text style={styles.jobItem.tagText}>Mid Level</Text>
                    </View>
                </View>
                <Text style={styles.jobItem.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard...</Text>
                <View style={styles.jobItem.applyButtonWrapper}>
                    <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('Applicant')}>
                        <Text style={styles.jobItem.applyButtonText}>Jetzt bewerben</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </>
    );
}

export default JobDetailScreen;
