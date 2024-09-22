import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/laundry.svg";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import style from "../component/MyNav.module.css";
const MyNav = () => {
  return (
    <>
      <Navbar expand="sm">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img src={logo} width="30" height="30" className="d-inline-block align-top me-3" alt=" logo" />
            <h5>Arte del pulito</h5>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <FaWhatsapp size={24} className={`${style.iconColor} me-3`} />
              <CiFacebook size={24} className={style.iconColor} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNav;
