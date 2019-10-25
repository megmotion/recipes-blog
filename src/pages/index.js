import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled.div`
  margin-bottom: 2rem;
`

const PostImage = styled.div`
  margin-right: 1rem;
`

const Description = styled.p`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color:black;
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
`

const RecipeLink = styled(Link)`
  text-decoration: none;
`

const RecipeTitle =styled.h3`
  margin-bottom: 1rem;
  color: black;
  text-transform: uppercase;
`

const Subtitle =styled.p`
  margin-bottom: 1rem;
  font-size: .9rem;
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
          {recipes.map(({node}) =>
            <RecipeLink to={node.slug}>             
              <RecipeTitle>
                { node.title }
              </RecipeTitle>
              <Post key={node.slug}> 
                <Description>
                  { node.description.description }
                </Description>  
                <PostImage>
                 {node.image ? <Img fluid= {node.image[0].fluid} /> : null} 
                </PostImage>
                  
             </Post>
             </RecipeLink>  
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
          createdAt(fromNow: true)
          slug
          type
          description {
            description
          }
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