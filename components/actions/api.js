import EnvironmentalVariables from '../functions/enviornmentalvariables';


export async function LoadAllUsers() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/loadallusers`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err = 'Request failed or Server is not responding' ;
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadCSIs() {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/projectmanagement/loadcsi`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}
export function AddCharge(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    var APIURL = `${serverAPI}/projectmanagement/${values.providerid}/charges/${values.projectid}`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}
export async function SettleInvoice(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    const APIURL = `${serverAPI}/projectmanagement/settleinvoice`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })

}

export function payInvoice(providerid, invoiceid, token, amount) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    const values = { providerid, invoiceid, token, amount }
  
    var APIURL = `${serverAPI}/projectmanagement/${providerid}/invoicepayment/${invoiceid}`
   
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function AppleLogin(values) {
    console.log("applelogin", values)
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    var APIURL = `${serverAPI}/projectmanagement/applelogin`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function NodeLogin(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    var APIURL = `${serverAPI}/projectmanagement/clientlogin`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}


export async function CheckUserLogin() {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables.call(this).serverAPI;
    let APIURL = `${serverAPI}/projectmanagement/checkuser`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}

export async function CheckProviderID(profile) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    var APIURL = `${serverAPI}/projectmanagement/${profile}/checkprofile`

    return fetch(APIURL, { credentials: 'include' })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                     
                        throw data.message
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}


export async function CheckEmailAddress(emailaddress) {

    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    var APIURL = `${serverAPI}/projectmanagement/${emailaddress}/checkemail`

    return fetch(APIURL, {
        credentials: 'same-origin'

    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}



export async function CheckProjectID(values) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    const APIURL = `${serverAPI}/projectmanagement/checknewprojectid`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function LogoutUser(providerid) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    let APIURL = `${serverAPI}/projectmanagement/${providerid}/logout`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}
export async function SaveAllProfile(myuser) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    const providerid = myuser.myuser.providerid;
    var APIURL = `${serverAPI}/projectmanagement/${providerid}/saveallprofile`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(myuser)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function UploadProfileImage(formdata, providerid) {
    const variables = new EnvironmentalVariables();
    const serverAPI = variables.getvariables().serverAPI;
    var APIURL = `${serverAPI}/projectmanagement/${providerid}/uploadprofilephoto`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        body: formdata
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}