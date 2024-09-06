import PropTypes from 'prop-types';

const ProductCard = ({ title, price, image }) => {
    return (
        <div className="border rounded-lg p-4 w-48 h-72 flex flex-col justify-between">
            <div className="h-3/4 w-full bg-gray-300 rounded-md overflow-hidden">
                {/* Image placeholder */}
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="bg-gray-200 w-full h-full" />
                )}
            </div>
            <h4 className="mt-2 text-lg font-bold text-center">{title}</h4>
            <p className="text-center text-gray-600">${price}</p>
        </div>
    );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,  // Optional prop for image
};

export default ProductCard;
