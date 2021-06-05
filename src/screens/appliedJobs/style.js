import EStyleSheet from 'react-native-extended-stylesheet'

const simple = EStyleSheet.create({
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
        marginTop: 5,
        marginBottom: 5
    },
    applicantDate: {
        color: '$darkLight'
    },
    applicantStatus: {
        color: '$black'
    }
});

const pagination = EStyleSheet.create({
    wrapper: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50
    },
    item: {
        backgroundColor: '$whiteLight',
        width: 30,
        height: 30,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    activeItem: {
        backgroundColor: '$primary',
        width: 30,
        height: 30,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        textAlign: 'center',
        paddingVertical: 6,
        color: '$dark',
        fontWeight: '600'
    },
    activeText: {
        textAlign: 'center',
        paddingVertical: 6,
        color: '$white',
        fontWeight: '600'
    }
});

export default styles = {
    simple: simple,
    pagination: pagination
};
