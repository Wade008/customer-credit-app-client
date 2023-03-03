
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { NumericFormat } from 'react-number-format';

function KeyMetrics(props) {

    const { title, icon, value } = props;

    //title
    //icon
    //value

    return (
        <Box sx={{ height: 110, width: 250, background: "#FFFFFF", mt: 4, ml: 1, mr: 1, mb: 1 }}>
            <Box sx={{ fontWeight: "bold", color: "#333333", height: 50, pl: 1 }}>{title}</Box>
            <Divider />
            <Box display="flex" alignItems="center" justifyContent='flex-start' sx={{ pt: 2, pl: 1 }}>{icon}<Box sx={{ pl: 2 }}><NumericFormat value={value} allowLeadingZeros thousandsGroupStyle="lakh" thousandSeparator="," displayType="text" /></Box></Box>

        </Box>
    )


}

export default KeyMetrics