import React from 'react';
import { MyStylesheet } from './styles';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay } from './functions'
import PM from './pm';
import {View, Text} from  'react-native'
import ProjectID from './projectid';


class LineItem {


    getlaboritems() {
        const pm = new PM();
        const lineitem = new LineItem();
        const activeparams = pm.getnavigation.call(this)
        const csiid = activeparams.costestimate.csiid;
        const labor = lineitem.getlabor.call(this);
       

        let items = [];
        if (labor) {
            // eslint-disable-next-line
            labor.map(item => {
                if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid)) {
                    items.push(lineitem.showlaborid.call(this, item))
                }
            })

        }


        return items;
    }
    getlabor() {
        const pm = new PM();
        const activeparams = pm.getnavigation.call(this)
        const projectid = activeparams.projectid;
        const estimate = pm.getcostestimate.call(this, projectid)

        let laboritems = [];
        if (estimate) {
            // eslint-disable-next-line
            if (estimate.hasOwnProperty("labor")) {
                laboritems = estimate.labor;
            }

        }
        console.log(laboritems,"laboritems")


        return laboritems;
    }
    getlabortotal() {
        const lineitem = new LineItem()
        let items = lineitem.getlabor.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForLabor(item)
            })
        }
        return cost;
    }
    getmaterialitems() {
        const pm = new PM();
        const lineitem = new LineItem();
        const materials = lineitem.getmaterial.call(this);
        const activeparams = pm.getnavigation.call(this)
        const csiid = activeparams.costestimate.csiid;
        let items = [];
        if (materials) {
            // eslint-disable-next-line
            materials.map(item => {
                if ((item.hasOwnProperty("materialid")) && item.csiid === csiid) {
                    items.push(lineitem.showmaterialid.call(this, item))
                }
            })

        }
        return items;

    }
    getmaterial() {
        const pm = new PM();
        let materialitems = [];
        const activeparams = pm.getnavigation.call(this)
        const projectid = activeparams.projectid;
        const estimate = pm.getcostestimate.call(this, projectid)
        if (estimate.hasOwnProperty("materials")) {
            materialitems = estimate.materials;
        }


        return materialitems;

    }
    getmaterialtotal() {
        const pm = new PM();
        const lineitem = new LineItem();
        const activeparams = pm.getnavigation.call(this)
        const csiid = activeparams.costestimate.csiid;
        let items = lineitem.getmaterial.call(this);
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
        const activeparams = pm.getnavigation.call(this)
        const csiid = activeparams.costestimate.csiid;
        const projectid = activeparams.projectid;
        const estimate = pm.getcostestimate.call(this,projectid)
        let equipment = [];
        if (estimate) {
            if (estimate.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                estimate.equipment.map(item => {
                    if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
                        equipment.push(item)

                    }


                })


            }
        }
        return equipment;
    }

    getequipmentitems() {
        const lineitem = new LineItem();
        const pm = new PM();
        const activeparams = pm.getnavigation.call(this)
        const csiid = activeparams.costestimate.csiid;
        const projectid = activeparams.projectid;
        const estimate = pm.getcostestimate.call(this,projectid)
        let equipmentitems = [];
        if (estimate.hasOwnProperty("equipment")) {
            // eslint-disable-next-line
            estimate.equipment.map(item => {
                if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
                    equipmentitems.push(lineitem.showequipmentid.call(this, item))
                }
            })

        }

        return equipmentitems;

    }
    getequipmenttotal() {
        const lineitem = new LineItem()
        let items = lineitem.getequipment.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForEquipment(item)
            })
        }
        return (cost)
    }

    getitemtotal() {
        const lineitem = new LineItem();
        let labortotal = lineitem.getlabortotal.call(this);
        let materialtotal = lineitem.getmaterialtotal.call(this);
        let equipmenttotal = lineitem.getequipmenttotal.call(this);
        let total = labortotal + materialtotal + equipmenttotal;
        return total;
    }
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)


        let hourlyrate = mylabor.laborrate;

        return (<View key={mylabor.laborid} style={{ ...styles.generalContainer }}>

            <Text style={{ ...styles.generalFont, ...regularFont }}>{mylabor.firstname} {mylabor.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}</Text>

        </View>)
    }

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);

        return (<View style={{ ...styles.generalContainer }} key={mymaterial.materialid}>
            <Text style={{ ...regularFont, ...styles.generalFont }} key={mymaterial.materialid}>{mymaterial.material}{formatDateStringDisplay(mymaterial.timein)} {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)} </Text>
        </View>)
    }

    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        return (<View style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
            <Text style={{ ...styles.generalFont, ...regularFont }}>{equipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount} </Text>

        </View>)
    }

    showlinedetail() {
        const pm = new PM();
        const styles = MyStylesheet();
        const lineitem = new LineItem();
        const regularFont = pm.getRegularFont.call(this);
        const totallabor = `$${Number(lineitem.getlabortotal.call(this)).toFixed(2)}`
        const totalmaterials = `$${Number(lineitem.getmaterialtotal.call(this)).toFixed(2)}`
        const totalequipment = `$${Number(lineitem.getequipmenttotal.call(this)).toFixed(2)}`
        const totalamount = `$${Number(lineitem.getitemtotal.call(this)).toFixed(2)}`


        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalContainer }}>

                        <View style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}>Labor</Text>
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.showBorder }}>
                            {lineitem.getlaboritems.call(this)}
                        </View>

                    </View>

                    <View style={{ ...styles.generalContainer }}>

                        <View style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}> Materials</Text>
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.showBorder }}>
                            {lineitem.getmaterialitems.call(this)}
                        </View>


                    </View>
                    <View style={{ ...styles.generalContainer }}>

                        <View style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}> Equipment </Text>
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.showBorder }}>
                            {lineitem.getequipmentitems.call(this)}
                        </View>

                    </View>
                    <View style={{ ...styles.generalContainer }}>
                        <View style={{ ...styles.generalContainer }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}> Total Labor {totallabor} </Text>
                        </View>
                        <View style={{ ...styles.generalContainer }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}> Total Materials {totalmaterials} </Text>
                        </View>
                        <View style={{ ...styles.generalContainer }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}> Total Equipment {totalequipment} </Text>
                        </View>
                        <View style={{ ...styles.generalContainer }}>
                            <Text style={{ ...styles.generalFont, ...regularFont }}> Total {totalamount} </Text>
                        </View>
                    </View>


                </View>
            </View>
        )




    }



    showlineitem() {
        const pm = new PM();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const activeparams = pm.getnavigation.call(this);
        const csiid = activeparams.costestimate.csiid;
        const lineitem = new LineItem();
        const csi = pm.getcsibyid.call(this, csiid);
        const projectid  =  new ProjectID();
        const myproject = pm.getprojectbyid.call(this,activeparams.projectid)
        if(myproject) {
        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

          

                    {lineitem.showlinedetail.call(this)}
                    {projectid.showprojectid.call(this,myproject)}


                </View>
            </View>)

        }

    }

}

export default LineItem