import ProductGrid from "../components/ProductGrid.jsx";
import FilterPanel from "../components/FilterPanel.jsx";

const HomePage = () => {
    return (
        <div className={"home-content-container flex"}>
            <FilterPanel/>
            <h1>Home Page</h1>
            <ProductGrid/>
        </div>
    );
}

export default HomePage;