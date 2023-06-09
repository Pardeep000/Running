import React from 'react';

function Edit(props) {
    return (
        <svg
            height={props.height}
            viewBox="0 0 48 48"
            width={props.width}
            fill={props.color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
            <path d="M0 0h48v48H0z" fill="none" />
        </svg>
    );
}

Edit.defaultProps = {
    width: 24,
    height: 24,
    color: 'black',
}

export default React.memo(Edit);