import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arte del Pulito",
    "image": "https://artedelpulito.vercel.app/assets/laundry_1.svg",
    "@id": "https://artedelpulito.vercel.app",
    "url": "https://artedelpulito.vercel.app",
    "telephone": "+390691010970",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via delle Murene 9",
      "addressLocality": "Tor San Lorenzo Ardea",
      "postalCode": "00040",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.60170679246456,
      "longitude": 12.54562931541677
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/artedelpulito"    ] 
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;