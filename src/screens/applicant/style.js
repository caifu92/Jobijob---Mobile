import EStyleSheet from 'react-native-extended-stylesheet'

export default styles = EStyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 30
    },
    header: {
        marginTop: 50,
        marginBottom: 30,
        alignItems: 'center'
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '$black'
    },
    companyName: {
        color: '$primary'
    },
    basicInfoWrapper: {
        alignItems: 'center'
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 70
    },
    username: {
        marginTop: 20,
        marginBottom: 40,
        fontSize: 20,
        fontWeight: '600'
    },
    card: {
        marginBottom: 50,
        padding: 20,
        backgroundColor: '$white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        zIndex: 100
    },
    sectionHeadlineWrapper: {
        borderBottomColor: '$darkLight',
        borderBottomWidth: 2,
        padding: 5,
        marginBottom: 15
    },
    sectionHeadlineText: {
        fontSize: 20,
        color: '$darkLight',
        fontStyle: 'italic'
    },
    addNewButtonWrapper: {
        position: 'absolute',
        right: 10,
        top: 0,
    },
    addNewButton: {
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '$white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5
    },
    mb20: {
        marginBottom: 20
    },
    skillList: {
        
    },
    inputSkill: {
        width: '90%'
    },
    addSkillButton: {
        width: '100%',
        height: 45,
        backgroundColor: '$primary',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '$white',
        paddingTop: 7
    },
    skillWrapper: {
        backgroundColor: '$primaryLight',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        marginTop: 10
    },
    skillText: {
        fontSize: 12,
        color: '$primary'
    },
    saveButtonWrapper: {
        marginTop: 30,
        width: '50%',
        marginHorizontal: '25%',
        backgroundColor: '$primary',
        borderRadius: 10,
        padding: 10,
    },
    saveButtonText: {
        color: '$white',
        textAlign: 'center',
        fontWeight: '600'
    }
});
