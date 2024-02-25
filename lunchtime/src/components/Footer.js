import React from "react";
import './Footer.css';

const Footer = () => {
    return (
            <footerBox>
                <row>
                    <h1 className="logo">
                        lunchtime.
                    </h1>
                    <column>
                        <footerLink>
                            About us
                        </footerLink>
                        <footerLink>
                            How it works
                        </footerLink>
                    </column>
                    <column>
                        <footerLink>
                            Contact Us
                        </footerLink>
                        <footerLink>
                            Login/Register
                        </footerLink>
                    </column>
                </row>
            </footerBox>
    );
};

export default Footer;