import React from 'react';
import { View, Text} from 'react-native';
import { MyStylesheet } from './styles';
import PM from './pm'
import {inputUTCStringForLaborID} from './functions'

class Invoices {

    showinvoice(myinvoice) {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this)
        const myprovider = pm.getproviderbyid.call(this, myinvoice.providerid)
        const handlemyprovider = () => {
            if (myprovider) {
                return (`by ${myprovider.firstname} ${myprovider.lastname}`)
            } else {
                return;
            }
        }
        const lastupdated = () => {
            if(myinvoice.updated) {
                return(`Last Updated ${inputUTCStringForLaborID(myinvoice.updated)}`)
            } else {
                return ("")
            }
        }
        const lastapproved = () => {
            if(myinvoice.approved) {
                return(`Last Approved ${inputUTCStringForLaborID(myinvoice.approved)}`)
            } else {
                return ("")
            }
        }

        return(
        <View style={[styles.generalFlex, styles.bottomMargin10]} key={myinvoice.invoiceid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]} onPress={()=>{this.handleviewinvoice(myinvoice.invoiceid)}}>InvoiceID {myinvoice.invoiceid} {lastupdated()} {lastapproved()} {handlemyprovider()}</Text>
            </View>
        </View>
        )
    }

    showmyinvoices() {
        const pm = new PM();
        const invoices = new Invoices()
        const  myinvoices = pm.getinvoices.call(this);
        let invoice = [];
        if (myinvoices) {
            // eslint-disable-next-line
            myinvoices.map(myinvoice => {
                invoice.push(invoices.showinvoice.call(this,myinvoice))
            })
    
        }
        return invoice;
    }

showinvoices() {
    const pm = new PM();
    const styles = MyStylesheet();
    const headerFont = pm.getHeaderFont.call(this);
    const myproject = pm.getactiveproject.call(this);
    const invoices = new Invoices();
    const myuser = pm.getuser.call(this);
    if(myuser) {
    return( <View style={[styles.generalFlex]}>
        <View style={[styles.flex1]}>

            <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1]}>
                    <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/{myproject.title}</Text>
                    <Text style={[styles.boldFont, styles.alignCenter, headerFont]}>/invoices/ </Text>
                </View>
            </View>

            {invoices.showmyinvoices.call(this)}
            
        </View>
        </View>)
    } else {
        return(pm.loginMessage.call(this,invoices))
    }
}

}
export default Invoices;