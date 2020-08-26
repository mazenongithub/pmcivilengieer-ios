import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { MyStylesheet } from './styles';
import PM from './pm';
import { CheckEmailAddress } from './actions/api'
import { validateEmail } from './functions'
class EmailAddress {
    confirmemailaddressimage() {
        const pm = new PM();
        const gocheck = pm.getgochecksmall.call(this)
        if (this.state.emailaddresscheck) {
            return (
                <Image source={require('./png/gocheck.png')}
                    resizeMethod='scale'
                    style={gocheck}
                />)
        } else {
            return;
        }

    }

    handleemailaddress(emailaddress) {
        emailaddress = emailaddress.toLowerCase();
        this.setState({ emailaddress })
        let errmsg = validateEmail(emailaddress)
        if (errmsg) {
            this.setState({ emailaddresscheck: false, message: errmsg })
        } else {
            this.setState({ emailaddresscheck: true, message: "" })
        }

    }


    async verifyEmailAddress() {
        const pm = new PM();
        let emailaddress = this.state.emailaddress;
        const navigation = pm.getnavigation.call(this)
        if(navigation.navigation === 'register') {
        if (!validateEmail(emailaddress)) {
            try {
                let response = await CheckEmailAddress(emailaddress)
                
                if (response.hasOwnProperty("valid")) {
                    this.setState({ emailaddresscheck: true });
                }
                else {
                    this.setState({ emailaddresscheck: false, message: response.message });
                }

            } catch (err) {

                alert(err)
            }

        }

    }


    }
    showemailaddress() {
        const emailaddress = new EmailAddress();
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)


        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont]}>Email Address </Text>
                    <TextInput style={[regularFont, styles.defaultInput]}
                        onChangeText={text => { emailaddress.handleemailaddress.call(this, text) }}
                        onBlur={() => { emailaddress.verifyEmailAddress.call(this) }} 
                        value={this.state.emailaddress}
                        />
                </View>
                <View style={[styles.flex1, styles.flexEnd]}>
                    {emailaddress.confirmemailaddressimage.call(this)}
                </View>
            </View>
        )
    }
}
export default EmailAddress