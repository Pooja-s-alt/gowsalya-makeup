/**
 * GOWSI MAKEOVER — CENTRALIZED CMS DATA ENGINE
 * Manages dynamic site content, localStorage persistence, and image file processing.
 */

const DEFAULT_SITE_DATA = {
  hero: {
    badge: "Professional Bridal Makeup Artist",
    titleLine1: "Enhancing Your Beauty.",
    titleHighlight: "Creating Memories Forever.",
    description: "Elegant, luxury bridal makeovers by S. Gowsalya — crafted to enhance your natural features and make every moment camera-ready. 11+ years of dedicated artistry and 633+ happy brides.",
    primaryCtaText: "Book Your Bridal Date",
    primaryCtaLink: "#contact",
    secondaryCtaText: "View Our Work",
    secondaryCtaLink: "#gallery",
    heroImage: "assets/images/hero_gowsalya_bridal.jpg",
    yearsExp: "11",
    happyClients: "633",
    topRated: "5.0 ★",
    serviceQuality: "100%"
  },
  about: {
    name: "S. GOWSALYA",
    role: "Founder & Chief Bridal Stylist — Gowsi Makeover",
    experienceYears: "11+",
    happyBridesCount: "633+",
    image: "assets/images/gowsalya_founder.jpg",
    bioP1: "With over a decade of devoted artistry, S. Gowsalya has established Gowsi Makeover as a benchmark of elegance, precision, and personalized bridal perfection in Ramanathapuram, Rameswaram, Coimbatore, and across South India.",
    bioP2: "Trained under top international makeup masterclasses and certified in HD & Airbrush silicon makeup, Gowsalya's philosophy is rooted in enhancing each bride's natural radiance rather than masking it. Every brushstroke is tailored to your unique bone structure, skin tone, ceremony lighting, and outfit palette.",
    highlights: [
      "Certified in MAC, Huda Beauty & NARS HD Artistry",
      "Specialist in 14-Hour Long-Wear South Indian Muhurtham Looks",
      "Expert Traditional Saree Draping & Floral Hair Styling",
      "Available for On-Location & Destination Weddings Globally"
    ]
  },
  services: [
    {
      id: "srv-muhurtham",
      category: "Bridal",
      title: "Muhurtham Traditional Bridal Makeup",
      price: "Starting from ₹12,000",
      description: "Timeless traditional South Indian bridal look designed for sacred Muhurtham ceremonies with 14-hour waterproof and sweat-resistant formula.",
      features: ["Traditional Saree Draping with Box Pleats", "Authentic Temple Floral Hair Styling", "HD Flawless Skin Glow Finish", "High-End Waterproof Cosmetic Seal"]
    },
    {
      id: "srv-hd",
      category: "Bridal",
      title: "Flawless 4K HD Bridal Makeup",
      price: "Starting from ₹15,000",
      description: "Ultra-fine micro-pigment HD formulation engineered specifically for 4K video shoots and high-definition photography.",
      features: ["Custom Skin Tone Color-Correction", "Precision Contour & Soft Highlight", "Luxury 3D Mink Lashes & Eye Glam", "Zero Flashback Guaranteed"]
    },
    {
      id: "srv-airbrush",
      category: "Bridal",
      title: "Luxury Airbrush Silicone Makeup",
      price: "Starting from ₹18,000",
      description: "Featherlight silicone-based airbrush misting for a weightless, porcelain-smooth, 24-hour transfer-proof finish.",
      features: ["Weightless Second-Skin Feel", "Completely Transfer-Proof & Sweat-Proof", "Silicone Radiance Glow", "Ideal for Humid & Outdoor Venues"]
    },
    {
      id: "srv-reception",
      category: "Bridal",
      title: "Reception & Sangeet Glam Makeup",
      price: "Starting from ₹10,000",
      description: "Modern high-glam makeover featuring smokey eyes, glossy lips, and chic contemporary bridal hairstyles.",
      features: ["Glow & Glass Skin Finish", "Western / Indo-Western Hair Styling", "Designer Drape for Lehengas & Gowns", "Long-Lasting Night Glam Seal"]
    },
    {
      id: "srv-microblading",
      category: "Skin",
      title: "Eyebrow Microblading & Ombre Brows",
      price: "Starting from ₹6,000",
      description: "Semi-permanent feather-stroke microblading to create naturally full, defined, and symmetrical eyebrows.",
      features: ["Natural Feather-Touch Hair Strokes", "Customized Face Mapping & Pigment Match", "Painless Numbing Technique", "Lasts 12 to 18 Months"]
    },
    {
      id: "srv-bbglow",
      category: "Skin",
      title: "BB Glow Meso Radiance Therapy",
      price: "Starting from ₹3,500",
      description: "Advanced Korean meso-infusion of organic foundation peptides for an instant semi-permanent glass skin glow.",
      features: ["Even Skin Tone & Pigmentation Reduction", "Deep Collagen Peptides Infusion", "Zero Downtime Instant Radiance", "Safe for All Skin Types"]
    },
    {
      id: "srv-lipblush",
      category: "Skin",
      title: "Lip Pigmentation & Neutralization",
      price: "Starting from ₹5,000",
      description: "Correct dark lips and infuse a natural, youthful rosy tint with gentle semi-permanent blush micropigmentation.",
      features: ["Dark Lip Tone Correction", "Natural Berry & Rosy Blush Tones", "Fuller Looking Lips Definition", "Long-Lasting 1-2 Years"]
    },
    {
      id: "srv-keratin",
      category: "Hair",
      title: "Keratin Protein & Hair Botox",
      price: "Starting from ₹4,500",
      description: "Intense protein rejuvenation to eliminate frizz, repair damaged cuticles, and deliver mirror-shine smoothness.",
      features: ["100% Frizz-Free Silky Finish", "Formaldehyde-Free Deep Rejuvenation", "Repairs Heat & Color Damaged Hair", "Lasts up to 4–6 Months"]
    },
    {
      id: "srv-hairspa",
      category: "Hair",
      title: "Luxury Hair Spa & Dandruff Scalp Care",
      price: "Starting from ₹1,800",
      description: "Deep nourishing steam therapy and purifying scalp treatment to restore root strength and scalp health.",
      features: ["Organic Scalp Clarifying Treatment", "Aromatherapy Head Massage", "Deep Hydration Steam Infusion", "Split-End Smoothening"]
    }
  ],
  gallery: [
    { id: "gal-1", category: "Bridal", title: "Muhurtham Traditional Bride", image: "assets/images/hero_gowsalya_bridal.jpg" },
    { id: "gal-2", category: "Reception", title: "Royal Reception Glam Look", image: "assets/images/hero_bridal_main.jpg" },
    { id: "gal-3", category: "Bridal", title: "South Indian Gold & Silk Elegance", image: "assets/images/reels/reel1.jpg" },
    { id: "gal-4", category: "Engagement", title: "Pastel Glow Engagement Look", image: "assets/images/reels/reel2.jpg" },
    { id: "gal-5", category: "Bridal", title: "Vintage Temple Bridal Artistry", image: "assets/images/reels/reel3.jpg" },
    { id: "gal-6", category: "Reception", title: "Pre-Wedding Glossy Finish", image: "assets/images/reels/reel6.jpg" }
  ],
  reels: [
    {
      id: "reel-1",
      url: "https://www.instagram.com/reel/Dbso156MId6/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      category: "Bridal Look",
      title: "Flawless Bridal Look & Transformation",
      image: "assets/images/reels/reel1.jpg"
    },
    {
      id: "reel-2",
      url: "https://www.instagram.com/reel/DbdJnM_MQTF/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      category: "Outdoor Glam",
      title: "Outdoor Glamour & Natural Light Glow",
      image: "assets/images/reels/reel2.jpg"
    },
    {
      id: "reel-3",
      url: "https://www.instagram.com/reel/DS6TX59iSuA/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      category: "Vintage Shoot",
      title: "Vintage Look Shoot • Jeeva Photography",
      image: "assets/images/reels/reel3.jpg"
    },
    {
      id: "reel-4",
      url: "https://www.instagram.com/reel/DScUEgFkcOp/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      category: "Signature Studio",
      title: "Gowsi Makeover Studio Signature Work",
      image: "assets/images/reels/reel4.jpg"
    },
    {
      id: "reel-5",
      url: "https://www.instagram.com/reel/DPBF7J0DZDZ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      category: "Pre-Wedding Shoot",
      title: "Mahalakshmi & Gowtham Glossy Look",
      image: "assets/images/reels/reel6.jpg"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Priyadharshini",
      location: "Ramanathapuram",
      event: "Muhurtham Bride",
      rating: 5,
      avatar: "P",
      quote: "Gowsalya sister made my wedding day look so magical and authentic! The traditional South Indian bridal makeup stayed fresh for over 14 hours without any touch-ups. Every relative complimented the flawless finish!"
    },
    {
      id: "test-2",
      name: "Ananya",
      location: "Rameswaram",
      event: "Grand Reception Bride",
      rating: 5,
      avatar: "A",
      quote: "For our grand temple destination wedding in Rameswaram, Gowsi Makeover arrived right on time with her full luxury kit. Her hair styling and saree draping were pure perfection. Highly recommend Gowsalya to all brides!"
    },
    {
      id: "test-3",
      name: "Keerthana",
      location: "Coimbatore",
      event: "Pre-Bridal & Wedding",
      rating: 5,
      avatar: "K",
      quote: "I travelled from Coimbatore specifically for Gowsalya sister's pre-bridal aesthetic skin therapy and wedding day glam. The BB glow and HD airbrush look gave me glowing confidence throughout all 3 days!"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What makeup products and international brands do you use for bridal makeovers?",
      answer: "We exclusively use 100% genuine, world-renowned luxury cosmetics including MAC Cosmetics, Huda Beauty, NARS, Charlotte Tilbury, Estée Lauder, Anastasia Beverly Hills, and Temptu Airbrush Silicone formulas. All products are dermatologically tested, non-comedogenic, and suited for sensitive Indian skin."
    },
    {
      id: "faq-2",
      question: "Do you travel to venues in Ramanathapuram, Rameswaram, Coimbatore, and other outstation locations?",
      answer: "Yes, absolutely! S. Gowsalya and our bridal vanity team travel across Ramanathapuram, Rameswaram, Coimbatore, Madurai, Chennai, and destination wedding locations throughout South India. Travel and stay arrangements are customized in your booking package."
    },
    {
      id: "faq-3",
      question: "How far in advance should I book my bridal date with Gowsalya?",
      answer: "Because auspicious wedding dates (Muhurtham dates) fill up rapidly, we recommend booking 3 to 6 months in advance. We accept only a limited number of brides per day to ensure undivided personal attention."
    },
    {
      id: "faq-4",
      question: "What is included in the full bridal makeover package?",
      answer: "Our complete bridal package covers comprehensive skin prep & priming, 4K HD or Airbrush silicone makeup, customized false lashes, traditional or designer saree draping (with crisp box pleating), authentic floral hairstyling with accessories placement, and jewellery setting assistance."
    },
    {
      id: "faq-5",
      question: "Can you provide makeovers for my family, bridesmaids, and mother on the wedding day?",
      answer: "Yes! Alongside the bride, our team provides party makeovers, saree draping, and hairstyling for bridesmaids, mothers, and close relatives so the whole bridal party looks harmoniously radiant."
    },
    {
      id: "faq-6",
      question: "What aesthetic and skin care treatments do you recommend before the wedding?",
      answer: "We recommend starting 3 to 4 weeks before the wedding with our BB Glow Meso Radiance therapy, Eyebrow Microblading shaping, Lip Blush tinting, and luxury Hair Spa or Keratin protein treatments to ensure a flawless canvas for your big day."
    }
  ],
  studio: {
    name: "Gowsi Makeover Beauty and Studio",
    artist: "S. Gowsalya",
    experience: "11+ Years of Bridal Excellence",
    phone: "+91 94899 12195",
    phoneRaw: "9489912195",
    email: "gowsimakeover@gmail.com",
    addressLine1: "No: 109G AMS Building, 1st Floor",
    addressLine2: "Near AMS Indian Oil Company, Roman Church",
    addressLine3: "Joyalukkas Opp, Ramanathapuram – 623501",
    timings: "Mon – Sun: 9:00 AM – 8:30 PM",
    timingsNote: "* Bridal On-Location 24/7 on Booking",
    instagramUrl: "https://www.instagram.com/gowsi_makeover_?stkn=MTJobW9tanozOHA0dw==",
    instagramHandle: "@gowsi_makeover_",
    mapsUrl: "https://maps.google.com/?q=No+109G+AMS+Building+Ramanathapuram+623501"
  }
};

/**
 * Retrieve current site data from localStorage or fallback to default
 */
function getSiteData() {
  try {
    const stored = localStorage.getItem('gowsi_site_data');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with default to guarantee all keys exist
      return { ...DEFAULT_SITE_DATA, ...parsed };
    }
  } catch (err) {
    console.warn('Error reading site data from localStorage:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
}

/**
 * Save site data to localStorage
 */
function saveSiteData(data) {
  try {
    localStorage.setItem('gowsi_site_data', JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Error saving site data to localStorage:', err);
    return false;
  }
}

/**
 * Reset site data to initial default
 */
function resetSiteData() {
  localStorage.removeItem('gowsi_site_data');
  return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
}

/**
 * Utility: Convert file input image to Base64 Data URL for local storage
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
