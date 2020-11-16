import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { CheckUserLogin } from './actions/api';
import Header from './header';
import PM from './pm';
import Login from './login';
import Register from './register';
import MyProfile from './myprofile';
import MyProjects from './myprojects';
import Project from './project';
import Team from './team';
import Milestone from './milestone';
import Proposals from './proposals';
import Invoices from './invoices';
import { returnCompanyList } from './functions';
import ViewProposal from './viewproposal';
import ProposalLineItem from './proposallineitem';
import ViewInvoice from './viewinvoice';
import InvoiceLineItem from './invoicelineitem'
import BidSchedule from './bidschedule'
import Bid from './bid'
import BidScheduleLineItem from './bidschedulelineitem';
import BidLineitem from './bidlineitem';
import BidLineItem from './bidlineitem';
import Landing from './landing';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import EnvironmentalVariables from './functions/enviornmentalvariables';
import Charges from './charges';
import Specifications from './specifications';
import Specification from './specification';
import CostEstimate from './costestimate';
import LineItem from './lineitem'


class MyApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render: "", profilecheck: false, message: "", profile: "", emailaddress: '', emailaddresscheck: false, client: false,
      clientid: "", activemilestoneid: false, start: '', end: '', milestone: '', activeprovider: '', activeengineer: '', role: '', firstname: '', lastname: '', phonenumber: '', profileurl: '',
      activeprojectid: false, scope: '', title: '', address: '', city: '', projectstate: '', zipcode: '', search: '', start: new Date(), completion: new Date(),
      slides: [], activeimage: 'projectmanagement', password: '', passwordcheck: false, charge: '', chargeamount: '', design: '', startcalender: true,
      completioncalender: true,
      startdateday: '',
      startdatemonth: '',
      startdateyear: '',
      completiondateday: '',
      completiondatemonth: '',
      completiondateyear: '',
      milestonestart: '',
      milestonefinish: '',
      width: 0,
      height: 0,
      menu:'open'
    }
    this.updatedimesions = this.updatedimesions.bind(this)
  }


  componentDidMount() {
    const milestone = new Milestone();
    this.props.reduxNavigation({ navigation: 'landing' })
    const variables = new EnvironmentalVariables();
    const configs = {
      publishableKey: variables.getvariables().stripeClient,
      merchantId: 'merchant.civilengineer.io'
    }
    Stripe.setOptionsAsync(configs);
    this.checkapplepay();
    this.checkuserlogin();
    milestone.completiondatedefault.call(this);
    milestone.startdatedefault.call(this)
    Dimensions.addEventListener('change', this.updatedimesions)
    this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })


  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updatedimesions)
  }
  updatedimesions() {
    this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
  }

  async checkapplepay() {
    const response = await Stripe.canMakeApplePayPaymentsAsync();

    this.setState({ applepay: response })

  }
  async checkuserlogin() {
    //let response = TestUser();
    try {


      let response = await CheckUserLogin();


      if (response.hasOwnProperty("myuser")) {

        this.props.reduxUser(response.myuser);

      }

    } catch (err) {
      alert(err)
    }
  }

  handleregister() {
    this.props.reduxNavigation({ navigation: 'register' })
    this.setState({ profilecheck: false, message: '', emailaddress: '', emailaddresscheck: false, password: '', passwordcheck: false, profile: '', profilecheck: false })
  }

  handlelogin() {
    this.props.reduxNavigation({ navigation: 'login' })
    this.setState({ profilecheck: true, message: '', emailaddress: '', emailaddresscheck: false, password: '', passwordcheck: false, profile: '', profilecheck: false })
  }

  handlelanding() {
    this.props.reduxNavigation({ navigation: 'landing' })
    this.setState({ message: '' })
  }

  handleprofile() {
    this.props.reduxNavigation({ navigation: 'profile' })
    this.setState({ message: '' })
  }

  handlemyprojects() {
    this.props.reduxNavigation({ navigation: 'myprojects' })
    this.setState({ message: '' })
  }
  handleproject(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.projectid = projectid;
    navigation.navigation = 'project'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })
  }

  handleteam(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'team'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ activeprovider: false, activeengineer: false, search: '', design: '' })
  }
  handlemilestones(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'milestones'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ activemilestoneid: false, milestonefinish: '' })
  }

  handleproposals(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'proposals'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })
  }

  handlebidschedule(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'bidschedule'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })
  }

  handlebid(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'bid'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })
  }
  handlecharges(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'charges'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })
  }


  handlespecification(csiid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'specification'
    navigation.specifications = {};
    navigation.specifications.csiid = csiid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }

  handlespecifications(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'specifications'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }

  handlecostestimate(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'costestimate'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }

  handlecostestimatelineid(csiid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    navigation.costestimate = { csiid }
    navigation.navigation = 'estimatelineitem'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }


  handleinvoices(projectid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    navigation.navigation = 'invoices'
    navigation.projectid = projectid
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })
  }
  handleviewproposal(proposalid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    navigation.proposal = {}
    navigation.proposal.proposalid = proposalid;
    navigation.navigation = 'viewproposal'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }
  handleviewinvoice(invoiceid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    navigation.invoice = {};
    navigation.invoice.invoiceid = invoiceid;
    navigation.navigation = 'viewinvoice'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }

  handleproposallineitem(csiid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    if(navigation.hasOwnProperty("proposal")) {
      navigation.proposal.csiid = csiid 
    }
    
    navigation.navigation = 'proposallineitem'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }

  handlebidlineitem(csiid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    navigation.bid = { csiid }
    navigation.navigation = 'bidlineitem'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }

  handleinvoicelineitem(csiid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    if(navigation.hasOwnProperty("invoice")) {
    navigation.invoice.csiid =  csiid 
    navigation.navigation = 'invoicelineitem'
    this.props.reduxNavigation(navigation)
    }

    this.setState({ message: "" })

  }

  handlebidschedulelineitem(csiid) {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this);
    navigation.bidschedule = { csiid }
    navigation.navigation = 'bidschedulelineitem'
    this.props.reduxNavigation(navigation)
    this.setState({ message: "" })

  }



  mainbody() {
    const pm = new PM();
    const navigation = pm.getnavigation.call(this)
    const login = new Login();
    const register = new Register();
    const myprofile = new MyProfile();
    const myprojects = new MyProjects();
    const project = new Project();
    const team = new Team();
    const milestone = new Milestone();
    const proposals = new Proposals();
    const invoices = new Invoices();
    const viewproposal = new ViewProposal();
    const viewinvoice = new ViewInvoice();
    const proposallineitem = new ProposalLineItem();
    const invoicelineitem = new InvoiceLineItem();
    const bidschedule = new BidSchedule();
    const bidschedulelineitem = new BidScheduleLineItem()
    const bid = new Bid();
    const bidlineitem = new BidLineItem()
    const landing = new Landing();
    const charges = new Charges();
    const specifications = new Specifications();
    const specification = new Specification();
    const costestimate = new CostEstimate();
    const lineitem = new LineItem()
    switch (navigation.navigation) {
      case 'landing':
        return (landing.showlanding.call(this))
      case 'login':
        return (login.showlogin.call(this))
      case 'register':
        return (register.showregister.call(this))
      case 'profile':
        return (myprofile.showmyprofile.call(this))
      case 'myprojects':
        return (myprojects.showmyprojects.call(this))
      case 'project':
        return (project.showproject.call(this))
      case 'team':
        return (team.showteam.call(this))
      case 'charges':
        return (charges.getcharges.call(this))
      case 'milestones':
        return (milestone.showmilestone.call(this));
      case 'costestimate':
        return (costestimate.showcostestimate.call(this))
      case 'estimatelineitem':
        return (lineitem.showlineitem.call(this))
      case 'specifications':
        return (specifications.getspecifications.call(this))
      case 'specification':
        return (specification.getspecification.call(this))
      case 'proposals':
        return (proposals.showproposals.call(this))
      case 'invoices':
        return (invoices.showinvoices.call(this))
      case 'bidschedule':
        return (bidschedule.showbidschedule.call(this))
      case 'bidschedulelineitem':
        return (bidschedulelineitem.showbidschedulelineitem.call(this))
      case 'bid':
        return (bid.showbid.call(this))
      case 'bidlineitem':
        return (bidlineitem.showbidlineitem.call(this))
      case 'viewproposal':
        return (viewproposal.showproposal.call(this))
      case 'proposallineitem':
        return (proposallineitem.showproposallineitem.call(this))
      case 'viewinvoice':
        return (viewinvoice.showinvoice.call(this))
      case 'invoicelineitem':
        return (invoicelineitem.showinvoicelineitem.call(this))
      default:
        break;
    }
  }
  render() {
    const styles = MyStylesheet();
    const header = new Header();
 
    return (
      <View style={[styles.generalFlex, styles.topMargin35, styles.leftMargin5]}>

        <View style={[styles.flex1]}>
          <ScrollView>
          {header.showheader.call(this)}
            {this.mainbody()}
            <View style={{ height: Dimensions.get('window').height }}>

            </View>
          </ScrollView>
      
        </View>
      </View>



    );
  }

}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    navigation: state.navigation,
    project: state.project,
    allusers: state.allusers,
    allcompanys: state.allcompanys,
    csis: state.csis
  }
}

export default connect(mapStateToProps, actions)(MyApp);