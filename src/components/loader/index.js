import React from 'react';

function Loader(props) {
    return (
        <div style={{ ...props.styles, color: props.color }} class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    );
}

Loader.defaultProps = {
    color: 'black'
}

export default Loader;