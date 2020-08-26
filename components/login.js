import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';

import AppleID from './appleid';
import MyProfile from './myprofile';


class Login {

    handlegoicon() {
        const pm = new PM();
        const loginNow = pm.getloginnow.call(this)
        if (this.state.emailaddress && this.state.emailaddresscheck) {
            if ((this.state.client && this.state.clientid) || (this.state.password && this.state.passwordcheck)) {
                return (<TouchableOpacity onPress={() => { pm.loginclient.call(this) }}>
                    <Image source={require('./png/loginnow.png')}
                        resizeMethod='scale'
                        style={loginNow}
                    />
                </TouchableOpacity>)

            }
        }
    }
    showlogin() {
        const pm = new PM();
        const styles = MyStylesheet();
        const appleid = new AppleID();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const login = new Login();
        const myuser = pm.getuser.call(this)
        const myprofile = new MyProfile();

    

        const showlogin = () => {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Login </Text>
                            </View>
                        </View>
                        {appleid.showappleid.call(this, "login")}
    
                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                            </View>
                        </View>
    
                    </View>
                </View>)
        }
        
        if(myuser) {
            return(myprofile.showmyprofile.call(this))
        } else {
            return(showlogin())
        }


      
    }

}
export default Login;