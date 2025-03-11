import { defineConfig, type Plugin } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue PDF',
  description: 'Custom Renderer for PDF Creation',
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/intro/what-is-vue-pdf.md' },
      { text: 'API Reference', link: '/api-reference' },
    ],

    sidebar: {
      '/docs': [
        {
          text: 'Introduction',
          items: [
            {
              text: 'What is vue-pdf?',
              link: '/docs/intro/what-is-vue-pdf.md',
            },
            { text: 'Getting Started', link: '/docs/intro/getting-started.md' },
          ],
        },
        {
          text: 'Docs',
          items: [{ text: 'Components', link: '/docs/components' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [groupIconVitePlugin() as Plugin],
  },
})
