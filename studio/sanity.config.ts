import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'whoscall blog',

  projectId: 'b5nfliuf',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Post Types Section
            S.listItem()
              .title('Posts')
              .child(
                S.list()
                  .title('Posts')
                  .items([
                    S.listItem()
                      .title('Post (en)')
                      .child(S.documentTypeList('postEn').title('English Posts')),
                    S.listItem()
                      .title('Post (zh-hant)')
                      .child(S.documentTypeList('postZhHant').title('Chinese Posts')),
                    S.listItem()
                      .title('Post (Legacy)')
                      .child(S.documentTypeList('post').title('Legacy Posts')),
                  ]),
              ),
            // Separator
            S.divider(),
            // Category Types Section
            S.listItem()
              .title('Categories')
              .child(
                S.list()
                  .title('Categories')
                  .items([
                    S.listItem()
                      .title('Category (en)')
                      .child(S.documentTypeList('categoryEn').title('English Categories')),
                    S.listItem()
                      .title('Category (zh-hant)')
                      .child(S.documentTypeList('categoryZhHant').title('Chinese Categories')),
                    S.listItem()
                      .title('Category (Legacy)')
                      .child(S.documentTypeList('category').title('Legacy Categories')),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
