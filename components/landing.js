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
                uri: require('../slides/logo.png'),
                capt: 'This is Project Management by civilengineer.io. Free Project Engineering service. This is an App for Project Owners that is hosted at  http://pm.civilengineer.io. See the slideshow to learn more about how you can save with this program ',
                title:'Project Management Online'
    
            },
    
        {
            imageid: 'myprojects',
            uri: require('../slides/myprojects.png'),
            capt: 'Project Component was made to quickly and easily create projects. Start by Creating a ProjectID url. Then define the Scope and Location. ',
            title:'Create Projects'

        },
        {
            imageid: 'charges',
            uri: require('../slides/charges.png'),
            capt: 'Add balance to your project using the charges component. This allows you to add balance to your project. This will allow you settle your invoices ',
            title:'Charges'

        },
    
        {
            imageid: 'milestone',
            uri: require('../slides/milestone.png'),
            capt: 'Create project milestones. Start Date, End Date, and name of the milestone.   ',
            title:'Create Project Milestones'

        },

        {
            imageid: 'criticalpath',
            uri: require('../slides/criticalpath.png'),
            capt: 'Create relationships between your milestones. Creates project schedule diagram. Calculates flaot and total project float for each milestone. Determines crtical path. ',
            title:'Critical Path Analysis'

        },

        {
            imageid: 'team_1',
            uri: require('../slides/team_1.png'),
            capt: 'Team component was made to build the project team and define individual roles on the team. You can add members to your Design Team and to your Construction Team ',
            title:'Build a Project Team'

        },

        {
            imageid: 'team_2',
            uri: require('../slides/team_2.png'),
            capt: 'Updating team role responsbility. Click on the Icon to make active. When they are active, role will appear and you can update their role on the project  ',
            title:'Defining Team Roles'

        },
        {
            imageid: 'specification',
            uri: require('../slides/specification.png'),
            capt: 'Engineers on the Design Team can create the construction specfications, deliver them to the PM. These specifications are the standards that they set for construction. ',
            title:'Engineers Specifications'

        },
        {
            imageid: 'costestimate',
            uri: require('../slides/estimate.png'),
            capt: 'Engineers can also provide the PM a cost estimate and a bid-quantity take-off schedule. The schedule is used for negociating and bidding the job. We negociate the construction contract using the Engineers estimate.  ',
            title:'Engineer Cost Estimate'

        },
        {
            imageid: 'lineitem',
            uri: require('../slides/lineitem.png'),
            capt: 'Equipment, labor, and materials breakdown for each line item in the contract ',
            title:'Labor, Equipment, Materials'

        },
        {
            imageid: 'proposals',
            uri: require('../slides/proposals.png'),
            capt: 'The Proposal will show all of the work items. You can view the labor, materials, equipment breakdown. This produces a unit price for each item in the bid table. This is the bid.  ',
            title:'Construction Proposals'

        },
        {
            imageid: 'viewproposal',
            uri: require('../slides/viewproposal.png'),
            capt: 'The PM is responsible for reviewing and authorizing the Proposal prior to work. This will establish a working budget for you and your Contract. The Contractor is expected to do the same when recording their actuals and creating invoices. ',
            title:'View Proposal'

        },
        {
            imageid: 'settlement',
            uri: require('../slides/settlement.png'),
            capt: 'Invoices matches proposals except invoices accepts payments. To pay an invoice run a settlement. This will transfer all of the outstanding items in the invoice assuming balance available. ',
            title:'Invoice Settlement'

        },

        {
            imageid: 'settled',
            uri: require('../slides/settled.png'),
            capt: 'After successfully running settlement, press refresh to see the transfer summary. The transfers occur 1-sec after the settlement completes. You have to press refresh to see the transfers after you run the settlement. ',
            title:'Invoice Settled'

        },
      

 
 
     
       
       
        ];
        return myimages;
    }

    showimage(image) {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet()
        const marginLeft = () => {
            return ({ marginLeft: 60 })
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={[styles.slideimage, marginLeft()]}
                        key={image.imageid}
                    />
                    <Text style={[headerFont, styles.alignCenter]}>{image.title}</Text>
                    <Text style={[regularFont, styles.alignCenter]}>{image.capt}</Text>
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
            return (landing.showimage.call(this,activeimage))
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
        if(myuser) {
            return(myprofile.showmyprofile.call(this))
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