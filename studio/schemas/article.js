import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export default defineType({
  name: 'article',
  title: 'Bagani Updates',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main headline of the article. Appears on the news listing card and the article page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'Auto-generated from the title. This becomes part of the article URL (e.g. /news/your-slug/). Click "Generate" after setting the title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Update Type',
      type: 'string',
      initialValue: 'News',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Announcement', value: 'Announcement'},
          {title: 'Event', value: 'Event'},
          {title: 'Article', value: 'Article'},
          {title: 'News', value: 'News'},
        ],
        layout: 'radio',
      },
      description: 'Used in Bagani Updates page filters and category badges. Choose the type that best describes this post.',
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      description: 'The date shown on the article page. Leave blank to hide the date.',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Main banner image shown at the top of the article and on the news listing card. Recommended size: 1200 × 630 px (landscape). Use the hotspot tool to set the focus area.',
    }),
    defineField({
      name: 'video',
      title: 'Video (Optional)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video to feature in this article. Supported formats: MP4, MOV, WebM. The video will appear below the featured image on the article page. Leave blank if not needed.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add keywords to help categorize this article (e.g. "motorcycle oil", "product launch", "event"). Tags appear at the bottom of the article page.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short 1–2 sentence summary of the article. Shown on news listing cards and used for search/SEO. Keep it under 160 characters.',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      description: 'The full article content. Use the toolbar to add headings, bold text, bullet lists, and inline images. Each paragraph, image, or heading is a separate block.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
})
