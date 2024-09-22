import React from 'react';
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/laundry.svg";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import styles from "./MyNav.module.css";

const MyNav = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '3911220571'; 
    const message = 'Salve, vorrei informazioni sui vostri servizi di lavanderia.'; // Pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Navbar expand="sm" className={styles.navBar}>
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img src={logo} width="30" height="30" className="d-inline-block align-top me-3" alt="logo" />
          <h5 className="text-white">Arte del pulito</h5>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <FaWhatsapp 
              size={24} 
              className={`${StyleSheetList.iconColor} me-3 ${styles.clickable}`} 
              onClick={handleWhatsAppClick}
            />
            <CiFacebook size={24} className={styles.iconColor} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;