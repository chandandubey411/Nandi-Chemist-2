const fs = require('fs');

const categories = [
  { name: 'OTC', subCategories: ['Pain Relief', 'Cough & Cold', 'Digestion', 'First Aid'] },
  { name: 'Vitamins', subCategories: ['Supplements', 'Vitamins & Minerals', 'Immunity'] },
  { name: 'Personal Care', subCategories: ['Skincare', 'Haircare', 'Oral Care', 'Bath & Body'] },
  { name: 'Baby Care', subCategories: ['Baby Food', 'Diapers', 'Baby Bath', 'Baby Skin'] },
  { name: 'Ayush', subCategories: ['Ayurvedic', 'Herbal', 'Homeopathy'] },
  { name: 'Devices', subCategories: ['Monitoring', 'Support', 'Dental'] },
  { name: 'Fitness', subCategories: ['Protein', 'Energy Drinks', 'Weight Management'] }
];

const imagePool = {
  'OTC': ['1584308666744-24d5c474f2ae', '1576671081837-49000212a370', '1587854692152-cbe660dbde88', '1584362917165-526a968579e8'],
  'Vitamins': ['1550572017-ea4a5e0e3d6e', '1559757175-0eb30cd8c063', '1607619056574-7b8d3ee536b2', '1626716493137-b67fe9501e76'],
  'Personal Care': ['1556228720-195a672e8a03', '1608248543803-ba4f8c70ae0b', '1556228578-0d85b1a4d571', '1611078449495-23190df0e566'],
  'Baby Care': ['1519689680058-324335c77eba', '1522771930-78848d9287dd', '1513807016779-ebfc9e7b2311', '1584852959828-0a0684f185ef'],
  'Ayush': ['1612207492003-8e96e7fbbe74', '1556742049-0cfed4f6a45d', '1598300042247-d088f8ab3a91', '1540420773420-3366772f4999'],
  'Devices': ['1631549916768-4119b2e5f926', '1584515933487-779824d29309', '1579154204601-01588f351e67', '1559757148-5c350d0d3c56'],
  'Fitness': ['1571019613454-1cb2f99b2d8b', '1517836357463-d25dfeac3438', '1526506456076-2e92c0c70428', '1574689049449-70dc198a26ef']
};

const brands = ['Apollo Pharmacy', 'Cipla', 'Sun Pharma', 'Mankind', 'Abbott', 'Himalaya', 'Dabur', 'Patanjali', 'Dr. Reddy\'s', 'Lupin', 'Alkem', 'Intas', 'MacLeods', 'Torrent', 'Zydus'];

const productNames = {
  'Pain Relief': ['Paracetamol 500mg', 'Ibuprofen 400mg', 'Diclofenac Gel', 'Pain Relief Spray', 'Aspirin 75mg', 'Migraine Relief', 'Joint Pain Oil', 'Muscle Relaxant'],
  'Cough & Cold': ['Cough Syrup', 'Cold Tablets', 'Vaporub', 'Nasal Drops', 'Throat Lozenges', 'Antihistamine', 'Expectorant', 'Inhaler'],
  'Digestion': ['Antacid Liquid', 'Digestive Enzymes', 'Laxative Powder', 'Probiotic Capsules', 'Gas Relief Pills', 'Acidity Regulator', 'Stomach Cleanser'],
  'First Aid': ['Antiseptic Liquid', 'Bandages Pack', 'Cotton Roll', 'Adhesive Tape', 'Burn Cream', 'Wound Cleanser', 'Gauze Swabs'],
  'Supplements': ['Omega 3 Fish Oil', 'Calcium + D3', 'Iron Tonic', 'Protein Powder', 'Vitamin B Complex', 'Vitamin C 500mg', 'Zinc Tablets'],
  'Vitamins & Minerals': ['Multivitamin Daily', 'Vitamin D3 60K', 'Biotin 10000mcg', 'Magnesium Citrate', 'Folic Acid', 'Vitamin E Capsules'],
  'Immunity': ['Immunity Booster', 'Vitamin C + Zinc', 'Giloy Tablets', 'Ashwagandha Extract', 'Tulsi Drops', 'Chyawanprash'],
  'Skincare': ['Aloe Vera Gel', 'Neem Face Wash', 'Moisturizing Lotion', 'Sunscreen SPF 50', 'Anti-Acne Cream', 'Rose Water', 'Vitamin C Serum'],
  'Haircare': ['Anti-Dandruff Shampoo', 'Hair Fall Control Oil', 'Hair Conditioner', 'Hair Serum', 'Biotin Shampoo', 'Ayurvedic Hair Oil'],
  'Oral Care': ['Herbal Toothpaste', 'Mouthwash', 'Soft Toothbrush', 'Dental Floss', 'Teeth Whitening Powder', 'Gum Care Paste'],
  'Bath & Body': ['Antibacterial Soap', 'Body Wash', 'Hand Sanitizer', 'Talcum Powder', 'Body Lotion', 'Shower Gel'],
  'Baby Food': ['Infant Formula Stage 1', 'Baby Cereal Apple', 'Baby Porridge', 'Cerelac Wheat', 'Baby Puree'],
  'Diapers': ['Baby Diapers Small', 'Baby Diapers Medium', 'Baby Diapers Large', 'Pants Style Diapers XL', 'Wet Wipes'],
  'Baby Bath': ['Baby Shampoo', 'Tear-Free Body Wash', 'Baby Massage Oil', 'Baby Soap', 'Baby Lotion'],
  'Baby Skin': ['Diaper Rash Cream', 'Baby Powder', 'Baby Moisturizer', 'Baby Sunscreen'],
  'Ayurvedic': ['Triphala Churna', 'Brahmi Vati', 'Shilajit Resin', 'Amla Juice', 'Neem Tablets', 'Guggul'],
  'Herbal': ['Aloe Vera Juice', 'Karela Jamun Juice', 'Wheatgrass Powder', 'Moringa Powder', 'Ashoka Cordial'],
  'Homeopathy': ['Arnica Ointment', 'Nux Vomica 30', 'Rhus Tox 200', 'Calendula Cream', 'Homeo Cough Syrup'],
  'Monitoring': ['Digital Thermometer', 'Pulse Oximeter', 'BP Monitor', 'Glucometer Kit', 'Weighing Scale'],
  'Support': ['Knee Cap', 'Crepe Bandage', 'Back Support Belt', 'Ankle Binder', 'Cervical Collar'],
  'Dental': ['Water Flosser', 'Electric Toothbrush', 'Denture Cleanser', 'Interdental Brush'],
  'Protein': ['Whey Protein 1kg', 'Plant Protein', 'Mass Gainer', 'BCAA Powder', 'Creatine Monohydrate'],
  'Energy Drinks': ['Electrolyte Powder', 'Energy Bar', 'Isotonic Drink', 'Pre-Workout Formula'],
  'Weight Management': ['Apple Cider Vinegar', 'Green Tea Extract', 'Fat Burner', 'Meal Replacement Shake']
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let products = [];
let idCounter = 1;

while (products.length < 200) {
  const cat = getRandom(categories);
  const subCat = getRandom(cat.subCategories);
  const baseName = getRandom(productNames[subCat] || ['Health Product']);
  const brand = getRandom(brands);
  
  const name = Math.random() > 0.5 ? `${brand} ${baseName}` : `${baseName} by ${brand}`;
  
  const originalPrice = getRandomInt(50, 2000);
  const discount = getRandomInt(5, 40);
  const price = Math.round(originalPrice * (1 - discount / 100));
  
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
  const reviews = getRandomInt(10, 5000);
  
  const imageId = getRandom(imagePool[cat.name]);
  const image = `https://images.unsplash.com/photo-${imageId}?w=400&h=400&fit=crop&auto=format`;
  
  const description = `High-quality ${subCat.toLowerCase()} product. Trusted by millions for effective results.`;
  
  const stock = getRandomInt(0, 500);
  const featured = Math.random() > 0.8;
  const isNew = Math.random() > 0.8;
  const isBestseller = Math.random() > 0.7;

  products.push({
    id: idCounter++,
    name,
    category: cat.name,
    subCategory: subCat,
    price,
    originalPrice,
    discount,
    rating: parseFloat(rating),
    reviews,
    image,
    description,
    manufacturer: brand,
    dosage: 'As directed by physician',
    sideEffects: 'Consult doctor if any adverse effects occur',
    stock,
    featured,
    isNew,
    isBestseller
  });
}

const fileContent = `export const products = ${JSON.stringify(products, null, 2)};

export const featuredProducts = products.filter(p => p.featured);
export const bestsellerProducts = products.filter(p => p.isBestseller);
export const newProducts = products.filter(p => p.isNew);
`;

fs.writeFileSync('src/data/products.js', fileContent);
console.log('Successfully generated 200 products in src/data/products.js');
