import React from 'react';

import './Group.css';

export default function Group(props){
    return(
        <div className="group">
            <h3>{props.item.groupName}</h3>
        </div>
    );
}
