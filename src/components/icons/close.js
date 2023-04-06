import React from 'react';

function Close(props) {
    return (
        <svg
            onClick={props.onClick}
            width={props.width}
            height={props.height}
            data-name="24x24/On Light/Cross"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                d="m15.92 17.152-4-4-4.005 4a.752.752 0 1 1-1.066-1.061l4.005-4-4.005-4.01A.75.75 0 0 1 7.91 7.02l4.005 4.005 4-4.005a.75.75 0 1 1 1.061 1.061l-4 4.005 4 4a.75.75 0 0 1-1.061 1.061Z"
                fill={props.color}
            />
        </svg>
    );
}

Close.defaultProps = {
    width: 24,
    height: 24,
    color: 'black',
}

export default React.memo(Close);