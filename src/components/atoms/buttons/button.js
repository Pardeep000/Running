import React from 'react';
import Add from '../../icons/add';
import { constants } from '../../../config/constant'
import Loader from '../../loader';

function Button(props) {

    const icons = {
        'add': <Add color={props.iconColor} class="" />
    }
    return (
        <button
            disabled={props.isDisabled}
            onClick={props.onClick}
            style={{
                backgroundColor: props.bgColor,
                color: props.color
            }}
            className={`${props.isTransparent ? 'bg-white' : `bg-${props.bgColor}`} 
        rounded  border rounded-md poppins font-small text-md text-${props.color} ${props.class} `}>
            {props.isIcon && icons[props.icon]}
            {props.text}
            {props.isLoading && <Loader
                styles={{
                    height: '20px',
                    width: '20px',
                    margin: '-5px 0px -4px 8px',
                }}
                color={constants.theme.white} />}
        </button>
    );
}

Button.defaultProps = {
    isIcon: false,
    isDisabled: false,
    icon: 'add',
    class: '',
    isLoading: false,
    isTransparent: false,
    bgColor: constants.theme.green,
    text: 'button',
    onClick: () => { }
}

export default React.memo(Button);