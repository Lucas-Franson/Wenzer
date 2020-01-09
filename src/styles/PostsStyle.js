import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D863FF'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
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