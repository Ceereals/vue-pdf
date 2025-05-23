import { defineConfig, type Plugin } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue PDF',
  description: 'Custom Renderer for PDF Creation',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://vue-pdf.org',
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vuepdf-logo.svg' }],
  ],
  themeConfig: {
    logo: { src: '/vuepdf-logo.svg', width: 24, height: 24 },
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/Ceereals/vue-pdf/edit/main/docs/:path',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        activeMatch: '^/docs/',
        items: [
          { text: 'Introduction', link: '/docs/intro/what-is-vue-pdf' },
          { text: 'Getting Started', link: '/docs/intro/getting-started' },
        ],
      },
      {
        text: 'Reference',
        activeMatch: '^/reference/',
        items: [
          { text: 'Components API', link: '/reference/components-api' },
          { text: 'Browser API', link: '/reference/browser-api' },
          { text: 'Node API', link: '/reference/node-api' },
        ],
      },
    ],

    sidebar: {
      '/docs': [
        {
          text: 'Introduction',
          items: [
            {
              text: 'What is Vue PDF?',
              link: '/docs/intro/what-is-vue-pdf',
            },
            { text: 'Getting Started', link: '/docs/intro/getting-started' },
          ],
        },
        {
          text: 'API Reference',
          link: '/reference/components-api',
        },
      ],
      '/reference': [
        {
          text: 'Reference',
          items: [
            { text: 'Components API', link: '/reference/components-api' },
            { text: 'Browser API', link: '/reference/browser-api' },
            { text: 'Node API', link: '/reference/node-api' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ceereals/vue-pdf' },
    ],
  },
  markdown: {
    toc: { level: [1, 2, 3] },
    config: (md) => {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          node: 'vscode-icons:file-type-node',
        },
      }) as Plugin,
    ],
  },
})
