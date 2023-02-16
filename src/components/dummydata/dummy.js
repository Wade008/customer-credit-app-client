

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


