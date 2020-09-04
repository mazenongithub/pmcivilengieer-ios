import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import PM from './pm';
import { MyStylesheet } from './styles';
import { CreatePredessor } from './functions';

class MilestoneID {

    handlemilestoneid(type, value) {

        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (value) {


            if (myuser) {

                const project = pm.getactiveproject.call(this)
                if (project) {
                    const i = pm.getprojectkeybyid.call(this, project.projectid)

                    if (this.state.activemilestoneid) {
                        const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                        if (milestone) {
                            const j = pm.getmilestonekeybyid.call(this, this.state.activemilestoneid)

                            console.log("handlemilestone", i, j)

                            let predessor = {};
                            if (type === 'start-to-start') {
                                predessor = CreatePredessor(value, 'start-to-start')
                            } else if (type === 'start-to-finish') {
                                predessor = CreatePredessor(value, 'start-to-finish')
                            }

                            if (milestone.hasOwnProperty("predessors")) {
                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors.push(predessor)
                            } else {
                                myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors = [predessor]
                            }

                            this.props.reduxUser(myuser);
                            const mymilestone = pm.getmilestonebyid.call(this, value)
                            
                            if (type === 'start-to-start') {
                                this.setState({ milestonestart: mymilestone.milestone })
                            } else if (type === 'start-to-finish') {
                              
                                this.setState({ milestonefinish: mymilestone.milestone })
                            }



                        }


                    }

                }

            }

        }

    }
    showid(type, milestone) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        const milestoneid = new MilestoneID();

        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15}} key={`search${milestone.milestoneid}`}>
                <View style={{ ...styles.flex2 }}>
                    <Text style={{ ...regularFont }}>{milestone.milestone}</Text>
                </View>
                <View style={{ ...styles.flex1 }}>

                    <TouchableOpacity onPress={() => { milestoneid.handlemilestoneid.call(this, type, milestone.milestoneid) }}>
                        <Image source={require('./png/rightArrow.png')}
                            style={{ width: 44, height: 32 }}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    showmilestoneids(type) {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this)
        let menu = [];
        const milestoneid = new MilestoneID();
        const validatemilestone = (milestoneid) => {
            let validate = true;
            if (this.state.activemilestoneid === milestoneid) {
                validate = false;
            } else if (this.state.activemilestoneid) {
                const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid)
                if (milestone) {
                    if (milestone.hasOwnProperty("predessors")) {
                        // eslint-disable-next-line
                        milestone.predessors.map(predessor => {
                            if (predessor.predessor === milestoneid) {
                                validate = false;
                            }
                        })
                    }
                }
            }
            return validate;
        }

        if (milestones) {
            milestones.map(milestone => {
                if (type === "start-to-start") {

                    if (milestone.milestone.toLowerCase().startsWith(this.state.milestonestart.toLowerCase()) && this.state.milestonestart && validatemilestone(milestone.milestoneid)) {
                        menu.push(milestoneid.showid.call(this, type, milestone))
                    }

                } else if (type === 'start-to-finish') {

                    if (milestone.milestone.toLowerCase().startsWith(this.state.milestonefinish.toLowerCase()) && this.state.milestonefinish && validatemilestone(milestone.milestoneid)) {
                        menu.push(milestoneid.showid.call(this, type, milestone))
                    }
                }

            })
        }
        return menu;
    }
    handlevalue(type, value) {
        if (type === 'start-to-start') {
            this.setState({ milestonestart: value })
        } else if (type === 'start-to-finish') {
            this.setState({ milestonefinish: value })
        }
    }

    getvalue(type) {
        if (type === 'start-to-start') {
            return this.state.milestonestart;
        } else if (type === 'start-to-finish') {
            return this.state.milestonefinish;
        }

    }

    showmilestoneid(type) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        const milestoneid = new MilestoneID()
        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>


                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>
                            <TextInput 
                                value={milestoneid.getvalue.call(this, type)}
                                onChangeText={text => { milestoneid.handlevalue.call(this, type, text) }}
                                style={{ ...regularFont, ...styles.defaultInput }} />
                        </View>
                    </View>
                    {milestoneid.showmilestoneids.call(this, type)}



                </View>
            </View>
        )
    }
}
export default MilestoneID;