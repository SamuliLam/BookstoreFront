export const properties = (book, user, order) => {

    return [
        {
            name: "title",
            label: "Title",
            value: book.title,
            type: "text",
            update: (value) => {
                book.title = value;
            }
        },
        {
            name: "isbn",
            label: "ISBN",
            value: book.isbn,
            type: "text",
            update: (value) => {
                book.isbn = value;
            }
        },
        {
            name: "genre",
            label: "Genre",
            value: book.genre,
            type: "text",
            update: (value) => {
                book.genre = value;
            }
        },
        {
            name: "type",
            label: "Type",
            value: book.type,
            type: "text",
            update: (value) => {
                book.type = value;
            }
        },
        {
            name: "publication_year",
            label: "Publish Year",
            value: book.publication_year,
            type: "text",
            update: (value) => {
                book.publication_year = value;
            }
        },
        {
            name: "price",
            label: "Price",
            value: book.price,
            type: "text",
            update: (value) => {
                book.price = value;
            }
        },
        {
            name: "book_condition",
            label: "Condition",
            value: book.book_condition,
            type: "text",
            update: (value) => {
                book.book_condition = value;
            }
        },
        {
            name: "inventory",
            label: "Inventory",
            value: book.inventory,
            type: "inventory",
            update: (value) => {
                book.inventory = value;
            }
        },
    ]
}

export const inventoryProperties = (inventory) => {
    return [
        {
            name: "inventory_id",
            label: "ID",
            value: inventory.inventory_id,
            type: "text",
            update: (value) => {
                inventory.inventory_id = value;
            }
        },
        {
            name: "stock_level_used",
            label: "Stock Used",
            value: inventory.stock_level_used,
            type: "text",
            update: (value) => {
                inventory.stock_level_used = value;
            }
        },
        {
            name: "stock_level_new",
            label: "Stock New",
            value: inventory.stock_level_new,
            type: "text",
            update: (value) => {
                inventory.stock_level_new = value;
            }
        },
    ]
}
