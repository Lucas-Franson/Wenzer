import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    botoes: {
        flex: 4,
        marginBottom: 20,
        marginTop: 40
    },
    credits: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lblCredits: {
        fontWeight: '700',
        fontSize: 11,
        color: '#aaa'
    },
    foto: {
        width: 120,
        height: 120,
        marginHorizontal: 3,
        borderRadius: 60
    },
    lblDetails: {
        marginLeft: 5,
        alignItems: 'center',
        fontSize: 10
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAdd: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 75,
        right: 0,
        top: 90,
        bottom: 0,
    },
    btnActions: {
        alignItems: 'center',
        backgroundColor: '#D863FF66',
        marginBottom: 1,
        padding: 20
    }
})

