import { useState} from "react";
import Modal from "./Modal.jsx";
import {addBook} from "../../utils/api.js";
import {useUserContext} from "../../context/UserContext.jsx";
import TextProperty from "./Properties/TextProperty.jsx";
import BooleanProperty from "./Properties/BooleanProperty.jsx";

const CreateOrUpdateBookModal = ({open, onClose, existingBook}) => {
    const {user} = useUserContext();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [title, setTitle] = useState(existingBook.title || '')
    const [isbn, setIsbn] = useState(existingBook.isbn || '')
    const [genre, setGenre] = useState(existingBook.genre || '')
    const [type, setType] = useState(existingBook.type || '');
    const [publicationYear, setPublicationYear] = useState(existingBook.publicationYear || 0);
    const [price, setPrice] = useState(existingBook.price || 0);
    const [bookCondition, setBookCondition] = useState(existingBook.bookCondition || '');
    const [reserved, setReserved] = useState(existingBook.reserved || false);
    const [imgUrl, setImgUrl] = useState(existingBook.image_url || '');

    const [publisherName, setPublisherName] = useState(existingBook.publisher?.name || "");
    const [publisherCountry, setPublisherCountry] = useState(existingBook.publisher?.country || "");

    const [authors, setAuthors] = useState(existingBook.authors || [{}]);

    const [inventoryStockLevelUsed, setInventoryStockLevelUsed] = useState(existingBook.inventory?.stockLevelUsed || 0)
    const [inventoryStockLevelNew, setInventoryStockLevelNew] = useState(existingBook.inventory?.stockLevelNew || 0)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            console.log("Adding book");
            let bookData = {
                title: title,
                isbn: isbn,
                genre: genre,
                type: type,
                publicationYear: publicationYear,
                price: price,
                bookCondition: bookCondition,
                reserved: reserved,
                image_url: imgUrl,
                publisher: {
                    name: publisherName,
                    country: publisherCountry
                },
                inventory: {
                    stockLevelNew: inventoryStockLevelNew,
                    stockLevelUsed: inventoryStockLevelUsed
                },
                authors: authors
            };

            if (existingBook) {
                // Update
                response = await updateBook(bookData, user.token);
            } else {
                response = await addBook(bookData, user.token);
            }

            console.log("Fetch response:", response);

            if (response.success === false) {
                setErrorMessage("Failed to create item");
                setSuccessMessage("");
            } else {
                setSuccessMessage("Item created successfully");
                console.log("Item created successfully");
                setErrorMessage("");
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred");
            setSuccessMessage("");
            console.error("Error creating item", error);
        }
    };


    const updateAuthors = (index, property, value) => {
        setAuthors((prev) => {
            let author = prev[index];
            author[property] = value;
            return prev;
        })
    }

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <TextProperty value={title} type={"text"} label={"Title"} name={"title"}
                              onInputChange={(_, value) => setTitle(value)}/>
                <TextProperty value={isbn} type={"text"} name={"isbn"} onInputChange={(_, value) => setIsbn(value)}/>
                <TextProperty value={genre} type={"text"} name={"genre"} onInputChange={(_, value) => setGenre(value)}/>
                <TextProperty value={type} type={"text"} name={"type"} onInputChange={(_, value) => setType(value)}/>
                <TextProperty value={publicationYear} type={"number"} name={"publicationYear"}
                              onInputChange={(_, value) => setPublicationYear(value)}/>
                <TextProperty value={price} type={"number"} name={"price"} onInputChange={(_, value) => setPrice(value)}/>
                <TextProperty value={bookCondition} type={"text"} name={"bookCondition"}
                              onInputChange={(_, value) => setBookCondition(value)}/>
                <BooleanProperty value={reserved} name={"reserved"} onInputChange={(_, value) => setReserved(value)}/>
                <TextProperty value={imgUrl} type={"text"} name={"image_url"} onInputChange={(_, value) => setImgUrl(value)}/>


                <h3>Inventory</h3>
                <TextProperty value={inventoryStockLevelUsed} type={"number"} name={"inventory_stock_level_used"}
                              onInputChange={(_, value) => setInventoryStockLevelUsed(value)}/>
                <TextProperty value={inventoryStockLevelNew} type={"number"} name={"inventory_stock_level_new"}
                              onInputChange={(_, value) => setInventoryStockLevelNew(value)}/>

                <h3>Publisher</h3>
                <TextProperty value={publisherName} type={"text"} name={"publisher_name"}
                              onInputChange={(_, value) => setPublisherName(value)}/>
                <TextProperty value={publisherCountry} type={"text"} name={"publisher_country"}
                              onInputChange={(_, value) => setPublisherCountry(value)}/>
                {authors.map((author, index) => {
                    return <>
                        <TextProperty value={author.firstName} type={"text"} name={`author_firstName_${index}`}
                                      onInputChange={(_, value) => updateAuthors(index, "firstName", value)}/>
                        <TextProperty value={author.lastName} type={"text"} name={`author_lastName_${index}`}
                                      onInputChange={(_, value) => updateAuthors(index, "lastName", value)}/>
                    </>
                })}
                <button onClick={() => setAuthors(prev => [...prev, {}])} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 mx-2">Add new author</button>
                <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 mx-2">submit</button>
            </form>
        </Modal>
    );
};

export default CreateOrUpdateBookModal;