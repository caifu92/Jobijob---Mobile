import React from 'react'
import { Text, ScrollView, View, Image } from 'react-native'
import Images from '@assets/image'
import styles from './style'

const AppliedJobscreen = (props) => {
    return (
        <ScrollView style={styles.wrapper}>
            <Text style={styles.headline}>Meine Bewerbungen</Text>
            <View>
                <View style={styles.jobItemWrapper}>
                    <Image 
                        source={Images.DefaultProfileImage} 
                        style={styles.companyLogo} />
                    <View style={{flex: 1}}>
                        <View style={styles.jobItemDetail}>
                            <Text style={styles.jobTitle}>UX Designer</Text>
                            <Text style={styles.applicantDate}>19:20</Text>
                        </View>
                        <Text style={styles.applicantStatus}>Bewer Angnommen!</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default AppliedJobscreen;
