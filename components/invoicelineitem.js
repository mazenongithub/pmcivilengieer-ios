import React from 'react'
import { View, Text } from 'react-native'
import PM from './pm'
import { MyStylesheet } from './styles'
import {inputUTCStringForLaborID,calculatetotalhours,milestoneformatdatestring,DirectCostForLabor,DirectCostForMaterial,DirectCostForEquipment} from './functions';

class InvoiceLineItem {
    getlaboritems() {
        const invoicelineitem = new InvoiceLineItem();
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        const actual = pm.getAllActual.call(this)
        const csiid = params.invoice.csiid;
        const invoiceid = params.invoiceid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.invoiceid === invoiceid)) {
                laboritems.push(item)
            }
        })
    
        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {
                items.push(invoicelineitem.showlaborid.call(this,mylabor))
            })
    
        }
        return items;
    }
    
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const pm = new PM();
        let employee = pm.getproviderbyid.call(this, mylabor.providerid)
        let hourlyrate = mylabor.laborrate;
        const regularFont = pm.getRegularFont.call(this)
    
        return (
            <View style={[styles.generalFlex]} key={mylabor.laborid}>
                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}>  {employee.firstname} {employee.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}</Text>
                </View>
            </View> 
 )
    }

    getequipmentitems() {

        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const actual = pm.getAllActual.call(this)
        const csiid = params.invoice.csiid;
        const invoicelineitem = new InvoiceLineItem();
        const invoiceid = params.invoiceid;
        let equipmentitems = []
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.invoiceid === invoiceid)) {
                equipmentitems.push(item)
            }
        })
    
        if (equipmentitems.length > 0) {
            // eslint-disable-next-line
            equipmentitems.map(myequipment => {
                items.push(invoicelineitem.showequipmentid.call(this,myequipment))
            })
    
        }
        return items;
    
    }
    
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const pm = new PM();
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        const regularFont = pm.getRegularFont.call(this)
        return(
        <View style={[styles.generalFlex]} key={equipment.equipmentid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]}> {equipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}</Text>
            </View>
        </View>)
      
    }

    getmaterialitems() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const actual = pm.getAllActual.call(this)
        const csiid = params.invoice.csiid;
        const invoicelineitem = new InvoiceLineItem();
        const invoiceid = params.invoiceid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.invoiceid === invoiceid)) {
                laboritems.push(item)
            }
        })
    
        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mymaterial => {
                items.push(invoicelineitem.showmaterialid.call(this,mymaterial))
            })
    
        }
        return items;
    
    }
    
    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        return(
        <View style={[styles.generalFlex]} key={mymaterial.materialid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]}>{mymaterial.material} {milestoneformatdatestring(mymaterial.timein)} {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}</Text>
            </View>
        </View>
        )
       
    }

    getlabor() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this)
        const actual = pm.getAllActual.call(this)
        const csiid = params.invoice.csiid;
        
        const invoiceid = params.invoiceid;
        let laboritems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.invoiceid === invoiceid)) {
                laboritems.push(item)
            }
        })
    
    
        return laboritems;
    }
    getlabortotal() {
        const invoicelineitem = new InvoiceLineItem();
        let items = invoicelineitem.getlabor.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForLabor(item)
            })
        }
        return cost;
    }

    getmaterial() {
        const pm = new PM();
        const params= pm.getactiveparams.call(this)
        const actual = pm.getAllActual.call(this)
        const csiid = params.invoice.csiid;
        const invoiceid = params.invoiceid
        let materialitems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.invoiceid === invoiceid)) {
                materialitems.push(item)
            }
        })
    
    
        return materialitems;
    
    }
    getmaterialtotal() {
        const invoicelineitem = new InvoiceLineItem();
        let items = invoicelineitem.getmaterial.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForMaterial(item)
            })
        }
        return cost;
    }

    getequipment() {
        const pm = new PM();
            const params = pm.getactiveparams.call(this)
            const actual = pm.getAllActual.call(this)
            const csiid = params.invoice.csiid;
            const invoiceid = params.invoiceid
        let equipmentitems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.invoiceid === invoiceid)) {
                equipmentitems.push(item)
            }
        })
    
        return equipmentitems;
    
    }
    getequipmenttotal() {
        const invoicelineitem = new InvoiceLineItem();
        let items = invoicelineitem.getequipment.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForEquipment(item)
            })
        }
        return (cost)
    }
    
    showinvoicelineitem() {
        const pm = new PM();
        const styles = MyStylesheet();
        const params = pm.getactiveparams.call(this)
        const myproject = pm.getactiveproject.call(this)
        const invoiceid = params.invoiceid;
        const csi = pm.getcsibyid.call(this, params.invoice.csiid)
        const invoicelineitem = new InvoiceLineItem();
        const labortotal = invoicelineitem.getlabortotal.call(this)
        const materialtotal = invoicelineitem.getmaterialtotal.call(this)
        const equipmenttotal = invoicelineitem.getequipmenttotal.call(this)
        const total = (labortotal + materialtotal + equipmenttotal).toFixed(2)
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const headerFont = pm.getHeaderFont.call(this)
        if(myuser) {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}/invoice/{invoiceid}</Text>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/csi/{csi.csi}-{csi.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]}> Labor </Text>
                        </View>
                    </View>
                    {invoicelineitem.getlaboritems.call(this)}



                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]}> Equipment </Text>
                        </View>
                    </View>

                    {invoicelineitem.getequipmentitems.call(this)}

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]}> Materials </Text>
                        </View>
                    </View>

                    {invoicelineitem.getmaterialitems.call(this)}

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont]}> Total Labor ${labortotal.toFixed(2)}  </Text>
                            <Text style={[regularFont]}> Total Materials ${materialtotal.toFixed(2)}  </Text>
                            <Text style={[regularFont]}> Total Equipment ${equipmenttotal.toFixed(2)} </Text>
                            <Text style={[regularFont]}> Total ${total} </Text>
                        </View>
                    </View>

                </View>
            </View>
        )
        } else {
            return(pm.loginMessage.call(this,"Proposal Line Item"))
        }
    }
}

export default InvoiceLineItem