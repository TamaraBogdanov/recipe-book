import { useState } from "react";

//Base styling was used to help structure website for personal view. Style imported from "https://www.udemy.com/course/the-ultimate-react-course/?couponCode=JUST4U02223"

// JSON object with burger recipe data
const recipes = [
	{
		id: 1,
		name: "BLACK BEAN BURGER",
		dietary: ["vegetarian", "vegan"],
		cookingTime: "30 mins",
		photoName: "burgers/blackbean.jpg",
		ingredients:
			"Vegan burger made with black beans, oats, and flavorful spices.",
	},
	{
		id: 2,
		name: "PORTOBELLO MUSHROOM BURGER",
		dietary: ["vegetarian"],
		cookingTime: "20 mins",
		photoName: "burgers/mushroom.jpg",
		ingredients:
			"vegetarian burger featuring grilled portobello mushrooms as the patty.",
	},
	{
		id: 3,
		name: "GLUTEN-FREE TURKEY BURGER",
		dietary: ["gluten-free"],
		cookingTime: "25 mins",
		photoName: "burgers/turkey.jpeg",
		ingredients:
			"Gluten-free burger option made with lean ground turkey and gluten-free breadcrumbs",
	},
	{
		id: 4,
		name: "CLASSIC BEEF BURGER",
		dietary: ["meat"],
		cookingTime: "25 mins",
		photoName: "burgers/beef.jpg",
		ingredients:
			"A classic and delicious beef burger made with high-quality ground beef",
	},
	{
		id: 5,
		name: "BUNLESS BEEF BURGER",
		dietary: ["low-carb", "gluten-free", "meat"],
		cookingTime: "30 mins",
		photoName: "burgers/bunless.jpg",
		ingredients:
			"A low-carb and gluten-free burger without a bun, featuring a juicy beef patty and toppings",
	},
];

// Function assigning array elements to a recipe component
function Recipe({ recipe }) {
	return (
		<li className="pizza">
			<img src={recipe.photoName} alt={recipe.name} />
			<div>
				<h3>{recipe.name}</h3>
				<p>Cooking Time: {recipe.cookingTime}</p>
				<p>{recipe.ingredients}</p>
				{/*.Join(",") adds spacing if there are multiple dietary options*/}
				<span>Dietary: {recipe.dietary.join(", ")}</span>
			</div>
		</li>
	);
}

// Main component declaring State with default values for favourites, filter and search bar.
export default function RecipeBook() {
	const [filteredRecipes, setFilteredRecipes] = useState(recipes);
	const [favorites, setFavorites] = useState([]);
	const [searchBar, setSearchBar] = useState("");
	const [showFavorites, setShowFavorites] = useState(false);

	// Function to filter recipes based on dietary restrictions
	//Claude.ai used to assist with filter function structure to help me understand how to structure the filters.
	function filterRecipes(dietary) {
		if (dietary.length === 0) {
			//If dietary array is empty, display all recipies
			setFilteredRecipes(recipes);
		} else {
			const filtered = recipes.filter((recipe) =>
				//If dietary array is not empty, filter recipe array based on restrictions selected.
				dietary.every((diet) => recipe.dietary.includes(diet))
			); // Filter iterates over each recipe to check if diet restrictions in dietary array, is included in recipe.dietary
			setFilteredRecipes(filtered);
			//sets and updates state to contain filtered array of recipies
		}
	}

	// Function used to toggle favorite status of a recipe based on the recipe id.
	function toggleFavorite(recipeId) {
		const recipe = recipes.find((r) => r.id === recipeId);
		//searches for the recipe in the recipes array that matches the provided recipeId using find()
		//found recipe stored in "recipe" variable

		if (favorites.includes(recipe)) {
			//checks if favourites array includes the recipe using includes()
			setFavorites(favorites.filter((r) => r.id !== recipeId));
			//if yes, removes it from favourite list. It creates a new array with the filter method, excluding the recipe with the same id as the recipeId parameter.
		} else {
			setFavorites([...favorites, recipe]);
			//if recipe is not in favourites list, it is added to it by creating a new array with ... spread operator.
		}
	}

	// Function to filter recipes by name based on search bar.
	function filterByName(e) {
		const bar = e.target.value.toUpperCase();
		//content typed in search bar is extracted through target.value and assigned to variable "term"
		//.toUpperCase converts all input typed into uppercase
		setSearchBar(bar);
		//updates state searchBar with uppercase version of user input
		const filtered = recipes.filter(
			(recipe) =>
				//creates a new array called filtered by filtering the recipes array.
				recipe.name.toUpperCase().includes(bar)
			//It iterates over each recipe and checks if the uppercase version of the recipe name matches the search bar.
		);
		setFilteredRecipes(filtered);
		//filteredrecipies state is updated with the filtered array
		//This updates the list of displayed recipes to only show those that match the search term.
	}

	// Function to toggle showing only favorites.
	function toggleShowFavorites() {
		setShowFavorites(!showFavorites);
		//controls if favourited recipe should be displayed.
		//state is changed to its opposite value. If its true, change to false etc using !
		if (showFavorites) {
			setFilteredRecipes(recipes);
			//if favourite recipies are being shown, set filteredRecipies to contain all recipies from recipies array.
			//no filtering
		} else {
			setFilteredRecipes(favorites);
			//if favoruite recipies are not being shown, change state to show all recipies from favourites array.
			//filter favourites
		}
	}
	//JSX displaying main RecipeBook components on the site.
	return (
		<div>
			<div>
				{/*Search Bar, Toggle Favourite's and dietary filter to filter and change on user input */}
				<label>
					Search Recipe:
					<input type="text" value={searchBar} onChange={filterByName} />
				</label>
				<div>
					<label>
						<input
							//displays a checkbox to toggle "show favourites" on and off.
							type="checkbox"
							checked={showFavorites}
							//checked will display showFavourites as true, if unchecked, it will be false.
							onChange={toggleShowFavorites}
							//on click, run through toggleShowFavourites function
						/>
						Show Favorites
					</label>
				</div>
				<div>
					Filter by dietary 🍅 🥩:
					<button onClick={() => filterRecipes([])}>All</button>
					<button onClick={() => filterRecipes(["vegetarian"])}>
						Vegetarian
					</button>
					<button onClick={() => filterRecipes(["vegan"])}>Vegan</button>
					<button onClick={() => filterRecipes(["gluten-free"])}>
						Gluten-Free
					</button>
					<button onClick={() => filterRecipes(["low-carb"])}>Low-Carb</button>
					<button onClick={() => filterRecipes(["meat"])}>Meat</button>
				</div>
				{/*Displays dietary buttons that display filtered recipies containing specified dieraty requirements on click */}
			</div>
			{/*JSX rendering list of recipe components as well as a button for "favouriting" recipies.
			Claude.ai used in assisting with map method and list rendering as i struggled to structure it on my own*/}
			{filteredRecipes.map((recipe) => (
				//uses map method to iterate over filteredRecipies array
				//recipe represents each individual recipe object during each iteration of the map function
				<div key={recipe.id}>
					{/*Unique key required when rendering lists */}
					<Recipe recipe={recipe} />
					{/*Renderes a custom Recipe component and passes the recipe object as a prop to it. This component is  responsible for displaying details of a recipe */}
					<button onClick={() => toggleFavorite(recipe.id)}>
						{/*creates a button element for each recipe. When clicked, it triggers the toggleFavorite function with the id of the recipe as its argument */}
						{favorites.includes(recipe) ? "Unfavorite" : "Favorite"}
						{/*checks if the recipe is included in the favorites array. If it is, it displays "Unfavorite", if its not, it displays "Favorite", indicating that clicking the button will add the recipe to favorites */}
					</button>
				</div>
			))}
		</div>
	);
}
