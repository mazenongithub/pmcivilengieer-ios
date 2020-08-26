import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';
import Profile from './profile'
import AppleID from './appleid';
import {ClientLogin} from './actions/api'
import {returnCompanyList} from './functions';
import MyProfile from './myprofile';



class Register {

   

    showregister() {
        const pm = new PM();
        const styles = MyStylesheet();
        const profile = new Profile();
        const appleid = new AppleID();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this);
        const register = new Register();
        const myuser = pm.getuser.call(this);
        const myprofile = new MyProfile();

        const showappleid = () => {

            if(this.state.profile && this.state.profilecheck) {
                return(appleid.showappleid.call(this, 'register'))
            }
        }

    
        if(myuser) {
        return(myprofile.showmyprofile.call(this))
        } else {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Register </Text>
                        </View>
                    </View>

                    {profile.showprofile.call(this)}

                    {showappleid()}

                

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                        </View>
                    </View>

                </View>
            </View>)

        }
    }

}
export default Register;