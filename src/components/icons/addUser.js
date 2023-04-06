import React from 'react';

function AddUser(props) {
    return (
        <svg width={props.width}
            height={props.height}
            className={props.class} xmlns="http://www.w3.org/2000/svg">
            <title>{"person_add"}</title>
            <g
                fill='none'
                fillRule="evenodd">
                <path d="M-1-4h15v15H-1z" />
                <path
                    fill={props.color}
                    d="M14 8c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM5 6V4c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V8h2c.55 0 1-.45 1-1s-.45-1-1-1H5Zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z"
                />
            </g>
        </svg>
    );
}

AddUser.defaultProps = {
    width: 22,
    height: 15,
    class: "align-self-center",
    isBorder: false,
    color: 'black',
}

export default React.memo(AddUser);