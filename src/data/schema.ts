import { site } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressCountry: "BG",
    },
    description: site.descriptor,
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
    offers: site.pricing.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.includes("-") ? tier.price.split("-")[0] : tier.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: `${site.url}/tseni`,
    })),
  };
}

export function articleSchema(title: string, path: string, description: string, dates = { datePublished: "2026-07-03", dateModified: "2026-07-05" }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: site.author.name,
    },
    publisher: organizationSchema(),
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
    mainEntityOfPage: `${site.url}${path}`,
  };
}

export function webPageSchema(title: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${site.url}${path}`,
    inLanguage: "bg-BG",
    isPartOf: {
      "@type": "WebSite",
      name: site.brand,
      url: site.url,
    },
    about: {
      "@type": "Service",
      name: "AI рецепционист за дентална клиника",
      provider: organizationSchema(),
      areaServed: "BG",
      serviceType: "AI телефонен рецепционист",
    },
  };
}

export function itemListSchema(title: string, path: string, items: Array<{ name: string; url: string; description?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: `${site.url}${path}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${site.url}${item.url}`,
      description: item.description,
    })),
  };
}

export function datasetSchema(title: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: title,
    description,
    url: `${site.url}${path}`,
    creator: organizationSchema(),
    license: `${site.url}/za-nas`,
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
  };
}
