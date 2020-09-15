import React from 'react';
import { Alert, Image, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import ProjectID from './projectid'
import { TeamMember, returnCompanyList } from './functions';
import { LoadAllUsers } from './actions/api';

class Team {


    handleengineerrole(role) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        if (myuser) {
            const activeparams = pm.getactiveparams.call(this);
            const projectid = activeparams.projectid;
            const project = pm.getprojectbyid.call(this, projectid)
            if (project) {
                const projectid = project.projectid;
                const i = pm.getprojectkeybyid.call(this, projectid);
                if (this.state.activeengineer) {
                    const engineer = pm.getengineerbyid.call(this, this.state.activeengineer)
                    if (engineer) {
                        const j = pm.getengineerkeybyid.call(this, this.state.activeengineer);
                        myuser.projects.myproject[i].engineering[j].role = role;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                }

            }
        }
    }

    getengineeringrole() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid)
        if (myproject) {

            if (this.state.activeengineer) {

                const myengineer = pm.getengineerbyid.call(this, this.state.activeengineer)
                return myengineer.role

            } else {
                return this.state.engineerrole;
            }


        }

    }

    showengineer(myuser) {
        const team = new Team();
        const styles = MyStylesheet();
        const pm = new PM();
        let regularFont = pm.getRegularFont.call(this);
        const teamProfile = pm.getteamprofile.call(this);
        const removeIcon = pm.getremoveicon.call(this);
        const headerFont = pm.getHeaderFont.call(this)

        const ProfileImage = () => {

            if (myuser.profileurl) {

                return (
                    <Image source={{ uri: `${myuser.profileurl}` }}
                        resizeMethod='scale'
                        style={[teamProfile, styles.showBorder]}
                    />
                )
            } else {

                return (
                    <Image source={require(`./png/2x/defaultphoto.png`)}
                        style={[teamProfile, styles.showBorder]}
                        resizeMethod='scale'
                    />
                )

            }
        }
        const Role = () => {
            if (this.state.activeengineer === myuser.providerid) {
                return (<View style={{ ...styles.generalContainer }}>
                    <View style={{ ...styles.alignCenter }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}
                            onPress={() => { team.makeengineeractive.call(this, myuser.providerid) }}
                        >{myuser.firstname} {myuser.lastname}'s Role on the Project</Text>
                    </View>
                    <View style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        <TextInput style={{ ...styles.defaultInput, ...regularFont, ...styles.generalFont }}
                            value={team.getengineeringrole.call(this)}
                            onChangeText={text => { team.handleengineerrole.call(this, text) }} />
                    </View>
                </View>)
            }
        }

        const activebackground = () => {
            if (this.state.activeengineer === myuser.providerid) {
                return (styles.activebackground)
            } else {
                return;
            }
        }

        return (<View style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }} key={`design${myuser.providerid}`}>
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex3, activebackground()]}>
                    <Text style={[headerFont, styles.alignCenter]}
                        onPress={() => { team.makeengineeractive.call(this, myuser.providerid) }}>/{myuser.profile}</Text>
                </View>
                <View style={[styles.flex1, styles.flexRow, styles.alignContentRight]}>
                    <TouchableOpacity onPress={() => { team.removeengineer.call(this, myuser) }}>
                        <Image source={require('./png/removeIcon.png')}
                            style={removeIcon}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ ...styles.generalContainer, ...styles.alignContentCenter }}>
                <View style={{ ...styles.showBorder, ...teamProfile, ...styles.marginAuto }}>
                    <TouchableOpacity onPress={() => { team.makeengineeractive.call(this, myuser.providerid) }}>
                        {ProfileImage()}
                    </TouchableOpacity>
                </View>
            </View>


            {Role()}

            <View style={{ ...styles.generalContainer, ...styles.alignCenter, ...activebackground() }}>
                <Text style={{ ...styles.generalFont, ...regularFont, ...styles.alignCenter }} onPress={() => { team.makeengineeractive.call(this, myuser.providerid) }}>{myuser.firstname} {myuser.lastname} {team.location.call(this, myuser)}</Text>
            </View>



        </View>)
    }

    showdesignteamids() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid);
        const team = new Team();

        let myproviders = [];
        if (myproject.hasOwnProperty("engineering")) {
            // eslint-disable-next-line
            myproject.engineering.map(myteam => {

                let myuser = pm.getproviderbyid.call(this, myteam.providerid)


                myproviders.push(team.showengineer.call(this, myuser))


            })
        }
        return myproviders;
    }
    validateengineer(providerid) {

        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        const myteam = pm.getengineering.call(this, myproject.projectid);
        let validate = true;
        if (myteam) {
            // eslint-disable-next-line
            myteam.map(myteam => {
                if (myteam.providerid === providerid) {
                    validate = false;
                }
            })
        }
        return validate;
    }

    validateprovider(providerid) {
        let validate = true;
        const pm = new PM();
        const myteam = pm.getprojectteam.call(this);
        if (myteam) {
            // eslint-disable-next-line
            myteam.map(myteam => {
                if (myteam.providerid === providerid) {
                    validate = false;
                }
            })
        }
        return validate;
    }

    addteam(providerid) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const team = new Team();
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {
            let validate = team.validateprovider.call(this, providerid);
            if (validate) {
                const myteam = pm.getprojectteam.call(this);
                const role = this.state.role;
                let newteam = TeamMember(providerid, role)
                const i = pm.getprojectkeybyid.call(this, myproject.projectid);
                if (myteam) {

                    myuser.projects.myproject[i].projectteam.myteam.push(newteam)

                } else {
                    let projectteam = { myteam: [newteam] }
                    myuser.projects.myproject[i].projectteam = projectteam;
                }
                this.props.reduxUser(myuser);
                this.setState({ activeprovider: providerid })
            }

        }
    }

    location(myuser) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        let address = "";
        let city = "";
        let contactstate = "";
        let zipcode = "";

        if (myuser.hasOwnProperty("company")) {
            company = myuser.company.company;
            address = myuser.company.address;
            city = myuser.company.city;
            contactstate = myuser.company.contactstate;
            zipcode = myuser.company.zipcode;
            return (<Text style={[regularFont]}>
                {company} {address} {city} {contactstate} {zipcode}
            </Text>)
        }
    }

    showdesignsearchid(myuser) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this);
        const team = new Team();
        const searchphoto = pm.getsearchphoto.call(this)

        const icon = (myuser) => {
            if(myuser.profileurl) {
                return(<Image source={{ uri: `${myuser.profileurl}` }}
                resizeMethod='scale'
                style={[searchphoto, styles.showBorder]}
            />)
            } else {
             return(<Image
                    source={require(`./png/2x/defaultphoto.png`)}
                    resizeMethod='scale'
                    style={[searchphoto, styles.showBorder]}
                />)
            }
        }

        const SearchPhoto = (myuser) => {
    
                return (
                    <View style={{ ...styles.generalContainer, ...styles.searchphoto,  ...styles.alignContentCenter }}>
                        <TouchableOpacity onPress={() => team.addDesignTeam.call(this, myuser.providerid)}>
                            {icon(myuser)}
                        </TouchableOpacity>
                    </View>)
           
        }

        const location = () => {
            let address = "";
            let city = "";
            let contactstate = "";
            let zipcode = "";
            if (myuser.hasOwnProperty("company")) {
                address = myuser.company.address;
                city = myuser.company.city;
                contactstate = myuser.company.contactstate;
                zipcode = myuser.company.zipcode;
                return (
                    <Text onPress={() => team.addDesignTeam.call(this, myuser.providerid)}
                        style={{ ...regularFont }}>{address} {city} {contactstate} {zipcode}</Text>)
            }
        }


        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} onPress={() => team.addDesignTeam.call(this, myuser.providerid)} key={`design${myuser.providerid}`}>
                <View style={{ ...styles.flex1 }}>
                    {SearchPhoto(myuser)}
                </View>
                <View style={{ ...styles.flex3 }}>
                    <Text style={{ ...styles.generalFont, ...regularFont }} onPress={() => team.addDesignTeam.call(this, myuser.providerid)}> {myuser.firstname} {myuser.lastname}{location()}</Text>
                </View>
            </View>
        )

    }

    showsearchid(myuser) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const searchphoto = pm.getsearchphoto.call(this)
        const team = new Team();

        const searchprofilephoto = (myuser) => {
            if (myuser.profileurl) {
                return (<Image source={{ uri: `${myuser.profileurl}` }}
                    resizeMethod='scale'
                    style={[searchphoto, styles.showBorder]}
                />)
            } else {
                return (<Image
                    source={require(`./png/2x/defaultphoto.png`)}
                    resizeMethod='scale'
                    style={[searchphoto, styles.showBorder]}
                />)
            }
        }
        const SearchPhoto = (myuser) => {
            return (
                <View style={{ ...styles.generalContainer, ...styles.searchphoto, ...styles.alignContentCenter }}>
                    <TouchableOpacity onPress={() => team.addDesignTeam.call(this, myuser.providerid)}>
                        {searchprofilephoto(myuser)}
                    </TouchableOpacity>
                </View>)
        }

        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]} key={myuser.providerid} >
                <View style={[styles.flex1]}>
                    {SearchPhoto(myuser)}
                </View>
                <View style={[styles.flex3, regularFont]}>
                    <Text style={[regularFont]} onPress={() => { team.addteam.call(this, myuser.providerid) }}>{myuser.firstname} {myuser.lastname} </Text>
                </View>
            </View>
        )

    }

    showsearchresults() {
        const pm = new PM();
        const allusers = pm.getallusers.call(this);
        const team = new Team();
        let results = [];
        let search = "";
        if (this.state.search) {
            search = this.state.search;
            if (allusers) {
                // eslint-disable-next-line
                allusers.map(myuser => {

                    if (myuser.firstname.toLowerCase().startsWith(search.toLowerCase()) || myuser.lastname.toLowerCase().startsWith(search.toLowerCase())) {
                        results.push(team.showsearchid.call(this, myuser))
                    }

                })

            }

        }
        return results;

    }

    makeprovideractive(providerid) {
        if (this.state.activeprovider === providerid) {
            this.setState({ activeprovider: false, role: '' })
        } else {
            this.setState({ activeprovider: providerid, role: '' })
        }
    }

    getrole() {
        const pm = new PM();
        if (this.state.activeprovider) {
            const myprovider = pm.getteambyid.call(this, this.state.activeprovider)
            if (myprovider) {
                return (myprovider.role)
            } else {
                return;
            }
        }
    }

    handlerole(role) {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this, myproject.projectid)
                if (this.state.activeprovider) {
                    const j = pm.getteamkeybyid.call(this, this.state.activeprovider)
                    myuser.projects.myproject[i].projectteam.myteam[j].role = role;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })

                }

            }

        }

    }

    confirmremoveteam(myprovider) {
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const i = pm.getprojectkeybyid.call(this, params.projectid)
            const j = pm.getteamkeybyid.call(this, myprovider.providerid)

            myuser.projects.myproject[i].projectteam.myteam.splice(j, 1);
            this.props.reduxUser(myuser)
            this.setState({ activeprovider: false, message: '' })

        }

    }
    confirmremoveengineer(engineer) {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const providerid = engineer.providerid;
            const activeparams = pm.getactiveparams.call(this);
            const projectid = activeparams.projectid;
            const project = pm.getprojectbyid.call(this, projectid)
            if (project) {
                const i = pm.getprojectkeybyid.call(this, projectid);
                const engineer = pm.getengineerbyid.call(this, projectid, providerid);

                if (engineer) {
                    const j = pm.getengineerkeybyid.call(this, projectid, providerid);
                    myuser.projects.myproject[i].engineering.splice(j, 1);
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }

            }
        }

    }

    removeengineer(myuser) {
        const team = new Team();
        Alert.alert(
            'Delete Engineer',
            `Are you sure you want to remove ${myuser.profile}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove Engineer'), style: 'cancel' },
                { text: 'OK', onPress: () => { team.confirmremoveengineer.call(this, myuser) } },
            ],
            { cancelable: false }
        )
    }
    removeprovider(myuser) {
        const team = new Team();
        Alert.alert(
            'Delete Provider',
            `Are you sure you want to remove ${myuser.profile}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Remove team '), style: 'cancel' },
                { text: 'OK', onPress: () => { team.confirmremoveteam.call(this, myuser) } },
            ],
            { cancelable: false }
        )
    }

    showprovider(myuser) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const removeIconSize = pm.getremoveicon.call(this)
        const searchPhoto = pm.getsearchphotolarge.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const teamProfile = pm.getteamprofile.call(this)
        const team = new Team();
        const activebackground = () => {
            if (this.state.activeprovider === myuser.providerid) {
                return (styles.activebackground)
            } else {
                return;
            }
        }
        const SearchPhoto = () => {
            if (myuser.profileurl) {
                return (<TouchableOpacity onPress={() => { team.makeprovideractive.call(this, myuser.providerid) }}>
                    <Image source={{ uri: `${myuser.profileurl}` }}
                        resizeMethod='scale'
                        style={[searchPhoto, styles.showBorder]}
                    />
                </TouchableOpacity>)
            } else {
                return (
                    <TouchableOpacity onPress={() => { team.makeprovideractive.call(this, myuser.providerid) }}>
                        <Image source={require(`./png/2x/defaultphoto.png`)}
                            style={[teamProfile, styles.showBorder]}
                            resizeMethod='scale'
                        />
                    </TouchableOpacity>
                );
            }
        }
        const Role = () => {
            if (this.state.activeprovider === myuser.providerid) {
                return (<View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]} onPress={() => { team.makeprovideractive.call(this, myuser.providerid) }}>{myuser.firstname} {myuser.lastname}'s Role on the Project </Text>
                        <TextInput style={[regularFont, styles.defaultInput]}
                            value={team.getrole.call(this)}
                            onChangeText={text => { team.handlerole.call(this, text) }}
                        />
                    </View>
                </View>)
            }
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin15]} key={`team-${myuser.providerid}`}>
                <View style={[styles.flex1]}>


                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex3, activebackground()]}>
                            <Text style={[headerFont, styles.alignCenter]} onPress={() => { team.makeprovideractive.call(this, myuser.providerid) }}>/{myuser.profile}</Text>
                        </View>
                        <View style={[styles.flex1, styles.flexRow, styles.alignContentRight]}>
                            <TouchableOpacity onPress={() => { team.removeprovider.call(this, myuser) }}>
                                <Image source={require('./png/removeIcon.png')}
                                    style={removeIconSize}
                                    resizeMethod='scale'
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.alignContentCenter]}>
                            {SearchPhoto()}
                        </View>
                    </View>

                    {Role()}

                    <Text style={[regularFont, styles.alignCenter, activebackground()]} onPress={() => { team.makeprovideractive.call(this, myuser.providerid) }} key={`team-${myuser.providerid}`}>
                        {myuser.firstname} {myuser.lastname} {team.location.call(this, myuser)}
                    </Text>


                </View>
            </View>
        )

    }
    addDesignTeam(providerid) {

        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const team = new Team();
        const validate = team.validateengineer.call(this, providerid)
        if (validate) {
            if (myuser) {
                const activeparams = pm.getactiveparams.call(this)
                const projectid = activeparams.projectid;
                const myproject = pm.getprojectbyid.call(this, projectid);
                if (myproject) {
                    const i = pm.getprojectkeybyid.call(this, projectid);

                    const myengineers = pm.getengineering.call(this, projectid);
                    const role = this.state.role;
                    let newteam = TeamMember(providerid, role)
                    if (myengineers) {

                        myuser.projects.myproject[i].engineering.push(newteam)

                    } else {
                        let engineering = { myteam: [newteam] }
                        myuser.projects.myproject[i].engineering = [engineering]
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activeengineer: myuser.providerid })


                }

            }

        }
    }

    showteamids() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        let myproviders = [];
        const team = new Team();
        const myteam = pm.getprojectteam.call(this, myproject.projectid)
        if (myteam) {
            myteam.map(myprovider => {
                let myuser = pm.getproviderbyid.call(this, myprovider.providerid)
                myproviders.push(team.showprovider.call(this, myuser))
            })

        }
        return myproviders;

    }

    projectteamtitle() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid);
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        if (myproject.hasOwnProperty("projectteam")) {
            return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...regularFont, ...styles.generalFont }}>Project Team - Touch Their Picture Icon to Define their Role</Text>
                </View>
            </View>)
        } else {
            return;
        }
    }

    makeengineeractive(engineerid) {
        if (this.state.activeengineer === engineerid) {
            this.setState({ activeengineer: false })
        } else {
            this.setState({ activeengineer: engineerid })
        }
    }



    showdesignresults() {
        const pm = new PM();
        const team = new Team();
        const allusers = pm.getallusers.call(this);
        let results = [];
        let search = "";
        if (this.state.design) {
            search = this.state.design
            if (allusers) {
                // eslint-disable-next-line
                allusers.map(myuser => {

                    if (myuser.firstname.toLowerCase().startsWith(search.toLowerCase()) || myuser.lastname.toLowerCase().startsWith(search.toLowerCase())) {
                        results.push(team.showdesignsearchid.call(this, myuser))
                    }

                })

            }

        }
        return results;

    }
    async loadallusers() {
        try {
            let response = await LoadAllUsers();
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
            }
        } catch (err) {
            alert(err)
        }

    }

    showteam() {
        const pm = new PM();
        const myproject = pm.getactiveproject.call(this)
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const projectid = new ProjectID();
        const team = new Team();
        const myuser = pm.getuser.call(this);
        const allusers = pm.getallusers.call(this);

        if (!allusers) {
            team.loadallusers.call(this)

        }


        if (myuser) {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/{myproject.title}</Text>
                                <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/team</Text>
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...headerFont, ...styles.generalFont }}>Construction Team</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[regularFont]}>Construction Search </Text>
                                <TextInput style={[styles.defaultInput, regularFont]}
                                    value={this.state.search}
                                    onChangeText={text => { this.setState({ search: text }) }}
                                />
                            </View>
                        </View>

                        {team.showsearchresults.call(this)}

                        {team.projectteamtitle.call(this)}

                        {team.showteamids.call(this)}



                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...headerFont, ...styles.generalFont }}>Design Team</Text>
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                <Text style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>Design Search </Text>
                                <TextInput
                                    value={this.state.design}
                                    onChangeText={text => { this.setState({ design: text }) }}
                                    style={{ ...styles.generalFont, ...regularFont, ...styles.defaultInput }} />
                            </View>
                        </View>

                        {team.showdesignresults.call(this)}

                        {team.showdesignteamids.call(this)}

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.bottomMargin30]}>
                                {pm.showsaveproject.call(this)}
                            </View>
                        </View>

                        {projectid.showprojectid.call(this, myproject)}




                    </View>
                </View>
            )
        } else {
            return (pm.loginMessage.call(this, "Project Team"))
        }
    }
}
export default Team;