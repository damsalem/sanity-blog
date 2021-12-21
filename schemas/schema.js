// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'blog',
      type: 'document',
      title: 'Blog',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title'
        },
        {
          name: 'subtitle',
          type: 'string',
          title: "Subtitle"
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alt Tag',
              options: {
                isHighlighted: true
              }
            }
          ]
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block'
            },
            {
              type: 'image',
              fields: [
                {
                  title: 'Position',
                  name: 'position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Float left', value: 'float-left'},
                      {title: 'Left', value: 'left'},
                      {title: 'Center (Default)', value: 'center'},
                      {title: 'Right', value: 'right'},
                      {title: 'Float Right', value: 'float-right'},
                    ],
                    layout: 'radio',
                    direction: 'horizontal',
                    isHighlighted: true
                  }
                },
                {
                  type: 'string',
                  name: 'alt',
                  title: 'Alt Tag',
                  options: {
                    isHighlighted: true
                  }
                }
              ]
            },
            {
              type: 'code',
              options: {
                withFilename: true
              }
            }
          ]
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
          initialValue: (new Date()).toISOString()
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => {return Rule.required()}
        },
        {
          name: 'authors',
          title: 'Authors',
          type: 'reference',
          to: [
            {type: 'author'}
          ],
          initialValue: {
            _type: 'reference',
            _ref: '75fb10ec-7a87-46e5-82ed-895bdbc064bd',
          },
          validation: Rule => {return Rule.required()}
        }
      ]
    },
    {
      name: 'author',
      type: 'document',
      title: 'Author',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: Rule => Rule.required()
        },
        {
          name: 'profilePicture',
          title: 'Profile Picture',
          type: 'image',
          validation: Rule => {return Rule.required()}
        }
      ]
    }
  ]),
})
