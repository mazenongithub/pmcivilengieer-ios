import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import { LogoutUser } from './actions/api'

class Header {
    async logoutuser() {
        try {
            let response = await LogoutUser();
            if (response.hasOwnProperty("message")) {
                this.props.reduxUser(response)
            }
        } catch (err) {
            alert(err)
        }

    }

    handlemenu_1() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const navigation = pm.getnavigation.call(this)
        const styles = MyStylesheet();
        const myuser = pm.getuser.call(this)
        if (navigation.hasOwnProperty("navigation")) {
            switch (navigation.navigation) {
                case 'login':
                    if (myuser) {
                        return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlemyprojects() }}> {`myprojects ->`}</Text>)
                    } else {
                        return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlelanding() }}> {`<-back`}</Text>)
                    }

                case 'register':
                    if (myuser) {
                        return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlemyprojects() }}> {`myprojects ->`}</Text>)
                    } else {
                        return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlelanding() }}> {`<-back`}</Text>)
                    }
                case 'profile':
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlemyprojects() }}> {`myprojects ->`}</Text>)
                case 'landing':
                    if (myuser) {
                        return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlemyprojects() }}> {`myprojects ->`}</Text>)
                    }
                    break;
                default:
                    if (myuser) {
                        return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlemyprojects() }}> {`myprojects ->`}</Text>)
                    }
                    break;
            }
        }

    }
    handlemenu_2() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        if (myproject) {
            return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleproject(myproject.projectid) }}> {myproject.title}-> </Text>)
        }
    }
    handlemenu_3() {
        const pm = new PM();
        const navigation = pm.getnavigation.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        const myproject = pm.getactiveproject.call(this)
        if (myproject) {
            switch (navigation.navigation) {
                case "team":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleteam(myproject.projectid) }}> team -> </Text>)
                case "milestones":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlemilestones(myproject.projectid) }}> milestones -> </Text>)
                case "bidschedule":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlebidschedule(myproject.projectid) }}> bidschedule -> </Text>)
                case "bidschedulelineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlebidschedule(myproject.projectid) }}> bidschedule -> </Text>)
                case "bid":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlebid(myproject.projectid) }}> bid -> </Text>)
                case "bidlineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlebid(myproject.projectid) }}> bid -> </Text>)
                case "proposals":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleproposals(myproject.projectid) }}> proposals -> </Text>)
                case "viewproposal":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleproposals(myproject.projectid) }}> proposals -> </Text>)
                case "proposallineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleproposals(myproject.projectid) }}> proposals -> </Text>)
                case "invoices":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleinvoices(myproject.projectid) }}> invoices -> </Text>)
                case "viewinvoice":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleinvoices(myproject.projectid) }}> invoices -> </Text>)
                case "invoicelineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleinvoices(myproject.projectid) }}> invoices -> </Text>)
                case "specifications":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlespecifications(myproject.projectid) }}> specifications -> </Text>)
                case "specification":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlespecifications(myproject.projectid) }}> specifications -> </Text>)
                case "costestimate":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlecostestimate(myproject.projectid) }}> costestimate -> </Text>)
                default:
                    break;
            }
        }
    }
    handlemenu_4() {
        const pm = new PM();
        const navigation = pm.getnavigation.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const params = pm.getactiveparams.call(this)
        const styles = MyStylesheet();
        const myproject = pm.getactiveproject.call(this)
        if (myproject) {
            switch (navigation.navigation) {
                case "bidlineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlebidlineitem(params.bid.csiid) }}> {params.bid.csiid} </Text>)
                case "bidschedulelineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlebidschedulelineitem(params.bidschedule.csiid) }}> {params.bidschedule.csiid} </Text>)
                case "viewproposal":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleviewproposal(params.proposalid) }}> {params.proposalid} </Text>)
                case "proposallineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleviewproposal(params.proposalid) }}> {params.proposalid} </Text>)
                case "viewinvoice":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleviewinvoice(params.invoiceid) }}> {params.invoiceid} </Text>)
                case "invoicelineitem":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handleviewinvoice(params.invoiceid) }}> {params.invoiceid} </Text>)
                case "specification":
                    return (<Text style={[regularFont, styles.alignCenter]} onPress={() => { this.handlespecification(params.specifications.csiid) }}> {params.specifications.csiid} </Text>)
                default:
                    break
            }
        }

    }
    showHeader() {
        const pm = new PM();
        const header = new Header();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const myuser = pm.getuser.call(this)
        const profileicon = pm.getprofileicon.call(this)
        const header_3 = () => {

            return (<TouchableOpacity onPress={() => { this.checkuserlogin() }}>
                <Image source={require('./png/refreshicon.png')}
                    resizeMethod='scale'
                    style={styles.refreshicon}
                />
            </TouchableOpacity>)
        }
        const header_1 = () => {
            if (myuser) {
                return (<TouchableOpacity onPress={() => { this.handleprofile() }}>
                    <Image source={require('./png/profileicon.png')}
                        resizeMethod='scale'
                        style={profileicon}
                    />
                </TouchableOpacity>)
            } else {
                return (<Text style={[styles.headerText, styles.alignCenter, headerFont]} onPress={() => { this.handleregister() }}>Register</Text>)
            }
        }

        const header_2 = () => {
            if (myuser) {
                return (<Text style={[styles.headerText, styles.alignCenter, headerFont]} onPress={() => { header.logoutuser.call(this) }}>Logout</Text>)
            } else {
                return (<Text style={[styles.headerText, styles.alignCenter, headerFont]} onPress={() => { this.handlelogin() }}>Login</Text>)
            }
        }

        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.backgroundHeader]}>
                        <View style={[styles.flex2, styles.alignContentCenter]}>
                            {header_3()}
                        </View>
                        <View style={[styles.flex1]}>
                            {header_1()}
                        </View>
                        <View style={[styles.flex1]}>
                            {header_2()}
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1]}>
                            {header.handlemenu_1.call(this)}
                        </View>
                        <View style={[styles.flex1]}>
                            {header.handlemenu_2.call(this)}

                        </View>
                        <View style={[styles.flex1]}>
                            {header.handlemenu_3.call(this)}
                        </View>
                        <View style={[styles.flex1]}>
                            {header.handlemenu_4.call(this)}
                        </View>


                    </View>


                </View>
            </View>
        )
    }
}
export default Header;

