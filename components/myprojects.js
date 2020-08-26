import React from 'react';
import { Image, TextInput, View, Text } from 'react-native';
import { MyStylesheet } from './styles';
import { CreateProject, validateTitle } from './functions'
import PM from './pm'
import MakeID from './makeids';
import ProjectID from './projectid'
import { CheckProjectID } from './actions/api';

class MyProjects {

    async checkprojectid() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)

        if (myuser) {

            let myproject = pm.getactiveproject.call(this);
            const title = myproject.title;
            if (!myproject.hasOwnProperty("invalid")) {
                try {

                    let response = await CheckProjectID(title);
                    console.log(response)


                    if (myproject) {
                        let i = pm.getprojectkeybyid.call(this, myproject.projectid)
                        if (response.hasOwnProperty("valid")) {

                            if (myuser.projects.myproject[i].hasOwnProperty("valid")) {
                                delete myuser.projects.myproject[i].invalid;
                                this.props.reduxUser(myuser)
                                this.setState({ message: '' })
                            }



                        } else if (response.hasOwnProperty("invalid") && myproject) {
                            myuser.projects.myproject[i].invalid = response.invalid;
                            this.props.reduxUser(myuser)
                            this.setState({ message: response.message })

                        }

                    }



                } catch (err) {
                    alert(err)
                }

            }


        }

    }

    gettitle() {
        const pm = new PM();

        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            return myproject.title;
        } else {
            return this.state.title;
        }
    }

    handletitle(title) {
        title = title.toLowerCase()
        const pm = new PM();
        const makeID = new MakeID();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {

            if (myproject) {
                let i = pm.getprojectkeybyid.call(this, myproject.projectid);
                myuser.projects.myproject[i].title = title;
                this.props.reduxUser(myuser)
                const validatetitle = validateTitle(title);

                if (validatetitle) {
                    myuser.projects.myproject[i].invalid = title;
                    this.setState({ message: validatetitle })
                } else {
                    if (myuser.projects.myproject[i].hasOwnProperty("invalid")) {
                        delete myuser.projects.myproject[i].invalid;
                    }
                    this.setState({ message: '' })

                }

            } else {
                let providerid = myuser.providerid;
                let projectid = makeID.projectid.call(this);
                let scope = this.state.scope;
                let address = this.state.address;
                let city = this.state.city
                let projectstate = this.state.projectstate;
                let zipcode = this.state.zipcode;
                let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
                if (myuser.hasOwnProperty("projects")) {
                    myuser.projects.myproject.push(newProject)
                } else {
                    myuser.projects = { myproject: [newProject] }
                }
                this.props.reduxUser(myuser)
                this.props.reduxProject({ projectid })
                this.setState({ render: 'render' })


            }


        }


    }

    getscope() {
        const pm = new PM();

        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            return myproject.scope;
        } else {
            return this.state.scope;
        }
    }

    handlescope(scope) {
        const pm = new PM();
        const makeID = new MakeID();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {

            if (myproject) {
                let i = pm.getprojectkeybyid.call(this, myproject.projectid);
                myuser.projects.myproject[i].scope = scope;
                this.props.reduxUser(myuser)


                this.setState({ message: '' })

            }

            else {
                let providerid = myuser.providerid;
                let projectid = makeID.projectid.call(this);
                let title = this.state.title;
                let address = this.state.address;
                let city = this.state.city
                let projectstate = this.state.projectstate;
                let zipcode = this.state.zipcode;
                let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
                if (myuser.hasOwnProperty("projects")) {
                    myuser.projects.myproject.push(newProject)
                } else {
                    myuser.projects = { myproject: [newProject] }
                }
                this.props.reduxUser(myuser)
                this.props.reduxProject({ projectid })
                this.setState({ render: 'render' })


            }


        }


    }

    getaddress() {
        const pm = new PM();

        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            return myproject.address;
        } else {
            return this.state.address;
        }
    }

    handleaddress(address) {
        const pm = new PM();
        const makeID = new MakeID();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {

            if (myproject) {
                let i = pm.getprojectkeybyid.call(this, myproject.projectid);
                myuser.projects.myproject[i].address = address;
                this.props.reduxUser(myuser)


                this.setState({ message: '' })

            }

            else {
                let providerid = myuser.providerid;
                let projectid = makeID.projectid.call(this);
                let title = this.state.title;
                let scope = this.state.scope;
                let city = this.state.city
                let projectstate = this.state.projectstate;
                let zipcode = this.state.zipcode;
                let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
                if (myuser.hasOwnProperty("projects")) {
                    myuser.projects.myproject.push(newProject)
                } else {
                    myuser.projects = { myproject: [newProject] }
                }
                this.props.reduxUser(myuser)
                this.props.reduxProject({ projectid })
                this.setState({ render: 'render' })


            }


        }


    }

    getcity() {
        const pm = new PM();

        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            return myproject.city;
        } else {
            return this.state.city;
        }
    }

    handlecity(city) {
        const pm = new PM();
        const makeID = new MakeID();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {

            if (myproject) {
                let i = pm.getprojectkeybyid.call(this, myproject.projectid);
                myuser.projects.myproject[i].city = city;
                this.props.reduxUser(myuser)


                this.setState({ message: '' })

            }

            else {
                let providerid = myuser.providerid;
                let projectid = makeID.projectid.call(this);
                let title = this.state.title;
                let scope = this.state.scope;
                let address = this.state.address
                let projectstate = this.state.projectstate;
                let zipcode = this.state.zipcode;
                let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
                if (myuser.hasOwnProperty("projects")) {
                    myuser.projects.myproject.push(newProject)
                } else {
                    myuser.projects = { myproject: [newProject] }
                }
                this.props.reduxUser(myuser)
                this.props.reduxProject({ projectid })
                this.setState({ render: 'render' })


            }


        }


    }

    getprojectstate() {
        const pm = new PM();

        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            return myproject.projectstate;
        } else {
            return this.state.projectstate;
        }
    }

    handleprojectstate(projectstate) {
        const pm = new PM();
        const makeID = new MakeID();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {

            if (myproject) {
                let i = pm.getprojectkeybyid.call(this, myproject.projectid);
                myuser.projects.myproject[i].projectstate = projectstate;
                this.props.reduxUser(myuser)


                this.setState({ message: '' })

            }

            else {
                let providerid = myuser.providerid;
                let projectid = makeID.projectid.call(this);
                let title = this.state.title;
                let scope = this.state.scope;
                let address = this.state.address;
                let city = this.state.city;
                let zipcode = this.state.zipcode;
                let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
                if (myuser.hasOwnProperty("projects")) {
                    myuser.projects.myproject.push(newProject)
                } else {
                    myuser.projects = { myproject: [newProject] }
                }
                this.props.reduxUser(myuser)
                this.props.reduxProject({ projectid })
                this.setState({ render: 'render' })


            }


        }
    }
    showprojectids() {
        const pm = new PM();
        const projects = pm.getprojects.call(this);
        const projectids = [];
        const projectid = new ProjectID();
        if (projects) {
            projects.map(myproject => {
                projectids.push(projectid.showprojectid.call(this, myproject))

            })
        }
        return projectids;
    }

    getzipcode() {
        const pm = new PM();

        const myproject = pm.getactiveproject.call(this)

        if (myproject) {
            return myproject.zipcode;
        } else {
            return this.state.zipcode;
        }
    }

    handlezipcode(zipcode) {
        const pm = new PM();
        const makeID = new MakeID();
        const myuser = pm.getuser.call(this);
        const myproject = pm.getactiveproject.call(this)
        if (myuser) {

            if (myproject) {
                let i = pm.getprojectkeybyid.call(this, myproject.projectid);
                myuser.projects.myproject[i].zipcode = zipcode;
                this.props.reduxUser(myuser)


                this.setState({ message: '' })

            }

            else {
                let providerid = myuser.providerid;
                let projectid = makeID.projectid.call(this);
                let title = this.state.title;
                let scope = this.state.scope;
                let address = this.state.address;
                let city = this.state.city;
                let projectstate = this.state.projectstate;
                let newProject = CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode);
                if (myuser.hasOwnProperty("projects")) {
                    myuser.projects.myproject.push(newProject)
                } else {
                    myuser.projects = { myproject: [newProject] }
                }
                this.props.reduxUser(myuser)
                this.props.reduxProject({ projectid })
                this.setState({ render: 'render' })


            }


        }


    }
    showmyprojects() {
        const styles = MyStylesheet();
        const pm = new PM();
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this);
        const gocheck = pm.getgochecksmall.call(this)
        const myprojects = new MyProjects();
        const myproject = pm.getactiveproject.call(this);
        const myuser = pm.getuser.call(this)
        const validateproject = () => {
            if (myproject) {
                if (!myproject.hasOwnProperty("invalid")) {
                    return (<Image source={require('./png/gocheck.png')}
                        resizeMethod='scale'
                        style={gocheck}
                    />)
                }
            }
        }
        if(myuser) {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>MyProjects</Text>

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <Text style={[regularFont]}>Create A Project URL </Text>

                            <View style={[styles.generalFlex]}>
                                <View style={[styles.flex3]}>
                                    <TextInput style={[styles.defaultInput, regularFont]}
                                        value={myprojects.gettitle.call(this)}
                                        onChangeText={text => { myprojects.handletitle.call(this, text) }}
                                        onBlur={() => { myprojects.checkprojectid.call(this) }}
                                    />
                                </View>
                                <View style={[styles.flex1]}>
                                    {validateproject()}
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <Text style={[regularFont]}>Scope of Work </Text>
                            <TextInput style={[styles.defaultInput, regularFont, styles.sow]}
                                onChangeText={text => { myprojects.handlescope.call(this, text) }}
                                value={myprojects.getscope.call(this)}
                                multiline
                            />

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <Text style={[regularFont]}>Address</Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { myprojects.handleaddress.call(this, text) }}
                                value={myprojects.getaddress.call(this)}
                            />

                        </View>
                        <View style={[styles.flex1]}>

                            <Text style={[regularFont]}>City</Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { myprojects.handlecity.call(this, text) }}
                                value={myprojects.getcity.call(this)}
                            />

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>

                            <Text style={[regularFont]}>State</Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { myprojects.handleprojectstate.call(this, text) }}
                                value={myprojects.getprojectstate.call(this)} />

                        </View>
                        <View style={[styles.flex1]}>

                            <Text style={[regularFont]}>Zipcode </Text>
                            <TextInput style={[styles.defaultInput, regularFont]}
                                onChangeText={text => { myprojects.handlezipcode.call(this, text) }}
                                value={myprojects.getzipcode.call(this)} />

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin30]}>
                        <View style={[styles.flex1]}>

                            {pm.showsaveproject.call(this)}

                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            {myprojects.showprojectids.call(this)}
                        </View>
                    </View>


                </View>
            </View>
        )
        } else {
            return(pm.loginMessage.call(this,"MyProjects"))
        }

    }
}
export default MyProjects;