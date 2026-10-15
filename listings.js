/* =====================================================================
   listings.js: სანიმუშო ობიექტები და თარგმანები.

   თუ ადმინ-პანელი (admin.html) უკვე დაყენებულია და config.js შევსებულია,
   საიტი ობიექტებს ბაზიდან კითხულობს და ქვემოთ არსებული SALE/RENT სიები
   აღარ გამოიყენება. ბინებს მაშინ admin.html-დან ამატებთ და შლით.
   ეს ფაილი მაინც უნდა დარჩეს, რადგან იქ წერია PLACES_KA, AMENITIES და TAGS.

   თუ ადმინ-პანელს არ იყენებთ, ახალი ბინის დასამატებლად შეცვალეთ SALE/RENT.
   როგორ დავამატოთ ხელით:
   1. გახსენით ეს ფაილი VS Code-ში.
   2. იპოვეთ SALE (გასაყიდი) ან RENT (გასაქირავებელი).
   3. დააკოპირეთ ერთი ობიექტის ბლოკი ({ ... },) და ჩასვით სიის დასაწყისში.
   4. შეცვალეთ მონაცემები. ტექსტებს აქვს ორი ენა: en (ინგლისური) და ka (ქართული).
   5. შეინახეთ (Ctrl+S) და ბრაუზერში განაახლეთ გვერდი.

   სურათი: ჩადეთ საქაღალდე "images" და ჩაწერეთ img: 'images/ჩემი-ფოტო.jpg'.
   ყურადღება: ბოლო ობიექტის შემდეგ მძიმე არ არის სავალდებულო, დანარჩენებს შორის კი აუცილებელია.
   ===================================================================== */

const IMG = 'https://PRIMEPROPERTIES.com/wp-content/uploads/';

/* ადგილების ქართული სახელები. ახალი ადგილი დაამატეთ ახალ ხაზზე: 'English': 'ქართულად', */
const PLACES_KA = {
  'Manciano': 'მანჩიანო', 'Semproniano': 'სემპრონიანო', 'Bucine': 'ბუჩინე',
  'Sesto Fiorentino': 'სესტო ფიორენტინო', 'Montaione': 'მონტაიონე', 'Certaldo': 'ჩერტალდო',
  'Massa Marittima': 'მასა მარიტიმა', 'Massa e Cozzile': 'მასა ე კოცილე',
  'Montecatini Val di Cecina': 'მონტეკატინი ვალ დი ჩეჩინა', 'Pisa': 'პიზა',
  'Greve in Chianti': 'გრევე ინ კიანტი', 'Palaia': 'პალაია', 'Cortona': 'კორტონა',
  'San Casciano in Val di Pesa': 'სან-კაშანო ინ ვალ დი პეზა', 'Siena': 'სიენა',
  'Arezzo': 'არეცო', 'Scansano': 'სკანსანო', 'Roccalbegna': 'როკალბენია',
  'Florence': 'ფლორენცია', 'Lucca': 'ლუკა', 'San Gimignano': 'სან-ჯიმინიანო', 'Versilia': 'ვერსილია'
};

/* კეთილმოწყობა (გასაქირავებელი ობიექტებისთვის) */
const AMENITIES = {
  garden: { en: 'Garden', ka: 'ბაღი' },
  wifi:   { en: 'Wi-Fi', ka: 'Wi-Fi' },
  pool:   { en: 'Pool', ka: 'აუზი' },
  ac:     { en: 'Air conditioning', ka: 'კონდიციონერი' }
};

/* ბეჯები და ფილტრის ღილაკები (გასაქირავებელი ობიექტებისთვის) */
const TAGS = {
  pool: { en: 'Private pool', ka: 'კერძო აუზი' },
  sea:  { en: 'Sea view', ka: 'ხედი ზღვაზე' },
  city: { en: 'City centre', ka: 'ქალაქის ცენტრი' }
};

/* ---------------------------------------------------------------------
   გასაყიდი ობიექტები (seal.html)
   price: 0 ნიშნავს "მოთხოვნით". area: მ². land: ტექსტი, მაგ. '1 ha' ან '600 m²'.
   pool: true/false. sold: true/false (გაყიდულია).
   --------------------------------------------------------------------- */
const SALE = [
  { code: 'ES 358', place: 'Manciano', area: 150, land: '20 m²', beds: 2, baths: 2, price: 200000, pool: false, sold: false,
    name: { en: 'Stone Farmhouse Portion near the Thermal Baths of Saturnia', ka: 'ქვის ფერმის ნაწილი სატურნიას თერმული აბანოების მახლობლად' },
    img: IMG + '2026/10/casa-toscana-3.jpg' },
  { code: 'ES 355', place: 'Manciano', area: 180, land: '1 ha', beds: 4, baths: 3, price: 1200000, pool: true, sold: false,
    name: { en: 'Historic Stone Farmhouse with Pool and Panoramic Views', ka: 'ისტორიული ქვის ფერმა აუზით და პანორამული ხედით' },
    img: IMG + '2026/09/PRIMEPROPERTIES-2-3.webp' },
  { code: 'ES 354', place: 'Semproniano', area: 300, land: '52 ha', beds: 4, baths: 5, price: 950000, pool: false, sold: false,
    name: { en: 'Freshly Renovated Tuscan Farmhouse with Privacy', ka: 'ახლადრენოვირებული ტოსკანური ფერმა კერძო ტერიტორიით' },
    img: IMG + '2026/09/PRIMEPROPERTIES-66-1.webp' },
  { code: 'ES 353', place: 'Bucine', area: 1037, land: '1.9 ha', beds: 10, baths: 11, price: 2800000, pool: true, sold: false,
    name: { en: 'Prestigious Historic Castle in the Tuscan Hills near Siena', ka: 'პრესტიჟული ისტორიული ციხესიმაგრე ტოსკანის გორაკებზე, სიენასთან' },
    img: IMG + '2026/09/PRIMEPROPERTIES-100.webp' },
  { code: 'ES 109', place: 'Sesto Fiorentino', area: 3000, land: '2.2 ha', beds: 12, baths: 17, price: 4000000, pool: false, sold: false,
    name: { en: '14th-Century Grand Estate Just Outside Florence', ka: 'მე-14 საუკუნის დიდი მამული ფლორენციის განაპირას' },
    img: IMG + '2025/10/Ferroni-4-5-scaled.webp' },
  { code: 'ES 351', place: 'Montaione', area: 79, land: '170 m²', beds: 2, baths: 2, price: 238000, pool: true, sold: false,
    name: { en: 'Apartment with Private Garden and Pool in the Tuscan Hills', ka: 'აპარტამენტი კერძო ბაღით და აუზით ტოსკანის გორაკებზე' },
    img: IMG + '2026/09/facciata-e-giardino-3.jpg' },
  { code: 'ES 342', place: 'Certaldo', area: 900, land: '1 ha', beds: 8, baths: 14, price: 2700000, pool: true, sold: false,
    name: { en: 'Timeless 17th-Century Villa with Pool in the Heart of Chianti', ka: 'მე-17 საუკუნის ვილა აუზით კიანტის გულში' },
    img: IMG + '2026/07/villa-orchidea-esterni-posarellivillas-web-32-1.jpg' },
  { code: 'ES 349', place: 'Massa Marittima', area: 205, land: '3 ha', beds: 3, baths: 3, price: 800000, pool: true, sold: false,
    name: { en: 'Elegant Country Retreat with Pool & Horse Facilities', ka: 'ელეგანტური სოფლის რეზიდენცია აუზით და ცხენების ინფრასტრუქტურით' },
    img: IMG + '2025/05/Ferroni-10-4-scaled.webp' },
  { code: 'ES 348', place: 'Massa e Cozzile', area: 300, land: '6,000 m²', beds: 5, baths: 5, price: 1150000, pool: true, sold: false,
    name: { en: 'Tuscan Residence with B&B, Pool and Olive Grove', ka: 'ტოსკანური რეზიდენცია B&B-თი, აუზით და ზეთისხილის ბაღით' },
    img: IMG + '2026/08/PRIMEPROPERTIES-5-2.webp' },
  { code: 'ES 347', place: 'Montecatini Val di Cecina', area: 1000, land: '2 ha', beds: 2, baths: 9, price: 3000000, pool: true, sold: false,
    name: { en: 'Boutique Hotel for Sale in Tuscany', ka: 'ბუტიკ-სასტუმრო იყიდება ტოსკანაში' },
    img: IMG + '2026/08/PRIMEPROPERTIES-1-1.webp' },
  { code: 'ES 352', place: 'Pisa', area: 370, land: '600 m²', beds: 4, baths: 5, price: 1450000, pool: true, sold: false,
    name: { en: 'Exclusive Villa with Heated Infinity Pool near the Sea', ka: 'ექსკლუზიური ვილა გახურებადი ინფინითი აუზით ზღვასთან ახლოს' },
    img: IMG + '2026/08/villa-amace-29-scaled.jpg' },
  { code: 'ES 346', place: 'Greve in Chianti', area: 1130, land: '20.8 ha', beds: 9, baths: 8, price: 0, pool: false, sold: false,
    name: { en: 'Organic Chianti Classico Wine Estate with Historic Farmhouses', ka: 'ორგანული კიანტი კლასიკოს ღვინის მამული ისტორიული ფერმებით' },
    img: IMG + '2026/08/PRIMEPROPERTIES-8.webp' },
  { code: 'ES 329', place: 'Palaia', area: 550, land: '30 ha', beds: 8, baths: 8, price: 3950000, pool: true, sold: false,
    name: { en: 'Prestigious Tuscan Estate with 30 Hectares and Panoramic Pool', ka: 'პრესტიჟული ტოსკანური მამული 30 ჰექტრით და პანორამული აუზით' },
    img: IMG + '2026/06/DJI_20260624114357_0323_D.webp' },
  { code: 'ES 344', place: 'Cortona', area: 173, land: '—', beds: 3, baths: 2, price: 499000, pool: false, sold: false,
    name: { en: 'Historic 3-Bedroom Apartment with Panoramic Views', ka: 'ისტორიული 3-საძინებლიანი აპარტამენტი პანორამული ხედით კორტონაში' },
    img: IMG + '2026/07/PRIMEPROPERTIES-5-7.webp' },
  { code: 'ES 340', place: 'San Casciano in Val di Pesa', area: 7000, land: '10 ha', beds: 7, baths: 1, price: 23000000, pool: true, sold: false,
    name: { en: 'Medieval Castle Hotel 25 minutes from Florence', ka: 'შუა საუკუნეების ციხე-სასტუმრო ფლორენციიდან 25 წუთში' },
    img: IMG + '2026/07/castello-di-montefugoni-252.jpg' },
  { code: 'ES 339', place: 'Siena', area: 600, land: '—', beds: 7, baths: 8, price: 2700000, pool: false, sold: false,
    name: { en: 'Boutique Hotel next to Piazza del Campo', ka: 'ბუტიკ-სასტუმრო პიაცა დელ კამპოსთან, სიენა' },
    img: IMG + '2026/07/594016247.jpg' },
  { code: 'ES 336', place: 'Arezzo', area: 1944, land: '22.7 ha', beds: 16, baths: 18, price: 5900000, pool: true, sold: false,
    name: { en: 'Wine Estate with Luxury Villas near Arezzo', ka: 'პრესტიჟული ღვინის მამული ლუქს ვილებით არეცოსთან' },
    img: IMG + '2026/07/PRIMEPROPERTIES-108.webp' },
  { code: 'ES 335', place: 'Scansano', area: 163, land: '18 ha', beds: 2, baths: 2, price: 650000, pool: true, sold: false,
    name: { en: 'Stone Farmhouse with Olive Grove in the Tuscan Maremma', ka: 'ქვის ფერმა ზეთისხილის ბაღით ტოსკანის მარემაში' },
    img: IMG + '2026/07/PRIMEPROPERTIES-14-1.webp' },
  { code: 'ES 337', place: 'Manciano', area: 250, land: '3 ha', beds: 4, baths: 3, price: 650000, pool: true, sold: true,
    name: { en: 'Dream Villa with Pool in Tuscany', ka: 'საოცნებო ვილა აუზით ტოსკანაში' },
    img: IMG + '2026/07/PRIMEPROPERTIES-36-3.webp' },
  { code: 'ES 327', place: 'Roccalbegna', area: 140, land: '—', beds: 3, baths: 2, price: 215000, pool: false, sold: true,
    name: { en: 'Renovated Penthouse with Terrace in a Medieval Village', ka: 'განახლებული პენტჰაუსი ტერასით შუა საუკუნეების სოფელში' },
    img: IMG + '2026/06/PRIMEPROPERTIES-4-1.webp' }
];

/* ---------------------------------------------------------------------
   გასაქირავებელი ობიექტები (rent.html)
   type: 'Villa' ან 'Apartment'. tag: pool / sea / city (იხილეთ TAGS).
   amenities: სია AMENITIES-იდან. price: ფასი ერთ ღამეზე, ევროში.
   --------------------------------------------------------------------- */
const RENT = [
  { place: 'Siena', type: 'Villa', tag: 'pool', guests: 12, beds: 6, price: 2285, amenities: ['garden', 'wifi'],
    name: { en: 'Villa San Sanino', ka: 'ვილა სან-სანინო' },
    img: IMG + '2026/07/PICT3526_2.webp' },
  { place: 'Arezzo', type: 'Villa', tag: 'pool', guests: 8, beds: 4, price: 750, amenities: ['garden', 'wifi'],
    name: { en: 'Luxury Chalet Retreat', ka: 'ლუქს შალე რიტრიტი' },
    img: IMG + '2026/03/imgi_6_slide-1.webp' },
  { place: 'Versilia', type: 'Villa', tag: 'sea', guests: 10, beds: 5, price: 3000, amenities: ['pool', 'garden'],
    name: { en: 'Villa with Sea View and Pool', ka: 'ვილა ზღვის ხედით და აუზით' },
    img: IMG + '2026/03/32.webp' },
  { place: 'Siena', type: 'Villa', tag: 'pool', guests: 12, beds: 6, price: 1780, amenities: ['garden', 'wifi'],
    name: { en: 'Villa in Montalcino with Private Pool', ka: 'ვილა მონტალჩინოში კერძო აუზით' },
    img: IMG + '2026/02/imgi_18_borgo-santa-lucia-montalcino-3-qv4h30egtbv9sxwtwmwh58112z77ivedvu5v3j96to.webp' },
  { place: 'Florence', type: 'Villa', tag: 'pool', guests: 10, beds: 5, price: 2380, amenities: ['garden', 'wifi'],
    name: { en: 'Villa Gaudia', ka: 'ვილა გაუდია' },
    img: IMG + '2024/08/IMG_2949.jpeg' },
  { place: 'Lucca', type: 'Villa', tag: 'pool', guests: 12, beds: 6, price: 1764, amenities: ['garden', 'wifi'],
    name: { en: 'Villa Al Boschilia', ka: 'ვილა ალ ბოსკილია' },
    img: IMG + '2024/08/Ferroni-099.jpg' },
  { place: 'Certaldo', type: 'Apartment', tag: 'pool', guests: 4, beds: 2, price: 250, amenities: ['garden', 'wifi'],
    name: { en: 'La Certaldina, Apartment Sole', ka: 'ლა ჩერტალდინა, აპარტამენტი სოლე' },
    img: 'https://geco-images.vrbarea.com/photos/1792/wide/31.jpg' },
  { place: 'Florence', type: 'Apartment', tag: 'city', guests: 4, beds: 2, price: 167, amenities: ['wifi'],
    name: { en: 'Elegant Apartment near the Duomo', ka: 'ელეგანტური აპარტამენტი დუომოსთან' },
    img: 'https://geco-images.vrbarea.com/photos/1526/wide/low-def-deservi-appa-4d-1.jpg' },
  { place: 'Florence', type: 'Apartment', tag: 'city', guests: 6, beds: 3, price: 464, amenities: ['wifi', 'ac'],
    name: { en: 'Penthouse Torretta, Palazzo Pazzi Vitali', ka: 'პენტჰაუსი ტორეტა, პალაცო პაცი ვიტალი' },
    img: 'https://geco-images.vrbarea.com/photos/1053/wide/pazzi-vitali-web-20.jpg' },
  { place: 'San Gimignano', type: 'Villa', tag: 'pool', guests: 14, beds: 7, price: 513, amenities: ['garden', 'wifi'],
    name: { en: 'Villa Il Caggio', ka: 'ვილა ილ კაჯო' },
    img: 'https://posarelli-images.vrbarea.com/photos/95895/wide/villa-il-caggio-posarellivillas-esterni-6-.jpg' }
];
