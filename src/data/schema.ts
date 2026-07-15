import { site } from "./site";
import { authorPath, type Author } from "./authors";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: site.legalName,
    email: site.legalEmail,
    taxID: site.companyId,
    vatID: site.vatId,
    url: site.url,
    logo: `${site.url}/assets/vdiga-logo-nav-green-v.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+359${site.salesPhone.replace(/\s/g, "").replace(/^0/, "")}`,
      contactType: "sales",
      availableLanguage: "Bulgarian",
      areaServed: "BG",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. „Панайот Волов“ № 4",
      postalCode: "1527",
      addressLocality: site.location,
      addressCountry: "BG",
    },
    description: site.descriptor,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand,
    url: site.url,
    inLanguage: "bg-BG",
    publisher: {
      "@type": "Organization",
      name: site.brand,
      legalName: site.legalName,
      url: site.url,
    },
  };
}

export function founderSchema() {
  const founders = [
    { ...site.author, credential: null },
    site.coFounder,
  ];

  return {
    "@context": "https://schema.org",
    "@graph": founders.map((founder) => {
      const credential = founder.credential;

      return {
        "@type": "Person",
        name: founder.name,
        image: `${site.url}${founder.image}`,
        jobTitle: founder.role,
        description: founder.bio,
        url: `${site.url}${authorPath(founder.slug)}`,
        worksFor: {
          "@type": "Organization",
          name: site.brand,
          url: site.url,
        },
        ...(credential
          ? {
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                name: credential.name,
                credentialCategory: "Professional Certification",
                identifier: credential.code,
                dateCreated: credential.dateAwarded,
                url: credential.verificationUrl,
                recognizedBy: {
                  "@type": "Organization",
                  name: credential.issuer,
                  url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
                },
              },
            }
          : {}),
      };
    }),
  };
}

export function authorProfileSchema(author: Author) {
  const credential = "credential" in author ? author.credential : null;
  const personUrl = `${site.url}${authorPath(author.slug)}`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${author.name} — ${author.role}`,
    url: personUrl,
    inLanguage: "bg-BG",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      url: personUrl,
      image: `${site.url}${author.image}`,
      jobTitle: author.role,
      description: author.bio,
      knowsAbout: author.expertise,
      worksFor: {
        "@type": "Organization",
        name: site.brand,
        url: site.url,
      },
      ...(credential
        ? {
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              name: credential.name,
              credentialCategory: "Professional Certification",
              identifier: credential.code,
              dateCreated: credential.dateAwarded,
              url: credential.verificationUrl,
              recognizedBy: {
                "@type": "Organization",
                name: credential.issuer,
                url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
              },
            },
          }
        : {}),
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Vdiga AI рецепционист",
    brand: {
      "@type": "Brand",
      name: site.brand,
    },
    description: site.descriptor,
    offers: site.pricing.filter((tier) => /^\d+(?:[.,]\d+)?$/.test(tier.price)).map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/tseni/`,
    })),
  };
}

export function serviceSchema(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: "AI рецепционист и телефонен асистент",
    description,
    url: `${site.url}${path}`,
    areaServed: {
      "@type": "Country",
      name: "България",
    },
    provider: {
      "@type": "Organization",
      name: site.brand,
      legalName: site.legalName,
      url: site.url,
    },
  };
}

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  author = site.author,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  author?: Author;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${site.url}${path}`,
    mainEntityOfPage: `${site.url}${path}`,
    inLanguage: "bg-BG",
    datePublished,
    dateModified,
    ...(image ? { image: `${site.url}${image}` } : {}),
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      url: `${site.url}${authorPath(author.slug)}`,
      image: `${site.url}${author.image}`,
    },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      legalName: site.legalName,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/assets/vdiga-logo-nav-green-v.png`,
      },
    },
  };
}
