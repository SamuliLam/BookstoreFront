import PropTypes from 'prop-types';
import React from "react";
import {Link} from "react-router-dom";

const ProductCard = ({title, price, image, book_id}) => {
    return (
        <div className="overflow-hidden flex flex-col items-center justify-between p-4 min-h-96 min-w-64">
            <div className="flex flex-col items-center h-80 w-full overflow-hidden shadow-custom-dark">
                <Link to={`/book/${book_id}`}>
                    {image ? (
                        <img src={image} alt={title} className="h-full w-full "/>
                    ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                            <p className="text-gray-400">No image</p>
                        </div>
                    )}
                </Link>
            </div>
            <div className="flex flex-col items-center gap-3">
                <h4 className="mt-2 text-lg font-bold text-center">{title}</h4>
                <p className="text-center text-gray-600">{price}€</p>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
};

export default ProductCard;