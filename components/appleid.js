import React from 'react';
import {View, Text} from 'react-native';
import {MyStylesheet} from './styles';
import * as AppleAuthentication from 'expo-apple-authentication';
import PM from './pm';

class AppleID {
showappleicon(type) {
    const pm = new PM();
    const appleIcon = pm.getappleicon.call(this)

        return(<AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={[appleIcon]}
            onPress={()=>{pm.appleSignIn.call(this, type)}}

        />)
    
}
    showappleid(type) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const appleid = new AppleID();
       
     
        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]}>
            <View style={[styles.flex1, styles.alignContentCenter]}>
            {appleid.showappleicon.call(this, type)}
            </View>
        </View>
        )
        
    }

}
export default AppleID;