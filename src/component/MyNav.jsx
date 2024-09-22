import { Container, Navbar } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import styles from "./MyNav.module.css";

const MyNav = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "3911220571";
    const message = "Salve, vorrei informazioni sui vostri servizi di lavanderia.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Navbar expand="sm" className={styles.navBar}>
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FaWhatsapp size={34} className={`${styles.iconColor} ${styles.whatsappIcon} me-3`} onClick={handleWhatsAppClick} />
          <CiFacebook size={34} className={styles.iconColor} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNav;
