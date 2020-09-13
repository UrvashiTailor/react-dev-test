import React from 'react';
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import "./Header.css";

function Header() {
  return (
        <Col xs="12" className="d-flex">
        <Col xs="6">
            <Nav>
                <NavItem>
                    <NavLink href="#" className="pl-3 pt-3">
                        <img src="../images/logoOrange.svg" alt="" height="34" width="150"/>
                    </NavLink>
                </NavItem>
            </Nav>
        </Col>
        <Col xs="6">
            <Nav className="float-right">
                <NavItem>
                    <NavLink href="#" className="pl-3 pt-3">
                        Adventures
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="pl-3 pt-3">
                        Host
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="pl-3 pt-3">
                        Account
                    </NavLink>
                </NavItem>
            </Nav>
        </Col>
            
        </Col>
  );
}

export default Header;
