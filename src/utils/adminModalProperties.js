
export const computedProperties = (object) => {
    const keys = Object.keys(object);

    const disabled = [
        'author_id',
        'publisher_id',
        'book_id',
        'order_id',
        'user_id',
    ];

    const labels = {
        "first_name": "First Name",
        "last_name": "Last Name",
        "email": "Email",
        "password": "Password",
        "street_name": "Street Name",
        "street_number": "Street Number",
        "province": "Province",
        "postal_code": "Postal Code",
        "phone_number": "Phone Number",
        "role": "Role",
        "order_date": "Order Date",
        "total": "Total Price",
        "orderItems": "Ordered Products",
        "book": "Book",
        "quantity": "Quantity",
        "stock_level_used": "Stock Used",
        "stock_level_new": "Stock New",
        "reserved_stock": "Reserved Stock",
        "title": "Title",
        "isbn": "ISBN",
        "price": "Price",
        "genre": "Genre",
        "type": "Type",
        "book_condition": "Book Condition",
        "firstName": "First Name",
        "lastName": "Last Name",
        "name": "Name",
        "country": "Country",
        "publication_year": "Publish Year",
        "authors": "Authors",
        "publisher": "Publisher",
        "orderDate": "Order Date",
        "userEmail": "User Email",
        "bookTitle": "Book Title",
    }

    const isObject = (value) => typeof value === 'object'  && !Array.isArray(value) && value !== null;

    const resolveType = (value) => {
        if (Array.isArray(value)){
            return 'array';
        }else if (isObject(value)){
            return 'object';
        } else if (typeof value === 'string'){
            return 'text';
        }


        return typeof value;
    };

    const resolveValue = (value) => {
        if (isObject(value)) {
            return computedProperties(value)
        }else if (Array.isArray(value)){
            return value.map(computedProperties);
        }
        return value
    }


    return keys.map((key) => {

        const objectValue = object[key];

        return {
            name: key,
            label: labels[key] || key,
            type: resolveType(objectValue),
            value: resolveValue(objectValue),
            disabled: disabled.includes(key)
        }
    })
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
            name: "order.order_date",
            label: "Order Date",
            value: order.order_date || "",
            type: "text",
        },
        {
            name: "order.total",
            label: "Total Price",
            value: order.total || "",
            type: "number",
        },
        {
            name: "order.orderItems",
            label: "Ordered Products",
            value: order.orderItems || "",
            type: "orderItems",
        },
    ]
}

export const orderItemProperties = (orderItem) => {
    return [
        {
            name: "orderItems.book",
            label: "Book",
            value: orderItem.book || "",
            type: "book",
        },
        {
            name: "orderItems.quantity",
            label: "Quantity",
            value: orderItem.quantity || "",
            type: "number",
        },
    ]
}

export const orderBookProperties = (book) => {
    return [
        {
            name: "book.title",
            label: "Title",
            value: book.title || "",
            type: "text",
        },
        {
            name: "book.isbn",
            label: "ISBN",
            value: book.isbn || "",
            type: "text",
        },

        {
            name: "book.price",
            label: "Price",
            value: book.price || "",
            type: "number",
        },
    ]
}

export const inventoryProperties = (inventory) => {
    return [

        {
            name: "inventory.stock_level_used",
            label: "Stock Used",
            value: inventory.stock_level_used || "",
            type: "number",

        },
        {
            name: "inventory.stock_level_new",
            label: "Stock New",
            value: inventory.stock_level_new || "",
            type: "number",
        },
        {
            name: "inventory.reserved_stock",
            label: "Reserved Stock",
            value: inventory.reserved_stock || "",
            type: "number"
        }
    ]
}

export const publisherProperties = (publisher) => {
    return [
        {
            name: "publisher.name",
            label: "Name",
            value: publisher.name || "",
            type: "text",
        },
        {
            name: "publisher.country",
            label: "Country",
            value: publisher.country || "",
            type: "text"
        }
    ]
}

export const authorProperties = (author) => {
    return [
        {
            name: "authors.first_name",
            label: "First Name",
            value: author.first_name || "",
            type: "text",
        },
        {
            name: "authors.last_name",
            label: "Last Name",
            value: author.last_name || "",
            type: "text"
        }
    ]
}
