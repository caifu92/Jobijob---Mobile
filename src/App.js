import 'react-native-gesture-handler';

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { View, ScrollView, Text, Image, TouchableHighlight } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/home'
import JobDetailScreen from './screens/jobDetail'
import ApplicantScreen from './screens/applicant'
import AppliedJobsScreen from './screens/appliedJobs'
import ProfileScreen from './screens/profile'
import LoginScreen from './screens/login'
import RegisterScreen from './screens/register'
import SettingsScreen from './screens/settings'

import * as RootNavigation from './RootNavigation'

import Images from '@assets/image'

import styles from './style.js'

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false,
    gestueEnabled: false
};

const App = () => {
    const [currentRoute, setCurrentRoute] = React.useState('Home');

    const navigateTo = (screenName) => {
        RootNavigation.navigate(screenName);
    }

    const onChangeRoute = (state) => {
        setCurrentRoute(state.routes[state.routes.length - 1].name);
    }
    
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={styles.container}>
                    <View style={styles.screenContainer}>
                        <NavigationContainer ref={RootNavigation.navigationRef} onStateChange={onChangeRoute}>
                            <Stack.Navigator screenOptions={screenOptions}>
                                <Stack.Screen name="Home" component={HomeScreen} />
                                <Stack.Screen name="JobDetail" component={JobDetailScreen} />
                                <Stack.Screen name="Applicant" component={ApplicantScreen} />
                                <Stack.Screen name="AppliedJobs" component={AppliedJobsScreen} />
                                <Stack.Screen name="Profile" component={ProfileScreen} />
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name="Register" component={RegisterScreen} />
                                <Stack.Screen name="Settings" component={SettingsScreen} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </View>
                    <View style={styles.navMenu}>
                        <TouchableHighlight onPress={() => navigateTo('Home')} underlayColor="transparent">
                            <Image source={(currentRoute == 'Home' || currentRoute == 'JobDetail') ? Images.HomeVisible : Images.Home} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => navigateTo('AppliedJobs')} underlayColor="transparent">
                            <Image source={currentRoute == 'AppliedJobs' ? Images.JobVisible : Images.Job} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => navigateTo('Profile')} underlayColor="transparent">
                            <Image source={(currentRoute == 'Profile' || currentRoute == 'Login' || currentRoute == 'Register' || currentRoute == 'Settings') ? Images.ProfileVisible : Images.Profile} />
                        </TouchableHighlight>
                    </View>
                </View>
            </PersistGate>
        </Provider>
    )
}

export default App;
