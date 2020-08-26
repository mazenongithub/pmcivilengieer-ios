export function CreateProject(providerid, projectid, title, scope, address, city, projectstate, zipcode) {
    return ({ providerid, projectid, title, scope, address, city, projectstate, zipcode })
}

export function monthString(month) {

    
    switch (month) {
        case 0:
            return ("Jan");
        case 1:
            return ("Feb");
        case 2:
            return ("Mar");
        case 3:
            return ("Apr");
        case 4:
            return ("May");
        case 5:
            return ("Jun");
        case 6:
            return ("Jul");
        case 7:
            return ("Aug");
        case 8:
            return ("Sep");
        case 9:
            return ("Oct");
        case 10:
            return ("Nov");
        case 11:
            return ("Dec");
        default:
            break;
    }
}

export function monthstring(month) {

    
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}

export function check_31_date(dateobj) {

    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30_date(dateobj) {

    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear_date(dateobj)  {

    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}

export function getDayString(day) {

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return;
    }
}

export function trailingZeros(num) {
    if (num < 10) {
        return (`0${num}`);
    } else {
        return num;
    }

}

export function increaseCalendarDayOneMonth(monthstring) {
    let offset = getOffsetDate(monthstring);
    let datein = new Date(`${monthstring.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentMonth = datein.getMonth() + 1;
    let year = datein.getFullYear();
    let increaseMonth = currentMonth;
    if (currentMonth === 12) {
        increaseMonth = 1;
        year += 1
    } else {
        increaseMonth += 1;
    }

    let day = datein.getDate();
    if (increaseMonth < 10) {
        increaseMonth = `0${increaseMonth}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    let newDate = `${year}-${increaseMonth}-${day}`
    return (newDate)
}

export function calculatemonth(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-18'



    let xo = int.split('-');
    let x1 = xo[0]
    let x2 = xo[1]

    let initime = `${x1}-${x2}-01`
    //start = '2020-04-18'
    xo = (getDateInterval(initime, start) / 30.41) * 200;
    //completion = '2020-09-18'
    const days = getDateInterval(start, completion);
    const width = (days / 30.41) * 200
    return { width, xo }

}

export function getScale(interval) {

    let scale = "";
    if (interval < 30) {
        scale = "day"
    } else if (interval <= 730) {
        scale = "month"
    } else {
        scale = "year"
    }
    return scale;

}

export function increasedatebyoneday(timein) {

    //let timein = '2020-12-31';
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`);
    let newdate = new Date(datein.getTime())
    let day = newdate.getDate();
    let month = newdate.getMonth() + 1;
    let year = newdate.getFullYear();
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        if (day === 31) {
            day = 1;
            if (month !== 12) {
                month = month + 1;

            } else {
                month = 1;
                year = year + 1;
            }
        } else {
            day = day + 1;

        }

    }

    if (month === 4 || month === 6 || month === 9 || month === 11) {

        if (day === 30) {
            day = 1;
            month = month + 1;
        } else {
            day = day + 1;
        }
    }


    if (month === 2) {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            if (day === 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day === 28) {
                day = 1;
                month = month + 1;
            }
        }

    }

    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }
    return (`${year}-${month}-${day}`)
}

export function calculateday(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-24'

    let xo = int.split('-');
    let x1 = xo[0];
    let x2 = xo[1];
  	let x3 = xo[2]

    let initime = `${x1}-${x2}-${x3}`


    //start = '2020-04-18'
    xo = (getDateInterval(initime, start)) * 200;
    //completion = '2020-04-20'
    const days = getDateInterval(start, completion)
    const width = (days) * 200

    return { width, xo, initime }
}

export function calculateyear(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-18'

    let xo = int.split('-');
    let x1 = xo[0]

    let initime = `${x1}-01-01`


    //start = '2020-04-18'
    xo = (getDateInterval(initime, start) / 365) * 200;
    //completion = '2020-09-18'
    const days = getDateInterval(start, completion)
    const width = (days / 365) * 200

    return { width, xo }
}


export function getOffsetDate(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00 UTC`)
    let offset = datein.getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)
}

export function getDateInterval(start, completion) {

    const offsetstart = getOffsetDate(start);
    const datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    //const offsetcompletion= getOffsetDate(completion);
    const datecompletion = new Date(`${completion.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    const starttime = datestart.getTime();
    const endtime = datecompletion.getTime();
    const interval = (endtime - starttime) / (3600000 * 24);
    return (interval)
}

export function CreatePredessor(predessor, type) {
    return ({ predessor, type })
}

export function  validateYear(year) {
    const reg_ex = /^[12][0-9]{3}$/;
return(reg_ex.test(year));
}
export function validateDate(date) {
    const reg_ex = /^(0?[1-9]|[12][0-9]|3[01])$/;
return(reg_ex.test(date));

}
export function validateMonth(mon) {
const reg_ex = /^0[1-9]|1[0-2]$/;
return(reg_ex.test(mon))
}


export function getFirstIsOnDate(datein) {

    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}

export function validatePassword(val) {
    let validate = {};
    validate.validate = true;
    validate.message = '';
    const reg_ex = /^[a-zA-Z0-9!#$%&?"]{6,}$/
    let test = reg_ex.test(val)
    if (val.length < 6) {
        validate.message = `Password min length is 6 `;
        validate.validate = false;
    } else if (!test) {
        validate.message = `Invalid Password format`;
        validate.validate = false;
    }

    return validate;
}
export function validateTitle(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,158}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = false;
    if (!value) {
        errmsg = " Project Title is missing ";

    }
    else if (value.length > 160) {
        errmsg = " Title should be less than 160 chars ";
    }
    else if (!test) {
        errmsg = ` Invalid URL / format check your value: ${value} `;
    }

    return errmsg;
}
export function returnCompanyList(allusers) {
    let companys = [];

    if (allusers.hasOwnProperty("myuser")) {
        // eslint-disable-next-line
        allusers.myuser.map(myuser => {

            if (myuser.hasOwnProperty("company")) {
                let checkcompany = true;
                let companyid = myuser.company.companyid;
                if (companys.length > 0) {
                    // eslint-disable-next-line
                    companys.map(company => {
                        if (company.companyid === companyid) {
                            checkcompany = false;
                        }
                    })
                }
                if (checkcompany) {

                    companys.push(myuser.company)
                }
            }

        })

    }
    return companys;
}
export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = ""
    if (!value) {
        errmsg += `Email Address is required `

    }

    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}
export function validateProviderID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = ""
    if (!value) {
        errmsg = " ProviderID is required ";

    }
    else if (value.length > 36) {
        errmsg = " ProviderID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}
export function getOffset(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00`)
let offset = datein.getTimezoneOffset() / 60;

    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
 return(`${sym}${offset}:00`)

}
export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year} ${hours}:${minutes} ${ampm}`)

}
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function TeamMember(providerid, role) {
    return ({ providerid, role })
}
export function UTCStringFormatDateforProposal(timeout) {


    let newDate = new Date(`${timeout.replace(/-/g, '/')}-00:00`)
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let century = Math.floor(year / 100) * 100;
    year = year - century;
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let timeofday = "";
    if (hours >= 12) {
        timeofday = "pm"
    }
    else {
        timeofday = "am"
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    return (`${month}/${day}/${year} on ${hours}:${minutes} ${timeofday}`)
}
export function UTCTimefromCurrentDate() {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    year = fakedate.getFullYear();
    month = fakedate.getMonth() + 1;
    day = fakedate.getDate();
    hours = fakedate.getHours();
    minutes = fakedate.getMinutes();
    seconds = fakedate.getSeconds();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}
export function CreateImage(imageid,uri,capt) {
    return({imageid,uri,capt})
}
export function DateStringfromObj(dateobj) {

    let year = dateobj.getFullYear();
    let month = dateobj.getMonth()+1;
    let day = dateobj.getDate();
    if(month <10) {
     month=`0${month}`
    }
    if(day<10) {
     day=`0${day}`
    }
    return(`${year}-${month}-${day}`)
    }

    export function formatDateStringDisplay(timein) {
        timein.replace(/-/g, '/')
        timein = timein.split('-')
        let year = "";
        let month = "";
        let day = "";
    
        if (timein.length === 3) {
            year = timein[0]
            month = timein[1]
            day = timein[2]
        }
        return (`${month}/${day}/${year}`)
    }

    export function sortpart(b, a) {
        if (Number(b.part) < Number(a.part)) {
            return -1
    
        } else {
            return 1;
        }
    
    }
    export function LetterCounter(num) {

        const numericAlpha = (num) => {
            switch (Number(num)) {
                case 1:
                    return 'A'
                case 2:
                    return 'B'
                case 3:
                    return 'C'
                case 4:
                    return 'D'
                case 5:
                    return 'E'
                case 6:
                    return 'F'
                case 7:
                    return 'G'
                case 8:
                    return 'H'
                case 9:
                    return 'I'
                case 10:
                    return 'J'
                case 11:
                    return 'K'
                case 12:
                    return 'L'
                case 13:
                    return 'M'
                case 14:
                    return 'N'
                case 15:
                    return 'O'
                case 16:
                    return 'P'
                case 17:
                    return 'Q'
                case 18:
                    return 'R'
                case 19:
                    return 'S'
                case 20:
                    return 'T'
                case 23:
                    return 'U'
                case 22:
                    return 'V'
                case 23:
                    return 'W'
                case 24:
                    return 'X'
                case 25:
                    return 'Y'
                case 26:
                    return 'Z'
                default:
                    return ''
                    break;
    
            }
    
    
    
        }
    
        let Zs = 0;
        let newnum = "";
        let Z = "";
        if (num > 26) {
    
            Zs = Math.floor(num / 26);
    
            for (let i = 0; i < Zs; i++) {
    
                Z += `Z`
    
            }
            newnum = num % 26
    
        } else {
            newnum = num;
        }
    
        return `${Z}${numericAlpha(newnum)}`
    
    }
    
    
    export function DateObjfromString(start) {
        //let start = '2019-08-09'
    const offset = getOffset(start)
    return(new Date(`${start.replace(/-/g,'/')} 00:00:00${offset}`))
    
    }

    export function MyMilestone(milestoneid, milestone, start, completion) {
        return ({ milestoneid, milestone, start, completion })
    }

    export function milestoneformatdatestring(datein) {

        let dateinArray = datein.split('-');
        if (dateinArray.length === 3) {
            let newDate = `${dateinArray[1]}/${dateinArray[2]}/${dateinArray[0]}`
            return newDate;
        } else {
            return datein;
        }
    
    }

    export function CreateBidScheduleItem(csiid, unit, quantity) {
        return ({ csiid, unit, quantity })
    }
    export function DirectCostForMaterial(item) {
        return (Number(item.quantity) * Number(item.unitcost))
    }
    export function DirectCostForLabor(item) {
        return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
    }
    export function DirectCostForEquipment(item) {
    
        return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate))
    }
    export function ProfitForEquipment(item) {
    
        return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate)) * (Number(item.profit) / 100)
    }
    export function ProfitForLabor(item) {
        return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate)) * (Number(item.profit) / 100)
    }
    export function ProfitForMaterial(item) {
        return (Number(item.quantity) * Number(item.unitcost)) * (Number(item.profit) / 100)
    }

    export function sorttimes(timeina, timeinb) {
        timeina = new Date(timeina.replace(/-/g, '/'))
        timeinb = new Date(timeinb.replace(/-/g, '/'))
        if (timeina < timeinb) {
            return -1;
        }
        else if (timeinb > timeina) {
            return 1;
        }
        else {
            return 0;
        }
    }
    export function calculatetotalhours(timeout, timein) {

        let datein = new Date(`${timein.replace(/-/g, '/')}`)
        let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
        let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60))
        return totalhours;
    }

   