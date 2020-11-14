import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PM from './pm';
import { MyStylesheet } from './styles';


class Header {



    showmenu() {
        const styles = MyStylesheet();
        const pm = new PM();
        const myuser = pm.getuser.call(this)
        const headerFont = pm.getHeaderFont.call(this)

        const link_1 = (myuser) => {
            if (myuser) {
                return (<Text onPress={() => { this.handleprofile() }} className="nav-link" style={{ ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter }}>  /{myuser.profile} </Text>);
            } else {
                return (<Text onPress={() => { this.handlelanding() }} style={{ ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter  }}> / </Text>);
            }

        }

        const launchwidth = () => {
            return ({ width: 65, height:52 })
        }

        const closeicon = () => {
            return ({ width: 42, height:30 })
        }




        const link_2 = (myuser) => {
            if (myuser) {
                return (<Text style={{ ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter  }} onPress={() => { this.handlemyprojects() }}>  /myprojects  </Text>);
            } else {
                return (<Text onPress={() => { this.handleregister() }} style={{ ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter  }}> /register </Text>);
            }

        }



        const link_3 = (myuser) => {
            if (myuser) {
                return (<Text onPress={() => { pm.logoutuser.call(this) }} style={{ ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter  }}> /logout </Text>
                )
            } else {
                return (<Text onPress={() => { this.handlelogin() }} style={{ ...styles.generalFont, ...headerFont, ...styles.generalText, ...styles.fontBold, ...styles.alignCenter  }}> /login </Text>)
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
                        <View style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder,...styles.generalPadding }}>{link_2(myuser)}</View>
                        <View style={{ ...styles.generalContainer, ...styles.topHeader, ...styles.bottomMargin15, ...styles.showBorder,...styles.generalPadding }}>{link_3(myuser)}</View>
                    </View>)

            }
        }

        if (this.state.width > 600) {
            return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter,...styles.generalPadding }}>
                    {link_1(myuser)}
                </View>
                <View style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter,...styles.generalPadding }}>
                    {link_2(myuser)}
                </View>
                <View style={{ ...styles.flex1, ...styles.topHeader, ...styles.showBorder, ...styles.addMargin, ...styles.alignCenter,...styles.generalPadding }}>
                    {link_3(myuser)}
                </View>

            </View>)

        } else {

            return (<View style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
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
                return ({ width: 232, height:174 })

            } else if (this.state.width > 600) {
                return ({ width: 226, height:170 })

            } else {
                return ({ width: 154, height:116 })

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
                        <TouchableOpacity onPress={()=>{this.checkuserlogin()}}>
                            <Image source={require('./png/pmlogo.png')}
                                resizeMethod='scale'
                                style={{ ...logowidth() }}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {header.showmenu.call(this)}




            </View>
        </View>)
    }
}

export default Header;