import React from 'react';
import { View, Text} from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import {inputUTCStringForLaborID} from './functions'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Proposals {

    showproposal(myproposal) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const myprovider = pm.getproviderbyid.call(this, myproposal.providerid)
        const handlemyprovider = () => {
            if (myprovider) {
                return (`by ${myprovider.firstname} ${myprovider.lastname}`)
            } else {
                return;
            }
        }
        const lastupdated = () => {
            if(myproposal.updated) {
                return(`Last Updated ${inputUTCStringForLaborID(myproposal.updated)}`)
            } else {
                return ("")
            }
        }
        const lastapproved = () => {
            if(myproposal.approved) {
                return(`Last Approved ${inputUTCStringForLaborID(myproposal.approved)}`)
            } else {
                return ("")
            }
        }

        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]} key={myproposal.proposalid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]} onPress={()=>{this.handleviewproposal(myproposal.proposalid)}}>ProposalID {myproposal.proposalid} {lastupdated()} {lastapproved()} {handlemyprovider()}</Text>
            </View>
        </View>
        )
    }

    showmyproposals() {
        const pm = new PM();
        const proposals = new Proposals()
        const  myproposals = pm.getproposals.call(this);
        let proposal = [];
        if (myproposals) {
            // eslint-disable-next-line
            myproposals.map(myproposal => {
                proposal.push(proposals.showproposal.call(this,myproposal))
            })
    
        }
        return proposal;
    }

showproposals() {
    const pm = new PM();
    const styles = MyStylesheet();
    const headerFont = pm.getHeaderFont.call(this);
    const myproject = pm.getactiveproject.call(this);
    const proposals = new Proposals();
    const myuser = pm.getuser.call(this);
    if(myuser) {

   
    return( 
    <View style={[styles.generalFlex]}>
        <View style={[styles.flex1]}>

            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
                    <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/{myproject.title} </Text>
                    <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/proposals/ </Text>
                </View>
            </View>

            {proposals.showmyproposals.call(this)}
            
        </View>
        </View>)
    } else {
        return(pm.loginMessage.call(this,"Proposals"))
    }
}

}
export default Proposals;