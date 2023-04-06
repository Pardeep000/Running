import React from 'react';

function ThreeDots(props) {
    return (
        <>
            <svg
            style={{cursor:'pointer'}}
                onClick={props.onClick}
                width={props.width}
                height={props.height}
                data-name="30x30/On Light/Dots"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.5 12.5A1.5 1.5 0 1 1 18 14a1.5 1.5 0 0 1-1.5-1.5Zm-6 0A1.5 1.5 0 1 1 12 14a1.5 1.5 0 0 1-1.5-1.5Zm-6 0A1.5 1.5 0 1 1 6 14a1.5 1.5 0 0 1-1.5-1.5Z"
                    fill="#141124"
                />
            </svg>
            {props.children}
        </>
    );
}

ThreeDots.defaultProps = {
    width: 24,
    height: 24,
    color: 'black',
    cursor:'pointer'
}


export default React.memo(ThreeDots);