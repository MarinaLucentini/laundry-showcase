import { Container, Navbar } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import styles from "./MyNav.module.css";

const MyNav = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "3911220571";
    const countryCode = "39";
    const message = "Salve, vorrei informazioni sui vostri servizi di lavanderia.";
    const whatsappUrl = `https://wa.me/${countryCode}${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };
  const handleFacebookClich = () => {
    const facebookUrl =
      "https://www.facebook.com/people/Arte-del-pulito/61566530990584/?rdid=GgE5P444OviS27qy&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FpizJZ3zzNjBZh1qB%2F";
    window.open(facebookUrl, "_blank");
  };
  return (
    <Navbar expand="sm" className={styles.navBar}>
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FaWhatsapp size={34} className={`${styles.iconColor} ${styles.whatsappIcon} me-3`} onClick={handleWhatsAppClick} />
          <CiFacebook size={34} className={styles.iconColor} onClick={handleFacebookClich} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNav;
