

import CardMembershipTwoToneIcon from '@mui/icons-material/CardMembershipTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

//Mertics for the dashboard
export const keyMetrics = [
    //this will be aggredated and served from the backend
    {
        title: "Total outstanding store credit",
        icon: < CardMembershipTwoToneIcon />,
        value: 400,
    },
    {
        title: "Store credit liabilities",
        icon: < MonetizationOnTwoToneIcon />,
        value: 800,
    },
    {
        title: "No. customers with outstanding credit",
        icon: < PeopleAltTwoToneIcon />,
        value: 50,
    }

]

export const accountInfo = {

    companyName: "Target",
    storeSuburd: "Mitchelton",
    firstName: "Captain",
    LastName: "America",
    email: "ca@world.com",
    creditValue: 2

}

export const customerList = [
    {
        id: 1,
        firstname: "Peter",
        lastname: "Parker",
        email: "p@p.com",
        phone: "123456789",
        currentCredit: 50
    },
    {
        id: 2,
        firstname: "Iron",
        lastname: "Man",
        email: "IM@2.com",
        phone: "789456123",
        currentCredit: 2000
    },
    {
        id: 3,
        firstname: "Captain",
        lastname: "Marvel",
        email: "cm@2.com",
        phone: "789456123",
        currentCredit: 300
    },
    {
        id: 4,
        firstname: "Ant",
        lastname: "Man",
        email: "am@2.com",
        phone: "789456123",
        currentCredit: 40
    },
    {
        id: 5,
        firstname: "Black",
        lastname: "Panther",
        email: "bp@2.com",
        phone: "789456123",
        currentCredit: 79
    },
]

