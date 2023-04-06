import React from 'react';

function ArrowDrown(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height}>
            <g data-name="Icons / Chevron-right" fill="none">
                <path data-name="Path 406" d="M0 0v16h16V0Z" />
                <path
                    data-name="Path 407"
                    d="M4.006 6.003 8 9.997l3.994-3.994"
                    stroke="#272525"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
            </g>
        </svg>
    );
}

ArrowDrown.defaultProps = {
    height: 15,
    width: 15
}

export default ArrowDrown;