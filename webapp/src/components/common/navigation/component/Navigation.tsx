import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Navigation.css';
import RootState from "../../../../store/root-state";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {DeleteUser} from "../../user/actions/UserActions";

import AccountIcon from "../icons/account.svg";
import CreateIcon from "../icons/create.svg";
import LibraryIcon from "../icons/library.svg";
import SharedIcon from "../icons/shared.svg";
import LogoutIcon from "../icons/logout.svg";

interface SelectorInterface {
    accountSelector: string
    createSelector: string
    librarySelector: string
    sharedSelector: string
}

export default function Navigation() {

    const history = useHistory();
    const dispatch = useDispatch();

    const pathname = window.location.pathname;

    const {
        accountSelector,
        createSelector,
        librarySelector,
        sharedSelector } = getSelector(pathname);

    let loginText = useSelector((state: RootState) => state.userState.user);
    if (loginText === undefined) loginText = "";

    // Simple redirection to login page, needs to be changed use cookies later
    if (pathname !== "/login" && loginText === "") history.push("/login");

    const logout = () => {
        dispatch(DeleteUser());
        history.push("/login");
        localStorage.clear();
    }

    return (
        <Container>
            <Row>
                <Col xs={{offset: 2}}>
                    <Row className="logo">
                        Tabber
                    </Row>
                    <Row className="nav-selection" id={accountSelector} onClick={()=>{history.push("/account")}}>
                        <img src={AccountIcon} className="icon" alt="account" /> Account
                    </Row>
                    <Row className="nav-selection" id={createSelector} onClick={()=>{history.push("/create")}}>
                        <img src={CreateIcon} className="icon" alt="create" /> Create
                    </Row>
                    <Row className="nav-selection" id={librarySelector} onClick={()=>{history.push("/library")}}>
                        <img src={LibraryIcon} className="icon" alt="library" /> Library
                    </Row>
                    <Row className="nav-selection bottom" id={sharedSelector} onClick={()=>{history.push("/shared")}}>
                        <img src={SharedIcon} className="icon" alt="shared" /> Shared
                    </Row>
                    <Row className="nav-selection" onClick={logout}>
                        <img src={LogoutIcon} className="icon" alt="logout" /> Logout
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

function getSelector(pathname: String): SelectorInterface {
    const selector: SelectorInterface = {
        accountSelector: "",
        createSelector: "",
        librarySelector: "",
        sharedSelector: "",
    }
    if (pathname.startsWith("/account")) {
        selector.accountSelector = "selected";
    } else if (pathname.startsWith("/create")) {
        selector.createSelector = "selected";
    } else if (pathname.startsWith("/library")) {
        selector.librarySelector = "selected";
    } else if (pathname.startsWith(("/shared"))) {
        selector.sharedSelector = "selected";
    }
    return selector;
}