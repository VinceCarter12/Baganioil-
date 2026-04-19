import React, { useState } from 'react'

const PREVIEW_BASE = 'https://sub.baganioil.ph'
// Set SANITY_STUDIO_PREVIEW_TOKEN in your .env to enable draft fetching
const PREVIEW_TOKEN = (typeof process !== 'undefined' && process.env?.SANITY_STUDIO_PREVIEW_TOKEN) || ''

function buildPreviewUrl(doc) {
  if (!doc) return null
  const tokenParam = PREVIEW_TOKEN ? '&token=' + PREVIEW_TOKEN : ''
  const slug = doc?.slug?.current

  switch (doc._type) {
    case 'article':
      return slug
        ? `${PREVIEW_BASE}/news/article/?s=${slug}&preview=true${tokenParam}`
        : `${PREVIEW_BASE}/news/?preview=true${tokenParam}`
    case 'product':
      return slug
        ? `${PREVIEW_BASE}/products/${slug}/?preview=true${tokenParam}`
        : `${PREVIEW_BASE}/products/?preview=true${tokenParam}`
    case 'store':
      return `${PREVIEW_BASE}/store-locator/?preview=true${tokenParam}`
    case 'faq':
      return `${PREVIEW_BASE}/faqs/?preview=true${tokenParam}`
    case 'homepage':
    case 'siteSettings':
      return `${PREVIEW_BASE}/?preview=true${tokenParam}`
    default:
      return null
  }
}

export function IframePreview({ document: sanityDoc }) {
  const doc = sanityDoc?.displayed
  const [key, setKey] = useState(0)
  const url = buildPreviewUrl(doc)

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#1a1a1a',
  }

  const toolbarStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: '#111',
    borderBottom: '1px solid #333',
    flexShrink: 0,
  }

  const btnStyle = {
    background: '#FFC107',
    color: '#121212',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
  }

  const labelStyle = {
    color: '#aaa',
    fontSize: '12px',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }

  if (!url) {
    return (
      <div style={{ ...containerStyle, alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888', fontSize: '14px' }}>
          Save the document with a slug to enable preview.
        </p>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <span style={labelStyle}>Preview: {url}</span>
        <button style={btnStyle} onClick={() => setKey(k => k + 1)} title="Reload preview">
          ↺ Reload
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{ ...btnStyle, textDecoration: 'none' }}
        >
          ↗ Open
        </a>
      </div>
      <iframe
        key={key}
        src={url}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="Page Preview"
      />
    </div>
  )
}
