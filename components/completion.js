import React from 'react';
import { MyStylesheet } from './styles'
import PM from './pm';
import MaterialCalender from './completioncalender'
import { validateMonth, validateDate, validateYear } from './functions';
import { TextInput, View, Text } from 'react-native';

class CompletionDate {


    handleyear(year) {
        this.setState({ completiondateyear: year })
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        
    
        if (myuser) {
            const activeparams = pm.getactiveparams.call(this);
            const project = pm.getprojectbyid.call(this,activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = pm.getprojectkeybyid.call(this, projectid);
                if (year.length === 4) {

                    if(validateYear(year)) {


                        if (this.state.activemilestoneid) {
                            const mymilestone = pm.getmilestonebyid.call(this,  this.state.activemilestoneid);
                            if (mymilestone) {

                                const j = pm.getmilestonekeybyid.call(this,  this.state.activemilestoneid)
                                let day = this.state.completiondateday;
                                let month = this.state.completiondatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].completion= timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }

                  
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ completiondateday: day })
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const activeparams = pm.getactiveparams.call(this)
            const project = pm.getprojectbyid.call(this,activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = pm.getprojectkeybyid.call(this, projectid);
                if (day.length === 2) {

            
                        if(validateDate(day)) {

                        if (this.state.activemilestoneid) {
                            const mymilestone = pm.getmilestonebyid.call(this,  this.state.activemilestoneid);
                            if (mymilestone) {

                                const j = pm.getmilestonekeybyid.call(this,this.state.activemilestoneid)
                                let year = this.state.completiondateyear;
                                let month = this.state.completiondatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].completion = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                

                } else {
                    alert(`Invalid day format ${day}`)
                }

            }

            }
        }
    }

    handlemonth(month) {
        this.setState({ completiondatemonth: month })
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const activeparams = pm.getactiveparams.call(this)
            const project = pm.getprojectbyid.call(this,activeparams.projectid)
            if (project) {

                const projectid = project.projectid

                const i = pm.getprojectkeybyid.call(this, projectid);
                if (month.length === 2) {

                    if(validateMonth(month)) {

                        if (this.state.activemilestoneid) {
                            const mymilestone = pm.getmilestonebyid.call(this,  this.state.activemilestoneid);
                            if (mymilestone) {

                                const j = pm.getmilestonekeybyid.call(this,  this.state.activemilestoneid)
                                let day = this.state.completiondateday;
                                let year = this.state.completiondateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].completion = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }

                } else {
                    alert(`Invalid month format ${month}`)
                }

                }

            }
        }
    }





    showcompletiondate() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const completiondate = new CompletionDate();
        const calender = new MaterialCalender();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Completion Date (MM-DD-YYYY) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} value={this.state.completiondatemonth.toString()}
                                onChangeText={text => { completiondate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.completiondateday.toString()}
                                onChangeText={text => { completiondate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.completiondateyear.toString()}
                                onChangeText={text => { completiondate.handleyear.call(this, text) }} />
                        </View>
                        
                       
                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default CompletionDate;