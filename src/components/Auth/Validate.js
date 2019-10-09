import React from 'react';
import check from '../../assets/check_circle_green.png';
import warn from '../../assets/error_red.png';

function Validate(props) {
    // Conditionally render an icon to indicate if the data being entered is valid,
    // but only if the input data exists.
    if (props.data) {
        return (
            <div>
            {props.itemCheck ? <img src={check} alt="validate Success" /> : 
            <img src={warn} alt="validate Failure" /> }
            </div>
            )
        } else {
            return null
        }
}

export default Validate;