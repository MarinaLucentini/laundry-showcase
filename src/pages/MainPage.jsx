import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainPage.module.css';
import laundryIllustration from '../assets/laundry_1.svg';

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
      description: "Ravviva i colori e dì addio alle macchie! Tecniche all'avanguardia per capi come nuovi."
    },
    {
      title: "Lavanderia ad Acqua",
      description: "Pulizia delicata e profonda con detergenti eco-friendly. Freschezza garantita per ogni capo."
    },
    {
      title: "Lavanderia a Secco",
      description: "Trattamento esperto per capi preziosi. Preserviamo tessuti delicati e abiti eleganti."
    },
    {
      title: "Stireria Professionale",
      description: "Finitura impeccabile per ogni tessuto. Eleganza senza sforzo, per ogni occasione."
    }
  ];

  return (
    <div className={styles.mainPage}>
      <header className={styles.headerSection}>
        <div className={styles.headerContent}>
          <img src={laundryIllustration} alt="Laundry Illustration" className={styles.laundryIllustration} />
          <div className={styles.titleContainer}>
            <h1 className={styles.companyName}>Arte del Pulito</h1>
            <p className={styles.tagline}>Non Self Service</p>
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
      <p className={styles.address}>Via delle Murene 9, Tor San Lorenzo <br/> +39 0691010970 <br/> giomon8367@gmail.com</p>
        <div className={styles.mapSection}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.805359290274!2d12.54562931541677!3d41.60170679246456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258d5df5b315d3%3A0x7f4b5582df6a8188!2sVia%20delle%20Murene%2C%209%2C%2000040%20Torvaianica%20RM%2C%20Italy!5e0!3m2!1sen!2sus!4v1632501144251!5m2!1sen!2sus"
            width="100%"
            height="460"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Company Location"
          ></iframe>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;