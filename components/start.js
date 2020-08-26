import React from 'react';
import { MyStylesheet } from './styles'
import PM from './pm';
import MaterialCalender from './startcalender'
import { validateMonth, validateDate, validateYear } from './functions';
import { TextInput, View, Text } from 'react-native';

class StartDate {


    handleyear(year) {
        this.setState({ startdateyear: year })
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
                                let day = this.state.startdateday;
                                let month = this.state.startdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].start= timein;
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
        this.setState({ startdateday: day })
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
                                let year = this.state.startdateyear;
                                let month = this.state.startdatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = timein;
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
        this.setState({ startdatemonth: month })
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
                                let day = this.state.startdateday;
                                let year = this.state.startdateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].start = timein;
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





    showstartdate() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const startdate = new StartDate();
        const calender = new MaterialCalender();
        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Start Date (MM-DD-YYYY) </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }} value={this.state.startdatemonth.toString()}
                                onChangeText={text => { startdate.handlemonth.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.startdateday.toString()}
                                onChangeText={text => { startdate.handleday.call(this, text) }} />
                        </View>
                        <View style={{ ...styles.flex1, ...styles.addMargin }}>

                            <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.defaultInput, ...styles.alignCenter }}
                                value={this.state.startdateyear.toString()}
                                onChangeText={text => { startdate.handleyear.call(this, text) }} />
                        </View>
                        
                       
                    </View>
                    {calender.showMaterialCalender.call(this)}


                </View>
            </View>)
    }

}

export default StartDate;