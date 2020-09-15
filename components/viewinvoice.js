import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import PM from './pm'
import { MyStylesheet } from './styles'
import { CreateBidScheduleItem, DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, sorttimes, ProfitForLabor, ProfitForMaterial, ProfitForEquipment, UTCStringFormatDateforProposal, inputUTCStringForLaborID } from './functions'
import { SettleInvoice } from './actions/api'

class ViewInvoice {
    getinvoice() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const invoiceid = params.invoiceid;
        let myinvoice = pm.getinvoicebyid.call(this, invoiceid)

        return myinvoice;
    }
    getamount() {
        const viewinvoice = new ViewInvoice();
        let biditems = viewinvoice.getitems.call(this)
        let amount = 0;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += viewinvoice.getbidprice.call(this, item.csiid)
            })
        }
        return Math.round((amount * 100) + 30)


    }
    getactualitems() {
        const viewinvoice = new ViewInvoice()
        let actualitems = false;
        let myinvoice = viewinvoice.getinvoice.call(this);

        if (myinvoice) {
            if (myinvoice.hasOwnProperty("bid")) {
                actualitems = myinvoice.bid.biditem
            }
        }
        return actualitems;
    }
    getactualitem(csiid) {
        const viewinvoice = new ViewInvoice()
        let actualitems = viewinvoice.getactualitems.call(this);

        let actualitem = false;
        if (actualitems) {
            // eslint-disable-next-line
            actualitems.map(item => {
                if (item.csiid === csiid) {
                    actualitem = item;
                }
            })
        }

        return actualitem;
    }

    getamountowed() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const invoiceid = activeparams.invoiceid;
        const invoiceitems =  pm.getinvoiceitemsbyid.call(this,projectid,invoiceid);
        let owed = 0;
        if (invoiceitems) {
            // eslint-disable-next-line
            invoiceitems.map(item => {
    
    
                if (item.hasOwnProperty("laborid")) {
    
                    if (!item.settlementid) {
    
                        owed += DirectCostForLabor(item)
                        owed += ProfitForLabor(item)
    
    
                    }
    
    
                } else if (item.hasOwnProperty("materialid")) {
    
    
                    if (!item.settlementid) {
    
    
                        owed += DirectCostForMaterial(item);
                        owed += ProfitForMaterial(item)
                    }
    
    
                } else if (item.hasOwnProperty("equipmentid")) {
                    if (!item.settlementid) {
    
    
                        owed += DirectCostForEquipment(item)
                        owed += ProfitForEquipment(item)
                    }
    
                }
    
            })
    
    
    
        }
        return owed;
    
    }
    balanaceSummary() {
        const pm = new PM();
        const styles = MyStylesheet();
        const debt = `$${Number(viewinvoice.getamountowed.call(this)).toFixed(2)}`;
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this)
        return (<View style={{ ...styles.generalFlex }}>
            <View style={{ ...styles.flex1 }}>
    
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...headerFont, ...styles.underline }}>Balance Summary</Text>
                </View>
                </View>
    
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}> Payment Due {debt} </Text>
                    </View>
                </View>
    
            </View>
        </View>)
    
    }
    
   
    getitems() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const invoiceid = params.invoiceid;
        let payitems = pm.getAllActual.call(this)
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
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.invoiceid === invoiceid) {
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
        const viewinvoice = new ViewInvoice();
        const biditems = viewinvoice.getitems.call(this)
        let items = [];
        if (biditems.length > 0) {
            biditems.map(biditem => {
                items.push(viewinvoice.showbiditem.call(this, biditem))
            })
        }
        return items;

    }
    getdirectcost(csiid) {
        const pm = new PM()
        const params = pm.getactiveparams.call(this);
        const invoiceid = params.invoiceid;
        const myproject = pm.getactiveproject.call(this)
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }
    invoiceitemsbycsiid(csiid) {
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        const myproject = pm.getactiveproject.call(this)
        const invoiceid = params.invoiceid;
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
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
        const viewinvoice = new ViewInvoice();
        let profit = 0;
        let directcost = 0;
        let items = viewinvoice.invoiceitemsbycsiid.call(this, csiid);
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
        const viewinvoice = new ViewInvoice();
        let directcost = viewinvoice.getdirectcost.call(this, csiid);
        let profit = viewinvoice.getprofit.call(this, csiid);
        let myoverhead = .03 * (directcost * 1 + (profit / 100));
        return myoverhead;
    }
    getoverhead(csiid) {
        const viewinvoice = new ViewInvoice();
        let directcost = Number(viewinvoice.getdirectcost.call(this, csiid));
        let profit = Number(viewinvoice.getprofit.call(this, csiid))
        let myoverhead = viewinvoice.getmyoverhead.call(this, csiid);

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let overhead = ((directcost * profit) + myoverhead) * .029 + .029 * (((directcost * profit) + myoverhead) * .029) + .029 * (.029 * (((directcost * profit) + myoverhead) * .029)) + .029 * (+ .029 * (.029 * (((directcost * profit) + myoverhead) * .029))) + .029 * (.029 * (+ .029 * (.029 * (((directcost * profit) + myoverhead) * .029))))
        return overhead;
    }
    getbidprice(csiid) {
        const viewinvoice = new ViewInvoice()
        let directcost = Number(viewinvoice.getdirectcost.call(this, csiid));
        let profit = Number(viewinvoice.getprofit.call(this, csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = (directcost * profit) 
        return bidprice;
    }
    getunit(csiid) {
        const viewinvoice = new ViewInvoice()
        let actualitem = viewinvoice.getactualitem.call(this, csiid);
        if (actualitem) {

            return actualitem.unit;


        } else {
            return ""
        }
    }
    getquantity(csiid) {
        const viewinvoice = new ViewInvoice()
        let actualitem = viewinvoice.getactualitem.call(this, csiid);

        if (actualitem) {
            if (Number(actualitem.quantity) > 0) {
                return Number(actualitem.quantity);

            } else {

                return actualitem.quantity
            }

        } else {
            return ""
        }

    }

    getunitprice(csiid) {
        const viewinvoice = new ViewInvoice();
        let quantity = Number(viewinvoice.getquantity.call(this, csiid));
        let bidprice = Number(viewinvoice.getbidprice.call(this, csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return bidprice;;
        }


    }

 

    getapproved() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const invoice = pm.getinvoicebyid.call(this, params.invoiceid)
        let approved = "";
        if (invoice) {

            if (invoice.approved) {

                approved = `Stripe Payment Captured On: ${UTCStringFormatDateforProposal(invoice.approved)}`;
            }
        }
        return approved;

    }

    confirmSettlement() {
        const viewinvoice = new ViewInvoice();
        Alert.alert(
            'Settle Invoice',
            `Are you sure you want to Settle Invoice ?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Settle InVOICE '), style: 'cancel' },
                { text: 'OK', onPress: () => { viewinvoice.invoicesettlement.call(this) } },
            ],
            { cancelable: false }
        )
    }



    async invoicesettlement() {
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const viewinvoice = new ViewInvoice();
        const validate = viewinvoice.validateInvoicePayment.call(this)
       
    
            if(validate.validate) {
            const activeparams = pm.getactiveparams.call(this);
            const projectid = activeparams.projectid;
            const myproject = pm.getprojectbyid.call(this, projectid);
            if (myproject) {
    
                const projectid = myproject.projectid;
                const i = pm.getprojectkeybyid.call(this, projectid);
                const invoiceid = activeparams.invoiceid;
                const amount = Number(Math.round(viewinvoice.getamountowed.call(this)*100))
                const values = { invoiceid, amount }
                try{
                let response = await SettleInvoice(values)
                console.log(response)
                if (response.hasOwnProperty("settlements")) {
    
                    const myinvoice = pm.getinvoicebyid.call(this, invoiceid);
                    if (myinvoice) {
                        const j = pm.getinvoicekeybyid.call(this, invoiceid);
                        myuser.projects.myproject[i].invoices.myinvoice[j].settlements = response.settlements;
                        this.props.reduxUser(myuser)
                    }
    
    
                    if (response.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        response.labor.map(labor => {
                            const laborid = labor.laborid;
                            const mylabor = pm.getactullaborbyid.call(this, projectid, laborid);
                            if (mylabor) {
                                const k = pm.getactullaborkeybyid.call(this, projectid, laborid);
                                myuser.projects.myproject[i].actuallabor.mylabor[k].settlementid = labor.settlementid;
                            }
                        })
                    }
    
                    if (response.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        response.materials.map(material => {
                            const materialid = material.materialid;
                            const mymaterial = pm.getactulmaterialsbyid.call(this, projectid, materialid);
                            console.log(mymaterial)
                            if (mymaterial) {
                                const l = pm.getactualmaterialskeybyid.call(this, projectid, materialid);
                                console.log(l,mymaterial)
                                myuser.projects.myproject[i].actualmaterials.mymaterial[l].settlementid = material.settlementid;
                            }
                        })
                    }
    
                    if (response.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        response.equipment.map(equipment => {
                            const equipmentid = equipment.equipmentid;
                            const myequipment = pm.getactulequipmentbyid.call(this, projectid, equipmentid);
                            if (myequipment) {
                                const m = pm.getactulequipmentkeybyid.call(this, projectid, equipmentid);
                                myuser.projects.myproject[i].actualequipment.myequipment[m].settlementid = equipment.settlementid;
                            }
                        })
                    }
    
                    this.props.reduxUser(myuser)
                    this.setState({render:'render'})
    
    
    
                }
    
            } catch(err) {
                alert(err)
            }
    
    
    
    
            }
    
    
    
        } else {
    
            this.setState({message:validate.message})
        }
    

    }

    showbiditem(item) {
        const styles = MyStylesheet();
        const pm = new PM();
        const csi = pm.getcsibyid.call(this,item.csiid)
        if(!csi) {
            pm.loadcsis.call(this)
        }
        const viewinvoice = new ViewInvoice();
        const directcost = Number(viewinvoice.getdirectcost.call(this, item.csiid)).toFixed(2);
        const profit = +Number(viewinvoice.getprofit.call(this, item.csiid)).toFixed(4);
        const bidprice = Number(viewinvoice.getbidprice.call(this, item.csiid)).toFixed(2);
        const quantity = viewinvoice.getquantity.call(this, item.csiid);
        const unit = viewinvoice.getunit.call(this, item.csiid)
        const unitprice = Number(viewinvoice.getunitprice.call(this, item.csiid)).toFixed(2);
        const activeproject = pm.getactiveproject.call(this);
        const regularFont = pm.getRegularFont.call(this)



        return (
            <View style={[styles.generalFlex, styles.bottomMargin10]} key={item.csiid}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex]}>
                        <View style={[styles.flex2, styles.showBorder]}>
                            <Text style={[regularFont]} onPress={() => { this.handleinvoicelineitem(item.csiid) }}> {csi.csi}-{csi.title}</Text>
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
                            <Text style={[regularFont, styles.alignCenter]}>*Bid Price</Text>
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

    showcharge(charge) {
        const pm = new PM();
        const styles = MyStylesheet();
        const created = inputUTCStringForLaborID(charge.created);
        const regularFont = pm.getRegularFont.call(this)
        return (
            <View style={[styles.generalFlex]} key={charge.chargeid}>

                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}> Charge Captured on {created} for the Amount ${charge.amount} </Text>
                </View>

            </View>

        )

    }


    showcharges() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this)
        const invoiceid = activeparams.invoiceid;
        const charges = pm.getchargesbyinvoiceid.call(this, invoiceid)
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this);
        const viewinvoice = new ViewInvoice();
        let chargeids = [];
        const jsx = (chargeids) => {
            return (
                <View style={[styles.generalFlex,styles.bottomMargin10]}>
                    <View style={[ styles.flex1 ]}>

                        <View style={[ styles.generalFlex ]}>
                            <View style={[ styles.flex1, headerFont, styles.generalFont ]}>
                                <Text style={[headerFont,styles.underline]}>Summary of Payments</Text>
                            </View>
                        </View>

                        {chargeids}

                    </View>
                </View>
            )


        }
        if (charges) {
            // eslint-disable-next-line
            charges.map(charge => {
                chargeids.push(viewinvoice.showcharge.call(this,charge))
            })

            return jsx(chargeids)

        } else {
            return;
        }

    }

    validateInvoicePayment() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const viewinvoice = new ViewInvoice();
        const chargetotal = viewinvoice.getchargestotal.call(this);
        const transfers = pm.transfersbyprojectid.call(this,projectid);
        let validate = {};
        validate.validate = false;
        const transfertotal = () => {
            let total = 0;
            if(transfers) {
                // eslint-disable-next-line
                transfers.map(transfer=> {
                    total+=Number(transfer.amount)
                })
    
            }
            return total;
        }
     
        const amount = Number(viewinvoice.getamountowed.call(this)).toFixed(2);
        console.log(chargetotal,transfertotal(),amount);
        if(  chargetotal - transfertotal()  >= amount  && amount > 0) {
            validate.validate = true;
    
        } else {
            validate.message = `Invalid Transactions project balance is ${chargetotal - transfertotal()} and invoice amount is ${amount}`
        }
        return validate;
    
    
    }

    getchargestotal() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const project = pm.getprojectbyid.call(this,projectid);
        let total = 0;
        if (project) {
            const projectid = project.projectid;
            const charges = pm.getchargesbyprojectid.call(this, projectid);
            if(charges) {
            // eslint-disable-next-line
            charges.map(charge => {
                total += Number(charge.amount);
            })
    
        }
    
    
    
        }
      
        return total;
    }
    

    getamountowed() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const invoiceid = activeparams.invoiceid;
        const invoiceitems =  pm.getinvoiceitemsbyid.call(this,projectid,invoiceid);
        let owed = 0;
        if (invoiceitems) {
            // eslint-disable-next-line
            invoiceitems.map(item => {
    
    
                if (item.hasOwnProperty("laborid")) {
    
                    if (!item.settlementid) {
    
                        owed += DirectCostForLabor(item)
                        owed += ProfitForLabor(item)
    
    
                    }
    
    
                } else if (item.hasOwnProperty("materialid")) {
    
    
                    if (!item.settlementid) {
    
    
                        owed += DirectCostForMaterial(item);
                        owed += ProfitForMaterial(item)
                    }
    
    
                } else if (item.hasOwnProperty("equipmentid")) {
                    if (!item.settlementid) {
    
    
                        owed += DirectCostForEquipment(item)
                        owed += ProfitForEquipment(item)
                    }
    
                }
    
            })
    
    
    
        }
        return owed;
    
    }
    balanceSummary() {
        const pm = new PM();
        const styles = MyStylesheet();
        const viewinvoice = new ViewInvoice();
        const debt = `$${Number(viewinvoice.getamountowed.call(this)).toFixed(2)}`;
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this)
        return (<View style={{ ...styles.generalFlex }}>
            <View style={{ ...styles.flex1 }}>
    
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...headerFont, ...styles.underline }}>Balance Summary</Text>
                </View>
                </View>
    
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}> Payment Due {debt} </Text>
                    </View>
                </View>
    
            </View>
        </View>)
    
    }

    showsummary() {
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const viewinvoice = new ViewInvoice();
        const biditems = viewinvoice.getitems.call(this);
        let amount = 0;
        const params = pm.getactiveparams.call(this)
        const invoiceid = params.invoiceid;
        const projectid = params.projectid;
        const myproject = pm.getprojectbyid.call(this,projectid);
        if(myproject) {

        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += viewinvoice.getbidprice.call(this,item.csiid)
            })
        }
        if (amount > 0) {
    
            return (
                <View style={[styles.generalFlex, styles.bottomMargin15 ]}>
                    <View style={[styles.flex1 ]}>
    
                        <View style={[styles.generalFlex ]}>
                            <View style={[styles.flex1 ]}>
                                <Text style={[headerFont, styles.generalFont,styles.underline]}>Invoice {invoiceid} Total</Text>
                            </View>
                        </View>
    
    
                        <View style={[styles.generalFlex ]}>
                            <View style={[styles.flex1, regularFont, styles.generalFont ]}>
                                <Text style={[regularFont, styles.generalFont]}> Please Pay the Amount of ${Number(amount).toFixed(2)} </Text>
                            </View>
                        </View>
    
                    </View>
                </View>
            )
        }
    }
    }
    
   
    invoicesummary() {
        const pm = new PM();
        const viewinvoice = new ViewInvoice();
        let invoiceamount = 0
        const biditems = viewinvoice.getitems.call(this);
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const activeparams = pm.getactiveparams.call(this)
        const invoiceid = activeparams.invoiceid;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                invoiceamount += viewinvoice.getbidprice.call(this,item.csiid)
            })
        }
        invoiceamount = invoiceamount + .3;

        const charges = pm.getchargesbyinvoiceid.call(this,invoiceid)
        let payments = 0;
        if (charges) {
            // eslint-disable-next-line
            charges.map(charge => {
                payments += charge.amount;
            })
        }
        invoiceamount = Number(invoiceamount).toFixed(2)
        payments = Number(payments).toFixed(2);
        const summary = () => {
        if (invoiceamount > payments) {
            return (
                <View style={[styles.generalFlex ]}>
                    <View style={[styles.flex1 ]}>

                        <View style={[styles.generalFlex,styles.bottomMargin30 ]}>
                            <View style={[styles.flex1 ]}>
                                <Text style={[regularFont]}>Please Pay the Amount of ${Number(viewinvoice.getamount.call(this)/100).toFixed(2)}</Text>
                            </View>

                        </View>

                        <View style={[styles.generalFlex,styles.bottomMargin15]}>
                            <View style={[styles.flex1,styles.alignCenter]}>
                            {viewinvoice.showapplepayments.call(this)}
                            </View>
                        </View>
                    </View>
                </View>

            )
        } else {
            return (<View style={[styles.generalFont, regularFont ]}><Text style={[regularFont]}>There is no Balance Due</Text></View>)
        }

    }

    return(
        <View style={[styles.generalFlex ]}>
    <View style={[styles.flex1]}>
    <View style={[styles.generalFlex ]}>
    <View style={[styles.flex1]}>
        <Text style={[headerFont,styles.underline]}>Invoice Summary </Text>
    </View>
    </View>
    {summary()}
</View>
</View>)

    }
    transferSummary() {
        const pm = new PM()
        const styles = MyStylesheet();
        const viewinvoice = new ViewInvoice();
       
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this,projectid);
        if(myproject) {
            const projectid = myproject.projectid;
        const transfers = pm.gettransfersbyprojectid.call(this,projectid);
        const sumoftransfers = () => {
            let sum = 0;
    
            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    sum += Number(transfer.amount)
                })
            }
            return sum;
        }
        let transferids = [];
        const jsx = (transferids) => {
            return (<View style={[ styles.generalFlex ]}>
                <View style={[ styles.flex1 ]}>
    
                    <View style={[ styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[ styles.flex1 ]}>
                            <Text style={[  headerFont, styles.underline ]}>Transfer Summary</Text>
                </View>
                    </View>
    
                    <View style={[ styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[ styles.flex1 ]}>
                            {transferids}
                        </View>
                    </View>
    
                    <View style={[ styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[ styles.flex1, regularFont ]}>
                        <Text style={[  regularFont ]}>Sum of Transfers  ${Number(sumoftransfers()).toFixed(2)} </Text>
                        </View>
                    </View>
    
    
                </View>
            </View>)
        }
    
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                transferids.push(viewinvoice.showtransfer.call(this,transfer))
    
            })
        }
        return (jsx(transferids))
    }
     
    }

    showsettlement(settlement) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const settled = inputUTCStringForLaborID(settlement.settled);
        //const account = pm.getaccountbydestination.call(this, transfer.destination)
        return (<View style={[styles.generalContainer]}  key={settlement.settlementid}>
            <Text style={[regularFont, styles.generalFont]}>Invoice Settled on {settled} for the Amount ${settlement.amount}</Text>
        </View>)
    }
    settlementSummary() {
        const pm = new PM()
        const styles = MyStylesheet();
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this,projectid);
        const viewinvoice = new ViewInvoice();
        if(myproject) {
            const invoiceid = activeparams.invoiceid;
        const settlements = pm.getsettlementsbyinvoiceid.call(this,invoiceid)
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const sumofsettlement = () => {
            let sum = 0;
    
            if (settlements) {
                // eslint-disable-next-line
                settlements.map(settlement => {
                    sum += Number(settlement.amount)
                })
            }
            return sum;
        }
        let settlementids = [];
        const jsx = (settlementids) => {
            return (<View style={[styles.generalFlex ]}>
                <View style={[styles.flex1 ]}>
    
                    <View style={[styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[styles.flex1 ]}>
                            <Text style={[headerFont, styles.underline ]}>Settlement Summary</Text>
                </View>
                    </View>
    
                    <View style={[styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[styles.flex1 ]}>
                            {settlementids}
                        </View>
                    </View>
    
                    <View style={[styles.generalFlex, styles.bottomMargin15 ]}>
                        <View style={[styles.flex1 ]}>
                        <Text style={[regularFont]}> Sum of Settlements  ${Number(sumofsettlement()).toFixed(2)}</Text>
                        </View>
                    </View>
    
    
                </View>
            </View>)
        }
    
    
    
        if (settlements) {
            // eslint-disable-next-line
            settlements.map(settlement => {
                settlementids.push(viewinvoice.showsettlement.call(this,settlement))
    
            })
        }
        return (jsx(settlementids))
    
    }
    }

    showtransfer(transfer) {
        const pm = new PM();
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        const created = inputUTCStringForLaborID(transfer.created);
        //const account = pm.getaccountbydestination.call(this, transfer.destination)
        return (
        <Text style={{ ...regularFont, ...styles.generalFont }} key={transfer.transferid}>
            Transfer Created {created} for the Amount ${transfer.amount}
        </Text>)
    }

    showinvoice() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const myproject = pm.getactiveproject.call(this)
        const invoiceid = params.invoiceid;
        const styles = MyStylesheet();
        const viewinvoice = new ViewInvoice();
        const myuser = pm.getuser.call(this);
        const headerFont = pm.getHeaderFont.call(this);
        const regularFont = pm.getRegularFont.call(this)
        const myinvoice = pm.getinvoicebyid.call(this, invoiceid);
        const amountowed = viewinvoice.getamountowed.call(this)
        const settlement = () => {
        
            if (amountowed) {
                return (
                    <View style={{ ...styles.generalContainer, ...styles.alignContentCenter, ...styles.bottomMargin15 }}>
                        <TouchableOpacity onPress={() => { viewinvoice.confirmSettlement.call(this) }}>
                             <Image source={require('./png/settleinvoice.png')}
                                                resizeMethod='scale'
                                                style={styles.settleinvoice}
                                            /> 
                       
                        </TouchableOpacity>
                    </View>)
            }
        }
        
        
        const updated = () => {
            if (myinvoice.updated) {
                return (<View style={[styles.generalFlex, styles.bottomMargin10]}>
                    <View style={[styles.flex1]}>
                        <Text style={[regularFont]}>Last Updated On {inputUTCStringForLaborID(myinvoice.updated)}</Text>
                    </View>
                </View>)
            }
        }
        if (myuser) {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>

                        <View style={[styles.generalFlex, styles.bottomMargin10]}>
                            <View style={[styles.flex1]}>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}</Text>
                                <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/invoice/{invoiceid}</Text>
                            </View>
                        </View>
                        {viewinvoice.showbidtable.call(this)}

                       


                        {updated()}
                        {viewinvoice.showsummary.call(this)}
                        {viewinvoice.transferSummary.call(this)}
                        {viewinvoice.settlementSummary.call(this)}
                        {viewinvoice.balanceSummary.call(this)}
                        {settlement()}
                   
                       
                    </View>
                </View>
            )
        } else {
            return (pm.loginMessage.call(this, "View Invoice"))
        }
    }
}
export default ViewInvoice