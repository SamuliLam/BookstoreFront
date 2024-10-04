export const properties = (item, dataType) => {
    if (dataType === "user") {
        return userProperties(item || {});
    } else if (dataType === "inventory") {
        return inventoryProperties(item || {});
    } else if (dataType === "authors") {
        return authorProperties(item || {});
    } else if (dataType === "publisher") {
        return publisherProperties(item || {});
    } else if (dataType === "order") {
        return orderProperties(item || {});
    } else {
        return bookProperties(item || {});
    }
};

export const bookProperties = (book) => {
    return [
        {
            name: "title",
            label: "Title",
            value: book.title || "",
            type: "text",

        },
        {
            name: "isbn",
            label: "ISBN",
            value: book.isbn || "",
            type: "text",

        },
        {
            name: "genre",
            label: "Genre",
            value: book.genre || "",
            type: "text",

        },
        {
            name: "type",
            label: "Type",
            value: book.type || "",
            type: "text",

        },
        {
            name: "publication_year",
            label: "Publish Year",
            value: book.publication_year || "",
            type: "number",

        },
        {
            name: "price",
            label: "Price",
            value: book.price || "",
            type: "number",

        },
        {
            name: "book_condition",
            label: "Condition",
            value: book.book_condition || "",
            type: "text",

        },
        {
            name: "image_url",
            label: "Image URL",
            value: book.image_url || "",
            type: "text",
        },
        {
            name: "inventory",
            label: "Inventory",
            value: book.inventory || "",
            type: "inventory",
        },
        {
            name: "publisher",
            label: "Publisher",
            value: book.publisher || "",
            type: "publisher"
        },
        {
            name: "authors",
            label: "Authors",
            value: book.authors || "",
            type: "authors"
        },
    ]
}

export const userProperties = (user) => {
    return [
        {
            name: "email",
            label: "Email",
            value: user.email || "",
            type: "text",

        },
        {
            name: "password",
            label: "Password",
            value: user.password || "",
            type: "text",
        },
        {
            name: "first_name",
            label: "First Name",
            value: user.first_name || "",
            type: "text",

        },
        {
            name: "last_name",
            label: "Last Name",
            value: user.last_name || "",
            type: "text",

        },
        {
            name: "street_name",
            label: "Street Name",
            value: user.street_name || "",
            type: "text",
        },
        {
            name: "street_number",
            label: "Street Number",
            value: user.street_number || "",
            type: "number",
        },
        {
            name: "province",
            label: "Province",
            value: user.province || "",
            type: "text",
        },
        {
            name: "postal_code",
            label: "Postal Code",
            value: user.postal_code || "",
            type: "number",
        },
        {
            name: "phone_number",
            label: "Phone Number",
            value: user.phone_number || "",
            type: "text",

        },
        {
            name: "role",
            label: "Role",
            value: user.role || "",
            type: "text",
        },
    ]
}

export const orderProperties = (order) => {
    return [

        {
            name: "order_date",
            label: "Order Date",
            value: order.order_date || "",
            type: "text",
        },
        {
            name: "total",
            label: "Total Price",
            value: order.total || "",
            type: "number",
        },
        {
            name: "orderItems",
            label: "Ordered Products",
            value: order.orderItems || "",
            type: "orderItems",
        },
    ]
}

export const orderItemProperties = (orderItem) => {
    return [
        {
            name: "book",
            label: "Book",
            value: orderItem.book || "",
            type: "book",
        },
        {
            name: "quantity",
            label: "Quantity",
            value: orderItem.quantity || "",
            type: "number",
        },
    ]
}

export const orderBookProperties = (book) => {
    return [
        {
            name: "title",
            label: "Title",
            value: book.title || "",
            type: "text",
        },
        {
            name: "isbn",
            label: "ISBN",
            value: book.isbn || "",
            type: "text",
        },

        {
            name: "price",
            label: "Price",
            value: book.price || "",
            type: "number",
        },
    ]
}

export const inventoryProperties = (inventory) => {
    return [

        {
            name: "stock_level_used",
            label: "Stock Used",
            value: inventory.stock_level_used || "",
            type: "number",

        },
        {
            name: "stock_level_new",
            label: "Stock New",
            value: inventory.stock_level_new || "",
            type: "number",
        },
        {
            name: "reserved_stock",
            label: "Reserved Stock",
            value: inventory.reserved_stock || "",
            type: "number"
        }
    ]
}

export const publisherProperties = (publisher) => {
    return [
        {
            name: "name",
            label: "Name",
            value: publisher.name || "",
            type: "text",
        },
        {
            name: "country",
            label: "Country",
            value: publisher.country || "",
            type: "text"
        }
    ]
}

export const authorProperties = (author) => {
    return [
        {
            name: "first_name",
            label: "First Name",
            value: author.first_name || "",
            type: "text",
        },
        {
            name: "last_name",
            label: "Last Name",
            value: author.last_name || "",
            type: "text"
        }
    ]
}
