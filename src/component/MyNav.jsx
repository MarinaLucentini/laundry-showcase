import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/laundry.svg";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import styles from "./MyNav.module.css";
const MyNav = () => {
  return (
    <>
      <Navbar expand="sm" className={styles.navBar}>
        <Container>
          <Navbar.Brand href="#home" className={` d-flex align-items-center`}>
            <FaWhatsapp size={34} className={`${styles.iconColor} me-3`} />
            <CiFacebook size={34} className={styles.iconColor} />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNav;
