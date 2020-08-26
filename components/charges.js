import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { MyStylesheet } from './styles';
import { inputUTCStringForLaborID } from './functions';
import PM from './pm';
import ProjectID from './projectid';
import ViewInvoice from './viewinvoice';
import { AddCharge } from './actions/api';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

class Charges {

    async processApplePay() {
        const pm = new PM();
        const params = pm.getactiveparams.call(this);
        let total_price = this.state.chargeamount.toString();
        const myuser = pm.getuser.call(this)
        const providerid = myuser.providerid;
        const projectid = params.projectid;
        const amount = Number(total_price).toFixed(2);
        const myproject = pm.getprojectbyid.call(this, projectid)
        if (myproject) {
            const i = pm.getprojectkeybyid.call(this, projectid)
            
            const items = [
                {
                    label: `Payment for Project ID ${projectid}`,
                    amount
                }
            ];
            const options = {
                total_price,
                currency_code: 'USD',
                billing_address_required: true,
                line_items: [
                    {
                        currency_code: 'USD',
                        description: `Payment for Project ID ${projectid}`,
                        total_price,
                        unit_price: total_price,
                        quantity: '1',
                    }
                ],
            };

            try {

                const token = await Stripe.paymentRequestWithApplePayAsync(items, options);

                if (token.hasOwnProperty("tokenId")) {

                    try {

                        let values = { providerid, projectid, token, amount: this.state.chargeamount }

                        let response = await AddCharge(values)
                        console.log(response)
                        if (response.hasOwnProperty("charges")) {

                            myuser.projects.myproject[i].charges = response.charges;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                        if (response.hasOwnProperty("message")) {
                            this.setState({ message: response.message })
                        }
                        Stripe.completeApplePayRequestAsync();

                    } catch (err) {
                        alert(err)
                    }

                }
            } catch (error) {
                alert(error)
            }


        }

    }



    getchargeamount() {
        return this.state.chargeamount;

    }

    handlechargeamount(chargeamount) {
        let amount = (chargeamount * (.942)) - .3
        this.setState({ chargeamount, amount: Number(amount).toFixed(2) })

    }

    getamount() {
        return this.state.amount;

    }

    handleamount(amount) {
        let chargeamount = (Number(amount) / .942) + .3 + .3 * (1 - .942) + .3 * Math.pow((1 - .942), 2)
        this.setState({ chargeamount: Number(chargeamount).toFixed(2), amount })
    }

    transferSummary() {
        const pm = new PM()
        const styles = MyStylesheet();

        const viewinvoice = new ViewInvoice();
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this)

        let transferids = [];

        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid);
        if (myproject) {
          
            const transfers = pm.gettransfersbyprojectid.call(this, projectid);

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

            const jsx = (transferids) => {
                return (<View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...headerFont, ...styles.underline }}>Transfer Summary</Text>
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                {transferids}
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont }}>Sum of Transfers  ${Number(sumoftransfers()).toFixed(2)} </Text>
                            </View>
                        </View>


                    </View>
                </View>)
            }



            if (transfers) {
                // eslint-disable-next-line
                transfers.map(transfer => {
                    transferids.push(viewinvoice.showtransfer.call(this, transfer))

                })
            }
            return (jsx(transferids))
        }


    }
    getsumofcharges() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid);
        let amount = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("charges")) {
                // eslint-disable-next-line
                myproject.charges.map(charge => {
                    amount += Number(charge.amount)
                })
            }
        }
        return amount;
    }

    showchargesummary() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid);
        const styles = MyStylesheet();
        const regularFont = pm.getRegularFont.call(this)
        let amount = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("charges")) {
                // eslint-disable-next-line
                myproject.charges.map(charge => {
                    amount += Number(charge.amount)
                })
            }
        }
        return (<View style={{ ...styles.generalContainer }}>
            <Text style={{ ...regularFont, ...styles.generalFont }}>Sum of Charges ${Number(amount).toFixed(2)}</Text>
        </View>)
    }
    showcharges() {
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this, projectid);
        const charges = new Charges();
        let mycharges = [];
        if (myproject) {
            if (myproject.hasOwnProperty("charges")) {
                // eslint-disable-next-line
                myproject.charges.map(charge => {
                    mycharges.push(charges.showcharge.call(this, charge))
                })
            }
        }
        return mycharges;
    }


    showcharge(charge) {
        const pm = new PM();
        const styles = MyStylesheet();
        const created = inputUTCStringForLaborID(charge.created);
        const regularFont = pm.getRegularFont.call(this)
        return (<View style={{ ...styles.generalContainer }} key={charge.chargeid}>
            <Text style={{ ...regularFont, ...styles.generalFont }}>Charge Captured on {created} for the Amount ${charge.amount} </Text></View>)

    }

    balanacesummary() {
        const pm = new PM();
        const charges = new Charges();
        const headerFont = pm.getHeaderFont.call(this)
        const sumofcharges = charges.getsumofcharges.call(this);
        const activeparams = pm.getactiveparams.call(this)
        const projectid = activeparams.projectid;
        const myproject = pm.getprojectbyid.call(this,projectid);
        if(myproject) {
        const sumoftransfers = pm.getsumoftransfers.call(this,projectid);
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();
        return (<View style={{ ...styles.generalContainer }}>
            <View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.generalFont, ...headerFont, ...styles.underline }}>Balance Summary </Text>
            </View>
            <View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>Sum of Charges ${Number(sumofcharges).toFixed(2)} </Text>
            </View>
            <View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>Sum of Transfers ${Number(sumoftransfers).toFixed(2)} </Text>
            </View>
            <View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>Net Balance ${Number(Number(sumofcharges) - Number(sumoftransfers)).toFixed(2)} </Text>
            </View>
        </View>)

        }
    }

    showapplepayments() {
        const pm = new PM();
        const styles = MyStylesheet();
        const myuser = pm.getuser.call(this);
        const applepayicon = pm.getapplepayicon.call(this)
        const params = pm.getactiveparams.call(this)
        const projectid = params.projectid;
        let myproject = pm.getprojectbyid.call(this, projectid);
        const charges = new Charges();
        if (myproject) {
            if (myuser) {
                if (this.state.applepay) {
                    return (
                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, styles.alignContentCenter]}>
                                <TouchableOpacity onPress={() => { charges.processApplePay.call(this) }}>
                                    <Image source={require('./png/applepay.png')}
                                        resizeMethod='scale'
                                        style={applepayicon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }


            }

        }

    }

    getcharges() {
        const styles = MyStylesheet();
        const pm = new PM();
        const activeparams = pm.getactiveparams.call(this);
        const getprojectid = activeparams.projectid;
        const project = pm.getprojectbyid.call(this, getprojectid);
        const headerFont = pm.getHeaderFont.call(this)
        const regularFont = pm.getRegularFont.call(this);
        const projectid = new ProjectID();
        const charges = new Charges();
        if (project) {
            const title = project.title;

            return (
                <View style={{ ...styles.generalFont }}>
                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...styles.alignCenter, ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/{title}</Text>
                                <Text style={{ ...styles.alignCenter, ...headerFont, ...styles.generalFont,...styles.boldFont }}>Charges</Text>
                            </View>
                        </View>

                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont, ...styles.addRightMargin }}>Payment Amount</Text><TextInput
                                value={charges.getchargeamount.call(this)}
                                onChangeText={text => { charges.handlechargeamount.call(this, text) }}
                                style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin15, ...styles.defaultInput }} />
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <Text style={{ ...styles.generalFont, ...regularFont, ...styles.addRightMargin }}>Charge Amount</Text>
                            <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin15, ...styles.defaultInput }}
                                value={charges.getamount.call(this)}
                                onChangeText={text => { charges.handleamount.call(this, text) }}
                            />
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                            {charges.showapplepayments.call(this)}
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.generalContainer }}>
                                <Text style={{ ...headerFont, ...styles.generalFont, ...styles.underline }}>Charge Summary </Text>
                            </View>

                            {charges.showcharges.call(this)}
                            {charges.showchargesummary.call(this)}

                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            {charges.transferSummary.call(this)}
                        </View>
                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            {charges.balanacesummary.call(this)}
                        </View>

                        {projectid.showprojectid.call(this, project)}

                    </View>
                </View>
            )

        }
    }

}


export default Charges;