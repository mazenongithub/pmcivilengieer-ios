import React from 'react'
import { Alert, Text, View, Image, TouchableOpacity } from 'react-native'
import PM from './pm'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem, DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, sorttimes, ProfitForLabor, ProfitForMaterial, ProfitForEquipment, UTCTimefromCurrentDate, UTCStringFormatDateforProposal } from './functions'

class ViewProposal {
    getproposal() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const proposalid = params.proposalid;
        let myproposal = pm.getproposalbyid.call(this, proposalid)

        return myproposal;
    }
    getscheduleitems() {
        const viewproposal = new ViewProposal()
        let scheduleitems = false;
        let myproposal = viewproposal.getproposal.call(this);

        if (myproposal) {
            if (myproposal.hasOwnProperty("bidschedule")) {
                scheduleitems = myproposal.bidschedule.biditem
            }
        }
        return scheduleitems;
    }
    getscheduleitem(csiid) {
        const viewproposal = new ViewProposal()
        let scheduleitems = viewproposal.getscheduleitems.call(this);

        let scheduleitem = false;
        if (scheduleitems) {
            // eslint-disable-next-line
            scheduleitems.map(item => {
                if (item.csiid === csiid) {
                    scheduleitem = item;
                }
            })
        }

        return scheduleitem;
    }
    getitems() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const proposalid = params.proposalid;
        let payitems = pm.getAllSchedule.call(this)
        let items = [];
        const validateNewItem = (items, item) => {
            let validate = true;
            // eslint-disable-next-line
            items.map(myitem => {
                if (myitem.csiid === item.csiid) {
                    validate = false;
                }
            })
            return validate;
        }
        // eslint-disable-next-line
        payitems.map(item => {

            if (item.hasOwnProperty("laborid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }

        })
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {

                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", "0")
                    csis.push(newItem)
                }
            })
        }

        return csis;
    }
    showbidtable() {
        const viewproposal = new ViewProposal();
        const biditems = viewproposal.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(viewproposal.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const pm = new PM()
        const params = pm.getactiveparams.call(this);
        const proposalid = params.proposalid;
        const myproject = pm.getactiveproject.call(this)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    proposalitemsbycsiid(csiid) {
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        const myproject = pm.getactiveproject.call(this)
        const proposalid = params.proposalid;
        let items = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }
    getprofit(csiid) {
        const viewproposal = new ViewProposal();
        let profit = 0;
        let directcost = 0;
        let items = viewproposal.proposalitemsbycsiid.call(this, csiid);
        // eslint-disable-next-line
        items.map(item => {
            if (item.hasOwnProperty("laborid")) {
                directcost += DirectCostForLabor(item);
                profit += ProfitForLabor(item);
            }
            if (item.hasOwnProperty("materialid")) {
                directcost += DirectCostForMaterial(item);
                profit += ProfitForMaterial(item);
            }
            if (item.hasOwnProperty("equipmentid")) {
                directcost += DirectCostForEquipment(item);
                profit += ProfitForEquipment(item);
            }

        })

        return ((profit / directcost) * 100)

    }
    getmyoverhead(csiid) {
        const viewproposal = new ViewProposal();
        let directcost = viewproposal.getdirectcost.call(this, csiid);
        let profit = viewproposal.getprofit.call(this, csiid);
        let myoverhead = .03 * (directcost * 1 + (profit / 100));
        return myoverhead;
    }
    getoverhead(csiid) {
        const viewproposal = new ViewProposal();
        let directcost = Number(viewproposal.getdirectcost.call(this, csiid));
        let profit = Number(viewproposal.getprofit.call(this, csiid))
        let myoverhead = viewproposal.getmyoverhead.call(this, csiid);

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let overhead = ((directcost * profit) + myoverhead) * .029 + .029 * (((directcost * profit) + myoverhead) * .029) + .029 * (.029 * (((directcost * profit) + myoverhead) * .029)) + .029 * (+ .029 * (.029 * (((directcost * profit) + myoverhead) * .029))) + .029 * (.029 * (+ .029 * (.029 * (((directcost * profit) + myoverhead) * .029))))
        return overhead;
    }

    getbidprice(csiid) {
        const viewproposal = new ViewProposal()
        let directcost = Number(viewproposal.getdirectcost.call(this, csiid));
        let profit = Number(viewproposal.getprofit.call(this, csiid));
        let overhead = Number(viewproposal.getoverhead.call(this, csiid))
        let myoverhead = viewproposal.getmyoverhead.call(this, csiid)

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = (directcost * profit);
        return bidprice;
    }
    getunit(csiid) {
        const viewproposal = new ViewProposal()
        let scheduleitem = viewproposal.getscheduleitem.call(this, csiid);
        if (scheduleitem) {

            return scheduleitem.unit;


        } else {
            return ""
        }
    }
    getquantity(csiid) {
        const viewproposal = new ViewProposal()
        let scheduleitem = viewproposal.getscheduleitem.call(this, csiid);

        if (scheduleitem) {
            if (Number(scheduleitem.quantity) > 0) {
                return Number(scheduleitem.quantity);

            } else {

                return scheduleitem.quantity
            }

        } else {
            return ""
        }

    }

    getunitprice(csiid) {
        const viewproposal = new ViewProposal();
        let quantity = Number(viewproposal.getquantity.call(this, csiid));
        let bidprice = Number(viewproposal.getbidprice.call(this, csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return bidprice;;
        }


    }


    showbiditem(item) {
        const styles = MyStylesheet();
        const pm = new PM();
        const csi = pm.getcsibyid.call(this, item.csiid);
        if(!csi) {
            pm.loadcsis.call(this)
        }
        const viewproposal = new ViewProposal();
        const directcost = Number(viewproposal.getdirectcost.call(this, item.csiid)).toFixed(2);
        const profit = +Number(viewproposal.getprofit.call(this, item.csiid)).toFixed(4);
        const bidprice = Number(viewproposal.getbidprice.call(this, item.csiid)).toFixed(2);
        const quantity = viewproposal.getquantity.call(this, item.csiid);
        const unit = viewproposal.getunit.call(this, item.csiid)
        const unitprice = Number(viewproposal.getunitprice.call(this, item.csiid)).toFixed(2);
        const activeproject = pm.getactiveproject.call(this);
        const regularFont = pm.getRegularFont.call(this)



        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex2, styles.showBorder]}>
                            <Text style={[regularFont]} onPress={() => { this.handleproposallineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                            <Text style={[regularFont, styles.alignCenter]}>{quantity.toString()}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>

                            <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                            <Text style={[styles.alignCenter, regularFont]}>{unit} </Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Direct Cost</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${directcost}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Overhead and Profit %</Text>
                            <Text style={[styles.alignCenter, regularFont]}> {profit.toString()} </Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Bid Price</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${bidprice}</Text>
                        </View>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont, styles.alignCenter]}>Unit Price</Text>
                            <Text style={[regularFont, styles.alignCenter]}>${unitprice}</Text>
                        </View>
                    </View>


                </View>
            </View>
        )


    }
    confirmauthorizeproposal() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const params = pm.getactiveparams.call(this)
        if (myuser) {
            let approved = UTCTimefromCurrentDate();
            const myproject = pm.getactiveproject.call(this);
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this,params.projectid);
                const j = pm.getproposalkeybyid.call(this, params.proposalid);
                myuser.projects.myproject[i].proposals.myproposal[j].approved = approved;
                this.props.reduxUser(myuser)
                pm.saveallprofile.call(this)

            }

        }
    }
    authorizeproposal() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        const viewproposal = new ViewProposal();
        Alert.alert(
            'Authorize Proposal',
            `Are you sure you want to authorize Proposal ID ${params.proposalid}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Authorized Proposal '), style: 'cancel' },
                { text: 'OK', onPress: () => { viewproposal.confirmauthorizeproposal.call(this) } },
            ],
            { cancelable: false }
        )
    }

    getupdated() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const proposal = pm.getproposalbyid.call(this, params.proposalid)
        let updated = "";
        if (proposal) {
            if (proposal.updated) {
                updated = `Updated On: ${UTCStringFormatDateforProposal(proposal.updated)}`;
            }
        }
        return updated;
    }

    getapproved() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const proposal = pm.getproposalbyid.call(this, params.proposalid)
        let approved = "";
        if (proposal) {

            if (proposal.approved) {

                approved = `Approved On: ${UTCStringFormatDateforProposal(proposal.approved)}`;
            }
        }
        return approved;

    }
    showproposal() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const myproject = pm.getactiveproject.call(this)
        const proposalid = params.proposalid;
        const styles = MyStylesheet();
        const viewproposal = new ViewProposal();
        const myuser = pm.getuser.call(this);
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        if (myuser) {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}/proposal/{proposalid}</Text>
                            </View>
                        </View>
                        {viewproposal.showbidtable.call(this)}

                     

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <TouchableOpacity onPress={() => { viewproposal.authorizeproposal.call(this) }}>
                                    <Image source={require('./png/authorize.png')}
                                        resizeMethod='scale'
                                        style={styles.authorize}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <Text style={[regularFont]}>{viewproposal.getupdated.call(this)}</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <Text style={[regularFont]}>{viewproposal.getapproved.call(this)}</Text>
                            </View>
                        </View>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <Text style={[regularFont]}>{this.state.message}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            )
        } else {
            return (pm.loginMessage.call(this, "View Proposal"))
        }
    }
}
export default ViewProposal