import React from 'react';

function Profile(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={15}
            style={{
                enableBackground: "new 0 0 15 15",
            }}
            xmlSpace="preserve"
        >
            <path d="M22.766.001C10.194.001 0 10.193 0 22.766s10.193 22.765 22.766 22.765c12.574 0 22.766-10.192 22.766-22.765S35.34.001 22.766.001zm0 6.807a7.53 7.53 0 1 1 .001 15.06 7.53 7.53 0 0 1-.001-15.06zm-.005 32.771a16.708 16.708 0 0 1-10.88-4.012 3.209 3.209 0 0 1-1.126-2.439c0-4.217 3.413-7.592 7.631-7.592h8.762c4.219 0 7.619 3.375 7.619 7.592a3.2 3.2 0 0 1-1.125 2.438 16.702 16.702 0 0 1-10.881 4.013z" />
        </svg>
    );
}

Profile.defaultProps = {
    width: 35,
    height: 35,
    color: 'black',
}


export default React.memo(Profile);