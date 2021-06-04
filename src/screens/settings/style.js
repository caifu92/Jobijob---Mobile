import EStyleSheet from 'react-native-extended-stylesheet'

export default styles = EStyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '$white',
        paddingHorizontal: 15
    },
    header: {
        marginTop: 50,
        flexDirection: 'row'
    },
    directionImage: {
        marginTop: 7,
        marginRight: 20
    },
    headline: {
        fontSize: 22,
        fontWeight: '600'
    },
    profileImageEditButtonWrapper: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    profileImageEditButton: {
        padding: 10,
        borderRadius: 30,
        backgroundColor: '$white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 15,
    },
    basicInfoWrapper: {
        alignItems: 'center',
        marginVertical: 40
    },
    profileImage: {
        width: 300,
        height: 300,
        borderRadius: 20
    },
    card: {
        marginHorizontal: 15,
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
        elevation: 15,
        zIndex: 100
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
    },
    inputFirstname: {
        width: '48%'
    },
    inputLastname: {
        width: '48%'
    },
    mb15: {
        marginBottom: 10
    },
    errorMessage: {
        color: 'red'
    }
});
