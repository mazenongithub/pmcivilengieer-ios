import React from 'react';
import { MyStylesheet } from './styles'
import PM from './pm'
import { LetterCounter, getListNumber } from './functions';
import { View, Text } from 'react-native';
import Specifications from './specifications';

class Specification {



    showspecification() {
        const pm = new PM();
        const activeparams = pm.getnavigation.call(this)
     
        let csiid =  false;
        if(activeparams.hasOwnProperty("specifications")) {
      
           csiid =  activeparams.specifications.csiid;
        }
        
        const myuser = pm.getuser.call(this)
        const regularFont = pm.getRegularFont.call(this)
        const styles = MyStylesheet();

        if (myuser) {

            const projectid = activeparams.projectid;
            const project = pm.getprojectbyid.call(this, projectid);


            if (project) {
                
                if (!project.hasOwnProperty("specifications")) {
                    pm.loadprojectspecs.call(this, project.projectid)
                }
                const spec = pm.getspecficationbycsi.call(this, projectid, csiid)
                
                console.log("spec", spec, projectid, csiid)
                if (spec) {

                 

                    const activebackground = (contentid) => {
                        if (this.state.activecontentid === contentid) {

                            return { backgroundColor: '#D7A22A' }
                        }
                    }




                    const showparagraph = () => {
                        let paragraphs = [];

                        if (spec.hasOwnProperty("paragraph")) {

                            if (spec.paragraph.hasOwnProperty("list")) {
                                // eslint-disable-next-line
                                spec.paragraph.list.map((list, i) => {

                                    const listtype_1 = () => {

                                        return (` ${getListNumber(spec.paragraph.listType, i + 1, false)} `)

                                    }

                                    paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.bottomMargin10 }} key={list.contentid}>
                                        <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid) }} onClick={() => { this.makelistactive(list.contentid) }}> {listtype_1()}
                                            {list.content}</Text>

                                    </View>)



                                    if (list.hasOwnProperty("sublist")) {
                                        if (list.sublist.hasOwnProperty("list")) {
                                            // eslint-disable-next-line
                                            list.sublist.list.map((sublist, j) => {

                                                const listtype_2 = () => {

                                                    return (` ${getListNumber(list.sublist.listType, j + 1, i + 1)} `)
                                                }

                                                paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft30, ...styles.bottomMargin10 }} key={sublist.contentid}>
                                                    <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}> {listtype_2()}
                                                        {sublist.content}</Text>

                                                </View>)


                                                if (sublist.hasOwnProperty("sublist")) {
                                                    if (sublist.sublist.hasOwnProperty("list")) {
                                                        // eslint-disable-next-line
                                                        sublist.sublist.list.map((sublist_1, k) => {

                                                            const listtype_3 = () => {

                                                                return (` ${getListNumber(sublist.sublist.listType, k + 1, j + 1)} `)
                                                            }


                                                            paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft60, ...styles.bottomMargin10 }} key={sublist_1.contentid}>
                                                                <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}> {listtype_3()}
                                                                    {sublist_1.content}</Text>

                                                            </View>)


                                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                                if (sublist_1.sublist.hasOwnProperty("list")) {
                                                                    // eslint-disable-next-line
                                                                    sublist_1.sublist.list.map((sublist_2, l) => {

                                                                        const listtype_4 = () => {

                                                                            return (` ${getListNumber(sublist_1.sublist.listType, l + 1, k + 1)} `)
                                                                        }

                                                                        paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft90, ...styles.bottomMargin10 }} key={sublist_2.contentid}>
                                                                            <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}> {listtype_4()}
                                                                                {sublist_2.content}</Text>

                                                                        </View>)


                                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                                            if (sublist_2.sublist.hasOwnProperty("list")) {
                                                                                // eslint-disable-next-line
                                                                                sublist_2.sublist.list.map((sublist_3, m) => {

                                                                                    const listtype_5 = () => {

                                                                                        return (` ${getListNumber(sublist_2.sublist.listType, m + 1, k + 1)} `)
                                                                                    }




                                                                                    paragraphs.push(<View style={{ ...styles.generalContainer, ...styles.marginLeft120, ...styles.bottomMargin10 }} key={sublist_3.contentid}>
                                                                                        <Text style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_3.contentid) }}> {listtype_5()}
                                                                                            {sublist_3.content}</Text>

                                                                                    </View>)

                                                                                })


                                                                            }
                                                                        }



                                                                    })




                                                                }
                                                            }




                                                        })




                                                    }
                                                }



                                            })

                                        }





                                    }


                                })




                            }

                        }




                        return paragraphs;
                    }




                    return (
                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>

                                {showparagraph()}
                            </View>
                        </View>
                    )

                }

            }
        }

    }


    getspecification() {
        const styles = MyStylesheet();
        const pm = new PM();
        const regularFont = pm.getRegularFont.call(this);
        const headerFont = pm.getHeaderFont.call(this)
        const activeparams = pm.getnavigation.call(this)
        const csiid = activeparams.specifications.csiid;
        const projectid = activeparams.projectid;
        const csi = pm.getcsibyid.call(this, csiid)
        const myproject = pm.getprojectbyid.call(this, projectid);
        const specification = new Specification();
        if (myproject) {

            return (<View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>

                            {specification.showspecification.call(this)}

                        </View>
                    </View>


                </View>
            </View>
            )

        }



    }



}


export default Specification;