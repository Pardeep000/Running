import React from 'react';

function User(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={props.width}
            height={props.height}
            className={`${props.class}`}
            fill={props.color}
            viewBox="0 0 36 36">
            <defs>
                <clipPath id="clip-path">
                    <circle id="Ellipse_14" data-name="Ellipse 14" cx="18" cy="18" r="18" transform="translate(1704 757)" fill="rgba(85,165,48,0.1)" stroke="rgba(85,165,48,0.5)" stroke-miterlimit="10" stroke-width="0.5" />
                </clipPath>
            </defs>
            <g id="Group_5974" data-name="Group 5974" transform="translate(-1702 -782)">
                <circle id="Ellipse_13" data-name="Ellipse 13" cx="18" cy="18" r="18" transform="translate(1702 782)" fill="rgba(119,119,119,0.1)" />
                <g id="Mask_Group_34" data-name="Mask Group 34" transform="translate(-2 25)" clip-path="url(#clip-path)">
                    <g id="Group_551" data-name="Group 551" transform="translate(-25.036 -68.333)">
                        <path id="Path_507" data-name="Path 507" d="M2,25.179a9.409,9.409,0,0,1,.873-2.419c1.539-2.9,4.994-5.1,9.257-5.875a20.51,20.51,0,0,1,10.421.525c4.171,1.3,7.13,4,7.875,7.167a8.413,8.413,0,0,1,.2,2.56c0,.2-.109.307-.4.294a2.787,2.787,0,0,0-.327,0H2.618L2,27.393Z" transform="translate(1731 834.249)" fill="#777" opacity="0.5" />
                        <circle id="Ellipse_12" data-name="Ellipse 12" cx="7.758" cy="7.758" r="7.758" transform="translate(1738.626 832.712)" fill="#777" opacity="0.5" />
                    </g>
                </g>
            </g>
        </svg>

    );
}

User.defaultProps = {
    width: 40,
    height: 40,
    class: '',
    color: 'black',
}

export default User;