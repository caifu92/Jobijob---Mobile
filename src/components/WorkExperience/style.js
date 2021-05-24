import EStyleSheet from 'react-native-extended-stylesheet'

export default styles = EStyleSheet.create({
    wrapper: {
        flex: 1
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5
    },
    companyName: {
        color: '$darkLight'
    },
    period: {
        color: '$darkLight',
        marginBottom: 5
    },
    circleButton: {
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
    editButton: {
        position: 'absolute',
        right: 50,
        top: 0,
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        top: 0
    },
    checkButton: {
        position: 'absolute',
        right: 50,
        top: 0
    },
    cancelButton: {
        position: 'absolute',
        right: 10,
        top: 0
    },
    mb10: {
        marginBottom: 10
    },
    dateWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    errorMessage: {
        color: 'red',
        marginTop: 10
    },
    checkboxCurrentlyWorking: {
        marginBottom: 10
    }
});
