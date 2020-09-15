import React from 'react';
import { MyStylesheet } from './styles'
import PM from './pm'
import {View, Text} from 'react-native';
import { DirectCostForLabor, DirectCostForMaterial, DirectCostForEquipment, ProfitForEquipment, ProfitForMaterial, ProfitForLabor} from './functions'
import ProjectID from './projectid';


class CostEstimate {


    getprofit(csiid) {
        const pm = new PM()
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const project = pm.getprojectbyid.call(this, projectid)
        let directcost = 0;
        let profit = 0;
        if (project) {
            
            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(labor => {
                        if (labor.csiid === csiid) {
                            directcost += DirectCostForLabor(labor);
                            profit += ProfitForLabor(labor)
                           
                        }

                    })

                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(material => {
                        if (material.csiid === csiid) {
                            directcost += DirectCostForMaterial(material);
                            profit += ProfitForMaterial(material)
                        }

                    })

                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(equipment => {
                        if (equipment.csiid === csiid) {
                            directcost += DirectCostForEquipment(equipment);
                            profit += ProfitForEquipment(equipment)
                        }

                    })

                }






            }

        }
 
        if (profit && directcost > 0) {
       
            return +Number((profit / directcost) * 100).toFixed(4)
        } else {
            return 0;
        }

    }

    getdirectcost(csiid) {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        let project = pm.getprojectbyid.call(this, projectid);
        let directcost = 0;
        if (project) {

            if (project.hasOwnProperty("costestimate")) {

                if (project.costestimate.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    project.costestimate.labor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            directcost += DirectCostForLabor(mylabor)

                        }
                    })
                }

                if (project.costestimate.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    project.costestimate.materials.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            directcost += DirectCostForMaterial(mymaterial)
                        }

                    })
                }

                if (project.costestimate.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    project.costestimate.equipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {
                            directcost += DirectCostForEquipment(myequipment)
                        }

                    })
                }

            }
        }

        return directcost;

    }
    getbiditems() {
        const pm = new PM();
        const myuser = pm.getuser.call(this);
        const validatecsis = (csis, csiid) => {
            let validate = true;
            // eslint-disable-next-line
            csis.map(csi => {
                if (csi.csiid === csiid) {
                    validate = false;
                }
            })
            return validate;

        }
        let csis = [];
        if (myuser) {
            const activeparams = pm.getactiveparams.call(this)
            const projectid = activeparams.projectid;
            const project = pm.getprojectbyid.call(this, projectid);
     
            if (project) {
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        project.costestimate.labor.map(labor => {
                            if (validatecsis(csis, labor.csiid)) {
                                csis.push({ csiid: labor.csiid })
                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        project.costestimate.materials.map(material => {
                            if (validatecsis(csis, material.csiid)) {
                                csis.push({ csiid: material.csiid })
                            }
                        })

                    }

                    if (project.costestimate.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        project.costestimate.equipment.map(equipment => {
                            if (validatecsis(csis, equipment.csiid)) {
                                csis.push({ csiid: equipment.csiid })
                            }
                        })

                    }


                }
            }
        }
        return csis;

    }

    getbidprice(csiid) {
        const costestimate = new CostEstimate();
        let directcost = Number(costestimate.getdirectcost.call(this,csiid));
        let profit = Number(costestimate.getprofit.call(this,csiid));
      
   
        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }

 

    showbiditem(biditem) {
        const costestimate = new CostEstimate();
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const csi = pm.getcsibyid.call(this, biditem.csiid);
        if(!csi) {
            pm.loadcsis.call(this)
        }
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const project = pm.getprojectbyid.call(this, projectid);
        const directcost = Number(costestimate.getdirectcost.call(this,biditem.csiid)).toFixed(2)
        const profit = +Number(costestimate.getprofit.call(this,biditem.csiid)).toFixed(4);
        const bidprice = Number(costestimate.getbidprice.call(this,biditem.csiid)).toFixed(2);
      
        const myuser = pm.getuser.call(this)
        if(myuser) {
        if (project) {
            const bidschedule = pm.getcostestimatebycsiid.call(this, projectid, biditem.csiid);
            console.log("bidschedule",bidschedule)
            const quantity = bidschedule.quantity;
            const unit = bidschedule.unit;
            console.log("unitprice", biditem.csiid,quantity)
            const unitprice = () => {
                if(biditem.csiid && quantity) {
                   
                    return( Number(costestimate.getbidprice.call(this,biditem.csiid) / quantity).toFixed(2))
                } else {
                    return(0)
                }

            }

           

                return (
                    <View style={{ ...styles.generalFlex }} key={biditem.csiid}>
                        <View style={{ ...styles.flex1 }}>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <Text style={{ ...styles.generalFont, ...regularFont }} onPress={()=>{this.handlecostestimatelineid(csi.csiid)}}>{csi.csi}-{csi.title}</Text>
                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}> Quantity</Text>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{quantity}</Text>

                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}> Unit</Text>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{unit} </Text>
                                </View>

                            </View>


                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}> Direct Cost</Text>
                                    <Text style={{ ...styles.generalFont, ...regularFont }}>${directcost}</Text>
                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}> Profit</Text>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}>{profit}</Text>
                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}> Bid Price</Text>
                                    <Text style={{ ...styles.generalFont, ...regularFont }}>${bidprice}</Text>
                                </View>
                                <View style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <Text style={{ ...styles.generalFont, ...regularFont,  ...styles.alignCenter }}> Unit Price</Text>
                                    <Text style={{ ...styles.generalFont, ...regularFont }}>${unitprice()}</Text>
                                </View>

                            </View>


                        </View>

                    </View>
                )


        }
    }
    }

    showbiditems() {
        const costestimate = new CostEstimate();
        const biditems = costestimate.getbiditems.call(this);
      
        let items = [];
        if (biditems) {
            // eslint-disable-next-line
            biditems.map(biditem => {
                items.push(costestimate.showbiditem.call(this,biditem))

            })
        }
        return items;

    }

    showcostestimate() {
        const pm = new PM();
        const costestimate = new CostEstimate();
        const styles = MyStylesheet();
        const headerFont = pm.getHeaderFont.call(this)
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const showprojectid = new ProjectID();
  
        const myproject = pm.getprojectbyid.call(this,projectid)
        if(myproject) {
        return (
            <View style={{ ...styles.generalFont }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1}}>
                         
                           <Text style={{...headerFont, ...styles.boldFont, ...styles.alignCenter }}> /{myproject.title} </Text> 
                           <Text style={{...headerFont, ...styles.boldFont, ...styles.alignCenter }}> /costestimate </Text> 
                        </View>
                    </View>


                    {costestimate.showbiditems.call(this)}

                    {showprojectid.showprojectid.call(this,myproject)}





                </View>
            </View>)

        }
    }

}


export default CostEstimate;