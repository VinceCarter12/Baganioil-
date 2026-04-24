import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {
  PackageIcon,
  DocumentsIcon,
  PinIcon,
  HelpCircleIcon,
  BellIcon,
} from '@sanity/icons'
import {schemaTypes} from './schemas'
import {IframePreview} from './components/IframePreview'

// Custom sidebar structure with Preview tab on every document type
const structure = (S) =>
  S.list()
    .title('Bagani Oil CMS')
    .items([
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

      S.divider(),

      // --- AI Chatbot ---
      S.listItem()
        .title('Chat Logs')
        .icon(BellIcon)
        .child(
          S.documentList()
            .title('Chat Logs')
            .schemaType('chatLog')
            .filter('_type == "chatLog"')
            .defaultOrdering([{field: 'timestamp', direction: 'desc'}])
            .canHandleIntent((intent) => intent !== 'create'),
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
