import React from 'react';

function Add(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`${props.isBorder && 'border'} p-1 ${props.class}`}
            width={props.width}
            height={props.height}
            fillRule="evenodd"
            fill={props.color}
        >
            <path d="M11 2v9H2v2h9v9h2v-9h9v-2h-9V2Z" />
        </svg>
    );
}

Add.defaultProps = {
    width: 24,
    isBorder: false,
    color: 'black',
    height: 24,
    class: ''
}

export default React.memo(Add);