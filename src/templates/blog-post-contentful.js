import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Img from "gatsby-image"
import styled from "styled-components"

const PostImage = styled.div`
  width: 50%;
  margin-right: 1rem;
`

class RecipeContentfulTemplate extends React.Component {
	render () {
	const recipe = this.props.data.contentfulRecipe;
	const { previous, next } = this.props.pageContext
	const preparation = this.props.data.contentfulRecipe.childContentfulRecipePreparationRichTextNode.json.content[0].content
	const ingredients = this.props.data.contentfulRecipe.ingredients

	return (
		<Layout>
			<div>
				<h1>{recipe.title}</h1>
				<h4>autor: {recipe.author}</h4>
			</div>
			<PostImage>
                {recipe.image ? <Img fluid= {recipe.image[0].fluid} /> : null} 
            </PostImage>
			<h3>Składniki:</h3>
			<ul>
				{ingredients.map((ingredient) =>           
	                <p key={ingredient}>{ingredient}</p>
	            )}
			</ul>
			<h3>Przygotowanie:</h3>
			<ol>
				{preparation.map((ingredient) =>           
	                <li key={ingredient.content[0].content[0].value}>{ingredient.content[0].content[0].value}</li>
	            )}
			</ol>
		</Layout>
	)}
}
export default RecipeContentfulTemplate

export const pageQuery = graphql`
	query ContentfulRecipeBySlug($slug: String!) {
		contentfulRecipe( slug: { eq: $slug }) {
			title
			author
			createdAt
			ingredients
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
`