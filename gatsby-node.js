const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions

	const recipePage = path.resolve(`./src/templates/blog-post-contentful.js`)
	return graphql(`
	{
		allContentfulRecipe {
			edges {
				node {
					slug
					title
				}
			}
		}
	}
	`).then(result => {
		if (result.errors) {
			throw result.errors
		}
		const recipes = result.data.allContentfulRecipe.edges

		recipes.forEach((recipe, index) => {
			const previous = index === recipes.length -1 ? null : recipes[index + 1].node
			const next = index === 0 ? null : recipes[index-1].node

			createPage({
				path: recipe.node.slug,
				component: recipePage,
				context: {
					slug: recipe.node.slug,
					previous,
					next,
				}
			})
		})
	})
}