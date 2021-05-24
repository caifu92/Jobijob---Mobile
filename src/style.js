import EStyleSheet from 'react-native-extended-stylesheet'

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
    $fontFamily: 'Montserrat',
    $primary: '#6EC177',
    $primaryLight: '#F6FCF7',
    $dark: '#3D4043',
    $darkLight: '#9EA3AE',
    $white: '#FFFFFF',
    $whiteLight: '#EBEBEC',
    $black: '#000'
});

export default styles = EStyleSheet.create({
    container: {
        flex: 1,
        fontFamily: '$fontFamily',
        color: '$dark'
    },
    screenContainer: {
        flex: 1,
        marginBottom: 80
    },
    navMenu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 80,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    }
});
