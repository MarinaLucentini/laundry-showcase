import React from "react";
import PropTypes from "prop-types";
import styles from "./MainPage.module.css";
import laundryIllustration from "../assets/laundry_1.svg";
import StructuredData from '../component/StructuredData';

const ServiceTile = ({ title, description }) => (
  <div className={styles.serviceTile}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

ServiceTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const MainPage = () => {
  const services = [
    {
      title: "Tintoria Lavanderia",
      description: "Ravviva i colori e dì addio alle macchie! Tecniche all'avanguardia per capi come nuovi.",
    },
    {
      title: "Lavanderia ad Acqua",
      description: "Pulizia delicata e profonda con detergenti eco-friendly. Freschezza garantita per ogni capo.",
    },
    {
      title: "Lavanderia a Secco",
      description: "Trattamento esperto per capi preziosi. Preserviamo tessuti delicati e abiti eleganti.",
    },
    {
      title: "Stireria Professionale",
      description: "Finitura impeccabile per ogni tessuto. Eleganza senza sforzo, per ogni occasione.",
    },
  ];

  return (
    <div className={styles.mainPage}>
      <StructuredData />
      <header className={styles.headerSection}>
        <div className={styles.bubbleBackground}>
          <div id="background-wrap">
            <div className={`${styles.bubble} ${styles.x1}`}></div>
            <div className={`${styles.bubble} ${styles.x2}`}></div>
            <div className={`${styles.bubble} ${styles.x3}`}></div>
            <div className={`${styles.bubble} ${styles.x4}`}></div>
            <div className={`${styles.bubble} ${styles.x5}`}></div>
            <div className={`${styles.bubble} ${styles.x6}`}></div>
            <div className={`${styles.bubble} ${styles.x7}`}></div>
            <div className={`${styles.bubble} ${styles.x8}`}></div>
            <div className={`${styles.bubble} ${styles.x9}`}></div>
            <div className={`${styles.bubble} ${styles.x10}`}></div>
          </div>
        </div>
        <div className={styles.headerContent}>
          <img src={laundryIllustration} alt="Laundry Illustration" className={styles.laundryIllustration} />
          <div className={styles.titleContainer}>
            <h1 className={styles.companyName}>Arte del Pulito</h1>
            <p className={styles.tagline}>Perché stressarsi con il bucato? Noi lo facciamo meglio!</p>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceTile key={index} title={service.title} description={service.description} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.address}>
          Via delle Murene 9, Tor San Lorenzo <br /> +39 0691010970 <br /> giomon8367@gmail.com
        </p>
        <div className={styles.mapSection}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d186.57428350252124!2d12.538311!3d41.565164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1325960c4d17776d%3A0x2abdb9e537dcf9c0!2sArte%20del%20pulito!5e0!3m2!1sen!2sus!4v1727103864673!5m2!1sen!2sus" 
          width="100%" 
          height="460" 
          style={{ border: 0 }}
          allowfullscreen="" 
          loading="lazy" 
          title="Company Location"
        ></iframe>
        </div>
      </footer>
    </div>
  );
};


export default MainPage;
