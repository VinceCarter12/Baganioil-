// Upload & compress product images to Sanity
// Run: node scripts/upload-product-images.js

const { createClient } = require('@sanity/client')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: 'c7mgn6k7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const IMAGES_DIR = 'C:/Users/vince/Downloads/BAGANI WEBSITE PICS-20260413T013134Z-3-001/BAGANI WEBSITE PICS/PRODUCT'
const COMPRESSED_DIR = path.join(__dirname, 'compressed-images')

// Map: product slug → image filename
const productImageMap = [
  { slug: 'bagani-amihan-4t-gale',     image: 'AMIHAN GALE.png' },
  { slug: 'bagani-amihan-4t-gust',     image: 'AMIHAN GUST.png' },
  { slug: 'bagani-amihan-4t-tempest',  image: 'AMIHAN TEMPEST.png' },
  { slug: 'bagani-aman-deep',          image: 'AMAN DEEP 90.png' },
  { slug: 'bagani-anitun-dxiii',       image: 'ANITUN DXIII.png' },
  { slug: 'bagani-hanan-raze-20w-50',  image: 'HANAN RAZE.png' },
  { slug: 'bagani-laon-burst-15w-40',  image: 'LAON BURST.png' },
  { slug: 'bagani-laon-core',          image: 'LAON CORE.png' },
]

async function compressImage(inputPath, outputPath) {
  const stats = fs.statSync(inputPath)
  const sizeMB = stats.size / (1024 * 1024)

  if (sizeMB > 5) {
    console.log(`  Compressing ${path.basename(inputPath)} (${sizeMB.toFixed(1)}MB)...`)
    await sharp(inputPath)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(outputPath)
    const newSize = fs.statSync(outputPath).size / (1024 * 1024)
    console.log(`  Compressed: ${sizeMB.toFixed(1)}MB → ${newSize.toFixed(1)}MB`)
  } else {
    console.log(`  ${path.basename(inputPath)} (${sizeMB.toFixed(1)}MB) — no compression needed, copying...`)
    fs.copyFileSync(inputPath, outputPath)
  }
}

async function uploadToSanity(filePath, filename) {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: filename,
    contentType: 'image/png',
  })
  return asset._id
}

async function attachImageToProduct(slug, assetId) {
  const productId = await client.fetch(
    `*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0]._id`,
    { slug }
  )

  if (!productId) {
    console.log(`  ⚠️  No published product found for slug: ${slug} — attaching to draft...`)
    const draftId = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]._id`,
      { slug }
    )
    if (!draftId) {
      console.log(`  ❌ No product found at all for slug: ${slug}`)
      return
    }
    await client.patch(draftId).set({
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
    }).commit()
    console.log(`  ✅ Image attached to draft (${draftId})`)
    return
  }

  await client.patch(productId).set({
    image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
  }).commit()
  console.log(`  ✅ Image attached to product (${productId})`)
}

async function main() {
  // Create temp folder for compressed images
  if (!fs.existsSync(COMPRESSED_DIR)) fs.mkdirSync(COMPRESSED_DIR)

  for (const { slug, image } of productImageMap) {
    console.log(`\n📦 Processing: ${slug}`)
    const inputPath = path.join(IMAGES_DIR, image)

    if (!fs.existsSync(inputPath)) {
      console.log(`  ❌ Image not found: ${image}`)
      continue
    }

    const outputPath = path.join(COMPRESSED_DIR, image)

    // Step 1: Compress
    try {
      await compressImage(inputPath, outputPath)
    } catch (err) {
      console.log(`  ❌ Compress failed (corrupt file?): ${err.message}`)
      console.log(`  ⚠️  Skipping ${slug} — please re-export/replace the image manually.`)
      continue
    }

    // Step 2: Upload to Sanity
    console.log(`  Uploading to Sanity...`)
    const assetId = await uploadToSanity(outputPath, image)
    console.log(`  Uploaded: ${assetId}`)

    // Step 3: Attach to product
    await attachImageToProduct(slug, assetId)
  }

  console.log('\n✅ All done! Go to Sanity Studio and publish each product.')

  // Cleanup compressed folder
  fs.rmSync(COMPRESSED_DIR, { recursive: true })
}

main().catch(console.error)
