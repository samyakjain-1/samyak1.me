import { FC } from 'react';
import { Helmet } from 'react-helmet';

const SEO: FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Samyak Jain",
    "url": "https://samyak1.me",
    "image": "https://samyak1.me/og-image.jpg",
    "sameAs": [
      "https://github.com/samyakjain-1",
      "https://linkedin.com/in/samyak1"
    ],
    "jobTitle": "Software Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "University of Wisconsin-Madison"
    },
    "description": "Software Developer specializing in Machine Learning, AI, and Computer Vision. UW-Madison CS student with expertise in Python, React, and Deep Learning.",
    "knowsAbout": [
      "Machine Learning",
      "Artificial Intelligence",
      "Computer Vision",
      "Python",
      "React",
      "TypeScript",
      "Docker"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 