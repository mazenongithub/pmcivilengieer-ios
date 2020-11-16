import React from 'react'
import { Text, View, TextInput} from 'react-native'
import PM from './pm'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem,DirectCostForLabor,DirectCostForMaterial,DirectCostForEquipment,sorttimes,ProfitForLabor,ProfitForMaterial,ProfitForEquipment,isNumeric} from './functions'

class BidSchedule {
    getproposals() {
        const pm = new PM();
        let myproposals = pm.getproposals.call(this)
        
        return myproposals;
    }
    getscheduleitems() {
        const bidschedule = new BidSchedule()
        let scheduleitems = [];
        let myproposals = bidschedule.getproposals.call(this);
        
        if (myproposals) {
            myproposals.map(myproposal=> {

                if (myproposal.hasOwnProperty("bidschedule")) {
                    scheduleitems.push(myproposal.bidschedule.biditem)
                }

            })
           
        }
        return scheduleitems;
    }
    getscheduleitem(csiid) {
        const bidschedule = new BidSchedule()
        let scheduleitems = bidschedule.getscheduleitems.call(this);
        
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
            
                    items.push(item)
                

            }
            if (item.hasOwnProperty("materialid")) {
         
                    items.push(item)
                

            }
            if (item.hasOwnProperty("equipmentid")) {
         
                    items.push(item)
                

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
        const bidschedule = new BidSchedule();
        const biditems = bidschedule.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(bidschedule.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const pm = new PM()
        const myproject = pm.getproject.call(this)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    proposalitemsbycsiid(csiid) {
        const pm = new PM();
        const myproject = pm.getproject.call(this)
        let items = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid) {
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
        const bidschedule = new BidSchedule();
        let profit = 0;
        let directcost = 0;
        let items = bidschedule.proposalitemsbycsiid.call(this,csiid);
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

    handleunit(csiid, unit) {
        const pm = new PM();
        const activeproject = pm.getnavigation.call(this)
    
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const myproject = pm.getprojectbyid.call(this, activeproject.projectid);
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this, myproject.projectid);
                const scheduleitems = pm.getbidschedule.call(this, myproject.projectid)
                if(scheduleitems) {
    
                const scheduleitem = pm.getbidschedulebyid.call(this, myproject.projectid,csiid)
                if (scheduleitem) {
                    const j = pm.getbidschedulekeybyid.call(this, myproject.projectid, csiid)
                    myuser.projects.myproject[i].bidschedule[j].unit = unit;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                   
                } else {
                    let newItem = {csiid, quantity:'', unit}
                    myuser.projects.myproject[i].bidschedule.push(newItem)
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }
    
            } else {
                let newItem = {csiid, quantity:'', unit}
                myuser.projects.myproject[i].bidschedule = [newItem]
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
    
           
    
    
            }
        }
    
    
    }

    handlequantity(csiid, quantity) {
        const pm = new PM();
        const activeproject = pm.getnavigation.call(this)
        if(isNumeric(quantity)) {
        const myuser = pm.getuser.call(this)
        if (myuser) {
            const myproject = pm.getprojectbyid.call(this, activeproject.projectid);
            if (myproject) {
                const i = pm.getprojectkeybyid.call(this, myproject.projectid);
                const scheduleitems = pm.getbidschedule.call(this, myproject.projectid)
                if(scheduleitems) {

                const scheduleitem = pm.getbidschedulebyid.call(this, myproject.projectid, csiid)
                if (scheduleitem) {
                    const j = pm.getbidschedulekeybyid.call(this, myproject.projectid, csiid)
                    myuser.projects.myproject[i].bidschedule[j].quantity = quantity;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                   
                } else {
                    let newItem = {csiid, quantity, unit:''}
                    myuser.projects.myproject[i].bidschedule.push(newItem)
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }

            } else {
                let newItem = {csiid, quantity, unit:''}
                myuser.projects.myproject[i].bidschedule = [newItem]
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }

           


            }
        }

    } else {
        alert(`${quantity} should be numeric `)
    }

    }

    getbidprice(csiid) {
        const bidschedule = new BidSchedule()
        let directcost = Number(bidschedule.getdirectcost.call(this,csiid));
        let profit = Number(bidschedule.getprofit.call(this,csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }
    getunit(csiid) {
        let unit = ""
        const pm = new PM();
        const activeproject = pm.getnavigation.call(this)
    
        if(activeproject) {
      
        const pm = new PM();
        const item = pm.getbidschedulebyid.call(this, activeproject.projectid, csiid);
        if (item) {
            unit = item.unit
        }
    }
       
        return unit;
    }


      getquantity(csiid) {
        const pm = new PM();
        const activeproject = pm.getnavigation.call(this)
        let quantity = "";
        if(activeproject) {
      
        const pm = new PM();
        const item = pm.getbidschedulebyid.call(this, activeproject.projectid, csiid);
       
        if (item) {
            quantity = item.quantity;
        }
    }
        return quantity;
    }

    getunitprice(csiid) {
        const bidschedule = new BidSchedule();
        let quantity = Number(bidschedule.getquantity.call(this,csiid));
        let bidprice = Number(bidschedule.getbidprice.call(this,csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return bidprice;;
        }


    }


    showbiditem(item) {
        const styles = MyStylesheet();
        const pm = new PM();
        const params = pm.getnavigation.call(this);
        const csi = pm.getcsibyid.call(this, item.csiid);
        if(!csi) {
            pm.loadcsis.call(this)
        }
        const bidschedule = new BidSchedule();
        const directcost = Number(bidschedule.getdirectcost.call(this,item.csiid)).toFixed(2);
        const profit = +Number(bidschedule.getprofit.call(this,item.csiid)).toFixed(4);
        const bidprice = Number(bidschedule.getbidprice.call(this,item.csiid)).toFixed(2);
        const unit = bidschedule.getunit.call(this,item.csiid)
        const unitprice = Number(bidschedule.getunitprice.call(this,item.csiid)).toFixed(2);
        const regularFont = pm.getRegularFont.call(this)
        console.log(bidschedule.getquantity.call(this,item.csiid))
     

            return (
                <View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex2, styles.showBorder]}>
                                <Text style={[regularFont]} onPress={()=>{this.handlebidschedulelineitem(item.csiid)}}> {csi.csi}-{csi.title}</Text>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>
                                <Text style={[regularFont, styles.alignCenter]}>Quantity</Text>
                                <TextInput value={bidschedule.getquantity.call(this,item.csiid).toString()} 
                                onChangeText={text=>{bidschedule.handlequantity.call(this,item.csiid, text)}}
                                style={[ styles.defaultInput, regularFont, styles.alignCenter]}/>
                            </View>
                            <View style={[styles.flex1, styles.showBorder]}>

                                <Text style={[regularFont, styles.alignCenter]}>Unit</Text>
                                <TextInput value={bidschedule.getunit.call(this,item.csiid).toString()}
                                onChangeText={text=>{bidschedule.handleunit.call(this,item.csiid,text)}} 
                                style={[styles.alignCenter, regularFont, styles.defaultInput]}/>
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
                                <Text style={[regularFont, styles.alignCenter]}>${unitprice}/{unit}</Text>
                            </View>
                        </View>


                    </View>
                </View>
            )


    }
    showbidschedule() {
        const pm = new PM();
        const myproject = pm.getproject.call(this);
        const styles = MyStylesheet();
        const bidschedule = new BidSchedule();
        const myuser = pm.getuser.call(this);
        const headerFont = pm.getHeaderFont.call(this)
        if(myuser) {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    {bidschedule.showbidtable.call(this)}
                </View>
            </View>
        )
        } else {
            return(pm.loginMessage.call(this,"Bid Schedule"))
        }
    }
}
export default BidSchedule