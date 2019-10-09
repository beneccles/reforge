import React from 'react';
import check from '../../assets/check_circle_green.png';
import warn from '../../assets/error_red.png';

function Validate(props) {

    if (props.data) {
        return (
            <div>
            {props.phoneCheck ? <img src={check} alt="validate Success" /> : 
            <img src={warn} alt="validate Failure" /> }
            </div>
            )
        } else {
            return null
        }
}

export default Validate;