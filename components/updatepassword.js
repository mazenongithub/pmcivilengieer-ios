import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm';
import Password from './password';
import {UpdateUserPassword} from './actions/api'
import {inputUTCStringForLaborID} from './functions'

class UpdatePassword {
    
    async handlesavepassword() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const providerid = myuser.providerid;
        const password = this.state.password;
        const values = {providerid, password}
        console.log(values)
        try {
            let response = await UpdateUserPassword(values);
            console.log(response)
            let message = '';
            if(response.hasOwnProperty("message")) {
                message+=response.message;
            }
            message+= inputUTCStringForLaborID(response.lastupdated);
            this.setState({message})
        } catch(err) {
            alert(err)
        }
    }

    showupdatepassword() {
        const styles = MyStylesheet();
        const pm = new PM();
        const plusIcon = pm.getPlusIcon.call(this)
        const minusIcon = pm.getMinusIcon.call(this);
        const updatepasswordIcon = pm.getupdatepassword.call(this)
        const password = new Password();
        const updatepassword = new UpdatePassword();
        const regularFont = pm.getRegularFont.call(this)

        const showsavepassword = () => {
            if(this.state.showpassword && this.state.passwordcheck) {
                return(<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { updatepassword.handlesavepassword.call(this) }}>
                            <Image source={require('./png/updatepassword.png')}
                                resizeMethod='scale'
                                style={[updatepasswordIcon]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>)
            }
        }

        const showpassword = () => {
            if(this.state.showpassword) {
                return(password.showpassword.call(this))
            }
        }

        const passwordIcon = () => {
            if (this.state.showpassword) {
                return (<TouchableOpacity onPress={() => { this.setState({showpassword:false}) }}>
                    <Image source={require('./png/minus.png')}
                        resizeMethod='scale'
                        style={[minusIcon]}
                    />
                </TouchableOpacity>)
            } else {
                return (<TouchableOpacity onPress={() => { this.setState({showpassword:true}) }}>
                    <Image source={require('./png/plus.png')}
                        resizeMethod='scale'
                        style={[plusIcon]}
                    />
                </TouchableOpacity>)
            }
        }
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.flexRow]}>
                       
                        {passwordIcon()} 
                        <Text style={[regularFont]}>  Update Password</Text>

                        </View>
                    </View>

                    {showpassword()}

                    {showsavepassword()}



                </View>
            </View>
        )

    }
}
export default UpdatePassword;