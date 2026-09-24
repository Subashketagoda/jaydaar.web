/**
 * Jaydaar - Haute Couture Lookbook Archive (Zara / Jacquemus Editorial)
 * "A Style That Is Timeless"
 */

const JAYDAAR_DATA = {
  brand: {
    name: "JAYDAAR",
    tagline: "A style that is timeless",
    phone: "+94771234567",
    whatsappNumber: "94771234567",
    instagram: "@jaydaar_",
    instagramUrl: "https://instagram.com/jaydaar_",
    email: "inquire@jaydaar.com",
    locations: "Colombo Atelier & Galle Fort Studio, Sri Lanka"
  },
  
  categories: [
    { id: "all", name: "Complete Archive" },
    { id: "couple", name: "The Couple Edit" },
    { id: "sarongs", name: "Batik Sarongs" },
    { id: "women", name: "Women's Pret-a-Porter" },
    { id: "men", name: "Men's Modern Heritage" }
  ],

  products: [
    {
      id: "jd-cpl-01",
      number: "01",
      name: "Amber Flame Couple Ensemble",
      subtitle: "Men's Flame Batik Sarong & Women's Draped Marble Set",
      category: "couple",
      tag: "Signature Motif",
      images: [
        "assets/images/jaydaar_couple_amber_flame.jpg",
        "assets/images/jaydaar_men_amber_flame_sarong.jpg"
      ],
      description: "Jaydaar's hallmark creation. Handcrafted fiery contours surging upward from midnight noir into rich vermilion and amber, meticulously synchronized between gentleman and lady.",
      details: [
        "Includes Men's tailored flame sarong & Women's tie-back marble crop top with matching draped skirt",
        "100% Handcrafted Sri Lankan wax-resist cambric cotton",
        "Hand-dyed in small artisan atelier batches in Galle",
        "Men's Sarong: Free size with tailored pleated fall (length 48\")",
        "Women's Crop: Adjustable tie closure with breathable cotton lining"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke Made-to-Measure"]
    },
    {
      id: "jd-sr-01",
      number: "02",
      name: "Men's Signature Amber Flame Sarong",
      subtitle: "Fiery Gradient Hand-Dyed Pure Cotton Sarong",
      category: "sarongs",
      tag: "Iconic Piece",
      images: [
        "assets/images/jaydaar_men_amber_flame_sarong.jpg",
        "assets/images/jaydaar_couple_amber_flame.jpg"
      ],
      description: "Jaydaar's definitive flame batik sarong. Hand-drawn wax flames surging upward from an obsidian hemline into fiery hues of orange and scarlet. A timeless statement of island craftsmanship.",
      details: [
        "Length: 48\" | Circumference: 78\" (Tubular finish)",
        "100% Hand-waxed Cambric Cotton",
        "Rich double-sided color saturation",
        "Unisex / Men's tailored fall"
      ],
      sizes: ["Free Size (Standard)", "Free Size (Extra Length)"]
    },
    {
      id: "jd-cpl-02",
      number: "03",
      name: "Noir & Crimson Splatter Couple Set",
      subtitle: "Synchronized Graphic Splatter Sarong & Marble Wrap Set",
      category: "couple",
      tag: "Modern Heritage",
      images: [
        "assets/images/jaydaar_couple_noir_crimson.jpg",
        "assets/images/jaydaar_women_noir_crimson_skirt.jpg"
      ],
      description: "Dramatic monochrome noir intersected with bold crimson splatter batik. Featuring synchronized motifs meticulously balanced between the gentleman's statement sarong and the lady's draped wrap silhouette.",
      details: [
        "Two-piece couple set: Men's tailored sarong + Women's wrap skirt ensemble",
        "100% Premium cambric cotton with genuine wax crackle texture",
        "Cold water vat-dyed for lifelong pigment vibrancy",
        "Custom sizing and made-to-measure tailoring available"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke"]
    },
    {
      id: "jd-wm-01",
      number: "04",
      name: "Noir Splatter Draped Skirt & Marble Top",
      subtitle: "Women's High-Rise Draped Sarong Skirt & Tie-Back Crop Top",
      category: "women",
      tag: "Atelier Pret-a-Porter",
      images: [
        "assets/images/jaydaar_women_noir_crimson_skirt.jpg",
        "assets/images/jaydaar_couple_noir_crimson.jpg"
      ],
      description: "A contemporary silhouette celebrating slow fashion. The structured high-waisted draped sarong skirt in noir and crimson batik pairs gracefully with our signature marble crackle tie-back crop top.",
      details: [
        "Includes adjustable tie-back crop top + fluid wrap-style draped skirt",
        "Hand-waxed batik on breathable pure cotton",
        "Flattering high-rise waist with tailored sash",
        "Gentle cold hand wash recommended"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke"]
    },
    {
      id: "jd-cpl-03",
      number: "05",
      name: "Royal Crimson Elephant Heritage Couple Set",
      subtitle: "Traditional Royal Gaja Border Sarong & Matching Ensemble",
      category: "couple",
      tag: "Heirloom Archive",
      images: [
        "assets/images/jaydaar_couple_crimson_elephant.jpg"
      ],
      description: "Inspired by Sri Lanka's sacred regal processions. Featuring hand-waxed elephant (Gaja) borders framed in royal crimson and obsidian noir, honoring centuries of island textile artistry.",
      details: [
        "Traditional royal elephant border motif on premium heavy combed cotton",
        "Synchronized border drapes tailored for wedding shoots and milestone ceremonies",
        "Handcrafted using traditional copper stamp & wax-resist techniques",
        "Men's Sarong: Free size with deep pleated fall"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke"]
    }
  ],

  lookbook: [
    {
      id: "lb-01",
      image: "assets/images/jaydaar_couple_amber_flame.jpg",
      caption: "The Amber Flame Collection — Signature synchrony in vermilion and noir.",
      productId: "jd-cpl-01"
    },
    {
      id: "lb-02",
      image: "assets/images/jaydaar_men_amber_flame_sarong.jpg",
      caption: "Men's Modern Heritage — Amber flame wax-resist sarong.",
      productId: "jd-sr-01"
    },
    {
      id: "lb-03",
      image: "assets/images/jaydaar_couple_noir_crimson.jpg",
      caption: "Noir & Crimson Splatter — Synchronized graphic batik couple drape.",
      productId: "jd-cpl-02"
    },
    {
      id: "lb-04",
      image: "assets/images/jaydaar_women_noir_crimson_skirt.jpg",
      caption: "Atelier Silhouette — Draped skirt and marble crackle crop top.",
      productId: "jd-wm-01"
    },
    {
      id: "lb-05",
      image: "assets/images/jaydaar_couple_crimson_elephant.jpg",
      caption: "Royal Crimson Elephant — Heirloom Sri Lankan heritage ensemble.",
      productId: "jd-cpl-03"
    }
  ],
  
  socialPosts: [
    {
      id: "sp-01",
      video: "assets/videos/jaydaar_campaign_1.mp4",
      poster: "assets/images/jaydaar_couple_amber_flame.jpg",
      caption: "Synchronized flame batik couple matching ensemble. Handcrafted wax-resist in Galle.",
      url: "https://instagram.com/jaydaar_"
    },
    {
      id: "sp-02",
      video: "assets/videos/jaydaar_wrap_top_palazzo.mp4",
      poster: "assets/images/jaydaar_women_noir_crimson_skirt.jpg",
      caption: "Modern wrap crop top & pleated sarong skirt fall in motion.",
      url: "https://instagram.com/jaydaar_"
    },
    {
      id: "sp-03",
      video: "assets/videos/jaydaar_campaign_2.mp4",
      poster: "assets/images/jaydaar_couple_noir_crimson.jpg",
      caption: "Timeless Sri Lankan heritage captured on colonial estate grounds.",
      url: "https://instagram.com/jaydaar_"
    },
    {
      id: "sp-04",
      video: "assets/videos/jaydaar_campaign_4.mp4",
      poster: "assets/images/jaydaar_men_amber_flame_sarong.jpg",
      caption: "The iconic hand-drawn flame sarong on pure cambric cotton.",
      url: "https://instagram.com/jaydaar_"
    }
  ],

  reels: [
    {
      id: "reel-01",
      title: "New Year Collection Drop",
      tag: "Campaign 2026",
      video: "assets/videos/jaydaar_new_year_collection.mp4",
      poster: "assets/images/jaydaar_couple_amber_flame.jpg",
      caption: "An elevated expression of Sri Lankan batik celebrating festive milestones and contemporary silhouettes."
    },
    {
      id: "reel-02",
      title: "Royal Elephant Heritage",
      tag: "Heirloom Archive",
      video: "assets/videos/jaydaar_kandyan_saree_bride.mp4",
      poster: "assets/images/jaydaar_couple_crimson_elephant.jpg",
      caption: "Traditional elephant border motifs in crimson and noir, honoring centuries of island artistry."
    },
    {
      id: "reel-03",
      title: "Draped Skirt Elegance",
      tag: "Couture Drape",
      video: "assets/videos/jaydaar_draped_elegance_saree.mp4",
      poster: "assets/images/jaydaar_women_noir_crimson_skirt.jpg",
      caption: "Draped in elegance, fluid movement and vibrant artisan wax resist."
    },
    {
      id: "reel-04",
      title: "Noir Splatter Synchrony",
      tag: "Monochrome Archive",
      video: "assets/videos/jaydaar_noir_bloom.mp4",
      poster: "assets/images/jaydaar_couple_noir_crimson.jpg",
      caption: "Midnight redefined in timeless elegance. Graphic splatter batik creation for couple styling."
    }
  ]
};
