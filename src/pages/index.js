import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const PostImage = styled.div`
  width: 50%;
  margin-right: 1rem;
`

const PostText = styled.div`
  width: 50%;
`

const RecipeLink = styled(Link)`
  text-decoration: none;
`

const RecipeTitle =styled.h3`
  margin-bottom: 20px;
  color: black;
`

class BlogIndex extends React.Component {
  render () {
    const { data } = this.props
    const recipes = data.allContentfulRecipe.edges
    return (
      <Layout>
        <SEO title="Home" />
        <div>
          <h1>Przepisy</h1>
          {recipes.map(({node}) =>
              <Post key={node.slug}>
                <RecipeLink to={node.slug}>
                  <RecipeTitle>
                    { node.title }
                  </RecipeTitle>
                  <PostImage>
                   {node.image ? <Img fluid= {node.image[0].fluid} /> : null} 
                  </PostImage>
                </RecipeLink>
              </Post>
          )}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe {
      edges {
        node {
          title
          author
          slug
          childContentfulRecipePreparationRichTextNode {
            json 
          }
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`