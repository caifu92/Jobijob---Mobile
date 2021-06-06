import EStyleSheet from 'react-native-extended-stylesheet'

const simple = EStyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: '$whiteLight'
    },
    header: {
        height: 65,
        backgroundColor: '$white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 15,
        zIndex: 100
    },
    headerText: {
        fontSize: 24,
        color: '$dark',
        fontWeight: "600"
    },
    searchView: {
        padding: 30,
        backgroundColor: '$white',
        width: '100%',
        flex: 1
    },
    card: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '$white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 15,
    },
    searchHeadline: {
        fontSize: 20,
        color: '$black',
        fontWeight: '600',
        marginBottom: 10
    },
    searchDescription: {
        color: '$darkLight',
        marginBottom: 15
    },
    searchTitle: {
        marginBottom: 10
    },
    searchLocation: {
        width: '65%',
        marginRight: '5%'
    },
    searchRadius: {
        width: '30%'
    },
    searchButtonWrapper: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '$primary',
        width: '60%',
        paddingVertical: 15,
        marginHorizontal: '20%'
    },
    searchButtonText: {
        textAlign: 'center',
        color: '$white',
        fontWeight: '800',
    },
    jobList: {
        paddingTop: 10,
        paddingHorizontal: 30,
        marginBottom: 20
    },
    indicator: {
        marginTop: 50
    }
});

const jobItem = EStyleSheet.create({
    wrapper: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '$white',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 15,
    },
    companyLogo: {
        width: 60,
        height: 60,
        marginRight: 20,
        borderRadius: 10
    },
    jobTitle: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    companyName: {
        fontSize: 16,
        fontWeight: '500',
        color: '$primary'
    },
    tagList: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tagWrapper: {
        marginTop: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '$primaryLight',
        marginRight: 10
    },
    tagText: {
        fontSize: 12,
        color: '$primary'
    },
    description: {
        color: '$black',
        fontWeight: '300',
        marginTop: 10
    },
    applyButtonWrapper: {
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: '$primary',
        width: '50%',
        padding: 10,
        alignItems: 'center'
    },
    applyButtonText: {
        color: '$white',
        fontWeight: '600'
    }
});

const pagination = EStyleSheet.create({
    wrapper: {
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50
    },
    item: {
        backgroundColor: '$white',
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
    jobItem: jobItem,
    pagination: pagination
};
