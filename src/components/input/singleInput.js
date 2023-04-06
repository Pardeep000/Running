import React from 'react';
import { constants } from '../../config/constant';
import Search from '../icons/search';

function SingleInput(props) {
    return (
        <div style={{ ...props.style }} className={`${props.class} input-group ${props.isBorder && 'border'} rounded`}>
            {props.isLeftIcon && <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">@</span>
            </div>}
            {props.isLabel &&
                <p className='font-xsmall position-absolute zIndex-10000 bg-white'
                    style={{ margin: '-8px 15px', color: constants.theme.gray }}>{props.placeHolder}</p>}
            <input id={props.inputId}
                disabled={props.disabled}
                type={props.type}
                placeholder={props.placeHolder}
                class={`form-control rounded ${props.inputClass}`}
                onChange={props.onChange}
                value={props.value}
                aria-label="Username"
                aria-describedby="basic-addon1" />
            {props.isRightIcon && <div class="input-group-prepend align-self-center">
                <span class="input-group-text bg-light border-0" id="basic-addon1"><Search /></span>
            </div>}
        </div>
    );
}

SingleInput.defaultProps = {
    isRightIcon: false,
    isLeftIcon: false,
    class: '',
    placeHolder: 'place holder',
    type: 'text',
    isLabel: true,
    isBorder: true,
    inputClass: '',
    style: {}
}

export default React.memo(SingleInput);