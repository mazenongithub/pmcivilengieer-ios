import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
class ProjectID {
    makeprojectactive(projectid) {
        const pm = new PM();
        const activeproject = pm.getactiveproject.call(this)
        const activeprojectid = activeproject.projectid;
        if(activeprojectid === projectid) {
            this.props.reduxProject(false)
           
        } else {
            this.props.reduxProject({projectid})
        }
        this.setState({message:""})
    }

    showprojectid(myproject) {
        const pm = new PM();
        const styles = MyStylesheet();
        const touchIcon = pm.gettouchicon.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const projectid = new ProjectID();
        const navigation = pm.getnavigation.call(this);
        const activeparams  = pm.getactiveparams.call(this)
        const activebackground = () => {
            if(activeparams.projectid === myproject.projectid) {
                return(styles.activebackground)
            }

        }
        const activemessage = () => {
            if(activeparams.projectid === myproject.projectid) {
                return(`${myproject.title} is active`)
            } else {
                return('Touch to make active')
            }
        }
        const handleactive = () => {
            if(navigation.navigation === 'myprojects') {
            return(   <View style={[styles.generalFlex]}>
                <View style={[styles.flex1, styles.flexRow, activebackground()]}>
                    <TouchableOpacity onPress={()=>{projectid.makeprojectactive.call(this,myproject.projectid)}}>
                        <Image source={require('./png/touchicon.png')}
                            resizeMethod='scale'
                            style={touchIcon}
                        />
                    </TouchableOpacity>
                    <Text style={[regularFont]} onPress={()=>{projectid.makeprojectactive.call(this,myproject.projectid)}}>{activemessage()}</Text>
                </View>
            </View>)

            } else {
                return;
            }
        }

        return (
            <View style={[styles.generalFlex, styles.bottomMargin10,styles.topMargin35]} key={myproject.projectid}>
                <View style={[styles.flex1]}>
                    {handleactive()}
                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]} onPress={()=>{this.handleproject(myproject.projectid)}}>/{myproject.title} </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont,styles.alignCenter]} onPress={()=>{this.handlecharges(myproject.projectid)}}>Charges </Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                           
                        </View>
                        
                    </View>


                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handlespecifications(myproject.projectid)}}>Specifications </Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handlecostestimate(myproject.projectid)}}>Cost Estimate </Text>
                        </View>
                    </View>


                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handleteam(myproject.projectid)}}>Project Team </Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handlemilestones(myproject.projectid)}}>Create Milestones </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handlebidschedule(myproject.projectid)}}>View Bid Schedule</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handlebid(myproject.projectid)}}>View Bid </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handleproposals(myproject.projectid)}}>View Proposals</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                        <Text style={[regularFont, styles.alignCenter]} onPress={()=>{this.handleinvoices(myproject.projectid)}}>View Invoices</Text>
                        </View>
                    </View>


                </View>
            </View>
        )

    }
}

export default ProjectID