import React from "react";

import NodesImage from './nodes.png';
import './Landing.css'

export default function Landing(){
    return(
        <div className="landing">
            <div className="col landing-text">
                <h1 className="h1-1">Manage your</h1><h1 className="h1-2">breaks,</h1>
                <h2 className="h2-1">efficiently.</h2>
            </div>
            <div className="col landing-desc">
                {/* <h1>
                    Here at lunchtime, we believe that quality-time off work or college is the key to success and long lasting motivation. 
                    We have made it our mission to help you work hard, so you can rest <b>harder</b>
                </h1>
                <img className="landing-image" src={NodesImage} alt="A network of nodes, meant to represent a network of friends/relationships."/> */}
            </div>
        </div>
    );
}