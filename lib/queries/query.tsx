import { groq } from "next-sanity";

export const getHomepageCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) [0...5] {
      _id,
      title,
      "slug": slug.current,
      mainImage{
        asset->{
          url
        },
        alt
      },
      publishedAt,
      shortDescription,
      author->{
        name, 
        "slug": slug.current
      },
      categories[]->{
        title, 
        "slug": slug.current
      }
    }
  }
`;
