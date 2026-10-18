export type Language = 'en' | 'ur';

export interface Translations {
  brandName: string;
  brandTagline: string;
  signature: string;
  nav: {
    home: string;
    products: string;
    packages: string;
    listProduct: string;
    portfolio: string;
    about: string;
    contact: string;
    admin: string;
  };
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    exploreProducts: string;
    listYourProduct: string;
    promoteYourBrand: string;
    quickStats: {
      highRetention: string;
      highRetentionSub: string;
      cinematic: string;
      cinematicSub: string;
      activeCategories: string;
      activeCategoriesSub: string;
      directLeads: string;
      directLeadsSub: string;
    };
  };
  categories: {
    all: string;
    watches: string;
    perfumes: string;
    shoes: string;
    slippers: string;
    clothing: string;
    electronics: string;
    cosmetics: string;
  };
  gallery: {
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortNewest: string;
    orderWhatsApp: string;
    visitStore: string;
    viewDetails: string;
    pkr: string;
    off: string;
    noProductsFound: string;
    watchAd: string;
    inquiries: string;
    visits: string;
  };
  packagesSection: {
    heading: string;
    subheading: string;
    currency: string;
    days: string;
    selectPackage: string;
    popularTag: string;
    disclaimer: string;
  };
  companyModal: {
    title: string;
    subtitle: string;
    brandName: string;
    contactPerson: string;
    businessEmail: string;
    phoneWhatsApp: string;
    websiteSocialLink: string;
    category: string;
    submit: string;
    successMessage: string;
  };
  productModal: {
    title: string;
    subtitle: string;
    productName: string;
    brandName: string;
    description: string;
    category: string;
    originalPrice: string;
    promoPrice: string;
    purchaseUrl: string;
    package: string;
    duration: string;
    imagesHelp: string;
    submitButton: string;
    successNotice: string;
    pendingNote: string;
  };
  admin: {
    portalTitle: string;
    portalSubtitle: string;
    loginPrompt: string;
    passwordPlaceholder: string;
    loginButton: string;
    logout: string;
    tabs: {
      overview: string;
      pending: string;
      approved: string;
      companies: string;
      packages: string;
    };
    stats: {
      pending: string;
      live: string;
      companies: string;
      inquiries: string;
      revenueEstimate: string;
    };
    actions: {
      approve: string;
      reject: string;
      delete: string;
      edit: string;
      markPaid: string;
      markUnpaid: string;
    };
  };
  portfolio: {
    badge: string;
    heading: string;
    subheading: string;
    watchInstagram: string;
    watchTikTok: string;
    moreComing: string;
  };
  footer: {
    copyright: string;
    privacyPolicy: string;
    allRightsReserved: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: 'Adeel AI Ads',
    brandTagline: 'Product Promotion Marketplace & AI Video Ads',
    signature: 'Adeel Zafar',
    nav: {
      home: 'Home',
      products: 'Marketplace',
      packages: 'Promotion Packages',
      listProduct: 'List Your Product',
      portfolio: 'AI Video Ads',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin Portal'
    },
    hero: {
      badge: 'Official Product Promotion Marketplace • Adeel Zafar',
      heading: 'Promote Your Products with Adeel AI Ads',
      subtitle: 'Showcase your brand, reach new customers, and promote your products with creative advertising.',
      exploreProducts: 'Explore Products',
      listYourProduct: 'List Your Product',
      promoteYourBrand: 'Promote Your Brand',
      quickStats: {
        highRetention: '7 Categories',
        highRetentionSub: 'Verified Marketplace',
        cinematic: 'Cinematic AI',
        cinematicSub: 'Video Ad Production',
        activeCategories: 'Direct WhatsApp',
        activeCategoriesSub: 'Instant Buyer Orders',
        directLeads: 'Transparent',
        directLeadsSub: 'PKR Flat Pricing'
      }
    },
    categories: {
      all: 'All Categories',
      watches: 'Watches',
      perfumes: 'Perfumes',
      shoes: 'Shoes',
      slippers: 'Slippers',
      clothing: 'Clothing',
      electronics: 'Electronics',
      cosmetics: 'Cosmetics'
    },
    gallery: {
      heading: 'Featured Product Showcase',
      subheading: 'Discover premium products actively promoted across Pakistan with high-converting creative ads.',
      searchPlaceholder: 'Search products, brands, or items...',
      sortFeatured: 'Featured First',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortNewest: 'Newest Arrivals',
      orderWhatsApp: 'Order via WhatsApp',
      visitStore: 'Visit Store / Website',
      viewDetails: 'Quick View',
      pkr: 'PKR',
      off: 'OFF',
      noProductsFound: 'No products match your current filters. Try selecting a different category or search term.',
      watchAd: 'Watch Video Ad',
      inquiries: 'Inquiries',
      visits: 'Visits'
    },
    packagesSection: {
      heading: 'Promotion & Advertising Packages',
      subheading: 'Choose a dedicated promotion package for your brand. All packages include verified marketplace placement and social exposure.',
      currency: 'PKR',
      days: 'days',
      selectPackage: 'Select Package & List Product',
      popularTag: 'Most Popular',
      disclaimer: 'Transparent promotional services. Deliverables include ad creation, placement, and direct routing. We do not guarantee specific sales, views, or customer volumes.'
    },
    companyModal: {
      title: 'Register Your Company',
      subtitle: 'Join Adeel AI Ads marketplace to showcase your brand and promote your products.',
      brandName: 'Company / Brand Name',
      contactPerson: "Contact Person's Name",
      businessEmail: 'Business Email',
      phoneWhatsApp: 'Phone / WhatsApp Number',
      websiteSocialLink: 'Website or Social Media Link',
      category: 'Primary Product Category',
      submit: 'Complete Registration',
      successMessage: 'Company registered successfully! You can now submit your products for promotion.'
    },
    productModal: {
      title: 'Submit Product for Promotion',
      subtitle: 'List your product on Adeel AI Ads marketplace. Submissions are reviewed by Adeel Zafar before going live.',
      productName: 'Product Name',
      brandName: 'Brand Name',
      description: 'Product Description & Features',
      category: 'Product Category',
      originalPrice: 'Original Price (PKR)',
      promoPrice: 'Promotional / Discount Price (PKR - Optional)',
      purchaseUrl: 'Product Purchase URL or Order Link',
      package: 'Requested Promotion Package',
      duration: 'Promotion Duration',
      imagesHelp: 'Paste direct image URL(s) or select sample image presets below.',
      submitButton: 'Submit Product for Review',
      successNotice: 'Submission Received! Your product is now pending review by administrator Adeel Zafar.',
      pendingNote: 'All listings remain pending until verified to ensure marketplace quality.'
    },
    admin: {
      portalTitle: 'Adeel AI Ads Admin Center',
      portalSubtitle: 'Authorized Owner Control Panel • Adeel Zafar',
      loginPrompt: 'Enter your admin password to access the dashboard.',
      passwordPlaceholder: 'Enter admin password...',
      loginButton: 'Unlock Admin Dashboard',
      logout: 'Log Out',
      tabs: {
        overview: 'Overview & Reports',
        pending: 'Pending Submissions',
        approved: 'Live Products',
        companies: 'Registered Brands',
        packages: 'Promotion Packages'
      },
      stats: {
        pending: 'Pending Review',
        live: 'Live Listings',
        companies: 'Registered Brands',
        inquiries: 'Buyer Inquiries',
        revenueEstimate: 'Promotions Recorded'
      },
      actions: {
        approve: 'Approve & Publish',
        reject: 'Reject Submission',
        delete: 'Delete Listing',
        edit: 'Edit Listing',
        markPaid: 'Mark Paid',
        markUnpaid: 'Mark Unpaid'
      }
    },
    portfolio: {
      badge: 'Adeel Zafar Studio Production',
      heading: 'Creative AI Video Ad Showcase',
      subheading: 'High-impact commercial video production crafted specifically for social platforms.',
      watchInstagram: 'Watch on Instagram',
      watchTikTok: 'Watch on TikTok',
      moreComing: 'More videos coming soon.'
    },
    footer: {
      copyright: 'Adeel AI Ads • Product Promotion Marketplace by Adeel Zafar',
      privacyPolicy: 'Privacy Policy',
      allRightsReserved: 'All rights reserved.'
    }
  },
  ur: {
    brandName: 'عدیل اے آئی ایڈز',
    brandTagline: 'پروڈکٹ پروموشن مارکیٹ پلیس اور اے آئی ویڈیو اشتہارات',
    signature: 'عدیل ظفر',
    nav: {
      home: 'ہوم',
      products: 'مارکیٹ پلیس',
      packages: 'پروموشن پیکجز',
      listProduct: 'پروڈکٹ درج کریں',
      portfolio: 'اے آئی ویڈیو اشتہار',
      about: 'ہمارے متعلق',
      contact: 'رابطہ',
      admin: 'ایڈمن پورٹل'
    },
    hero: {
      badge: 'آفیشل پروڈکٹ پروموشن مارکیٹ پلیس • عدیل ظفر',
      heading: 'عدیل اے آئی ایڈز کے ساتھ اپنی پروڈکٹس کی تشہیر کریں',
      subtitle: 'اپنے برانڈ کو اجاگر کریں، نئے گاہکوں تک رسائی حاصل کریں، اور تخلیقی اشتہارات سے اپنی پروڈکٹس کو پروموٹ کریں۔',
      exploreProducts: 'پروڈکٹس دیکھیں',
      listYourProduct: 'پروڈکٹ لسٹ کریں',
      promoteYourBrand: 'برانڈ پروموٹ کریں',
      quickStats: {
        highRetention: '7 کیٹیگریز',
        highRetentionSub: 'تصدیق شدہ مارکیٹ پلیس',
        cinematic: 'سینیمیٹک AI',
        cinematicSub: 'ویڈیو اشتہار پروڈکشن',
        activeCategories: 'براہ راست واٹس ایپ',
        activeCategoriesSub: 'فوری خریدار آرڈرز',
        directLeads: 'شفاف قیمتیں',
        directLeadsSub: 'پاکستانی روپے میں فکسڈ ریٹس'
      }
    },
    categories: {
      all: 'تمام کیٹیگریز',
      watches: 'گھڑیاں (Watches)',
      perfumes: 'پرفیومز (Perfumes)',
      shoes: 'جوتے (Shoes)',
      slippers: 'چپل و سلیپرز (Slippers)',
      clothing: 'لباس و کپڑے (Clothing)',
      electronics: 'الیکٹرانکس (Electronics)',
      cosmetics: 'کاسمیٹکس (Cosmetics)'
    },
    gallery: {
      heading: 'نمایاں پروڈکٹ گیلری',
      subheading: 'پاکستان کے پریمیم برانڈز کی مصنوعات جو سوشل میڈیا پر تشہیر کے لیے پیش کی گئی ہیں۔',
      searchPlaceholder: 'پروڈکٹ یا برانڈ تلاش کریں...',
      sortFeatured: 'نمایاں پروڈکٹس پہلے',
      sortPriceLow: 'قیمت: کم سے زیادہ',
      sortPriceHigh: 'قیمت: زیادہ سے کم',
      sortNewest: 'تازہ ترین لسٹنگز',
      orderWhatsApp: 'واٹس ایپ پر آرڈر کریں',
      visitStore: 'ویب سائٹ / اسٹور دیکھیں',
      viewDetails: 'تفصیلات دیکھیں',
      pkr: 'روپے',
      off: 'رعایت',
      noProductsFound: 'کوئی پروڈکٹ نہیں ملی۔ براہ کرم مختلف کیٹیگری یا سرچ کا انتخاب کریں۔',
      watchAd: 'ویڈیو اشتہار دیکھیں',
      inquiries: 'انکوائریز',
      visits: 'کلکس'
    },
    packagesSection: {
      heading: 'پروموشن اور تشہیری پیکجز',
      subheading: 'اپنے برانڈ کے لیے موزوں پروموشن پیکج منتخب کریں۔ تمام پیکجز میں مارکیٹ پلیس لسٹنگ اور سوشل میڈیا مہم شامل ہے۔',
      currency: 'روپے',
      days: 'دن',
      selectPackage: 'پیکج منتخب کریں اور پروڈکٹ لسٹ کریں',
      popularTag: 'سب سے مقبول',
      disclaimer: 'شفاف تشہیری خدمات۔ اس میں ویڈیو تخلیق، مارکیٹ پلیس لسٹنگ اور رابطہ شامل ہے۔ ہم کسی مخصوص سیلز، ویوز یا گاہکوں کی تعداد کی گارنٹی نہیں دیتے۔'
    },
    companyModal: {
      title: 'کمپنی / برانڈ رجسٹر کریں',
      subtitle: 'عدیل اے آئی ایڈز مارکیٹ پلیس پر اپنی کمپنی رجسٹر کریں اور مصنوعات کی تشہیر کریں۔',
      brandName: 'کمپنی یا برانڈ کا نام',
      contactPerson: 'رابطہ کار کا نام',
      businessEmail: 'کاروباری ای میل',
      phoneWhatsApp: 'فون یا واٹس ایپ نمبر',
      websiteSocialLink: 'ویب سائٹ یا سوشل میڈیا لنک',
      category: 'بنیادی پروڈکٹ کیٹیگری',
      submit: 'رجسٹریشن مکمل کریں',
      successMessage: 'کمپنی کامیابی کے ساتھ رجسٹر ہو گئی! اب آپ پروڈکٹس درج کر سکتے ہیں۔'
    },
    productModal: {
      title: 'پروموشن کے لیے پروڈکٹ جمع کروائیں',
      subtitle: 'اپنی پروڈکٹ عدیل اے آئی ایڈز پر لسٹ کریں۔ لائیو ہونے سے قبل عدیل ظفر اس کا جائزہ لیں گے۔',
      productName: 'پروڈکٹ کا نام',
      brandName: 'برانڈ کا نام',
      description: 'پروڈکٹ کی تفصیل و خصوصیات',
      category: 'پروڈکٹ کیٹیگری',
      originalPrice: 'اصل قیمت (پاکستانی روپے)',
      promoPrice: 'پروموشنل / رعایتی قیمت (اختیاری)',
      purchaseUrl: 'خریداری کا لنک یا ویب سائٹ',
      package: 'مطلوبہ پروموشن پیکج',
      duration: 'پروموشن کا دورانیہ',
      imagesHelp: 'پروڈکٹ تصویر کا لنک درج کریں یا نیچے دیے گئے سیمپل میں سے منتخب کریں۔',
      submitButton: 'پروڈکٹ جمع کروائیں',
      successNotice: 'پروڈکٹ موصول ہو گئی! ایڈمنسٹریٹر عدیل ظفر کی جانب سے منظوری کے بعد یہ مارکیٹ پلیس پر لائیو ہو جائے گی۔',
      pendingNote: 'کوالٹی کو یقینی بنانے کے لیے تمام پروڈکٹس جائزہ کے لیے پینڈنگ رکھی جاتی ہیں۔'
    },
    admin: {
      portalTitle: 'عدیل اے آئی ایڈز ایڈمن سنٹر',
      portalSubtitle: 'اختیار یافتہ اونر کنٹرول پینل • عدیل ظفر',
      loginPrompt: 'ڈیش بورڈ کھولنے کے لیے ایڈمن پاس ورڈ درج کریں۔',
      passwordPlaceholder: 'ایڈمن پاس ورڈ درج کریں...',
      loginButton: 'ڈیش بورڈ کھولیں',
      logout: 'لاگ آؤٹ',
      tabs: {
        overview: 'جائزہ اور رپورٹس',
        pending: 'زیر التواء مصنوعات',
        approved: 'لائیو پروڈکٹس',
        companies: 'رجسٹرڈ برانڈز',
        packages: 'پروموشن پیکجز'
      },
      stats: {
        pending: 'زیر التواء جائزے',
        live: 'لائیو مصنوعات',
        companies: 'رجسٹرڈ برانڈز',
        inquiries: 'خریدار انکوائریز',
        revenueEstimate: 'ریکارڈ شدہ پروموشنز'
      },
      actions: {
        approve: 'منظور کریں اور لائیو کریں',
        reject: 'درخواست مسترد کریں',
        delete: 'لسٹنگ ختم کریں',
        edit: 'ترمیم کریں',
        markPaid: 'ادائیگی موصول',
        markUnpaid: 'ادائیگی باقی'
      }
    },
    portfolio: {
      badge: 'عدیل ظفر اسٹوڈیو پروڈکشن',
      heading: 'تخلیقی اے آئی ویڈیو اشتہار',
      subheading: 'سوشل میڈیا اور انسٹاگرام ریلز کے لیے خاص طور پر تیار کیا گیا سینیمیٹک اشتہار۔',
      watchInstagram: 'انسٹاگرام پر دیکھیں',
      watchTikTok: 'ٹک ٹاک پر دیکھیں',
      moreComing: 'مزید ویڈیوز جلد آ رہی ہیں۔'
    },
    footer: {
      copyright: 'عدیل اے آئی ایڈز • پروڈکٹ پروموشن مارکیٹ پلیس از عدیل ظفر',
      privacyPolicy: 'پرائیویسی پالیسی',
      allRightsReserved: 'جملہ حقوق محفوظ ہیں۔'
    }
  }
};
