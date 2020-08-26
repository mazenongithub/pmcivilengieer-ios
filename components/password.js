import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';
import { validatePassword} from './functions';

class Password {

    handlePassword(text) {
        let validate = validatePassword(text);
        if(!validate.validate) {
            
            this.setState({passwordcheck:false, password:text, message:validate.message })
        } else {
            this.setState({ password:text, message:"", passwordcheck:true  })  
        }
         


    }

    confirmpassword() {
        const pm = new PM();
        const gocheck = pm.getgochecksmall.call(this)
        if(this.state.passwordcheck && this.state.password) {

            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        }

    }

    showpassword() {
        const password = new Password();
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)

        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont]}>Password </Text>
                    <TextInput style={[regularFont, styles.defaultInput]}
                        onChangeText={text => { password.handlePassword.call(this, text) }}
                        value={this.state.password}
                        secureTextEntry={true}
                        password={true}
                    />
                </View>
                <View style={[styles.flex1, styles.flexEnd]}>
                    {password.confirmpassword.call(this)}
                </View>
            </View>
        )
    }
}
export default Password;