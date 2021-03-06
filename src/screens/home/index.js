import React, { useState, useEffect } from 'react'
import { ActivityIndicator, ScrollView, View, Text, Image, Dimensions, TouchableHighlight, ImageStore, Alert } from 'react-native'

import { CustomInput, CustomSelect, ProgressiveImage } from '@components'
import * as Services from '@services'
import Images from '@assets/image'
import styles from './style'

const screenWidth = Dimensions.get('window').width;

const radiusItems = [
    { label: '1KM', value: 1 },
    { label: '2KM', value: 2 },
    { label: '5KM', value: 5 },
    { label: '15KM', value: 15 },
    { label: '25KM', value: 25 },
    { label: '50KM', value: 50 },
    { label: '100KM', value: 100 },
    { label: '250KM', value: 250 },
    { label: '500KM', value: 500 },
    { label: 'Ganz Deutschland', value: 'germany' },
    { label: 'Weltweit', value: 'all' }
];

const HomeScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchRadius, setSearchRadius] = useState(1);
    const [urlQuery, setUrlQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setIsLoading(true);
            Services.Job.getAll(1)
                .then(res => {
                    setJobs(res.data);
                    setCurPage(res.current_page);
                    setTotalPage(res.last_page);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        });
        return unsubscribe;
    }, []);

    const onPagination = (pageNo) => {
        if (pageNo != curPage) {
            setIsLoading(true);
            Services.Job.getAll(pageNo, urlQuery)
                .then(res => {
                    setJobs(res.data);
                    setCurPage(res.current_page);
                    setTotalPage(res.last_page);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
    }

    const onPressSearch = () => {
        const query = `title=${searchTitle}&location=${searchLocation}&radius=${searchRadius}`;

        setIsLoading(true);
        setIsSearching(true);
        setUrlQuery(query);
        Services.Job.getAll(1, query)
            .then(res => {
                setJobs(res.data);
                setCurPage(res.current_page);
                setTotalPage(res.last_page);
                setIsLoading(false);
                setIsSearching(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <View style={styles.simple.screenWrapper}>
            <View style={styles.simple.header}>
                <Text style={styles.simple.headerText}>JobiJob</Text>
            </View>
            <ScrollView>
                <View style={styles.simple.searchView}>
                    <View style={styles.simple.card}>
                        <Text style={styles.simple.searchHeadline}>Jetzt den passenden Job finden</Text>
                        <Text style={styles.simple.searchDescription}>Finden Sie mit JobiJob Ihren neuen Traumberuf.</Text>
                        <CustomInput 
                            style={styles.simple.searchTitle} 
                            onChangeText={setSearchTitle}
                            placeholder="Suchen" />
                        <View style={{flexDirection: 'row'}}>
                            <CustomInput 
                                style={styles.simple.searchLocation}
                                onChangeText={setSearchLocation} 
                                placeholder="Ort" />
                            <CustomSelect 
                                style={styles.simple.searchRadius}
                                onValueChange={setSearchRadius} 
                                width={(screenWidth - 100) * 0.3}
                                items={radiusItems} 
                                placeholder={{ label: 'Umkreis', value: null }} />
                        </View>
                        <View style={styles.simple.searchButtonWrapper}>
                            {isSearching ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <TouchableHighlight underlayColor="transparent" onPress={onPressSearch}>
                                    <Text style={styles.simple.searchButtonText}>Jetzt Suchen</Text>
                                </TouchableHighlight>
                            )}
                        </View>
                    </View>
                </View>
                {isLoading ? (
                    <>
                        <ActivityIndicator style={styles.simple.indicator} color="#999999" />
                    </>
                ) : (
                    <>
                        <View style={styles.simple.jobList}>
                            {jobs.map((value, index) => {
                                var tags = value.tags.split(',');
                                return (
                                    <View style={styles.jobItem.wrapper} key={value.id}>
                                        <View style={{flexDirection: 'row'}}>
                                            <ProgressiveImage 
                                                source={value.company.logo ? {uri: value.company.logo} : Images.DefaultProfileImage} 
                                                style={styles.jobItem.companyLogo} />
                                            <View>
                                                <Text style={styles.jobItem.jobTitle}>{value.title}</Text>
                                                <Text style={styles.jobItem.companyName}>{value.company.name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.jobItem.tagList}>
                                            {tags.map((tag, index) => {
                                                return (
                                                    <View style={styles.jobItem.tagWrapper} key={index}>
                                                        <Text style={styles.jobItem.tagText}>{tag}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <Text style={styles.jobItem.description}>{value.description.length > 150 ? value.description.substr(0, 150) + '...' : value.description}</Text>
                                        <View style={styles.jobItem.applyButtonWrapper}>
                                            <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('JobDetail', { jobId: value.id })}>
                                                <Text style={styles.jobItem.applyButtonText}>Jetzt bewerben</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
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
                    </>
                )}
            </ScrollView>
        </View>
    );
}

export default HomeScreen;
