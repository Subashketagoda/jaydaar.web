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
    { id: "men", name: "Men's Modern Heritage" },
    { id: "dresses-sarees", name: "Silks & Sarees" }
  ],

  products: [
    {
      id: "jd-cpl-01",
      number: "01",
      name: "Crimson Flame Couple Set",
      subtitle: "Men's Tailored Sarong & Women's Draped Wrap Set",
      category: "couple",
      tag: "Signature Motif",
      images: [
        "assets/images/jaydaar_flame_couple.jpg",
        "assets/images/product_couple_crimson_heritage_set.jpg",
        "assets/images/product_couple_flame_batik_matching_set.jpg",
        "assets/images/product_men_flame_batik_sarong.jpg"
      ],
      description: "Jaydaar's celebrated signature ensemble. Synchronized flame batik wax-resist patterns surging upward from midnight noir into vibrant vermilion and amber. Crafted on handwoven pure combed cotton.",
      details: [
        "Includes Men's tailored flame sarong & Women's tie-back crop top with matching draped skirt",
        "100% Handcrafted Sri Lankan wax-resist cambric cotton",
        "Hand-dyed in small artisan atelier batches in Galle",
        "Men's Sarong: Free size with tailored pleated fall (length 48\")",
        "Women's Crop: Adjustable tie closure with breathable cotton lining"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke Made-to-Measure"]
    },
    {
      id: "jd-wm-01",
      number: "02",
      name: "Sage Botanical Co-ord Suit",
      subtitle: "Asymmetrical Lapel Vest & Wide-Leg Palazzo Trouser",
      category: "women",
      tag: "Studio Tailoring",
      images: [
        "assets/images/jaydaar_sage_coord.jpg",
        "assets/images/product_studio_sage_co_ord_full.jpg",
        "assets/images/product_studio_sage_co_ord_detail.jpg",
        "assets/images/product_studio_sage_co_ord_pose.jpg"
      ],
      description: "A triumph of architectural resort elegance. Features an asymmetric buttoned waistcoat vest adorned with palm frond wax batik placements, paired with fluid high-waisted palazzo trousers.",
      details: [
        "Two-piece ensemble: Asymmetric tailored vest + wide-leg trouser",
        "Muted organic sage green with botanical palm batik and natural wax crackle",
        "Deep functional side pockets on trousers",
        "100% Breathable cotton-linen blend"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke Made-to-Measure"]
    },
    {
      id: "jd-cpl-02",
      number: "03",
      name: "Noir Heritage Royal Couple Set",
      subtitle: "Men's Structured Linen Shirt & Sarong + Women's Marble Ensemble",
      category: "couple",
      tag: "Monochrome Archive",
      images: [
        "assets/images/hero_editorial.jpg",
        "assets/images/product_couple_royal_black_matching.jpg",
        "assets/images/product_men_white_shirt_black_sarong.jpg",
        "assets/images/lookbook_couple_intimate_black_white.jpg"
      ],
      description: "Understated luxury defined by crisp monochrome contrast. The gentleman’s structured linen shirt pairs with an ornate border sarong, echoing the lady's hand-dyed marble cracked batik top and draped skirt.",
      details: [
        "Hand-batik wax-crack effect top with matching draped sarong skirt",
        "Fine combed cotton & pure linen blends",
        "Gentle cold hand wash recommended"
      ],
      sizes: ["S", "M", "L", "XL", "Bespoke"]
    },
    {
      id: "jd-sr-01",
      number: "04",
      name: "Signature Flame Batik Sarong",
      subtitle: "Fiery Gradient Hand-Dyed Pure Cotton Sarong",
      category: "sarongs",
      tag: "Iconic Piece",
      images: [
        "assets/images/product_men_flame_batik_sarong.jpg",
        "assets/images/detail_flame_batik_fabric.jpg",
        "assets/images/jaydaar_flame_couple.jpg"
      ],
      description: "Jaydaar's definitive flame batik sarong. Hand-drawn wax flames surging upward from an obsidian hemline into fiery hues of orange and scarlet. A timeless statement of island craftsmanship.",
      details: [
        "Length: 48\" | Circumference: 78\" (Tubular finish)",
        "100% Hand-waxed Cambric Cotton",
        "Rich double-sided color saturation",
        "Unisex wear"
      ],
      sizes: ["Free Size (Standard)", "Free Size (Extra Length)"]
    },
    {
      id: "jd-wm-02",
      number: "05",
      name: "Kandyan Lotus Silk Saree",
      subtitle: "Hand-Painted Nil Manel Water Lily on Pure Habotai Silk",
      category: "dresses-sarees",
      tag: "Heirloom Silk",
      images: [
        "assets/images/product_women_lotus_kandyan_saree_full.jpg",
        "assets/images/product_women_lotus_batik_saree_close.jpg",
        "assets/images/lookbook_lotus_saree_portrait.jpg"
      ],
      description: "A masterwork of Sri Lankan textile art. Featuring the national flower — the Blue Water Lily (Nil Manel) — painstakingly hand-painted across pure Habotai silk with crackle wax veining.",
      details: [
        "Includes matching unstitched blouse piece with puff-sleeve embroidery accents",
        "Length: 6.25 meters (including blouse fabric)",
        "100% Pure Habotai Silk blend",
        "Dry clean only"
      ],
      sizes: ["Standard Draping Length"]
    },
    {
      id: "jd-cpl-03",
      number: "06",
      name: "Vortex Concentric Circles Couple Duo",
      subtitle: "Hand-Stamped Geometric Target Motif Duo",
      category: "couple",
      tag: "Geometric",
      images: [
        "assets/images/product_couple_vintage_radio_red_set.jpg",
        "assets/images/product_women_vortex_circles_red_set.jpg",
        "assets/images/product_men_vortex_circles_red_sarong.jpg"
      ],
      description: "Bold circular target batik motifs in scarlet red and monochrome black. A playful yet deeply rooted statement piece perfect for weddings, traditional festivities, and stylish portraiture.",
      details: [
        "Hand-painted concentric circle batik on 100% heavy cotton",
        "Men's Sarong: Free size with deep rich dye penetration",
        "Women's Set: Cropped tie-front top & matching high-rise wrap skirt"
      ],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: "jd-wm-03",
      number: "07",
      name: "Crimson Floral Draped Saree",
      subtitle: "Scarlet Red Batik Saree with Contrast White Blooms",
      category: "dresses-sarees",
      tag: "Festive Drape",
      images: [
        "assets/images/product_studio_crimson_floral_saree_01.jpg",
        "assets/images/product_studio_crimson_floral_saree_02.jpg",
        "assets/images/product_studio_crimson_floral_saree_03.jpg"
      ],
      description: "Radiant scarlet red paired with bold abstract daisy florals. Designed to drape effortlessly with lightweight fluidity for weddings and celebratory ceremonies.",
      details: [
        "Handcrafted wax batik on luxury georgette/silk mix",
        "Comes with matching floral print blouse piece",
        "Hand-fringed pallu finish"
      ],
      sizes: ["Standard Draping Length"]
    },
    {
      id: "jd-wm-04",
      number: "08",
      name: "Sunset Amber Tiered Flare Dress",
      subtitle: "Adjustable Tie-Strap Batik Sundress with Ruffle Hem",
      category: "dresses-sarees",
      tag: "Resort Silhouette",
      images: [
        "assets/images/product_studio_amber_flare_dress_01.jpg",
        "assets/images/product_studio_amber_flare_dress_02.jpg",
        "assets/images/product_studio_amber_flare_dress_03.jpg"
      ],
      description: "Youthful, effervescent, and vibrant. This sweet tie-strap mini dress cascades with fiery saffron and tangerine batik patterns with a flirtatious tiered ruffle hem.",
      details: [
        "Adjustable shoulder ribbon ties",
        "Smocked elastic back bodice for flexible fit",
        "Soft inner cotton lining to prevent transparency"
      ],
      sizes: ["XS", "S", "M", "L"]
    },
    {
      id: "jd-mn-01",
      number: "09",
      name: "Artisan Linen Shirt & Sarong Duo",
      subtitle: "Mandarin Collar Linen Shirt with Hand-Waxed Sarong",
      category: "men",
      tag: "Men's Modern",
      images: [
        "assets/images/product_men_white_shirt_black_sarong.jpg",
        "assets/images/product_men_black_shirt_geometric_sarong.jpg",
        "assets/images/product_men_flame_batik_sarong.jpg"
      ],
      description: "The modern gentleman's sartorial statement. Premium crisp cotton-linen shirt tailored with modern Mandarin collar lines, paired with our authentic handcrafted batik sarong.",
      details: [
        "Shirt: 100% fine cotton-linen blend with wooden buttons",
        "Sarong: Authentic hand-waxed Sri Lankan cotton (Free Size)"
      ],
      sizes: ["S", "M", "L", "XL", "XXL", "Bespoke"]
    }
  ],

  lookbook: [
    {
      id: "lb-01",
      image: "assets/images/jaydaar_flame_couple.jpg",
      caption: "The Flame Collection — Signature synchrony in crimson and noir.",
      productId: "jd-cpl-01"
    },
    {
      id: "lb-02",
      image: "assets/images/jaydaar_sage_coord.jpg",
      caption: "Botanical Sage Tailoring — Asymmetric waistcoat & wide-leg trouser.",
      productId: "jd-wm-01"
    },
    {
      id: "lb-03",
      image: "assets/images/hero_editorial.jpg",
      caption: "High fashion colonial estate editorial — Couple matching sarong drapes.",
      productId: "jd-cpl-02"
    },
    {
      id: "lb-04",
      image: "assets/images/product_women_lotus_kandyan_saree_full.jpg",
      caption: "Blue Water Lily hand-painted silk saree.",
      productId: "jd-wm-02"
    },
    {
      id: "lb-05",
      image: "assets/images/product_couple_vintage_radio_red_set.jpg",
      caption: "Concentric target batik couple pairing.",
      productId: "jd-cpl-03"
    },
    {
      id: "lb-06",
      image: "assets/images/product_studio_amber_flare_dress_02.jpg",
      caption: "Sunset amber tiered flare sundress.",
      productId: "jd-wm-04"
    },
    {
      id: "lb-07",
      image: "assets/images/product_studio_crimson_floral_saree_01.jpg",
      caption: "Crimson floral hand-painted drape.",
      productId: "jd-wm-03"
    },
    {
      id: "lb-08",
      image: "assets/images/product_men_flame_batik_sarong.jpg",
      caption: "Men's signature flame batik sarong.",
      productId: "jd-sr-01"
    }
  ],
  
  socialPosts: [
    {
      id: "sp-01",
      image: "assets/images/jaydaar_flame_couple.jpg",
      caption: "Synchronized flame batik couple matching ensemble. Handcrafted wax-resist in Galle.",
      url: "https://instagram.com/jaydaar_"
    },
    {
      id: "sp-02",
      image: "assets/images/jaydaar_sage_coord.jpg",
      caption: "Muted botanical sage tailoring: Asymmetric waistcoat vest & wide-leg trouser.",
      url: "https://instagram.com/jaydaar_"
    },
    {
      id: "sp-03",
      image: "assets/images/hero_editorial.jpg",
      caption: "Timeless Sri Lankan heritage captured on colonial estate grounds.",
      url: "https://instagram.com/jaydaar_"
    },
    {
      id: "sp-04",
      image: "assets/images/product_men_flame_batik_sarong.jpg",
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
      poster: "assets/images/jaydaar_flame_couple.jpg",
      caption: "An elevated expression of Sri Lankan batik celebrating festive milestones and contemporary silhouettes."
    },
    {
      id: "reel-02",
      title: "Kandyan Silk Bridal Drape",
      tag: "Heirloom Bridal",
      video: "assets/videos/jaydaar_kandyan_saree_bride.mp4",
      poster: "assets/images/product_women_lotus_kandyan_saree_full.jpg",
      caption: "Hand-painted traditional Nil Manel water lily motifs across pure silk, tailored for bride Geethma Bandara."
    },
    {
      id: "reel-03",
      title: "Draped Saree Elegance",
      tag: "Couture Drape",
      video: "assets/videos/jaydaar_draped_elegance_saree.mp4",
      poster: "assets/images/product_studio_crimson_floral_saree_01.jpg",
      caption: "Draped in elegance, sprinkled with love. Fluid movement and vibrant artisan wax resist."
    },
    {
      id: "reel-04",
      title: "Signature Noir Bloom",
      tag: "Monochrome Archive",
      video: "assets/videos/jaydaar_noir_bloom.mp4",
      poster: "assets/images/product_couple_royal_black_matching.jpg",
      caption: "Midnight redefined in timeless elegance. Noir Bloom, our signature monochrome batik creation."
    }
  ]
};
