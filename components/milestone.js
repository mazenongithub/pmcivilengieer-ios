import React from 'react';
import { Alert, Image, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import Start from './start';
import Completion from './completion';
import { milestoneformatdatestring, MyMilestone, DateStringfromObj } from './functions';
import MakeID from './makeids';
import ProjectID from './projectid';
import CriticalPath from './criticalpath'


class Milestone {

    completiondatedefault() {
        const completiondatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const completiondateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const completiondateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ completiondateyear: completiondateyear(), completiondatemonth: completiondatemonth(), completiondateday: completiondateday() })
    }

    startdatedefault() {
        const startdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const startdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const startdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ startdateyear: startdateyear(), startdatemonth: startdatemonth(), startdateday: startdateday() })
    }

    reset() {
        const milestone = new Milestone();
        milestone.startdatedefault.call(this);
        milestone.completiondatedefault.call(this);
    }

    handlemilestone(milestone) {
        let pm = new PM();
        const makeID = new MakeID();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            let myproject = pm.getactiveproject.call(this)
            let i = pm.getprojectkeybyid.call(this, myproject.projectid)
            if (this.state.activemilestoneid) {
                let j = pm.getmilestonekeybyid.call(this, this.state.activemilestoneid)
                myuser.projects.myproject[i].projectmilestones.mymilestone[j].milestone = milestone;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })

            } else {
                let milestoneid = makeID.milestoneid.call(this)
                const startyear = this.state.startdateyear;
                const startday = this.state.startdateday;
                const startmonth = this.state.startdatemonth;
                const start = `${startyear}-${startmonth}-${startday}`
                const completionyear = this.state.completiondateyear;
                const completionday = this.state.completiondateday;
                const completionmonth = this.state.completiondatemonth;
                const completion = `${completionyear}-${completionmonth}-${completionday}`
                let mymilestone = MyMilestone(milestoneid, milestone, start, completion)

                if (myproject.hasOwnProperty("projectmilestones")) {
                    myuser.projects.myproject[i].projectmilestones.mymilestone.push(mymilestone);

                } else {
                    let projectmilestones = { mymilestone: [mymilestone] }
                    myuser.projects.myproject[i].projectmilestones = projectmilestones;
                }
                this.props.reduxUser(myuser);
                this.setState({ activemilestoneid: milestoneid, milestone: '' })

            }

        }

    }
    getmilestone() {
        const pm = new PM();
        let milestone = "";
        if (this.state.activemilestoneid) {

            const mymilestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
            milestone = mymilestone.milestone;

        }
        return milestone;
    }

    makemilestoneactive(milestoneid) {
        const pm = new PM();
        const milestone = new Milestone();
        if (this.state.activemilestoneid === milestoneid) {
            this.setState({ activemilestoneid: false, milestonefinish:'' })
            milestone.reset.call(this)
        } else {
            const milestone = pm.getmilestonebyid.call(this, milestoneid)
            let startdateyear = "";
            let startdatemonth = "";
            let startdateday = "";
            let completiondateyear = "";
            let completiondatemonth = "";
            let completiondateday = "";
            if (milestone) {
                startdateyear = milestone.start.substring(0, 4)
                startdatemonth = milestone.start.substring(5, 7);
                startdateday = milestone.start.substring(8, 10);
                completiondateyear = milestone.completion.substring(0, 4)
                completiondatemonth = milestone.completion.substring(5, 7);
                completiondateday = milestone.completion.substring(8, 10);
            }
            this.setState({ activemilestoneid: milestoneid, startdateday, startdatemonth, startdateyear, completiondateday, completiondateyear, completiondatemonth })
        }
    }
    confirmremovemilestone(milestone) {
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const project = pm.getprojectbyid.call(this, params.projectid)

            if (project) {
                const i = pm.getprojectkeybyid.call(this, params.projectid)
                const checkmilestone = pm.getmilestonebyid.call(this, milestone.milestoneid)
                if (checkmilestone) {

                    const j = pm.getmilestonekeybyid.call(this, milestone.milestoneid);
                    myuser.projects.myproject[i].projectmilestones.mymilestone.splice(j, 1);
                    // eslint-disable-next-line
                    myuser.projects.myproject[i].projectmilestones.mymilestone.map(mymilestone => {

                        if (mymilestone.hasOwnProperty("predessors")) {

                            // eslint-disable-next-line
                            mymilestone.predessors.map(predessor => {
                                if (predessor.predessor === milestone.milestoneid) {
                                    const k = pm.getmilestonekeybyid.call(this, mymilestone.milestoneid);
                                    const l = pm.getpredessorkeybyid.call(this, mymilestone, predessor.predessor);
                                    myuser.projects.myproject[i].projectmilestones.mymilestone[k].predessors.splice(l, 1)
                                }
                            })
                        }
                    })

                    this.props.reduxUser(myuser)
                    this.setState({ activemilestoneid: false })

                }

            }

        }

    }
    removemilestone(mymilestone) {
        const milestone = new Milestone();
        Alert.alert(
            'Delete Milestone',
            `Are you sure you want to remove ${mymilestone.milestone}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove milestone '), style: 'cancel' },
                { text: 'OK', onPress: () => { milestone.confirmremovemilestone.call(this, mymilestone) } },
            ],
            { cancelable: false }
        )
    }

    showmilestoneid(mymilestone) {
        const pm = new PM();
        const styles = MyStylesheet();
        const removeIconSize = pm.getremoveicon.call(this);
        const regularFont = pm.getRegularFont.call(this)
        const milestone = new Milestone();
        const activemilestone = () => {
            if (mymilestone.milestoneid === this.state.activemilestoneid) {
                return (styles.activebackground)
            } else {
                return;
            }
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]} key={mymilestone.milestoneid}>
                <View style={[styles.flex3]}>
                    <Text style={[regularFont, activemilestone()]} onPress={() => { milestone.makemilestoneactive.call(this, mymilestone.milestoneid) }}> {mymilestone.milestone} From {milestoneformatdatestring(mymilestone.start)} to {milestoneformatdatestring(mymilestone.completion)} </Text>
                </View>
                <View style={[styles.flex1]}>
                    <TouchableOpacity onPress={() => { milestone.removemilestone.call(this, mymilestone) }}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIconSize}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )

    }

    showmilestoneids() {
        const pm = new PM();
        const milestones = pm.getprojectmilestones.call(this);
        const milestone = new Milestone();
        let milestoneids = [];
        if (milestones) {
            milestones.map(mymilestone => {
                milestoneids.push(milestone.showmilestoneid.call(this, mymilestone))

            })
        }
        return milestoneids;
    }


    showmilestone() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this);
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const start = new Start();
        const completion = new Completion();
        const milestone = new Milestone();
        const projectid = new ProjectID();
        const criticalpath = new CriticalPath();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/{myproject.title}</Text>
                                <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/milestones</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}>Milestones</Text>
                                <TextInput style={[regularFont, styles.defaultInput]}
                                    onChangeText={text => { milestone.handlemilestone.call(this, text) }}
                                    value={milestone.getmilestone.call(this)}
                                />
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                {start.showstartdate.call(this)}
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                {completion.showcompletiondate.call(this)}
                            </View>
                        </View>

                        {milestone.showmilestoneids.call(this)}

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.bottomMargin30]}>
                                {pm.showsaveproject.call(this)}
                            </View>
                        </View>


                        {criticalpath.showpath.call(this)}


                        {projectid.showprojectid.call(this, myproject)}

                    </View>
                </View>)
        } else {
            return (pm.loginMessage.call(this, "milestones"))
        }

    }

}
export default Milestone;
