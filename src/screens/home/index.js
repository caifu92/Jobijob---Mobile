import React from 'react'
import { ScrollView, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native'

import { CustomInput, CustomSelect } from '@components'
import styles from './style'
import style from './style';

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
                            placeholder="Suchen" />
                        <View style={{flexDirection: 'row'}}>
                            <CustomInput 
                                style={styles.simple.searchLocation} 
                                placeholder="Ort" />
                            <CustomSelect 
                                style={styles.simple.searchRadius}
                                onValueChange={(value) => console.log(value)} 
                                width={(screenWidth - 100) * 0.3}
                                items={radiusItems} 
                                placeholder={{ label: 'Umkreis', value: null }} />
                        </View>
                        <View style={styles.simple.searchButtonWrapper}>
                            <TouchableHighlight underlayColor="transparent" onPress={() => console.log('search')}>
                                <Text style={styles.simple.searchButtonText}>Jetzt Suchen</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.simple.jobList}>
                    <View style={styles.jobItem.wrapper}>
                        <View style={{flexDirection: 'row'}}>
                            <Image 
                                source={{url: 'https://avatars.githubusercontent.com/u/10977864?s=88&u=7465a9f7c6cdf5ccca2fe46fd7f16d00e5f153d6&v=4'}} 
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
                            <TouchableHighlight underlayColor="transparent" onPress={() => props.navigation.navigate('JobDetail')}>
                                <Text style={styles.jobItem.applyButtonText}>Jetzt bewerben</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.pagination.wrapper}>
                    <View style={styles.pagination.activeItem}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => console.log('paginate')}>
                            <Text style={styles.pagination.activeText}>1</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.pagination.item}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => console.log('paginate')}>
                            <Text style={styles.pagination.text}>{`<`}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.pagination.item}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => console.log('paginate')}>
                            <Text style={styles.pagination.text}>...</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.pagination.item}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => console.log('paginate')}>
                            <Text style={styles.pagination.text}>{`>`}</Text>
                        </TouchableHighlight>
                    </View>                
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen;
