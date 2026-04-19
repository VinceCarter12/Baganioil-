// Bulk Product Import Script for Bagani Oil Sanity CMS
// Run: node scripts/import-products.js
// Requires: SANITY_API_TOKEN in environment (write token from Sanity dashboard)

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'c7mgn6k7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const products = [
  {
    _type: 'product',
    name: 'Bagani Amihan 4T Gale',
    slug: { _type: 'slug', current: 'bagani-amihan-4t-gale' },
    line: 'Amihan',
    category: 'amihan',
    spec: '10W-40 | JASO MB | API SL',
    shortDesc: 'Best performance semi-synthetic motorcycle engine oil specially made for scooters.',
    description: 'BAGANI AMIHAN 4T GALE is a semi-synthetic, multi-grade engine oil developed for 4-stroke motorcycles, formulated according to Japanese and U.S. performance standards. Produced using high-quality base oils combined with advanced additive technology to deliver reliable engine protection and performance.',
    description2: 'Recognized and trusted by motorcycle enthusiasts and professional riders worldwide, BAGANI AMIHAN 4T GALE helps optimize engine operation for improved power output and efficiency. Proudly made in the Philippines — Gawang Pilipino, Para sa Pilipino!',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Amihan 4T Gale' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: '10W-40' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API SL' },
      { _type: 'object', _key: 'spec4', key: 'JASO Rating', value: 'JASO MB' },
      { _type: 'object', _key: 'spec5', key: 'Engine Type', value: 'Motorcycle Scooter' },
      { _type: 'object', _key: 'spec6', key: 'Specific Gravity', value: '0.8674' },
      { _type: 'object', _key: 'spec7', key: 'Flash Point', value: '234°C' },
      { _type: 'object', _key: 'spec8', key: 'Pour Point', value: '-36°C' },
      { _type: 'object', _key: 'spec9', key: 'Viscosity Index', value: '155' },
      { _type: 'object', _key: 'spec10', key: 'TBN', value: '9.6 mgKOH/g' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Performance Enhancement', desc: 'Designed to support stronger engine performance and smoother acceleration for an improved riding experience.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'Reliable Engine Protection', desc: 'Helps guard against rust, abrasion, and mechanical wear, extending engine life and maintaining optimal efficiency.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Engine Cleanliness', desc: 'Advanced detergent additives help prevent deposit formation and keep internal engine components clean.', icon: '/images/icon-service-5.svg' },
      { _type: 'object', _key: 'f4', title: 'Smooth Cold Start', desc: 'Provides dependable cold-start lubrication while supporting longer oil service intervals.', icon: '/images/icon-service-8.svg' },
    ],
    applications: ['Modern automatic scooters', 'CVT-equipped motorcycles', '4-stroke motorcycles requiring 10W-40', 'Urban commuter bikes'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'Is Bagani Amihan 4T Gale good for my scooter?', a: 'Yes! With JASO MB certification it is specifically designed for scooters and CVT-equipped motorcycles.' },
      { _type: 'object', _key: 'faq2', q: 'What is the difference between JASO MA and MB?', a: 'JASO MA is for motorcycles with wet clutches, while JASO MB is optimized for scooters and bikes with CVT transmissions.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Amihan 4T Gust',
    slug: { _type: 'slug', current: 'bagani-amihan-4t-gust' },
    line: 'Amihan',
    category: 'amihan',
    spec: 'SAE 40 | JASO MA | API SG',
    shortDesc: 'High mileage motorcycle engine oil with enhanced wear protection and fuel efficiency.',
    description: 'BAGANI AMIHAN 4T GUST is a high-quality multi-grade engine oil developed for four-stroke motorcycle engines, including both air-cooled and water-cooled systems. Its advanced wear protection formulation helps maintain consistent engine protection, particularly in motorcycles operating under high power and demanding conditions.',
    description2: 'Proudly made in the Philippines — Gawang Pilipino, Para sa Pilipino! Suitable for modern Japanese and European motorcycles and small four-stroke gasoline-powered equipment such as generator sets, pumps, and garden machinery.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Amihan 4T Gust' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: 'SAE 40' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API SG/CD' },
      { _type: 'object', _key: 'spec4', key: 'JASO Rating', value: 'JASO MA' },
      { _type: 'object', _key: 'spec5', key: 'Engine Type', value: 'Motorcycle Scooter' },
      { _type: 'object', _key: 'spec6', key: 'Specific Gravity', value: '0.8707' },
      { _type: 'object', _key: 'spec7', key: 'Flash Point', value: '237°C' },
      { _type: 'object', _key: 'spec8', key: 'Pour Point', value: '-11.5°C' },
      { _type: 'object', _key: 'spec9', key: 'Viscosity Index', value: '112' },
      { _type: 'object', _key: 'spec10', key: 'TBN', value: '6.0 mgKOH/g' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Enhanced Wear Protection', desc: 'Helps safeguard engine components against friction and premature wear.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'Lower Oil Consumption', desc: 'Supports reduced oil usage while helping maintain cleaner engine internals.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Cost-Effective Maintenance', desc: 'Helps minimize engine deposits, contributing to reduced maintenance requirements.', icon: '/images/icon-service-5.svg' },
      { _type: 'object', _key: 'f4', title: 'Improved Fuel Efficiency', desc: 'Promotes efficient engine performance and optimized fuel consumption.', icon: '/images/icon-service-8.svg' },
    ],
    applications: ['Modern Japanese and European motorcycles', 'Small 4-stroke gasoline-powered equipment', 'Generator sets and pumps', 'Garden machinery'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'Can I use Bagani Amihan 4T Gust in my generator?', a: 'Yes, it is suitable for small four-stroke gasoline-powered equipment such as generator sets, pumps, and garden machinery.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Amihan 4T Tempest',
    slug: { _type: 'slug', current: 'bagani-amihan-4t-tempest' },
    line: 'Amihan',
    category: 'amihan',
    spec: '20W-50 | JASO MA-2 | API SL',
    shortDesc: 'High-speed motorcycle engine oil with advanced wear protection for 4-stroke engines.',
    description: 'BAGANI 4T TEMPEST is a high-quality multi-grade engine oil developed for four-stroke motorcycle engines, including both air-cooled and water-cooled systems. Its advanced wear protection formulation helps maintain consistent engine protection, particularly in motorcycles operating under high power and demanding conditions.',
    description2: 'Proudly made in the Philippines — Gawang Pilipino, Para sa Pilipino! Meets API SL and JASO T903 MA-2 specifications, suitable for many modern Japanese and European motorcycle models.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Amihan 4T Tempest' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: '20W-50' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API SL' },
      { _type: 'object', _key: 'spec4', key: 'JASO Rating', value: 'JASO MA-2' },
      { _type: 'object', _key: 'spec5', key: 'Engine Type', value: '4-Stroke Motorcycle' },
      { _type: 'object', _key: 'spec6', key: 'Specific Gravity', value: '0.884' },
      { _type: 'object', _key: 'spec7', key: 'Flash Point', value: '234°C' },
      { _type: 'object', _key: 'spec8', key: 'Pour Point', value: '-18.5°C' },
      { _type: 'object', _key: 'spec9', key: 'Viscosity Index', value: '122' },
      { _type: 'object', _key: 'spec10', key: 'TBN', value: '10.0 mgKOH/g' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Excellent Wear Protection', desc: 'Helps reduce friction and protects critical engine components from premature wear.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'Engine Cleanliness', desc: 'Formulated with effective detergent and dispersant additives to help keep engine parts clean.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Stable Viscosity Performance', desc: 'High viscosity index ensures reliable lubrication during cold starts and at elevated temperatures.', icon: '/images/icon-service-5.svg' },
      { _type: 'object', _key: 'f4', title: 'Reduced Oil Consumption', desc: 'Supports controlled oil usage while helping extend oil service intervals.', icon: '/images/icon-service-8.svg' },
    ],
    applications: ['Modern four-stroke motorcycle engines', 'On-road motorcycles', 'Off-road dirt bikes', 'Selected farm machinery and generator sets'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'What motorcycles is Bagani Amihan 4T Tempest suitable for?', a: 'It is suitable for modern four-stroke motorcycle engines including air-cooled and water-cooled systems, on-road motorcycles, and off-road dirt bikes.' },
      { _type: 'object', _key: 'faq2', q: 'What does JASO MA-2 mean?', a: 'JASO MA-2 is a Japanese performance standard for 4-stroke motorcycle oils with wet clutch compatibility at a higher friction level, suitable for modern high-performance motorcycles.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Aman Deep',
    slug: { _type: 'slug', current: 'bagani-aman-deep' },
    line: 'Aman',
    category: 'aman',
    spec: 'SAE 90 & 140 | API GL-4',
    shortDesc: 'Multi-purpose automotive gear lubricant with strong load-carrying capability.',
    description: 'BAGANI AMAN DEEP is a multi-purpose gear lubricant developed to satisfy the performance requirements of API GL-4 service applications. It is manufactured using carefully selected base oils combined with a specialized additive system that delivers reliable performance.',
    description2: 'Delivers strong load-carrying capability, resistance to oxidation and foaming, protection against oil thickening, and effective defense against rust and corrosion.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Aman Deep' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: 'SAE 90 & SAE 140' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API GL-4' },
      { _type: 'object', _key: 'spec4', key: 'Engine Type', value: 'Gear Oil' },
      { _type: 'object', _key: 'spec5', key: 'Specific Gravity (SAE 90)', value: '0.899' },
      { _type: 'object', _key: 'spec6', key: 'Specific Gravity (SAE 140)', value: '0.910' },
      { _type: 'object', _key: 'spec7', key: 'Flash Point (SAE 90)', value: '220°C' },
      { _type: 'object', _key: 'spec8', key: 'Flash Point (SAE 140)', value: '231°C' },
      { _type: 'object', _key: 'spec9', key: 'Pour Point (SAE 90)', value: '-12°C' },
      { _type: 'object', _key: 'spec10', key: 'Pour Point (SAE 140)', value: '-9°C' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'API GL-4 Certified', desc: 'Specifically designed for API GL-4 service requirements.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'High Thermal Stability', desc: 'Helps maintain proper viscosity across a wide temperature range.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Extreme Pressure Protection', desc: 'Anti-wear additives help reduce direct metal-to-metal contact between gear components.', icon: '/images/icon-service-5.svg' },
    ],
    applications: ['Manual transmissions', 'Axles and differentials', 'Steering gear units', 'Passenger cars, jeeps, trucks, and utility vehicles'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'What is the difference between API GL-4 and GL-5?', a: 'API GL-4 is suitable for manual transmissions, axles, and steering gears. GL-5 has higher extreme pressure performance for hypoid gear axles. Always use the grade specified by your vehicle manufacturer.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Anitun DXIII',
    slug: { _type: 'slug', current: 'bagani-anitun-dxiii' },
    line: 'Anitun',
    category: 'anitun',
    spec: 'ATF | GM Dexron III',
    shortDesc: 'High-performance automatic transmission fluid for cars and industrial equipment.',
    description: 'BAGANI ANITUN DXIII is a high-performance automotive transmission fluid formulated from premium low-viscosity base oils and a complete additive package that includes viscosity index improvers, antioxidants, anti-wear agents, detergents, defoamants, and other specialized additives.',
    description2: 'Meets or exceeds GM Dexron IIID/IIIG, Ford Mercon IV, Allison C4, Caterpillar TO-2/TO-4. NOTE: Do NOT use on transmissions requiring Dexron IV/V/VI, ATF+2/+3/+4, or Mercon V/VI.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Anitun DXIII' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: 'ATF' },
      { _type: 'object', _key: 'spec3', key: 'Engine Type', value: 'Transmission Fluid / ATF' },
      { _type: 'object', _key: 'spec4', key: 'Flash Point', value: '185°C' },
      { _type: 'object', _key: 'spec5', key: 'Pour Point', value: '-45°C' },
      { _type: 'object', _key: 'spec6', key: 'Viscosity @ 40°C', value: '37.59 cSt' },
      { _type: 'object', _key: 'spec7', key: 'Viscosity @ 100°C', value: '7.03 cSt' },
      { _type: 'object', _key: 'spec8', key: 'Viscosity Index', value: '151' },
      { _type: 'object', _key: 'spec9', key: 'Density', value: '0.8446' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Oxidation Resistant', desc: 'Resistant to oxidation and thickening under high-temperature conditions.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'Seal Compatible', desc: 'Compatible with most commonly used sealing materials.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Excellent Low-Temperature Flow', desc: 'Offers excellent low-temperature flow, anti-wear protection, and friction control.', icon: '/images/icon-service-5.svg' },
    ],
    applications: ['Automatic transmissions', 'Power steering systems', 'Allison torque converters', 'Power shift transmissions and hydraulic systems'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'Can I use DXIII in a transmission requiring Dexron VI?', a: 'No. BAGANI ANITUN DXIII is a Dexron III fluid and should NOT be used in transmissions requiring Dexron IV/V/VI, ATF+2/+3/+4, or Mercon V/VI. Always check your vehicle manual.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Hanan Raze 20W-50',
    slug: { _type: 'slug', current: 'bagani-hanan-raze-20w-50' },
    line: 'Hanan',
    category: 'hanan',
    spec: '20W-50 | API SL/CF',
    shortDesc: 'Premium multi-grade gasoline engine oil for year-round dependable protection.',
    description: 'BAGANI HANAN RAZE 20W-50 is a premium multi-grade motor oil designed to deliver dependable performance in various driving conditions. Blended from highly refined paraffinic base oils known for their strong stability and high viscosity index, with a carefully balanced additive package featuring advanced detergents, dispersants, viscosity modifiers, and performance enhancers.',
    description2: 'Excellent engine cleanliness and dependable protection against wear, corrosion, deposits, and sludge. Demonstrated strong performance in turbocharged and multi-valve engines, also suitable for CRDi diesel engines meeting API CF specifications.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Hanan Raze 20W-50' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: '20W-50' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API SL/CF' },
      { _type: 'object', _key: 'spec4', key: 'Engine Type', value: 'Gasoline Engine' },
      { _type: 'object', _key: 'spec5', key: 'Specific Gravity', value: '0.882' },
      { _type: 'object', _key: 'spec6', key: 'Flash Point', value: '230°C' },
      { _type: 'object', _key: 'spec7', key: 'Pour Point', value: '-20°C' },
      { _type: 'object', _key: 'spec8', key: 'Viscosity Index', value: '125' },
      { _type: 'object', _key: 'spec9', key: 'TBN', value: '10.0 mgKOH/g' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Enhanced Wear Protection', desc: 'Helps safeguard engine components against rust formation and corrosive damage.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'Reliable Sludge Control', desc: 'Designed to resist sludge accumulation and maintain cleaner engine internals.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'High Heat Resistance', desc: 'Strong thermal stability to prevent oil degradation under high operating temperatures.', icon: '/images/icon-service-5.svg' },
      { _type: 'object', _key: 'f4', title: 'Advanced Deposit Control', desc: 'Powerful cleaning agents minimize deposit buildup and promote smoother engine operation.', icon: '/images/icon-service-8.svg' },
    ],
    applications: ['Passenger cars and light-duty trucks', 'Turbocharged and multi-valve engines', 'CRDi diesel engines (API CF)', 'Year-round use in various driving conditions'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'Is Bagani Hanan Raze 20W-50 good for older vehicles?', a: 'Yes, 20W-50 is an excellent choice for older or high-mileage vehicles as the higher viscosity helps maintain oil pressure and reduce consumption in worn engines.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Laon Burst 15W-40',
    slug: { _type: 'slug', current: 'bagani-laon-burst-15w-40' },
    line: 'Laon',
    category: 'laon',
    spec: '15W-40 | API CI-4/SL',
    shortDesc: 'Peak power diesel engine oil for light and heavy-duty commercial vehicles.',
    description: 'BAGANI LAON BURST 15W-40 is a high-quality commercial multi-grade engine oil suitable for both light and heavy-duty diesel and gasoline engines. Specifically formulated for commercial vehicle engines, including those operating on high-sulfur diesel fuels. Meets performance requirements of modern low-emission diesel engines and high-performance gasoline engines.',
    description2: 'Engineered to provide excellent thermal and oxidation stability, high levels of detergency and dispersancy, effective corrosion protection, and superior load-carrying capacity. Ideal for mixed-fleet operations in commercial transport and heavy construction.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Laon Burst 15W-40' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: '15W-40' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API CI-4/SL' },
      { _type: 'object', _key: 'spec4', key: 'Engine Type', value: 'Diesel Engine' },
      { _type: 'object', _key: 'spec5', key: 'Specific Gravity', value: '0.880' },
      { _type: 'object', _key: 'spec6', key: 'Flash Point', value: '238°C' },
      { _type: 'object', _key: 'spec7', key: 'Viscosity @ 40°C', value: '112 cSt' },
      { _type: 'object', _key: 'spec8', key: 'Viscosity @ 100°C', value: '14.35 cSt' },
      { _type: 'object', _key: 'spec9', key: 'Viscosity Index', value: '136' },
      { _type: 'object', _key: 'spec10', key: 'TBN', value: '11 mgKOH/g' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Mixed-Fleet Compatible', desc: 'Suitable for both diesel and gasoline engines in commercial transport operations.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'High Detergency', desc: 'Keeps engines clean under both high and low temperature conditions.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Extended Engine Life', desc: 'Reduces wear on cylinder bores and piston rings, extending engine life.', icon: '/images/icon-service-5.svg' },
      { _type: 'object', _key: 'f4', title: 'Severe Service Ready', desc: 'Designed for turbocharged or naturally aspirated engines under demanding conditions.', icon: '/images/icon-service-8.svg' },
    ],
    applications: ['Heavy-duty diesel engines', 'Commercial transport vehicles', 'Heavy construction equipment', 'Mixed-fleet operations'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'Can Bagani Laon Burst 15W-40 be used in gasoline engines?', a: 'Yes, it meets API SL for gasoline engines as well as API CI-4 for diesel, making it ideal for mixed-fleet operations.' },
    ],
  },
  {
    _type: 'product',
    name: 'Bagani Laon Core',
    slug: { _type: 'slug', current: 'bagani-laon-core' },
    line: 'Laon',
    category: 'laon',
    spec: 'SAE 40 | API CF/SF',
    shortDesc: 'Super heavy-duty engine oil for diesel and gasoline engines in all fleet types.',
    description: 'BAGANI LAON CORE is a high-performance motor oil designed to deliver premium protection for both diesel and gasoline engines. Especially formulated for heavy-duty operation in diesel engines used in on-highway and off-highway vehicles and equipment. Available in SAE 10/10W, 30, 40 and 50.',
    description2: 'Advanced dispersant technology prevents oil thickening caused by incomplete combustion and soot formation. Reduces sludge buildup and keeps particles suspended, extending oil filter life. Suitable for mixed-fleet operators who need a single motor oil across all vehicles.',
    specs: [
      { _type: 'object', _key: 'spec1', key: 'Product Name', value: 'Bagani Laon Core' },
      { _type: 'object', _key: 'spec2', key: 'Viscosity Grade', value: 'SAE 10W, 30, 40 & 50' },
      { _type: 'object', _key: 'spec3', key: 'API Standard', value: 'API CF/SF' },
      { _type: 'object', _key: 'spec4', key: 'Engine Type', value: 'Diesel Engine' },
      { _type: 'object', _key: 'spec5', key: 'Specific Gravity (SAE 40)', value: '0.893' },
      { _type: 'object', _key: 'spec6', key: 'Flash Point (SAE 40)', value: '238°C' },
      { _type: 'object', _key: 'spec7', key: 'Pour Point', value: '-12°C' },
      { _type: 'object', _key: 'spec8', key: 'Viscosity Index', value: '99' },
      { _type: 'object', _key: 'spec9', key: 'TBN', value: '9.0 mgKOH/g' },
    ],
    features: [
      { _type: 'object', _key: 'f1', title: 'Anti-Soot Technology', desc: 'Prevents oil thickening caused by incomplete combustion and soot formation.', icon: '/images/icon-service-6.svg' },
      { _type: 'object', _key: 'f2', title: 'Extended Filter Life', desc: 'Reduces sludge buildup and keeps particles suspended, extending oil filter life.', icon: '/images/icon-service-7.svg' },
      { _type: 'object', _key: 'f3', title: 'Mixed-Fleet Convenience', desc: 'One oil for both diesel and gasoline engines across all fleet vehicles.', icon: '/images/icon-service-5.svg' },
    ],
    applications: ['Diesel engines in automotive and construction equipment', 'Naturally aspirated and turbocharged engines', 'Fleet operations requiring grade simplification', 'Automatic transmissions and hydraulic systems (SAE 10W/30)'],
    faqs: [
      { _type: 'object', _key: 'faq1', q: 'What SAE grades are available for Bagani Laon Core?', a: 'Bagani Laon Core is available in SAE 10, 10W, 30, 40, and 50 grades to suit various engine requirements and climate conditions.' },
    ],
  },
]

async function importProducts() {
  console.log(`Importing ${products.length} products to Sanity...`)

  for (const product of products) {
    try {
      // Check if product with same slug already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0]._id`,
        { slug: product.slug.current }
      )

      if (existing) {
        console.log(`⚠️  Skipping "${product.name}" — already exists (ID: ${existing})`)
        continue
      }

      const result = await client.create(product)
      console.log(`✅ Created "${product.name}" (ID: ${result._id})`)
    } catch (err) {
      console.error(`❌ Failed to create "${product.name}":`, err.message)
    }
  }

  console.log('\nDone! Go to Sanity Studio to add product images and publish.')
}

importProducts()
