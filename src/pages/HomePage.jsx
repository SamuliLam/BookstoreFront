import ProductGrid from "../components/ProductGrid.jsx";
import FilterPanel from "../components/FilterPanel.jsx";

const HomePage = () => {
    return (
        <div className={"home-content-container flex flex-grow h-full dark:text-white dark:bg-gray-900"}>
            <FilterPanel/>
            <div className="flex flex-grow flex-col p-4 items-center gap-2 dark:text-white dark:bg-gray-900">
                <h1>Welcome to your favorite bookstore!</h1>
                <p>Here you can find the best books for your reading pleasure.</p>
                <ProductGrid/>
            </div>
        </div>
    );
}

export default HomePage;