import React from 'react';

function Success(props) {
    return (
        <svg
            height={props.height}
            viewBox="0 0 512 512"
            width={props.width}
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M256 6.998c-137.533 0-249 111.467-249 249 0 137.534 111.467 249 249 249s249-111.467 249-249c0-137.534-111.467-249-249-249zm0 478.08c-126.309 0-229.08-102.771-229.08-229.081 0-126.31 102.771-229.08 229.08-229.08 126.31 0 229.08 102.771 229.08 229.08 0 126.31-102.77 229.081-229.08 229.081z"
                fill={props.color}
            />
            <path
                fill="#425661"
                d="M384.235 158.192 216.919 325.518l-89.057-89.037-14.142 14.143 103.199 103.179L398.28 172.334z"
            />
        </svg>
    );
}

Success.defaultProps = {
    width: 24,
    height: 24,
    color: 'black',
}

export default Success;