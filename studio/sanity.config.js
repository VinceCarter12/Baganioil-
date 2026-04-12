import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {
  HomeIcon,
  CogIcon,
  PackageIcon,
  DocumentsIcon,
  PinIcon,
  HelpCircleIcon,
} from '@sanity/icons'
import {schemaTypes} from './schemas'
import {IframePreview} from './components/IframePreview'

// Custom sidebar structure with Preview tab on every document type
const structure = (S) =>
  S.list()
    .title('Bagani Oil CMS')
    .items([
      // --- Singletons ---
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
            .views([
              S.view.form(),
              S.view.component(IframePreview).title('Preview'),
            ]),
        ),
      S.listItem()
        .title('Homepage Content')
        .id('homepage')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage Content')
            .views([
              S.view.form(),
              S.view.component(IframePreview).title('Preview'),
            ]),
        ),

      S.divider(),

      // --- Collections ---
      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('product')
            .title('Products')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('product')
                .views([
                  S.view.form(),
                  S.view.component(IframePreview).title('Preview'),
                ]),
            ),
        ),
      S.listItem()
        .title('News & Articles')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('article')
            .title('News & Articles')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('article')
                .views([
                  S.view.form(),
                  S.view.component(IframePreview).title('Preview'),
                ]),
            ),
        ),
      S.listItem()
        .title('Store Locations')
        .icon(PinIcon)
        .child(
          S.documentTypeList('store')
            .title('Store Locations')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('store')
                .views([
                  S.view.form(),
                  S.view.component(IframePreview).title('Preview'),
                ]),
            ),
        ),
      S.listItem()
        .title('FAQs')
        .icon(HelpCircleIcon)
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('faq')
                .views([
                  S.view.form(),
                  S.view.component(IframePreview).title('Preview'),
                ]),
            ),
        ),
    ])

export default defineConfig({
  name: 'bagani-oil',
  title: 'Bagani Oil',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'c7mgn6k7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
