import EStyleSheet from 'react-native-extended-stylesheet'

export default styles = EStyleSheet.create({
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
    registerForm: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center'
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
    headline: {
        fontSize: 24,
        color: '$black',
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center'
    },
    description: {
        color: '$darkLight',
        marginBottom: 15,
    },
    inputFirstname: {
        width: '48%'
    },
    inputLastname: {
        width: '48%'
    },
    inputEmail: {
        marginVertical: 15
    },
    inputPassword: {
        marginBottom: 15
    },
    inputPasswordConfirmation: {
        marginBottom: 10
    },
    loginButtonText: {
        marginBottom: 30,
        color: '$primary'
    },
    registerButtonWrapper: {
        borderRadius: 10,
        backgroundColor: '$primary',
        width: '60%',
        marginHorizontal: '20%'
    },
    registerButtonText: {
        paddingVertical: 15,
        textAlign: 'center',
        color: '$white',
        fontWeight: '800',
    }
});
