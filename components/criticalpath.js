import React from 'react'
import { MyStylesheet } from './styles';
import PM from './pm'
import { CreatePredessor, getDateInterval, trailingZeros, getOffsetDate, monthString, increaseCalendarDayOneMonth, calculatemonth, milestoneformatdatestring, getScale, calculateyear, increasedatebyoneday, calculateday, makeID, getRandomColor } from './functions'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Svg, {
    Rect,
    Text as TextSvg,
    G,
    Polygon,
    Polyline,
    Line
} from 'react-native-svg';
import MilestoneID from './milestoneid';
class CriticalPath {

    showstartdates() {
        const pm = new PM();
        const jsx = [];
        const styles = MyStylesheet();
        const regularFont = pm.getRularFont.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const criticalpath = new CriticalPath();
        if (this.state.activemilestoneid) {
            const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
            if (milestone.hasOwnProperty("predessors")) {

                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessoremoveIconr;
                    let type = predessor.type;
                    if (type === 'start-to-start') {
                        let mymilestone = pm.getmilestonebyid.call(this, milestoneid)
                        jsx.push(
                            <View style={{ ...styles.generalFlex }} key={`predessor${milestoneid}`}>
                                <View style={{ ...styles.flex2 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{mymilestone.milestone}</Text>
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    <TouchableOpacity onPress={() => { criticalpath.confirmremovepredessor.call(this, milestone, predessor.predessor) }}>
                                        <Image source={require('./png/removeIcon.png')}
                                            style={removeIcon}
                                            resizeMethod='scale'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                })
            }

        }
        return jsx;

    }

    confirmremovepredessor(milestone, milestoneid) {
        const pm = new PM();
        const predessors = pm.getpredessorbyid.call(this, milestone, milestoneid)
        const predessor = pm.getmilestonebyid.call(this, predessors.predessor)
        const criticalpath = new CriticalPath();
        Alert.alert(
            'Remove Predessor',
            `Are you sure you want to remove predessor ${predessor.milestone} from ${milestone.milestone}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove Predessor '), style: 'cancel' },
                { text: 'OK', onPress: () => { criticalpath.removepredessor.call(this, milestone, milestoneid) } },
            ],
            { cancelable: false }
        )
    }
    removepredessor(milestone, milestoneid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const projectid = pm.getactiveprojectid.call(this)
            const myproject = pm.getprojectbyid.call(this, projectid)
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this, myproject.projectid)

                const mymilestone = pm.getmilestonebyid.call(this, milestone.milestoneid);
                if (mymilestone) {
                    const j = pm.getmilestonekeybyid.call(this, milestone.milestoneid)
                    const predessor = pm.getpredessorbyid.call(this, milestone, milestoneid);

                    if (predessor) {
                        const k = pm.getpredessorkeybyid.call(this, milestone, milestoneid);

                        myuser.projects.myproject[i].projectmilestones.mymilestone[j].predessors.splice(k, 1)
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                }


            }

        }


    }

    showenddates() {

        const pm = new PM();
        const jsx = [];
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const criticalpath = new CriticalPath();
        if (this.state.activemilestoneid) {
            const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
            if (milestone.hasOwnProperty("predessors")) {

                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessor;
                    let type = predessor.type;
                    if (type === 'start-to-finish') {
                        let mymilestone = pm.getmilestonebyid.call(this, milestoneid)
                        jsx.push(
                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={`predessor${milestoneid}`}>
                                <View style={{ ...styles.flex2 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{mymilestone.milestone}</Text>
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    <TouchableOpacity onPress={() => { criticalpath.confirmremovepredessor.call(this, milestone, predessor.predessor) }}>
                                        <Image source={require('./png/removeIcon.png')}
                                            style={removeIcon}
                                            resizeMethod='scale'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                })
            }

        }
        return jsx;

    }

    showoptionvalues() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);

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

        const jsx = [];
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (validatemilestone(milestone.milestoneid)) {
                    jsx.push(<Text key={`op${milestone.milestoneid}`} value={milestone.milestoneid}>{milestone.milestone}</Text>)

                }
            })


        }
        return jsx;

    }
    showlineandarrow(x1, y1, x2, y2) {
        // const x1 = 0
        // const y1 = 0

        // const x2 = 200
        // const y2 = 80
        const randomcolor = getRandomColor()

        return (
            <G key={`${x1.toString()}${y1.toString()}${x2.toString()}${y2.toString()}${makeID(6)})}`} id="lineandarrow">
                <Polyline strokeWidth="1" stroke={randomcolor} points={`${x2 - 13} ${y2} ${x2 - 23} ${y2} ${x2 - 23} ${y1 + 3} ${x1} ${y1 + 3} ${x1} ${y1}`} />
                <Polygon strokeWidth="1" stroke={randomcolor}  fill={randomcolor} points={`${x2 - 11.53} ${y2 + 4.12} ${x2 - 11.53} ${y2 + 1.79} ${x2 - 20.48} ${y2 + 1.79} ${x2 - 20.48} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 3.4} ${x2} ${y2 + 0.34} ${x2 - 11.53} ${y2 + 4.12}`} />
            </G>)
    }



    showmilestones() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this);
        const projectinterval = pm.getprojectinterval.call(this)
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        let mymilestones = [];
        if (projectinterval) {
            let ypos = 40;
            let interval = getDateInterval(projectinterval.start, projectinterval.completion)
            let scale = getScale(interval)
            if (milestones) {
                // eslint-disable-next-line
                milestones.map(milestone => {
                    let params = false;
                    if (scale === 'month') {

                        params = calculatemonth(
                            projectinterval.start,
                            projectinterval.completion,
                            milestone.start,
                            milestone.completion)
                    } else if (scale === 'year') {
                        params = calculateyear(
                            projectinterval.start,
                            projectinterval.completion,
                            milestone.start,
                            milestone.completion)
                    } else if (scale === 'day') {
                        params = calculateday(projectinterval.start,
                            projectinterval.completion,
                            milestone.start,
                            milestone.completion)
                    }

                    mymilestones.push(
                        <G key={`texdft${milestone.milestoneid}`}>
                            <TextSvg fill="black" stroke="none" fontSize="16" x={params.xo} y={ypos - 10}> {milestone.milestone} {milestoneformatdatestring(milestone.start)} to {milestoneformatdatestring(milestone.completion)}</TextSvg>

                        </G>)

                    mymilestones.push(
                        <G key={`rdfec${milestone.milestoneid}`}>

                            <Rect fill="none" strokeWidth="1" stroke="rgb(0,0,0)" x={params.xo} y={ypos} width={params.width} height="40.03" />
                        </G>)

                    ypos += 100;


                })



            }

        }

        return mymilestones;
    }

    showpaths() {
        const pm = new PM();
        const criticalpath = new CriticalPath();
        const paths = pm.getpaths.call(this)
        let getpaths = [];

        for (let myprop in paths) {

            for (let mypaths in paths[myprop]['paths']) {
                let x1 = paths[myprop]['paths'][mypaths]['x1'];
                let x2 = paths[myprop]['paths'][mypaths]['x2'];
                let y1 = paths[myprop]['paths'][mypaths]['y1'];
                let y2 = paths[myprop]['paths'][mypaths]['y2'];

                getpaths.push(criticalpath.showlineandarrow.call(this, x1, y1, x2, y2));

            }



        }


        return getpaths;

    }





    showpath() {
        const criticalpath = new CriticalPath();
        const pm = new PM();
        const styles = MyStylesheet();

        const regularFont = pm.getRegularFont.call(this)
        const milestones = pm.getmilestones.call(this);
        const milestoneid = new MilestoneID();
        let yext = 200;
        if (milestones) {
            if (milestones.length) {
                yext = (100 * milestones.length) + 100;
            }

        }
        let auditmilestones = "";
        auditmilestones += pm.auditmilestones.call(this,milestones)

        const projectinterval = pm.getprojectinterval.call(this);
        let interval = '1202.88'
        let grid = [];
        let scale = "";
        if (projectinterval) {
            interval = getDateInterval(projectinterval.start, projectinterval.completion)
            scale = getScale(interval)
            let approxmonth = false;
            let approxyear = false;
            if (scale === 'month') {

                approxmonth = Math.round(interval / 30.41)
                interval = (approxmonth * 200) + 200;

                for (let i = 0; i <= approxmonth; i++) {
                    grid.push(<Line strokeWidth="1" stroke="rgb(0,0,0)" key={`dfdgrid${i}`} x1={i * 200} x2={i * 200} y1={0} y2={yext} />)
                }

            } else if (scale === 'year') {
                approxyear = Math.round(interval / 365);
                interval = (approxyear * 200) + 200;
                for (let i = 0; i <= approxyear; i++) {
                    grid.push(<Line strokeWidth="1" stroke="rgb(0,0,0)" x1={i * 200} x2={i * 200} y1={0} y2={yext} />)
                }
            } else if (scale === 'day') {
                for (let i = 0; i <= interval; i++) {
                    grid.push(<Line strokeWidth="1" stroke="rgb(0,0,0)" x1={i * 200} x2={i * 200} y1={0} y2={yext} />)
                }
                interval = interval * 200 + 200
            }



        }

        const activemilestone = () => {
            if (this.state.activemilestoneid) {
                const float = pm.getfloatbymilestoneid.call(this,this.state.activemilestoneid) 
                const milestone = pm.getmilestonebyid.call(this, this.state.activemilestoneid);
                const projectfloat = pm.calcTotalProjectFloat.call(this,this.state.activemilestoneid)
                const lag = pm.getlagbymilestoneid.call(this,this.state.activemilestoneid)
                return (
                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>Active Milestone Is: {milestone.milestone} Float is {float} days Project Float is {projectfloat} days Lag is {lag} days </Text>
                    </View>
                )
            }
        }



        const getLabels = (start, completion, scale) => {


            let offsetstart = getOffsetDate(start);
            let offsetcompletion = getOffsetDate(completion);
            let datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
            let monthstart = trailingZeros(datestart.getMonth() + 1)
            let yearstart = datestart.getFullYear();
            let daystart = trailingZeros(datestart.getDate());
            let datestartstring = `${yearstart}-${monthstart}-${daystart}`;
            const datecompletion = new Date(`${completion.replace(/-/g, '/')} 00:00:00${offsetcompletion}`)
            let yearcompletion = datecompletion.getFullYear();
            let monthcompletion = trailingZeros(datecompletion.getMonth() + 1);
            let daycompletion = trailingZeros(datecompletion.getDate());
            let datecompletionstring = `${yearcompletion}-${monthcompletion}-${daycompletion}`
            let datecompletionstringmonth = `${yearcompletion}-${monthcompletion}-01`


            let x1 = 0;
            const mylabels = [];

            let intmonth = "";
            let daystartday = "";
            let int = datestartstring;
            if (scale === 'month') {



                while (intmonth !== datecompletionstringmonth) {

                    int = increaseCalendarDayOneMonth(int);
                    x1 += 200;
                    offsetstart = getOffsetDate(int);
                    let intstart = new Date(`${int.replace(/-/g, '/')} 00:00:00${offsetstart}`)
                    let month = trailingZeros(intstart.getMonth() + 1)
                    let year = intstart.getFullYear();
                    intmonth = `${year}-${month}-01`
                    mylabels.push(<TextSvg key={`cdfdrit${intstart.getTime()}`} fill="black" stroke="none" fontSize="16" x={x1} y={yext + 50}>{monthString(intstart.getMonth())} {intstart.getFullYear()}</TextSvg>);
                }


            } else if (scale === 'year') {

                while (yearstart !== yearcompletion) {
                    x1 += 200;
                    yearstart += 1;
                    let datestartyear = `${yearstart}-${monthstart}-${daystart}`
                    offsetstart = getOffsetDate(datestartyear)
                    datestartyear = new Date(`${datestartyear.replace(/-/g, '/')} 00:00:00${offsetstart}`)

                    mylabels.push(<TextSvg key={`crdfit${yearstart}${x1.toString()}`} fill="black" stroke="none" fontSize="16" x={x1} y={yext + 50}>{datestartyear.getFullYear()}</TextSvg>);


                }

            } else if (scale === 'day') {

                daystartday = datestartstring;

                while (daystartday !== datecompletionstring) {
                    x1 += 200;
                    daystartday = increasedatebyoneday(daystartday)
                    offsetstart = getOffsetDate(daystartday);
                    let intstart = new Date(`${daystartday.replace(/-/g, '/')} 00:00:00${offsetstart}`)
                    let month = trailingZeros(intstart.getMonth() + 1)
                    let year = intstart.getFullYear();
                    let day = trailingZeros(intstart.getDate());
                    daystartday = `${year}-${month}-${day}`

                    mylabels.push(<TextSvg key={`crdfdfit${day}${x1.toString()}`} fill="black" stroke="none" fontSize="16" x={x1} y={yext + 50}>{month}/{day}/{year}</TextSvg>);

                }



            }

            return (mylabels)

        }

        const showlabels = () => {
            if (projectinterval) {


                return getLabels(projectinterval.start, projectinterval.completion, scale)

            }
        }

        const pathmenu = () => {
            if (this.state.activemilestoneid) {
                return (
                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                     
                        <View style={{ ...styles.flex1 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Can't Start until which milestones finish? </Text>


                            {milestoneid.showmilestoneid.call(this, 'start-to-finish')}

                            {criticalpath.showenddates.call(this)}



                        </View>
                    </View>)
            }
        }

        const auditmessage = (message) => {
            if(message) {
                return(<View style={{...styles.generalFont, ...styles.redFont,...styles.bottomMargin15}}><Text style={{...regularFont,...styles.redFont}}>{message}</Text></View>)
            }


        }



        return (

            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>
                    
                    {auditmessage(auditmilestones)}

                    {activemilestone()}

                    {pathmenu()}

                    <ScrollView horizontal={true}>
                        <Svg width={0.75*interval} height={0.75*(yext + 200)} viewBox={`0 0 ${interval} ${yext + 200}`}>
                            <G>
                                <G>
                                    
                                    {showlabels()}
                                    <Polyline strokeWidth="1" stroke="rgb(0,0,0)" points={`2.5 0.38 2.5 ${yext} ${interval} ${yext}`} />
                                    {criticalpath.showmilestones.call(this)}
                                    {criticalpath.showpaths.call(this)}

                                </G>
                            </G>
                        </Svg>
                    </ScrollView>



                </View>
            </View>


        )
    }


}

export default CriticalPath;