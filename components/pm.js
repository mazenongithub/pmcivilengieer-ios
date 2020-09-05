import React from 'react';
import { Dimensions, View, TouchableOpacity, Image, Text } from 'react-native';
import { MyStylesheet } from './styles';
import * as AppleAuthentication from 'expo-apple-authentication';
import { inputUTCStringForLaborID, returnCompanyList, sorttimes, sortpart, getDateInterval, getScale, calculatemonth, calculateday, calculateyear,  calculateFloat, getDateTime,checkemptyobject } from './functions'
import { SaveAllProfile, NodeLogin, LoadCSIs, AppleLogin } from './actions/api'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';


class PM {

    getengineerkeybyid(projectid,engineerid) {
        const pm = new PM();
        const engineers = pm.getengineering.call(this,projectid);
        let key = "";
        if (engineers) {
            // eslint-disable-next-line
            engineers.map((engineer, i) => {
                if (engineer.providerid === engineerid) {
                    key = i;
                }
            })
        }
        return key;

    }
    getteamprofile() {

            return ({ width: 160, height: 120 })
        
    }
    getengineerbyid(projectid,engineerid) {
        const pm = new PM();
        const engineers = pm.getengineering.call(this,projectid);
        let myengineer = "";
        if (engineers) {
            // eslint-disable-next-line
            engineers.map(engineer => {
                if (engineer.providerid === engineerid) {
                    myengineer = engineer;
                }
            })
        }
        return myengineer;

    }

    getengineering(projectid) {
        const pm = new PM();
        const myproject = pm.getprojectbyid.call(this,projectid);
        let engineers = "";
        if (myproject.hasOwnProperty("engineering")) {
            engineers = myproject.engineering;
        }
        return engineers;

    }

    getestimatecsibyid(csiid) {
        const pm = new PM();
        const estimate = pm.getcist
        let mycsi = false;
        if (estimate) {
            if (estimate.hasOwnProperty("bidschedule")) {
                // eslint-disable-next-line
                estimate.bidschedule.map(bid => {
                    if (bid.csiid === csiid) {
                        mycsi = { csi: bid.csi, title: bid.title, csiid, quantity: bid.quantity, unit: bid.unit }
                    }
                })
            }
        }
        return mycsi;
    }

    getsectionbyid(projectid, csiid, sectionid) {
        const pm = new PM();
        const spec = pm.getspecficationbycsi.call(this, projectid, csiid)
        let mysection = false;
        if (spec) {

            if (spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map(section => {
                    if (section.sectionid === sectionid) {
                        mysection = section;
                    }
                })
            }
        }
        return mysection;
    }

    getspecficationbycsi(projectid, csiid) {
        const pm = new PM();
        const specs = pm.getspecficationsbyprojectid.call(this, projectid)
        let myspec = false;
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                if (spec.csiid === csiid) {
                    myspec = spec;
                }
            })
        }
        return myspec;
    }

    getsectionnumberbyid(projectid, csiid, sectionid) {
        const pm = new PM();
        const spec = pm.getspecficationbycsi.call(this, projectid, csiid)
        let mycounter = "";
        if (spec.hasOwnProperty("sections")) {
            const section = pm.getsectionbyid.call(this, projectid, csiid, sectionid)
            if (section) {
                let part = section.part;

                spec.sections.sort((b, a) => {
                    return sortpart(b, a)
                })

                let counter = 1;
                // eslint-disable-next-line
                spec.sections.map((section, i) => {
                    if (section.part === part) {

                        if (section.sectionid === sectionid) {
                            mycounter = counter;
                        } else {
                            counter += 1;
                        }

                    }



                })

            }

        }
        if (Number(mycounter) < 10) {
            mycounter = `0${mycounter}`
        }
        return mycounter;
    }
    getapplepayicon() {
        return ({ width: 198, height: 108 })
    }
    getupdatepassword() {
        const pm = new PM();
        const menu = pm.getnavigation.call(this)
        if (menu.open) {
            return ({ width: 123, height: 30 })
        } else {
            return ({ width: 199, height: 48 })
        }

    }
    getPlusIcon() {
        return ({ width: 27, height: 27 })
    }
    getMinusIcon() {
        return ({ width: 27, height: 9 })
    }
    getloginnow() {
        return ({ width: 199, height: 42 })
    }
    gettouchicon() {
        return ({ width: 51, height: 69 })
    }
    getsaveprojecticon() {
        return ({ width: 164, height: 39 })
    }
    getprofiledimesions() {
        return ({ width: 152, height: 145 })
    }
    getgoicon() {
        return ({ width: 102, height: 71 })
    }
    getappleicon() {
        const width = Dimensions.get('window').width;
        if (width > 400) {
            return ({ width: 190, height: 48 })
        } else {
            return ({ width: 165, height: 42 })
        }

    }
    getnavigation() {
        let navigation = false;
        if (this.props.navigation) {
            navigation = this.props.navigation;
        }
        return navigation;
    }
    getRegularFont() {
        const width = Dimensions.get('window').width;
        if (width > 400) {
            return ({ fontSize: 20 })
        } else {
            return ({ fontSize: 16 })
        }
    }

    getHeaderFont() {
        const width = Dimensions.get('window').width;
        if (width > 400) {
            return ({ fontSize: 24 })
        } else {
            return ({ fontSize: 20 })
        }
    }
    getsaveprofileicon() {
        return ({ width: 257, height: 65 })
    }
    getprofileicon() {
        return ({ width: 35, height: 38 })
    }
    getdownIcon() {
        return ({ width: 49, height: 36 })
    }
    getgocheck() {
        return ({ width: 102, height: 86 })
    }
    getgochecksmall() {
        return ({ width: 52, height: 44 })
    }
    getfoldericon() {
        return ({ width: 84, height: 62 })
    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }

        }
        return user;
    }

    getmilestones() {

        const pm = new PM();
        const projectid = pm.getactiveprojectid.call(this)
        const myproject = pm.getprojectbyid.call(this,projectid);
        let milestones = false;
        if (myproject) {
            if (myproject.hasOwnProperty("projectmilestones")) {
                milestones = myproject.projectmilestones.mymilestone;
            }
        }
        return milestones;

    }

    getpaths() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this)
        const projectinterval = pm.getprojectinterval.call(this);
        let paths = {}


        const getmilestonebyid = (paths, milestoneid) => {
            let mymilestone = false;
            if (paths.hasOwnProperty(milestoneid)) {

                mymilestone = paths[milestoneid]
            }

            return mymilestone;

        }

        const getPathsbyMilestoneID = (milestones, milestoneid) => {

            let path = {};
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    milestone.predessors.map(predessor => {
                        if (predessor.predessor === milestoneid) {
                            path[`${milestone.milestoneid}`] = {};
                            path[`${milestone.milestoneid}`]['type'] = predessor.type



                        }


                    })



                }


            })

            return path;
        }
        if(milestones) {
// eslint-disable-next-line
        milestones.map(milestone => {
            paths[`${milestone.milestoneid}`] = {};
            paths[`${milestone.milestoneid}`]['milestone'] = milestone.milestone
            paths[`${milestone.milestoneid}`]['start'] = milestone.start
            paths[`${milestone.milestoneid}`]['completion'] = milestone.completion;
            paths[`${milestone.milestoneid}`]['paths'] = getPathsbyMilestoneID(milestones, milestone.milestoneid)

        })




        let interval = getDateInterval(projectinterval.start, projectinterval.completion)
        let scale = getScale(interval)
        let mymilestones = [];

        // eslint-disable-next-line
        Object.getOwnPropertyNames(paths).map(path => {
            mymilestones.push(path)
        })

        // eslint-disable-next-line
        mymilestones.map((milestoneid, i) => {

            if ((paths[milestoneid]).hasOwnProperty("paths")) {



                if (Object.getOwnPropertyNames(paths[milestoneid].paths).length > 0) {

                    // eslint-disable-next-line
                    Object.getOwnPropertyNames(paths[milestoneid].paths).map(prop => {
                       
                        const milestone_2 = getmilestonebyid(paths, prop)
                        let params = {};
                        let params_2 = {};
                        if (milestone_2) {

                            if (scale === 'month') {
                                params = calculatemonth(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                params_2 = calculatemonth(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                            } else if (scale === 'year') {
                                params = calculateyear(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                params_2 = calculateyear(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                            } else if (scale === 'day') {
                                params = calculateday(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                params_2 = calculateday(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                            }
                        }
                        const y1 = 80 + 100*(pm.getmilestonekeybyid.call(this,milestoneid));
                        const y2 = 80 + 100*(pm.getmilestonekeybyid.call(this,prop));
                        let x1 = "";
                        if(paths[milestoneid].paths[prop].type === 'start-to-finish') {
                            x1 = params.xo + params.width;
                        } else if (paths[milestoneid].paths[prop].type === 'start-to-start') {
                            x1 = params.xo;
                        }
                        paths[milestoneid].paths[prop]['x1'] = x1;
                        paths[milestoneid].paths[prop]['y1'] = y1
                        paths[milestoneid].paths[prop]['y2'] = y2
                        paths[milestoneid].paths[prop]['x2'] = params_2.xo
                        paths[milestoneid].paths[prop]['float'] = 'float';
                        paths[milestoneid].paths[prop]['totalfloat'] = 'totalfloat'

                    })

                }


            }


        })
    }

    let milestone_1 = "";
    let milestone_2 = "";
    for (let myprop in paths) {
        milestone_1 = getmilestonebyid(paths, myprop)


        for (let mypath in paths[myprop]['paths']) {
            milestone_2 = getmilestonebyid(paths, mypath)
            let float = calculateFloat(milestone_1.completion, milestone_2.start)
            paths[myprop]['paths'][mypath]['float'] = float
        }

    }

        return paths;
    }

    getprojectinterval() {
        const pm = new PM();
        const milestones = pm.getmilestones.call(this)
        let interval = false;
        if (milestones) {
            milestones.sort((a, b) => {
                return sorttimes(a.start, b.start)
            }
            )
            const start = milestones[0].start;
            const completion = milestones[milestones.length - 1].completion;
            interval = { start, completion }
        }
        return interval;

    }

    getprojectbyid(projectid) {
        let pm = new PM();
        let myprojects = pm.getprojects.call(this);
        let myproject = false;
        if (myprojects && projectid) {
            // eslint-disable-next-line
            myprojects.map((project, i) => {
                if (project.projectid === projectid) {
                    myproject = project;
                }
            })
        }
        return myproject;
    }
    gettransfersbyprojectid(projectid) {
        const pm = new PM();
        const myproject = pm.getprojectbyid.call(this, projectid)
        let mytransfers = [];
        if (myproject) {
            const projectid = myproject.projectid;
            const invoices = pm.getinvoices.call(this, projectid)
            if (invoices) {
                // eslint-disable-next-line
                invoices.map(invoice => {
                    if (invoice.hasOwnProperty("transfers")) {
                        // eslint-disable-next-line
                        invoice.transfers.map(transfer => {
                            mytransfers.push(transfer)
                        })
                    }
                })

            }
        }
        return mytransfers;
    }
    getcostestimatebycsiid(projectid, csiid) {
        const pm = new PM();
        const estimate = pm.getcostestimatebyid.call(this, projectid)
        console.log("getestimate" ,estimate)
        let myestimate = false;
        if (estimate) {
            // eslint-disable-next-line
            estimate.map(estimate => {
                if (estimate.csiid === csiid) {
                    myestimate = estimate;
                }
            })
        }

        return myestimate;
    }
    getcostestimate(projectid) {
        const pm = new PM();
        let estimate = false;
        const myproject = pm.getprojectbyid.call(this, projectid)
        if (myproject) {
            if (myproject.hasOwnProperty("costestimate")) {
        
                    estimate = myproject.costestimate
                
            }
        }
        return estimate;
    }
    getcostestimatebyid(projectid) {
        const pm = new PM();
        let estimate = false;
        const myproject = pm.getprojectbyid.call(this, projectid)
        if (myproject) {
            if (myproject.hasOwnProperty("costestimate")) {
                if (myproject.costestimate.hasOwnProperty("bidschedule")) {
                    estimate = myproject.costestimate.bidschedule;
                }
            }
        }
        return estimate;
    }
    getchargesbyprojectid(projectid) {
        const pm = new PM()
        const project = pm.getprojectbyid.call(this, projectid)
        let charges = false;
        if (project) {
            if (project.hasOwnProperty("charges")) {
                charges = project.charges;

            }
        }
        return charges;
    }

    transfersbyprojectid(projectid) {
        const pm = new PM();
        const myproject = pm.getprojectbyid.call(this, projectid)
        let mytransfers = [];
        if (myproject) {

            const invoices = pm.getinvoices.call(this, projectid)
            if (invoices) {
                // eslint-disable-next-line
                invoices.map(invoice => {
                    if (invoice.hasOwnProperty("transfers")) {
                        // eslint-disable-next-line
                        invoice.transfers.map(transfer => {
                            mytransfers.push(transfer)
                        })
                    }
                })

            }
        }
        return mytransfers;
    }

    getinvoiceitemsbyid(projectid, invoiceid) {
        const pm = new PM();
        let myproject = pm.getprojectbyid.call(this, projectid)
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.invoiceid === invoiceid) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.invoiceid === invoiceid) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.invoiceid === invoiceid) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }

    getsettlementsbyinvoiceid(invoiceid) {
        const pm = new PM();
        const invoice = pm.getinvoicebyid.call(this, invoiceid);
        let settlements = false;
        if (invoice.hasOwnProperty("settlements")) {
            settlements = invoice.settlements;
        }
        return settlements;
    }

    getprojectkeybyid(projectid) {
        const pm = new PM();
        let key = false;
        const projects = pm.getprojects.call(this)
        if (projects) {

            // eslint-disable-next-line
            projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getactiveproject() {
        const pm = new PM();
        const projectid = pm.getactiveprojectid.call(this)
        let project = false;

        if (projectid) {
            project = pm.getprojectbyid.call(this, projectid)
        }
        return project;
    }
    getactiveparams() {
        let params = false
        if (this.props.project) {
            params = this.props.project;


        }
        return params;
    }

    getactiveprojectid() {
        let projectid = "";
        if (this.props.project) {
            if (this.props.project.hasOwnProperty("projectid")) {
                projectid = this.props.project.projectid;
            }

        }
        return projectid;
    }
    getprojects() {
        let projects = [];
        let pm = new PM();
        let myuser = pm.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("projects")) {
                projects = myuser.projects.myproject;
            }
        }
        return projects;
    }

    async loginclientnode(emailaddress, client, clientid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {

            let values = { emailaddress, client, clientid }

            try {
                let response = await NodeLogin(values)

                if (response.hasOwnProperty("myuser")) {
                    myuser.node = true;
                    this.props.reduxUser(myuser)
                    this.setState({ client: '', clientid: '', emailaddress: '', message: '' })
                } else if (response.hasOwnProperty("message")) {
                    this.setState({ message: response.message })
                }
            } catch (err) {
                alert(err)
            }

        }

    }

    getchargesbyinvoiceid(invoiceid) {
        const pm = new PM()
        const invoice = pm.getinvoicebyid.call(this, invoiceid)
        let charges = false;
        if (invoice) {
            if (invoice.hasOwnProperty("charges")) {
                charges = invoice.charges.charge;

            }
        }
        return charges;
    }

    async loginclient(type) {
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let profile = this.state.profile;
        let phonenumber = this.state.phonenumber;
        let profileurl = this.state.profileurl;
        
        let values = { emailaddress, client, clientid, firstname, lastname, profile, phonenumber, profileurl, type}
        console.log("loginclient", values)
        try {
            let response = await AppleLogin(values)
            console.log("RESPONSE LOGIN", response)
            // if (response.hasOwnProperty("allusers")) {
            //     let companys = returnCompanyList(response.allusers);
            //     this.props.reduxAllCompanys(companys)
            //     this.props.reduxAllUsers(response.allusers);
            // }

            if (response.hasOwnProperty("myuser")) {
                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '', message: '' })
            } else if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message })
            }
        } catch (err) {
            alert(err)
        }
    }

    async appleSignIn(type) {
        const pm = new PM();
        const navigation = pm.getnavigation.call(this)
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            // signed in

            if (credential.hasOwnProperty("user")) {
                console.log("CREDENTIAL", credential)
                let profile = this.state.profile;
                let profilecheck = this.state.profilecheck;
                let emailaddress = credential.email;
                let client = 'apple';
                let clientid = credential.user;
                let firstname = credential.fullName.givenName;
                let lastname = credential.fullName.familyName;
                let emailaddresscheck = false;
                if (emailaddress) {
                    emailaddresscheck = true;
                }
                this.setState({ emailaddress, client, clientid, firstname, lastname })

           
                pm.loginclient.call(this, type)
                    
              


            }
        } catch (err) {
            alert(err)
        }
    }

    async savemyprofile() {
        let pm = new PM();
        let myuser = pm.getuser.call(this)
        let values = { providerid: myuser.providerid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl, profile: myuser.profile }

        let response = await SaveProfile(values)
        console.log(response)
        if (response.hasOwnProperty("allusers")) {
            let companys = returnCompanyList(response.allusers);
            this.props.reduxAllCompanys(companys)
            this.props.reduxAllUsers(response.allusers);

        }
        if (response.hasOwnProperty("myuser")) {

            this.props.reduxUser(response.myuser)
        }


        if (response.hasOwnProperty("message")) {
            let lastupdated = inputUTCStringForLaborID(response.lastupdated)
            let message = `${response.message} Last updated ${lastupdated}`
            this.setState({ message })

        }


    }

    async loadcsis() {
        try {
            let response = await LoadCSIs();
            if (response.hasOwnProperty("csis")) {
                this.props.reduxCSIs(response.csis);

            }

        } catch (err) {
            alert(err)
        }
    }

    getcsis() {
        let csis = false;
        if (this.props.csis) {
            if (this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis;
            }
        }
        return csis;
    }

    getcsibyid(csiid) {
        const pm = new PM();
        const csis = pm.getcsis.call(this)

        let mycsi = false;
        if (csis) {

            // eslint-disable-next-line
            csis.map(csi => {
                if (csi.csiid === csiid) {
                    mycsi = csi;

                }
            })
        }

        return mycsi;

    }

    getspecficationsbyprojectid(projectid) {
        const pm = new PM();
        const project = pm.getprojectbyid.call(this, projectid)

        let specs = false;
        if (project) {
            if (project.hasOwnProperty("specifications")) {
                specs = project.specifications;
            }
        }
        return specs;
    }
    showsaveprofile() {
        const styles = MyStylesheet();
        const pm = new PM();
        const saveProfileIcon = pm.getsaveprofileicon.call(this)
        const regularFont = pm.getRegularFont.call(this)

        return (<View style={styles.generalFlex}>
            <View style={styles.flex1}>

                <View style={styles.generalFlex, styles.bottomMargin10}>
                    <View style={styles.flex1}>
                        <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                    </View>
                </View>

                <View style={styles.generalFlex}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { pm.savemyprofile.call(this) }}>
                            <Image source={require('./png/saveprofile.png')}
                                resizeMethod='scale'
                                style={saveProfileIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>)
    }

    validateprofilesave() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const validate = {};
        validate.validate = true;
        validate.message = "";
        if (myuser) {
        
            if (myuser.hasOwnProperty("invalid")) {
                validate.validate = false;
                validate.message += myuser.invalid;
            }

            if(myuser.hasOwnProperty("invalidemail")) {
                validate.validate = false;
                validate.message += myuser.invalidemail;

            }
            if (myuser.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.projects.myproject.map(myproject => {

                    if (myproject.hasOwnProperty("invalid")) {
                        validate.validate = false;
                        validate.message += this.state.message
                    }

                    if (myproject.hasOwnProperty("projectmilestones")) {
                        let auditmilestones = pm.auditmilestones.call(this, myproject.projectmilestones.mymilestone)
                        if (auditmilestones) {
                            validate.validate = false;
                            validate.message += auditmilestones;
                        }
                    }


                })
            }
        }
        return validate;
    }
    handlereplaceids(response) {
        const pm = new PM();
        if (response.hasOwnProperty("replaceids")) {
            if (response.replaceids.hasOwnProperty("milestones")) {
                // eslint-disable-next-line
                response.replaceids.milestones.map(milestone => {
                    let oldmilestoneid = milestone.oldmilestoneid;
                    let milestoneid = milestone.milestoneid;
                    if (this.state.activemilestoneid === oldmilestoneid) {
                        this.setState({ activemilestoneid: false })
                        this.props.reduxUser(response.myuser)
                        this.setState({ activemilestoneid: milestoneid })
                    }
                })
            }
            if (response.replaceids.hasOwnProperty("project")) {
                // eslint-disable-next-line
                const activeprojectid = pm.getactiveprojectid.call(this)
                response.replaceids.project.map(project => {
                    let oldprojectid = project.oldprojectid;
                    let projectid = project.projectid;
                    if (activeprojectid === oldprojectid) {
                        this.props.reduxProject({ projectid })
                    }
                })
            }
        }



    }

    async saveallprofile() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {

            try {
                const validate = pm.validateprofilesave.call(this);
                if (validate.validate) {


                    let response = await SaveAllProfile({ myuser });
                    console.log(response)

                    if (response.hasOwnProperty("myuser")) {
                        if (response.hasOwnProperty("replaceids")) {
                            pm.handlereplaceids.call(this, response);
                            this.props.reduxUser(response.myuser)

                        }

                    }

                   


                    if (response.hasOwnProperty("message")) {
                        let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                        this.setState({ message: `${response.message} Last updated ${lastupdated}` })
                    }

                } else {
                    this.setState({ message: validate.message })
                }

            } catch (err) {
                alert(err)
            }
        }
    }

    showsaveproject() {
        const styles = MyStylesheet();
        const pm = new PM();
        const saveProjectIcon = pm.getsaveprojecticon.call(this)
        const regularFont = pm.getRegularFont.call(this)
        return (<View style={styles.generalFlex}>
            <View style={styles.flex1}>

                <View style={styles.generalFlex, styles.bottomMargin10}>
                    <View style={styles.flex1}>
                        <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                    </View>
                </View>

                <View style={styles.generalFlex, styles.bottomMargin10}>
                    <View style={[styles.flex1, styles.alignContentCenter]}>
                        <TouchableOpacity onPress={() => { pm.saveallprofile.call(this) }}>
                            <Image source={require('./png/saveall.png')}
                                resizeMethod='scale'
                                style={saveProjectIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>)
    }

    getallusers() {
        let allusers = false;
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {
                allusers = this.props.allusers.myuser;
            }

        }
        return allusers;
    }
    getsearchphoto() {
        return ({ width: 75, height: 53 })
    }

    getprojectteam() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        let myteam = false;
        if (myproject.hasOwnProperty("projectteam")) {
            myteam = myproject.projectteam.myteam;
        }
        return myteam;
    }

    getproviderbyid(providerid) {

        let provider = false;
        if (this.props.allusers) {

            if (this.props.allusers.hasOwnProperty("myuser")) {

                // eslint-disable-next-line
                this.props.allusers.myuser.map(myuser => {

                    if (myuser.providerid === providerid) {

                        provider = myuser;
                    }
                })

            }
        }
        return provider;
    }

    getremoveicon() {
        return ({ width: 41, height: 34 })
    }
    getsearchphotolarge() {
        return ({ width: 160, height: 120 })
    }

    getteambyid(providerid) {
        const pm = new PM();
        let provider = false;
        const myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("projectteam")) {
            // eslint-disable-next-line
            myproject.projectteam.myteam.map(myteam => {
                if (myteam.providerid === providerid) {
                    provider = myteam;
                }
            })
        }

        return provider;
    }

    getteamkeybyid(providerid) {
        const pm = new PM();
        let key = false;
        const myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("projectteam")) {
            // eslint-disable-next-line
            myproject.projectteam.myteam.map((myteam, i) => {
                if (myteam.providerid === providerid) {
                    key = i;
                }
            })
        }

        return key;

    }
    getprojectteam() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        let team = false;
        if (myproject.hasOwnProperty("projectteam")) {
            team = myproject.projectteam.myteam;
        }
        return team;
    }

    async chargeStripe() {

        const name = `${this.props.myusermodel.firstname} ${this.props.myusermodel.lastname}`
        const postalCode = this.props.myusermodel.zipcode;
        const line1 = this.props.myusermodel.address;
        const city = this.props.myusermodel.city;
        const state = this.props.myusermodel.contactstate;



        const options = {
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name,
                    postalCode,
                    line1,
                    city,
                    state,
                    country: 'US',
                    postalCode
                },
            },
            theme: {
                primaryBackgroundColor: '#FBCE4B',
                primaryForegroundColor: '#011F41'
            }
        };


        try {
            const token = await Stripe.paymentRequestWithCardFormAsync(options);
            if (token.hasOwnProperty("tokenId")) {
                let providerid = this.props.myusermodel.providerid;
                let projectid = this.props.projectid.projectid;
                let invoiceid = this.props.navigation.invoiceid;
                let amount = Math.round(this.getinvoiceamount() * 100)
                let values = { providerid, projectid, invoiceid, token: token.tokenId, amount }
                try {
                    let response = await CreateCharge(values);
                    if (response.hasOwnProperty("projectsmanaging")) {
                        this.props.reduxProjects(response.projectsmanaging.myproject)
                    }
                    if (response.hasOwnProperty("message")) {
                        this.setState({ message: `${response.message} Last Updated  ${inputUTCStringForLaborID(response.dateupdated)}` })
                    } else if (response.hasOwnProperty("errorMessage")) {
                        this.setState({ message: response.errorMessage })
                    }
                } catch (err) {
                    console.log(err)
                }

            }
        } catch (err) {
            alert(err)
        }

    }
    getinvoicekeybyid(invoiceid) {
        const pm = new PM();
        let key = false;
        let myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("invoices")) {
            myproject.invoices.myinvoice.map((myinvoice, i) => {
                if (myinvoice.invoiceid === invoiceid) {
                    key = i;
                }
            })

        }
        return key;
    }
    getinvoicebyid(invoiceid) {
        const pm = new PM();
        let invoices = false;
        let myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("invoices")) {
            myproject.invoices.myinvoice.map(myinvoice => {
                if (myinvoice.invoiceid === invoiceid) {
                    invoices = myinvoice;
                }
            })

        }
        return invoices;
    }

    async processApplePay() {
        let invoiceid = this.props.navigation.invoiceid;
        let amount = this.getinvoiceamount().toFixed(2)
        try {
            let items = [];
            let item = {
                label: `Payment made for Invoice ID ${invoiceid}`,
                amount
            }
            items.push(item)
            const options = {
                requiredBillingAddressFields: ['all']
            }
            const token = await Stripe.paymentRequestWithApplePayAsync(items, options);

            if (token.hasOwnProperty("tokenId")) {
                let providerid = this.props.myusermodel.providerid;
                let projectid = this.props.projectid.projectid;
                let invoiceid = this.props.navigation.invoiceid;
                let amount = Math.round(this.getinvoiceamount() * 100)
                let values = { providerid, projectid, invoiceid, token: token.tokenId, amount }
                try {
                    let response = await CreateCharge(values);
                    if (response.hasOwnProperty("projectsmanaging")) {
                        this.props.reduxProjects(response.projectsmanaging.myproject)
                    }
                    if (response.hasOwnProperty("message")) {
                        this.setState({ message: `${response.message} Last Updated  ${inputUTCStringForLaborID(response.dateupdated)}` })
                    } else if (response.hasOwnProperty("errorMessage")) {
                        this.setState({ message: response.errorMessage })
                    }
                } catch (err) {
                    alert(err)

                }
                Stripe.completeApplePayRequestAsync();
            }


        } catch (err) {
            // Or cancel if an error occurred
            alert(err)

            try {
                Stripe.cancelApplePayRequestAsync()
            } catch (error) {
                alert(error)
            }
        }


    }

    getprojectmilestones() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        let milestones = false;
        if (myproject.hasOwnProperty("projectmilestones")) {
            milestones = myproject.projectmilestones.mymilestone;

            milestones.sort((a, b) => {
                return sorttimes(a.start, b.start)
            })
        }
        return milestones;
    }

    getpredessorkeybyid(milestone, milestoneid) {
        const pm = new PM();
        const predessors = pm.getpredessorsbymilestoneid.call(this, milestone.milestoneid);
        let key = false;
        if (predessors) {
            // eslint-disable-next-line
            predessors.map((predessor, i) => {
                if (predessor.milestoneid === milestoneid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getpredessorsbymilestoneid(milestoneid) {
        const pm = new PM();
        const milestones = pm.getmilestonebyid.call(this, milestoneid);
        let predessors = false;
        if (milestones.hasOwnProperty("predessors")) {
            predessors = milestones.predessors;

        }
        return predessors;

    }

    getpredessorbyid(milestone, milestoneid) {

        const pm = new PM();
        const predessors = pm.getpredessorsbymilestoneid.call(this, milestone.milestoneid);
        console.log(predessors)
        let mypredessor = false;
        if (predessors) {

            // eslint-disable-next-line
            predessors.map(predessor => {
                if (predessor.predessor === milestoneid) {
                    mypredessor = predessor;
                }
            })
        } else {
            console.log(`Predessors by MilestoneID is false`)
        }
        return mypredessor;
    }

    getmilestonebyid(milestoneid) {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        let mymilestone = false;
        if (myproject.hasOwnProperty("projectmilestones")) {
            myproject.projectmilestones.mymilestone.map(milestone => {
                if (milestone.milestoneid === milestoneid) {
                    mymilestone = milestone;
                }
            })
        }
        return mymilestone;
    }

    getmilestonekeybyid(milestoneid) {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        let key = false;
        if (myproject.hasOwnProperty("projectmilestones")) {
            myproject.projectmilestones.mymilestone.map((milestone, i) => {
                if (milestone.milestoneid === milestoneid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getproposals() {
        const pm = new PM();
        let proposals = false;
        const myproject = pm.getactiveproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            proposals = myproject.proposals.myproposal;
        }
        return proposals;
    }
    getproposalkeybyid(proposalid) {
        const pm = new PM();
        let key = false;
        let myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("proposals")) {
            myproject.proposals.myproposal.map((myproposal, i) => {
                if (myproposal.proposalid === proposalid) {
                    key = i
                }
            })

        }
        return key;
    }

    getproposalbyid(proposalid) {
        const pm = new PM();
        let proposals = false;
        let myproject = pm.getactiveproject.call(this)
      
        if (myproject.hasOwnProperty("proposals")) {
            myproject.proposals.myproposal.map(myproposal => {
                if (myproposal.proposalid === proposalid) {
                    proposals = myproposal;
                }
            })

        }
        return proposals;
    }




    getproposalitem(csiid, proposalid) {
        const pm = new PM();
        let myproposal = pm.getproposalbyid.call(this, proposalid)
        let proposalitem = false;
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item) => {
                if (item.csiid === csiid) {
                    proposalitem = item
                }

            })
        }
        return proposalitem;

    }


    getAllSchedule() {
        const pm = new PM();

        const schedule = () => {
            let schedules = [];
            let myproject = pm.getactiveproject.call(this)

            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    schedules.push(mylabor)
                })
            }
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    schedules.push(myequipment)
                })
            }
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    schedules.push(mymaterial)
                })

            }

            schedules.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })

            return schedules;

        }

        let MySchedule = schedule();

        return MySchedule

    }
    getinvoices() {
        const pm = new PM();
        let invoices = false;
        const myproject = pm.getactiveproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            invoices = myproject.invoices.myinvoice;
        }
        return invoices;
    }

    getactullaborkeybyid(projectid, laborid) {
        const pm = new PM();
        const labors = pm.getactuallaborbyproject.call(this, projectid);
        let key = false;
        if (labors) {
            // eslint-disable-next-line
            labors.map((labor, i) => {
                if (labor.laborid === laborid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getactuallaborbyproject(projectid) {
        const pm = new PM();
        const project = pm.getprojectbyid.call(this, projectid);
        let actuallabor = false;
        if (project) {
            if (project.hasOwnProperty("actuallabor")) {
                actuallabor = project.actuallabor.mylabor;
            }
        }
        return actuallabor;
    }

    getactullaborbyid(projectid, laborid) {
        const pm = new PM();
        const labors = pm.getactuallaborbyproject.call(this, projectid);
        let mylabor = false;
        if (labors) {
            // eslint-disable-next-line
            labors.map(labor => {
                if (labor.laborid === laborid) {
                    mylabor = labor;
                }
            })
        }
        return mylabor;
    }


    getinvoicekeybyid(invoiceid) {
        const pm = new PM();
        let key = false;
        let myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("invoices")) {
            myproject.invoices.myinvoice.map((myinvoice, i) => {
                if (myinvoice.invoiceid === invoiceid) {
                    key = i;
                }
            })

        }
        return key;
    }

    checkemptypathsbymilestoneid(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)
        const path = paths[milestoneid];
        let empty = false;
        if(checkemptyobject(path.paths)) {
           empty  = true;
        }
        return empty; 
        }

    calcTotalProjectFloat(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)
        let checkcalc = true
        let window = {};
        let i =0;
        let activemilestoneid = milestoneid;
        while(checkcalc) {
       
       
          window[`checkfloat_${i.toString()}`] = 0;
              
              
              let j = 0;
               checkcalc = false;
               for (window[`mypath_${i.toString()}`] in paths[activemilestoneid]['paths']) {
                   
                if(!pm.checkemptypathsbymilestoneid.call(this,window[`mypath_${i.toString()}`])) {
                  checkcalc = true 
                 }
                    
                
                    if (j === 0 || window[`checkfloat_${i.toString()}`] > pm.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                       window[`checkfloat_${i.toString()}`] = pm.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])
                       activemilestoneid = window[`mypath_${i.toString()}`]
                   }
                j+=1
              }
          
               i+=1;
        
        }
       let float = pm.getfloatbymilestoneid.call(this, milestoneid)
       let projectfloat = 0;
       for(let k=0;k<i;k++) {
         projectfloat+= Number(window[`checkfloat_${k.toString()}`])
       }
       return float + projectfloat
       }

    getfloatbymilestoneid(milestoneid) {
        const pm = new PM();
        const paths = pm.getpaths.call(this)
        let float = 0;
        let i = 0;
        for (let mypath in paths[milestoneid]['paths']) {

            let floatcheck = paths[milestoneid]['paths'][mypath]['float']

            if (floatcheck < float || i === 0) {
                float = floatcheck

            }

            i += 1;
        }
        return float;

    }


    auditmilestones(milestones) {


        const getmilestonebyid = (milestones, milestoneid) => {

            let mymilestone = false;
            if (milestones) {
                // eslint-disable-next-line
                milestones.map(milestone => {

                    if (milestone.milestoneid === milestoneid) {

                        mymilestone = milestone;
                    }

                })

            }

            return mymilestone;
        }

        let message = "";
        // eslint-disable-next-line
        if(milestones) {
        milestones.map(milestone => {
            let start = milestone.start;
            // let completion = milestone.completion;
            // message += `${start} ${completion}`

            if (milestone.hasOwnProperty("predessors")) {
                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let mypredessor = getmilestonebyid(milestones, predessor.predessor);
                    //let predessorstart = mypredessor.start;
                    let predessorcompletion = mypredessor.completion;
                    if (getDateTime(start) < getDateTime(predessorcompletion)) {
                        message += `${milestone.milestone} cannot start before ${mypredessor.milestone} completion `
                    }

                })

            }

        })

    }


        return message;
    }

    

    getactualmaterialsbyproject(projectid) {
        const pm = new PM();
        const project = pm.getprojectbyid.call(this, projectid);
        let actualmaterial = false;
        if (project) {
            if (project.hasOwnProperty("actualmaterials")) {
                actualmaterial = project.actualmaterials.mymaterial;
            }
        }
        console.log(actualmaterial)
        return actualmaterial;
    }

    getactualmaterialskeybyid(projectid, materialid) {
        const pm = new PM();
        const materials = pm.getactualmaterialsbyproject.call(this, projectid);
        let key = false;
        if (materials) {
            // eslint-disable-next-line
            materials.map((material, i) => {
                if (material.materialid === materialid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getactulmaterialsbyid(projectid, materialid) {
        const pm = new PM();
        const materials = pm.getactualmaterialsbyproject.call(this, projectid);
        console.log(materials, materialid)
        let mymaterial = false;
        if (materials) {
            // eslint-disable-next-line
            materials.map(material => {
                console.log(material)
                if (material.materialid === materialid) {
                    mymaterial = material;
                }
            })
        }
        console.log(mymaterial, projectid, materialid)
        return mymaterial;
    }

    getactualequipmentbyproject(projectid) {
        const pm = new PM();
        const project = pm.getprojectbyid.call(this, projectid);
        let actualequipment = false;
        if (project) {
            if (project.hasOwnProperty("actualequipment")) {
                actualequipment = project.actualequipment.myequipment;
            }
        }
        return actualequipment;
    }

    getactulequipmentkeybyid(projectid, equipmentid) {
        const pm = new PM();
        const equipments = pm.getactualequipmentbyproject.call(this, projectid);
        let key = false;
        if (equipments) {
            // eslint-disable-next-line
            equipments.map((equipment, i) => {
                if (equipment.equipmentid === equipmentid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getsumoftransfers(projectid) {
        const pm = new PM()
        const myproject = pm.getprojectbyid.call(this, projectid);
        let total = 0;
        if (myproject) {

            const transfers = pm.gettransfersbyprojectid.call(this, projectid);
            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    total += Number(transfer.amount)

                })
            }

        }
        return total;
    }
    getactulequipmentbyid(projectid, equipmentid) {
        const pm = new PM();
        const equipments = pm.getactualequipmentbyproject.call(this, projectid);
        let myequipment = false;
        if (equipments) {
            // eslint-disable-next-line
            equipments.map(equipment => {
                if (equipment.equipmentid === equipmentid) {
                    myequipment = equipment;
                }
            })
        }
        return myequipment;
    }

    getinvoicebyid(invoiceid) {
        const pm = new PM();
        let invoices = false;
        let myproject = pm.getactiveproject.call(this)

        if (myproject.hasOwnProperty("invoices")) {
            myproject.invoices.myinvoice.map(myinvoice => {
                if (myinvoice.invoiceid === invoiceid) {
                    invoices = myinvoice;
                }
            })

        }
        return invoices;
    }

    loginMessage(component) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        return (<View>
            <Text style={[styles.alignCenter, regularFont]}>You need to be logged in to view {component}.</Text>
        </View>)
    }

    getAllActual() {
        let actuals = [];
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {
                    actuals.push(mylabor)
                })
            }
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map(myequipment => {
                    actuals.push(myequipment)
                })
            }
            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    actuals.push(mymaterial)
                })

            }

            actuals.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })
        }

        return actuals;
    }

    getactualcsibyid(csiid) {

        let mycsi = false;
        const pm = new PM();
        const myinvoices = pm.getinvoices.call(this)
        if (myinvoices) {
            // eslint-disable-next-line
            myinvoices.map(myinvoice => {
                if (myinvoice.hasOwnProperty("bid")) {
                    // eslint-disable-next-line
                    myinvoice.bid.biditem.map(biditem => {
                        if (biditem.csiid === csiid) {
                            mycsi = { csiid, csi: biditem.csi, title: biditem.title }


                        }
                    })
                }
            })


        }

        return mycsi;
    }

    getschedulecsibyid(csiid) {

        let mycsi = false;
        const pm = new PM();
        const myproposals = pm.getproposals.call(this)
        if (myproposals) {
            // eslint-disable-next-line
            myproposals.map(myproposal => {
                if (myproposal.hasOwnProperty("bidschedule")) {
                    // eslint-disable-next-line
                    myproposal.bidschedule.biditem.map(biditem => {
                        if (biditem.csiid === csiid) {
                            mycsi = { csiid, csi: biditem.csi, title: biditem.title }


                        }
                    })
                }
            })


        }

        return mycsi;
    }


}

export default PM;