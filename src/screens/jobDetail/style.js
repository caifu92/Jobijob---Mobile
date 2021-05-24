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
        zIndex: 100
    },
    headerText: {
        fontSize: 24,
        color: '$dark',
        fontWeight: "600"
    }
});

const jobItem = EStyleSheet.create({
    wrapper: {
        margin: 30,
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
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: '$white',
        width: 40,
        height: 40,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    activeItem: {
        backgroundColor: '$primary',
        width: 40,
        height: 40,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        textAlign: 'center',
        paddingVertical: 10,
        color: '$dark',
        fontWeight: '600'
    },
    activeText: {
        textAlign: 'center',
        paddingVertical: 10,
        color: '$white',
        fontWeight: '600'
    }
});

export default styles = {
    simple: simple,
    jobItem: jobItem,
    pagination: pagination
};
