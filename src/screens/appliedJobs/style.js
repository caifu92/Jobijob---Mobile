import EStyleSheet from 'react-native-extended-stylesheet'

export default styles = EStyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '$white'
    },
    headline: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 60,
        marginBottom: 30
    },
    jobItemWrapper: {
        marginBottom: 30,
        flexDirection: 'row'
    },
    companyLogo: {
        width: 60,
        height: 60,
        marginRight: 20,
        borderRadius: 10
    },
    jobItemDetail: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'stretch',
        marginTop: 5
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    applicantDate: {
        color: '$darkLight'
    },
    applicantStatus: {
        color: '$black'
    }
})