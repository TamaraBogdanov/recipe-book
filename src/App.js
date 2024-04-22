import RecipeBook from "./Recipe";

//App displaying Header and RecipeBook component
function App() {
	return (
		<div className="container">
			<Header />
			<RecipeBook />
		</div>
	);
}

//Header component
function Header() {
	return <h1 className="header"> 🍔 Burger Book 🍟</h1>;
}

export default App;
