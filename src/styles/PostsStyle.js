import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        flex: 1,
        backgroundColor: '#D863FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    content: {
        flex: 7
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchField: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    espacamento: {
        marginTop: 50
    },
    pickerProfile: {
        width: 40
    },
})