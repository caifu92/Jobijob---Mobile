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
    loginForm: {
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
    inputEmail: {
        marginBottom: 15
    },
    inputPassword: {
        marginBottom: 10
    },
    registerButtonText: {
        marginBottom: 30,
        color: '$primary'
    },
    loginButtonWrapper: {
        borderRadius: 10,
        backgroundColor: '$primary',
        width: '60%',
        marginHorizontal: '20%'
    },
    loginButtonText: {
        paddingVertical: 15,
        textAlign: 'center',
        color: '$white',
        fontWeight: '800',
    }
});
