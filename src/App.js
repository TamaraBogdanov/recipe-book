import RecipeBook from "./Recipe";

//Base styling was used to help structure website for personal view. Style imported from "https://www.udemy.com/course/the-ultimate-react-course/?couponCode=JUST4U02223"

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
