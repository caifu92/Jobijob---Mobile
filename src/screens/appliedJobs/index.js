import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Text, ScrollView, View, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import { getDateAsString } from '@common'
import * as Services from '@services'
import Images from '@assets/image'
import styles from './style'

const AppliedJobsScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            if (props.authReducers.isLoggedIn == false) {
                props.navigation.navigate('Login');
                return;
            }

            setIsLoading(true);
            Services.Job.getApplied(1)
                .then(res => {
                    setJobs(res.data);
                    setCurPage(res.current_page);
                    setTotalPage(res.last_page);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        });
        return unsubscribe;
    }, [props.authReducers.isLoggedIn]);

    const onPagination = (pageNo) => {
        if (pageNo != curPage) {
            setIsLoading(true);
            Services.Job.getApplied(pageNo)
                .then(res => {
                    setJobs(res.data);
                    setCurPage(res.current_page);
                    setTotalPage(res.last_page);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <ScrollView style={styles.simple.wrapper}>
            <Text style={styles.simple.headline}>Meine Bewerbungen</Text>
            {isLoading ? (
                <ActivityIndicator color="#999999" />
            ) : (
                <View>
                    {jobs.map((value, index) => {
                        var status = '';
                        switch (value.applicant_status) {
                            case 'accept':
                                status = 'Bewerbung Angenommen!';
                                break;
                            case 'reject':
                                status = 'Bewerbung Abgelehnt.';
                                break;
                            case 'none':
                                status = 'Noch keine Antwort.';
                                break;
                        }
                        return (
                            <View style={styles.simple.jobItemWrapper} key={value.id}>
                                <Image 
                                    source={value.company.logo ? { uri: value.company.logo } : Images.DefaultProfileImage} 
                                    style={styles.simple.companyLogo} />
                                <View style={{flex: 1}}>
                                    <Text style={styles.simple.jobTitle}>{value.title}</Text>
                                    <View style={styles.simple.jobItemDetail}>
                                        <Text style={styles.simple.applicantStatus}>{status}</Text>
                                        <Text style={styles.simple.applicantDate}>{getDateAsString(value.date)}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                    {totalPage != 1 && (
                        <View style={styles.pagination.wrapper}>
                            <View style={styles.pagination.item}>
                                <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(1)}>
                                    <Text style={styles.pagination.text}>{`<<`}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.pagination.item}>
                                <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(curPage > 1 ? curPage - 1 : 1)}>
                                    <Text style={styles.pagination.text}>{`<`}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={curPage == 1 ? styles.pagination.activeItem : styles.pagination.item}>
                                <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(1)}>
                                    <Text style={curPage == 1 ? styles.pagination.activeText : styles.pagination.text}>1</Text>
                                </TouchableHighlight>
                            </View>
                            {curPage >= 3 && (
                                <View style={styles.pagination.item}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(curPage - 1)}>
                                        <Text style={styles.pagination.text}>...</Text>
                                    </TouchableHighlight>
                                </View>
                            )}
                            {curPage != 1 && (
                                <View style={styles.pagination.activeItem}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(curPage)}>
                                        <Text style={styles.pagination.activeText}>{curPage}</Text>
                                    </TouchableHighlight>
                                </View>
                            )}
                            {totalPage - curPage >= 2 && (
                                <View style={styles.pagination.item}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(curPage + 1)}>
                                        <Text style={styles.pagination.text}>...</Text>
                                    </TouchableHighlight>
                                </View>
                            )}
                            {totalPage != 1 && totalPage != curPage && (
                                <View style={styles.pagination.item}>
                                    <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(totalPage)}>
                                        <Text style={styles.pagination.text}>{totalPage}</Text>
                                    </TouchableHighlight>
                                </View>
                            )}
                            <View style={styles.pagination.item}>
                                <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(curPage < totalPage ? curPage + 1 : totalPage)}>
                                    <Text style={styles.pagination.text}>{`>`}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.pagination.item}>
                                <TouchableHighlight underlayColor="transparent" onPress={() => onPagination(totalPage)}>
                                    <Text style={styles.pagination.text}>{`>>`}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return { authReducers: state.authReducers };
};

export default connect(mapStateToProps)(AppliedJobsScreen);
