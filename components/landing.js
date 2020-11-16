import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import { makeID } from './functions'
import MyProfile from './myprofile'


class Landing {
    getimages() {

        const myimages = [
            {
                imageid: 'projectmanagement',
                uri: require('../slides/myprojects.png'),
                capt: 'Sign Up and Create your project. Receive services. Save Money Being your Own PM! Get A Higher Quality End Product. Get what authorize and  pay for. ',
                title: 'Project Management by Civilengineer.io'

            },
            {
                imageid: 'profile',
                uri: require('../slides/profile.png'),
                capt: 'Manage your profile. Upload a Profile Photo. You will see this after you login ',
                title: 'My Profile'

            },
           

            {
                imageid: 'myprojects',
                uri: require('../slides/myprojects.png'),
                capt: 'Create and Manage your project using the PM app. Start by defining its location and its scope of work. ',
                title: 'Create Projects'

            },
            {
                imageid: 'charges',
                uri: require('../slides/charges.png'),
                capt: 'Safely and securely add balance payments to your project. This will allow you to settle your invoices. ',
                title: 'Charges'

            },

            {
                imageid: 'milestone',
                uri: require('../slides/milestone.png'),
                capt: 'Create Project milestones to communicate your needs and schedule to the service providers. They must enter a milestone when they are entering a cost for your project ',
                title: 'Create Project Milestones'

            },

            {
                imageid: 'criticalpath',
                uri: require('../slides/criticalpath.png'),
                capt: 'Critical path diagram for your milestones ',
                title: 'Critical Path Analysis'

            },


            {
                imageid: 'team',
                uri: require('../slides/team.png'),
                capt: 'Add members to your project. Add members to your design team. This will give members access to your project inside of Construction and Design. ',
                title: 'Defining Team Roles'

            },
            {
                imageid: 'specification',
                uri: require('../slides/specification.png'),
                capt: 'Engineers specify the job using specifications. These specfication are binding language for the project the service providers must adhere to ',
                title: 'Engineers Specifications'

            },
            {
                imageid: 'costestimate',
                uri: require('../slides/estimate.png'),
                capt: 'Engineers add their own independent cost estimate used to format the bid schedule and for negociations.  ',
                title: 'Engineer Cost Estimate'

            },
            {
                imageid: 'lineitem',
                uri: require('../slides/lineitem.png'),
                capt: 'Labor, materials, and equipment breakdown for each line item given in the project ',
                title: 'Labor, Equipment, Materials'

            },

            {
                imageid: 'viewproposal',
                uri: require('../slides/viewproposal.png'),
                capt: 'View and Authorize Proposals to Create A project schedule and start to build your project ',
                title: 'View Proposal'

            },
            {
                imageid: 'viewinvoice',
                uri: require('../slides/viewinvoice.png'),
                capt: 'View Invoice allows you to view and settle invoices. Settlement occurs and creates transfers for the payment when you have balance available. ',
                title: 'View Proposal'

            }








        ];
        return myimages;
    }

    showimage(image) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const mainslide = pm.getmainslide.call(this)
        const styles = MyStylesheet()
        const marginLeft = () => {
            return ({ marginLeft: 60 })
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1, styles.alignContentCenter]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={[mainslide,styles.bottomMargin10]}
                        key={image.imageid}
                    />
                    <Text style={[headerFont, styles.alignCenter, styles.bottomMargin10]}>{image.title}</Text>
                    <Text style={[regularFont]}>{image.capt}</Text>
                </View>
            </View>)

    }

    showiconimage(image) {
        const styles = MyStylesheet()

        return (

            <TouchableOpacity onPress={() => { this.setState({ activeimage: image.imageid }) }}>
                <Image source={image.uri}
                    resizeMethod='scale'
                    style={[styles.iconimage]}
                    key={image.imageid}
                />
            </TouchableOpacity>)

    }
    getactiveimage() {
        const landing = new Landing();
        const images = landing.getimages.call(this)
        let myimage = false;
        images.map(image => {
            if (image.imageid === this.state.activeimage) {
                myimage = image;
            }
        })
        return myimage;
    }
    showactiveimage() {
        const landing = new Landing();
        const activeimage = landing.getactiveimage.call(this)
        if (activeimage) {
            return (landing.showimage.call(this, activeimage))
        }
    }
    showimages() {

        const landing = new Landing();
        const images = landing.getimages.call(this);
        let myimage = [];


        images.map(image => {

            myimage.push(landing.showimage.call(this, image))


        })


        return myimage;
    }

    showiconimages() {
        const pm = new PM();
        const styles = MyStylesheet();
        const landing = new Landing();
        const images = landing.getimages.call(this)
        const myimages = [];
        const regularFont = pm.getRegularFont.call(this)
        images.map((image, i) => {

            if (i % 2 === 0 || i == 0) {

                if (i < images.length - 1) {

                    myimages.push(
                        <View style={[styles.generalFlex, styles.bottomMargin10]} key={image.imageid}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                {landing.showiconimage.call(this, image)}
                                <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                {landing.showiconimage.call(this, images[i + 1])}
                                <Text style={[regularFont, styles.alignCenter]}>{images[i + 1].title}</Text>
                            </View>

                        </View>
                    )
                } else {
                    myimages.push(
                        <View style={[styles.generalFlex, styles.bottomMargin10]} key={[image.imageid]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                {landing.showiconimage.call(this, image)}
                                <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                            </View>
                            <View style={[styles.flex1]}>

                            </View>

                        </View>
                    )
                }
            }


        })
        return myimages;
    }
    showlanding() {
        const pm = new PM();
        const styles = MyStylesheet();
        const landing = new Landing();
        const myprofile = new MyProfile();

        const justify = () => {
            return ({ justifyContent: 'center' })
        }
        const myuser = pm.getuser.call(this);
        if (myuser) {
            return (myprofile.showmyprofile.call(this))
        } else {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>


                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, justify(), styles.topMargin35]}>

                                {landing.showactiveimage.call(this)}

                            </View>

                        </View>


                        {landing.showiconimages.call(this)}



                    </View>

                </View>


            )
        }
    }
}
export default Landing;