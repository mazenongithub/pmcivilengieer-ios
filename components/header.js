import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PM from './pm';
import { MyStylesheet } from './styles';


class Header {

    showsubmenu() {
        const pm = new PM();
        const menu = pm.getnavigation.call(this)
        const styles = MyStylesheet()
        console.log(menu)
        const navigation = menu.navigation;
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const link_1 = () => {
            if (myuser) {
                return (<Text onPress={() => { this.handleprofile() }}  style={{ ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter, ...styles.fontBold, ...styles.alignCenter, ...styles.bottomMargin10 }}>  /{myuser.profile} </Text>)



            }


        }
        const link_2 = () => {

            if (myuser) {

                if (navigation === 'myprojects' || navigation === 'project' || navigation === 'charges' || navigation === 'specifications' || navigation === 'specification' || navigation === 'proposals' || navigation === 'invoices' || navigation === 'viewproposal' || navigation === 'viewinvoice' || navigation === 'team' || navigation === 'milestones' || navigation === 'bid' || navigation === 'bidschedule' || navigation === 'costestimate' || navigation === 'estimatelineitem' || navigation === 'bidschedulelineitem' || navigation === 'bidlineitem' || navigation === 'proposallineitem' || navigation === 'invoicelineitem') {
                    return (<Text style={{  ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter, ...styles.bottomMargin10 }} onPress={() => { this.handlemyprojects() }}>  /myprojects  </Text>);

                }

            }

        }



        const link_3 = () => {

            if (navigation === 'project' || navigation === 'charges' || navigation === 'specifications' || navigation === 'specification' || navigation === 'bid' || navigation === 'bidschedule' || navigation === 'bidschedulelineitem' || navigation === 'bidlineitem' || navigation === 'proposals' || navigation === 'viewproposal' || navigation === 'invoices' || navigation === 'viewinvoice' || navigation === 'proposallineitem' || navigation === 'invoicelineitem' || navigation === 'team' || navigation === 'milestones' || navigation === 'costestimate' || navigation === 'estimatelineitem' || navigation === 'bidlineitem') {


                if (menu.hasOwnProperty("projectid")) {
                    let projectid = menu.projectid;
                    let project = pm.getprojectbyid.call(this, projectid)

                    if (project) {

                        return (
                            <Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleproject(menu.projectid) }}>/{project.title} </Text>
                        )

                    }
                }


            }


        }

        const link_4 = () => {
            let projectid = menu.projectid;
            let project = pm.getprojectbyid.call(this, projectid)
            if (project) {
                switch (navigation) {
                    case 'charges':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlecharges(project.projectid) }}>/charges </Text>)
                    case 'specifications':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlespecifications(project.projectid) }}>/specifications </Text>)
                    case 'specification':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlespecifications(project.projectid) }}>/specifications </Text>)
                    case 'proposals':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleproposals(project.projectid) }}>/proposals</Text>)
                    case 'viewproposal':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleproposals(project.projectid) }}>/proposals</Text>)
                    case 'proposallineitem':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleproposals(project.projectid) }}>/proposals</Text>)
                    case 'invoices':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleinvoices(project.projectid) }}>/invoices</Text>)
                    case 'viewinvoice':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleinvoices(project.projectid) }}>/invoices</Text>)
                    case 'invoicelineitem':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleinvoices(project.projectid) }}>/invoices</Text>)
                    case 'bid':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlebid(project.projectid) }}>/bid </Text>)
                    case 'bidlineitem':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlebid(project.projectid) }}>/bid </Text>)
                    case 'bidschedule':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlebidschedule(project.projectid) }}>/bidschedule</Text>)
                    case 'bidschedulelineitem':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlebidschedule(project.projectid) }}>/bidschedule</Text>)
                    case 'team':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handleteam(project.projectid) }}>/team </Text>)
                    case 'milestones':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlemilestones(project.projectid) }}>/milestones </Text>)
                    case 'costestimate':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlecostestimate(project.projectid) }}>/costestimate </Text>)
                    case 'estimatelineitem':
                        return (<Text style={[styles.bottomMargin10, styles.boldFont, headerFont, styles.alignCenter]} onPress={() => { this.handlecostestimate(project.projectid) }}>/costestimate </Text>)
                    default:

                        break;
                }

            }

        }


        const link_5 = () => {
            let csi = false;



            switch (navigation) {

                case 'estimatelineitem':
                    if (menu.hasOwnProperty("costestimate")) {
                        csi = pm.getcsibyid.call(this, menu.costestimate.csiid)

                    }

                    if (csi) {
                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handlecostestimatelineid(csi.csiid) }}>/{csi.csi}-{csi.title}</Text>)

                    }

                    break;
                case 'bidschedulelineitem':
                    if (menu.hasOwnProperty("bidschedule")) {
                        csi = pm.getcsibyid.call(this, menu.bidschedule.csiid)
                    }


                    if (csi) {
                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handlebidschedulelineitem(csi.csiid) }}> /{csi.csi}-{csi.title}</Text>)
                    }
                    break;

                case 'bidlineitem':
                    if (menu.hasOwnProperty("bid")) {
                        csi = pm.getcsibyid.call(this, menu.bid.csiid)
                    }
                    if (csi) {
                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handlebidlineitem(csi.csiid) }}> /{csi.csi}-{csi.title}</Text>)
                    }
                    break;

                case 'viewproposal':
                    if (menu.hasOwnProperty("proposal")) {

                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handleviewproposal(menu.proposal.proposalid) }}>/{menu.proposal.proposalid} </Text>)
                    }

                    break;

                case 'proposallineitem':
                    if (menu.hasOwnProperty("proposal")) {

                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handleviewproposal(menu.proposal.proposalid) }}>/{menu.proposal.proposalid} </Text>)
                    }

                    break;

                case 'viewinvoice':
                    if (menu.hasOwnProperty("invoice")) {
                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handleviewinvoice(menu.invoice.invoiceid) }}>/{menu.invoice.invoiceid} </Text>)
                    }

                    break;


                case 'invoicelineitem':
                    if (menu.hasOwnProperty("invoice")) {


                        return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handleviewinvoice(menu.invoice.invoiceid) }}>/{menu.invoice.invoiceid} </Text>)
                    }

                    break;

                case 'specification':
                    if (menu.hasOwnProperty("specifications")) {

                        csi = pm.getcsibyid.call(this, menu.specifications.csiid)
                        if (csi) {
                            return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handlespecification(menu.specifications.csiid) }}>/{csi.csi} - {csi.title}</Text>)
                        }

                    }





                    break;


                default:

                    break;
            }

        }

        const link_6 = () => {
            let csi = false;
            switch (navigation) {
                case 'proposallineitem':
                    if (menu.hasOwnProperty("proposal")) {
                        csi = pm.getcsibyid.call(this, menu.proposal.csiid)
                        if (csi) {
                            return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handleproposallineitem(csi.csiid) }}> /{csi.csi}-{csi.title}</Text>)
                        }
                    }
                    break;

                case 'invoicelineitem':
                    if (menu.hasOwnProperty("invoice")) {
                        csi = pm.getcsibyid.call(this, menu.invoice.csiid)
                        if (csi) {
                            return (<Text style={{ ...styles.bottomMargin10, ...styles.boldFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }} onPress={() => { this.handleinvoicelineitem(csi.csiid) }}> /{csi.csi}-{csi.title}</Text>)
                        }
                    }
                    break;

                default:
                    break;
            }
        }




        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>
                    {link_1()}
                    {link_2()}
                    {link_3()}
                    {link_4()}
                    {link_5()}
                    {link_6()}

                </View>
            </View>
        )



    }

    showmenu() {
        const styles = MyStylesheet();
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)

        const link_1 = (myuser) => {
            if (myuser) {
                return (<Text onPress={() => { this.handleprofile() }}  style={{ ...styles.bottomMargin10, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }}>  /{myuser.profile} </Text>);
            } else {
                return (<Text onPress={() => { this.handlelanding() }} style={{ ...styles.bottomMargin10, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }}> / </Text>);
            }

        }

        const launchwidth = () => {
            return ({ width: 65, height: 52 })
        }

        const closeicon = () => {
            return ({ width: 42, height: 30 })
        }




        const link_2 = (myuser) => {
            if (myuser) {
                return (<Text style={{ ...styles.bottomMargin10, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }} onPress={() => { this.handlemyprojects() }}>  /myprojects  </Text>);
            } else {
                return (<Text onPress={() => { this.handleregister() }} style={{ ...styles.bottomMargin10, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }}> /register </Text>);
            }

        }



        const link_3 = (myuser) => {

            if (myuser) {
                return (<Text onPress={() => { pm.logoutuser.call(this) }} style={{ ...styles.bottomMargin10, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }}> /logout </Text>
                )
            } else {
                return (<Text onPress={() => { this.handlelogin() }} style={{ ...styles.bottomMargin10, ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }}> /login </Text>)
            }

        }

        const getbutton = () => {
            if (this.state.menu === 'closed') {
                return (<TouchableOpacity onPress={() => { this.setState({ menu: 'open' }) }}>
                    <Image source={require('./png/launchicon.png')}
                        resizeMethod='scale'
                        style={{ ...launchwidth() }}
                    />
                </TouchableOpacity>)

            }

        }

        const getcloseIcon = () => {
            if (this.state.menu === 'open') {
                return (<TouchableOpacity onPress={() => { this.setState({ menu: 'closed' }) }}>
                    <Image source={require('./png/closeicon.png')}
                        resizeMethod='scale'
                        style={{ ...closeicon() }}
                    />
                </TouchableOpacity>)

            }
        }

        const smalllinks = (myuser) => {
            if (this.state.menu === 'open') {
                return (
                    <View style={{ ...styles.generalContainer }}>
                        <View style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder, ...styles.generalPadding }}>{link_1(myuser)}</View>
                        <View style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder, ...styles.generalPadding }}>{link_2(myuser)}</View>
                        <View style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder, ...styles.generalPadding }}>{link_3(myuser)}</View>
                    </View>)

            }
        }

        if (this.state.width > 600) {
            return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.generalPadding }}>
                    {link_1(myuser)}
                </View>
                <View style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.generalPadding }}>
                    {link_2(myuser)}
                </View>
                <View style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.generalPadding }}>
                    {link_3(myuser)}
                </View>

            </View>)

        } else {

            return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter }}>
                    {getbutton()}
                </View>

                <View style={{ ...styles.flex5, ...styles.addMargin, ...styles.alignCenter }}>
                    {smalllinks(myuser)}
                </View>
                <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                    {getcloseIcon()}
                </View>


            </View>)


        }


    } // end show menu



    showheader() {
        const styles = MyStylesheet();
        const header = new Header();
        const logowidth = () => {
            if (this.state.width > 1200) {
                return ({ width: 232, height: 174 })

            } else if (this.state.width > 600) {
                return ({ width: 226, height: 170 })

            } else {
                return ({ width: 154, height: 116 })

            }
        }

        const alignCenter = () => {
            if (this.state.width < 600) {
                return (styles.alignContentCenter)
            }
        }

        return (<View style={{ ...styles.generalFlex }}>
            <View style={{ ...styles.flex1 }}>

                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                        <View style={{ ...styles.generalContainer, ...alignCenter() }}>
                            <TouchableOpacity onPress={() => { this.checkuserlogin() }}>
                                <Image source={require('./png/pmlogo.png')}
                                    resizeMethod='scale'
                                    style={{ ...logowidth() }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {header.showmenu.call(this)}

                {header.showsubmenu.call(this)}




            </View>
        </View>)
    }
}

export default Header;