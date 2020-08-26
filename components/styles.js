import { StyleSheet } from 'react-native';
export function MyStylesheet() {
    const styles = StyleSheet.create({
        leftMargin5: {
            marginLeft: 5
        },
        topMargin35: {
            marginTop: 35
        },
        generalFlex: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        generalContainer:{
            backfaceVisibility:'visible'
        },
        flex1: { flex: 1 },
        flex2: { flex: 2 },
        flex3: { flex: 3 },
        flex4: { flex: 4 },
        flex5: { flex: 5 },
        flex6: { flex: 6 },
        backgroundHeader: {
            backgroundColor: '#731212',
            borderWidth: 1,
            height: 50
        },
        headerText: {
            color: '#F2F2F2',
            textShadowColor: '#000000'
        },
        alignCenter: {
            textAlign: 'center'
        },
        slideimage:{
            width:268,
            height:364
        },
        iconimage:{
            width:115,
            height:75
        },
        slidecontainer:{
            height:423
        },
        alignContentCenter: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        alignContentRight: {
            justifyContent: 'flex-end'
        },
        flexRow: {
            flexDirection: 'row'
        },
        flexEnd:{
            justifyContent: 'flex-end',
            alignItems:'flex-end'
        },
        profileInput:{
            width:250
        },
        boldFont: {
            fontWeight: 'bold'
        },
        settleinvoice:{
            width:181,
            height:57
        },
        marginLeft30:{
            marginLeft:30
        },
        marginLeft60:{
            marginLeft:60
        },
        bottomMargin10: {
            marginBottom: 10
        },
        bottomMargin15: {
            marginBottom: 15
        },
        bottomMargin30: {
            marginBottom: 30
        },
        defaultInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 2
        },
        showBorder: {
            borderWidth: 1,
            borderColor: '#000000'
        },
        underline: {textDecorationLine: 'underline'},
        refreshicon:{
            width:42,
            height:39
        },
        authorize:{
            width:235,
            height:39
        },
        sow:{
            height:200
        },
        activebackground:{
            backgroundColor:'#F7DAF4'
        }

    })
    return (styles)
}