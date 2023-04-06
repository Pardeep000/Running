import React from 'react';

function SquareTag(props) {
    return (
        <div
            style={{ ...props.styles }}
            className={`px-1 m-0 align-self-center fit-content rounded ${props.class}`}>
            <p className='p-0 m-0 font-xssmall text-light font-weight-bold'>{props.text}</p>
        </div>
    );
}

SquareTag.defaultProps = {
    text: 'tags',
    class: ''
}

export default SquareTag;