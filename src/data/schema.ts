import { site } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: site.legalName,
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
