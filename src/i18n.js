import i18next from "i18next";
import  { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                welcomeMessage: "Welcome to your favorite bookstore!",
                loginFailedMessage: "Login failed. Please check your credentials.",
                loginSuccessLoginMessage: "Login successful",
                loginUnexpectedError: "An unexpected error occurred.",
                loginPageEmail: "Email",
                loginPagePassword: "Password",
                loginPageForgotPass: "Forgot password",
                loginPageSignIn: "Sign in",
                loginPageOr: "Or",
                loginPageSignUp: "Sign up",
                signupPageFirstName: "First name",
                signupPageLastName: "Last name",
                HomepageH1WelcomeMessage: "Welcome to your favorite bookstore!",
                HomepagePDescription: "Here you can find the best books for your reading pleasure.",
                ProductGridDivLoading: "Loading...",
                ProductGridDivError: "An error occurred: ",
                ProductGridPNoBooksFound: "No books found.",
                ProductCardPUnknownAuthor: "Unknown author",
                FilterPanelH3Keywords: "Keywords",
                FilterPanelH3Genres: "Genres",
                FilterPanelH4Price: "Price",
                FilterPanelPMaxPrice: "Max price: ",
                ProductCardButtonAddToCart: "Add to cart",
                SearchBarInputPlaceholder: "Search for books and authors...",
                SearchBarButtonText: "Search",
                LogoutButtonButtonText: "Logout",
                HeaderSpanWelcomeText: "Welcome, ",
                LoginButtonButtonText: "Login",
                SignupButtonButtonText: "Sign up",
                BookDivLoading: "Loading...",
                BookDivError: "An error occurred: ",
                BookPStrongAuthor: "Author: ",
                BookPSpanAuthorsUnavailable: "Authors unavailable",
                BookPISBN: "ISBN:",
                BookPGenre: "Genre:",
                BookPType: "Type:",
                BookPPublicationYear: "Publication Year:",
                BookPCondition: "Condition:",
                BookButtonAddToCart: "Add to cart",
                BookH2DescriptionLabel: "Description: ",
                BookH2DescriptionText: "This is a detailed description of the book. It includes information about the plot, themes, and significance in its genre. Readers will enjoy this book for its engaging narrative and deep historical context.",
                BookDivH2InStockText: "In Stock",
                BookDivH2InStockNew: "New: ",
                BookDivH2InStockUsed: "Used: ",
                FooterPContactText: "Contact us: ",

                // Profile sections
                profileEditProfile: "Edit Profile",
                profileChangePassword: "Change Password",
                profileOrderHistory: "Order History",
                profileFavoriteBooks: "Favorite Books",
                profileWelcome: "Welcome to Your Profile",
                profileSelectOption: "Select an option from the sidebar to get started",

                // Form labels
                profileFirstName: "First Name",
                profileLastName: "Last Name",
                profileEmail: "Email",
                profileStreetName: "Street Name",
                profileStreetNumber: "Street Number",
                profileNewPassword: "New Password",
                profileConfirmPassword: "Confirm New Password",

                // Buttons
                profileSaveChanges: "Save Changes",
                profileUpdatePassword: "Update Password",
                profileShowDetails: "Show Details",
                profileHideDetails: "Hide Details",
                profilePrevious: "Previous",
                profileNext: "Next",

                // Order history
                profileSearchOrders: "Search orders...",
                profileLoadingOrders: "Loading orders...",
                profileOrderId: "Order ID",
                profileOrderDate: "Date",
                profileOrderTotal: "Total",
                profileOrderDetails: "Details",
                profileNoFavorites: "No favorite books",
                profilePage: "Page",
                profilePageOf: "of",

                // Status messages
                profileUpdating: "Updating...",
                profileUpdateSuccess: "Profile updated successfully!",
                profilePasswordSuccess: "Password updated successfully!",
                profileUpdateError: "Error: User information is missing. Please log in again.",
                profilePasswordMismatch: "Error: Passwords do not match.",
                profileUpdatingPassword: "Updating password...",

                // Order page
                orderPageh2: "Recipient Information",
                firstNameDataColumn:"First Name",
                lastNameDataColumn: "Last Name",
                addressDataColumn: "Address",
                postalCodeDataColumn: "Postal Code",
                provinceDataColumn: "Province",
                phoneFormatDataColumn: "Phone number (in the format +358..)",
                confirmOrderBtn: "Confirm Order",
                emptyCartInfo: "No items in cart",
                cartTotalColumn: "Total",
                successfullOrderAlert: "Order placed succesfully",
                failedOrderAlert : "Failed to place an order",

                //Shopping cart
                shoppingCartH2: "Shopping cart",
                shoppingCartTotal: "Total:",
                clearCart : "Clear cart",
                checkoutBtn : "Checkout",
                qtyInfo: "Qty: ",


                // Admin Page
                AdminPageAddNew: "Add New",
                AdminPageBooksButton: "Books",
                AdminPageUsersButton: "Users",
                AdminPageOrdersButton: "Orders",
                AdminPageTableBookTitle: "Title",
                AdminPageTableBookISBN: "ISBN",
                AdminPageTableEdit: "Edit",
                AdminPageTableDelete: "Delete",
                AdminPageTableUserFirstName: "First Name",
                AdminPageTableUserLastName: "Last Name",
                AdminPageTableUserEmail: "Email",
                AdminPageTableOrderUser: "User",
                AdminPageTableOrderDate: "Date",
                CreateOrUpdateBookModalBookGenre: "Genre",
                CreateOrUpdateBookModalBookType: "Type",
                CreateOrUpdateBookModalBookPublicationYear: "Publication Year",
                CreateOrUpdateBookModalBookPrice: "Price",
                CreateOrUpdateBookModalBookCondition: "Condition",
                CreateOrUpdateBookModalBookReserved: "Reserved",
                CreateOrUpdateBookModalBookImageUrl: "Image URL",
                CreateOrUpdateBookModalBookInventoryStockLevelUsed: "Stock Level (Used)",
                CreateOrUpdateBookModalBookInventoryStockLevelNew: "Stock Level (New)",
                CreateOrUpdateBookModalBookPublisherName: "Publisher Name",
                CreateOrUpdateBookModalBookPublisherCountry: "Publisher Country",
                CreateOrUpdateBookModalBookAuthors: "Authors",
                CreateOrUpdateBookModalBookAuthor: "Author",
                CreateOrUpdateBookModalBookAuthorFirstName: "First Name",
                CreateOrUpdateBookModalBookAuthorLastName: "Last Name",
                CreateOrUpdateBookModalBookAddNewAuthor: "Add New Author",
                CreateOrUpdateModalSubmit: "Submit",
                CreateOrUpdateBookModalBookFailedToUpdate: "Failed to update book",
                CreateOrUpdateBookModalBookUpdatedSuccessfully: "Book updated successfully",
                CreateOrUpdateBookModalBookFailedToAdd: "Failed to add book",
                CreateOrUpdateBookModalBookAddedSuccessfully: "Book added successfully",
                CreateOrUpdateBookModalBookFailed: "An unexpected error occurred. Please try again.",
                CreateOrUpdateOrderModalOrder: "Order",
                CreateOrUpdateOrderModalOrderDate: "Order Date",
                CreateOrUpdateOrderModalOrderTotal: "Total",
                CreateOrUpdateOrderModalOrderedProducts: "Ordered Products",
                CreateOrUpdateOrderModalProduct: "Product",
                CreateOrUpdateOrderModalProductQuantity: "Quantity",
                CreateOrUpdateOrderModalProductISBN: "ISBN",
                CreateOrUpdateOrderModalProductPrice: "Price",
                CreateOrUpdateOrderModalClose: "Close",
                CreateOrUpdateUserModalFirstName: "First Name",
                CreateOrUpdateUserModalLastName: "Last Name",
                CreateOrUpdateUserModalStreetNumber: "Street Number",
                CreateOrUpdateUserModalStreetName: "Street Name",
                CreateOrUpdateUserModalPhoneNumber: "Phone Number",
                CreateOrUpdateUserModalPostalCode: "Postal Code",
                CreateOrUpdateUserModalProvince: "Province",
                CreateOrUpdateUserModalPassword: "Password",
                CreateOrUpdateUserModalRole: "Role",
            }
        },
        fi: {
            translation: {
                welcomeMessage: "Tervetuloa suosikkikirjakauppaasi!",
                loginSuccessLoginMessage: "Kirjautuminen onnistui",
                loginFailedMessage: "Kirjautuminen epäonnistui. Tarkista kirjautumistietosi.",
                loginUnexpectedError: "Tapahtui odottamaton virhe. Yritä uudelleen.",
                loginPageEmail: "Sähköposti",
                loginPagePassword: "Salasana",
                loginPageForgotPass: "Unohditko salasanan",
                loginPageSignIn: "Kirjaudu sisään",
                loginPageOr: "Tai",
                loginPageSignUp: "Rekisteröidy",
                signupPageFirstName: "Etunimi",
                signupPageLastName: "Sukunimi",
                HomepageH1WelcomeMessage: "Tervetuloa suosikkikirjakauppaasi!",
                HomepagePDescription: "Täältä löydät parhaat kirjat lukunautintoosi.",
                ProductGridDivLoading: "Ladataan...",
                ProductGridDivError: "Virhe tapahtui: ",
                ProductGridPNoBooksFound: "Kirjoja ei löytynyt.",
                ProductCardPUnknownAuthor: "Tuntematon kirjailija",
                FilterPanelH3Keywords: "Avainsanat",
                FilterPanelH3Genres: "Lajityypit",
                FilterPanelH4Price: "Hinta",
                FilterPanelPMaxPrice: "Suurin hinta: ",
                ProductCardButtonAddToCart: "Lisää ostoskoriin",
                SearchBarInputPlaceholder: "Hae kirjoja ja kirjailijoita...",
                SearchBarButtonText: "Etsi",
                LogoutButtonButtonText: "Kirjaudu ulos",
                HeaderSpanWelcomeText: "Tervetuloa, ",
                LoginButtonButtonText: "Kirjaudu sisään",
                SignupButtonButtonText: "Rekisteröidy",
                BookDivLoading: "Ladataan...",
                BookDivError: "Virhe tapahtui: ",
                BookPStrongAuthor: "Kirjailija: ",
                BookPSpanAuthorsUnavailable: "Kirjailijoita ei saatavilla",
                BookPISBN: "ISBN:",
                BookPGenre: "Lajityyppi:",
                BookPType: "Tyyppi:",
                BookPPublicationYear: "Julkaisuvuosi:",
                BookPCondition: "Kunto:",
                BookButtonAddToCart: "Lisää ostoskoriin",
                BookH2DescriptionLabel: "Kuvaus: ",
                BookH2DescriptionText: "Tämä on yksityiskohtainen kuvaus kirjasta. Se sisältää tietoa juonesta, teemoista ja merkityksestä lajityypissään. Lukijat nauttivat tästä kirjasta sen kiehtovasta kerronnasta ja syvästä historiallisesta kontekstista.",
                BookDivH2InStockText: "Varastossa",
                BookDivH2InStockNew: "Uusi: ",
                BookDivH2InStockUsed: "Käytetty: ",
                FooterPContactText: "Ole yhteydessä meihin: ",

                // Profile sections
                profileEditProfile: "Muokkaa profiilia",
                profileChangePassword: "Vaihda salasana",
                profileOrderHistory: "Tilaushistoria",
                profileFavoriteBooks: "Suosikkikirjat",
                profileWelcome: "Tervetuloa profiiliisi",
                profileSelectOption: "Valitse vaihtoehto sivupalkista aloittaaksesi",

                // Form labels
                profileFirstName: "Etunimi",
                profileLastName: "Sukunimi",
                profileEmail: "Sähköposti",
                profileStreetName: "Kadun nimi",
                profileStreetNumber: "Katunumero",
                profileNewPassword: "Uusi salasana",
                profileConfirmPassword: "Vahvista uusi salasana",

                // Buttons
                profileSaveChanges: "Tallenna muutokset",
                profileUpdatePassword: "Päivitä salasana",
                profileShowDetails: "Näytä tiedot",
                profileHideDetails: "Piilota tiedot",
                profilePrevious: "Edellinen",
                profileNext: "Seuraava",

                // Order history
                profileSearchOrders: "Hae tilauksia...",
                profileLoadingOrders: "Ladataan tilauksia...",
                profileOrderId: "Tilausnumero",
                profileOrderDate: "Päivämäärä",
                profileOrderTotal: "Yhteensä",
                profileOrderDetails: "Tiedot",
                profileNoFavorites: "Ei suosikkikirjoja",
                profilePage: "Sivu",
                profilePageOf: "/",

                // Status messages
                profileUpdating: "Päivitetään...",
                profileUpdateSuccess: "Profiili päivitetty onnistuneesti!",
                profilePasswordSuccess: "Salasana päivitetty onnistuneesti!",
                profileUpdateError: "Virhe: Käyttäjätiedot puuttuvat. Kirjaudu sisään uudelleen.",
                profilePasswordMismatch: "Virhe: Salasanat eivät täsmää.",
                profileUpdatingPassword: "Päivitetään salasanaa...",

                // Order page
                orderPageh2: "Vastaanottajan tiedot",
                firstNameDataColumn:"Etunimi",
                lastNameDataColumn: "Sukunimi",
                addressDataColumn: "Katuosoite",
                postalCodeDataColumn: "Postinumero",
                provinceDataColumn: "Lääni",
                phoneFormatDataColumn: "Puhelinnumero (muodossa +358..)",
                confirmOrderBtn: "Vahvista tilaus",
                emptyCartInfo: "Ostoskori on tyhjä",
                cartTotalColumn: "Yhteensä",
                successfullOrderAlert: "Tilaus onnistui",
                failedOrderAlert : "Tilaus epäonnistui",

                //Shopping cart
                shoppingCartH2: "Ostoskori",
                shoppingCartTotal: "Yhteensä:",
                clearCart : "Tyhjennä ostoskori",
                checkoutBtn : "Kassalle",
                qtyInfo: "Kpl: ",

                // Admin Page
                AdminPageAddNew: "Lisää uusi",
                AdminPageBooksButton: "Kirjat",
                AdminPageUsersButton: "Käyttäjät",
                AdminPageOrdersButton: "Tilaukset",
                AdminPageTableBookTitle: "Nimi",
                AdminPageTableBookISBN: "ISBN",
                AdminPageTableEdit: "Muokkaa",
                AdminPageTableDelete: "Poista",
                AdminPageTableUserFirstName: "Etunimi",
                AdminPageTableUserLastName: "Sukunimi",
                AdminPageTableUserEmail: "Sähköposti",
                AdminPageTableOrderUser: "Käyttäjä",
                AdminPageTableOrderDate: "Päivämäärä",
                CreateOrUpdateBookModalBookGenre: "Genre",
                CreateOrUpdateBookModalBookType: "Tyyppi",
                CreateOrUpdateBookModalBookPublicationYear: "Julkaisuvuosi",
                CreateOrUpdateBookModalBookPrice: "Hinta",
                CreateOrUpdateBookModalBookCondition: "Kunto",
                CreateOrUpdateBookModalBookReserved: "Varattu",
                CreateOrUpdateBookModalBookImageUrl: "Kuvan URL",
                CreateOrUpdateBookModalBookInventoryStockLevelUsed: "Varaston taso (Käytetty)",
                CreateOrUpdateBookModalBookInventoryStockLevelNew: "Varaston taso (Uusi)",
                CreateOrUpdateBookModalBookPublisherName: "Julkaisija",
                CreateOrUpdateBookModalBookPublisherCountry: "Julkaisumaa",
                CreateOrUpdateBookModalBookAuthors: "Kirjoittajat",
                CreateOrUpdateBookModalBookAuthor: "Kirjoittaja",
                CreateOrUpdateBookModalBookAuthorFirstName: "Etunimi",
                CreateOrUpdateBookModalBookAuthorLastName: "Sukunimi",
                CreateOrUpdateBookModalBookAddNewAuthor: "Lisää uusi kirjoittaja",
                CreateOrUpdateModalSubmit: "Lähetä",
                CreateOrUpdateBookModalBookFailedToUpdate: "Virhe päivitettäessä kirjaa",
                CreateOrUpdateBookModalBookUpdatedSuccessfully: "Kirja päivitetty onnistuneesti",
                CreateOrUpdateBookModalBookFailedToAdd: "Virhe lisättäessä kirjaa",
                CreateOrUpdateBookModalBookAddedSuccessfully: "Kirja lisätty onnistuneesti",
                CreateOrUpdateBookModalBookFailed: "Odottamaton virhe tapahtui. Yritä uudelleen.",
                CreateOrUpdateOrderModalOrder: "Tilaus",
                CreateOrUpdateOrderModalOrderDate: "Tilauksen päivämäärä",
                CreateOrUpdateOrderModalOrderTotal: "Yhteensä",
                CreateOrUpdateOrderModalOrderedProducts: "Tilatut tuotteet",
                CreateOrUpdateOrderModalProduct: "Tuote",
                CreateOrUpdateOrderModalProductQuantity: "Määrä",
                CreateOrUpdateOrderModalProductISBN: "ISBN",
                CreateOrUpdateOrderModalProductPrice: "Hinta",
                CreateOrUpdateOrderModalClose: "Sulje",
                CreateOrUpdateUserModalFirstName: "Etunimi",
                CreateOrUpdateUserModalLastName: "Sukunimi",
                CreateOrUpdateUserModalStreetNumber: "Kadun numero",
                CreateOrUpdateUserModalStreetName: "Kadun nimi",
                CreateOrUpdateUserModalPhoneNumber: "Puhelinnumero",
                CreateOrUpdateUserModalPostalCode: "Postinumero",
                CreateOrUpdateUserModalProvince: "Maakunta",
                CreateOrUpdateUserModalPassword: "Salasana",
                CreateOrUpdateUserModalRole: "Rooli",
            }
        },
        sv: {
            translation: {
                welcomeMessage: "Välkommen till din favoritbokhandel!",
                loginSuccessLoginMessage: "Inloggningen lyckades",
                loginFailedMessage: "Inloggningen misslyckades. Kontrollera dina uppgifter.",
                loginUnexpectedError: "Ett oväntat fel inträffade. Försök igen.",
                loginPageEmail: "E-postadress",
                loginPagePassword: "Lösenord",
                loginPageForgotPass: "glömt lösenordet?",
                loginPageSignIn: "Logga in",
                loginPageOr: "Eller",
                loginPageSignUp: "Registrera dig",
                signupPageFirstName: "Förnamn",
                signupPageLastName: "Efternamn",
                HomepageH1WelcomeMessage: "Välkommen till din favoritbokhandel!",
                HomepagePDescription: "Här hittar du de bästa böckerna för din läsning.",
                ProductGridDivLoading: "Laddar...",
                ProductGridDivError: "Ett fel inträffade: ",
                ProductGridPNoBooksFound: "Inga böcker hittades.",
                ProductCardPUnknownAuthor: "Okänd författare",
                FilterPanelH3Keywords: "Nyckelord",
                FilterPanelH3Genres: "Genrer",
                FilterPanelH4Price: "Pris",
                FilterPanelPMaxPrice: "Max pris: ",
                ProductCardButtonAddToCart: "Lägg till i kundvagnen",
                SearchBarInputPlaceholder: "Sök efter böcker och författare...",
                SearchBarButtonText: "Sök",
                LogoutButtonButtonText: "Logga ut",
                HeaderSpanWelcomeText: "Välkommen, ",
                LoginButtonButtonText: "Logga in",
                SignupButtonButtonText: "Registrera",
                BookDivLoading: "Laddar...",
                BookDivError: "Ett fel inträffade: ",
                BookPStrongAuthor: "Författare: ",
                BookPSpanAuthorsUnavailable: "Författare otillgängliga",
                BookPISBN: "ISBN:",
                BookPGenre: "Genre:",
                BookPType: "Typ:",
                BookPPublicationYear: "Publiceringsår:",
                BookPCondition: "Skick:",
                BookButtonAddToCart: "Lägg till i kundvagnen",
                BookH2DescriptionLabel: "Beskrivning: ",
                BookH2DescriptionText: "Detta är en detaljerad beskrivning av boken. Den innehåller information om handlingen, teman och betydelsen i sin genre. Läsarna kommer att uppskatta denna bok för dess engagerande berättelse och djupa historiska sammanhang.",
                BookDivH2InStockText: "I lager",
                BookDivH2InStockNew: "Ny: ",
                BookDivH2InStockUsed: "Använd: ",
                FooterPContactText: "Kontakta oss: ",

                // Profile sections
                profileEditProfile: "Redigera profil",
                profileChangePassword: "Ändra lösenord",
                profileOrderHistory: "Orderhistorik",
                profileFavoriteBooks: "Favoritböcker",
                profileWelcome: "Välkommen till din profil",
                profileSelectOption: "Välj ett alternativ från sidomenyn för att börja",

                // Form labels
                profileFirstName: "Förnamn",
                profileLastName: "Efternamn",
                profileEmail: "E-postadress",
                profileStreetName: "Gatunamn",
                profileStreetNumber: "Gatunummer",
                profileNewPassword: "Nytt lösenord",
                profileConfirmPassword: "Bekräfta nytt lösenord",

                // Buttons
                profileSaveChanges: "Spara ändringar",
                profileUpdatePassword: "Uppdatera lösenord",
                profileShowDetails: "Visa detaljer",
                profileHideDetails: "Dölj detaljer",
                profilePrevious: "Föregående",
                profileNext: "Nästa",

                // Order history
                profileSearchOrders: "Sök ordrar...",
                profileLoadingOrders: "Laddar ordrar...",
                profileOrderId: "Order-ID",
                profileOrderDate: "Datum",
                profileOrderTotal: "Totalt",
                profileOrderDetails: "Detaljer",
                profileNoFavorites: "Inga favoritböcker",
                profilePage: "Sida",
                profilePageOf: "av",

                // Status messages
                profileUpdating: "Uppdaterar...",
                profileUpdateSuccess: "Profilen har uppdaterats!",
                profilePasswordSuccess: "Lösenordet har uppdaterats!",
                profileUpdateError: "Fel: Användarinformation saknas. Logga in igen.",
                profilePasswordMismatch: "Fel: Lösenorden matchar inte.",
                profileUpdatingPassword: "Uppdaterar lösenord...",

                // Order page
                orderPageh2: "Mottagarinformation",
                firstNameDataColumn: "Förnamn",
                lastNameDataColumn: "Efternamn",
                addressDataColumn: "Adress",
                postalCodeDataColumn: "Postnummer",
                provinceDataColumn: "Län",
                phoneFormatDataColumn: "Telefonnummer (i formatet +358..)",
                confirmOrderBtn: "Bekräfta beställning",
                emptyCartInfo: "Inga varor i kundvagnen",
                cartTotalColumn: "Totalt",
                successfullOrderAlert: "Beställning genomförd",
                failedOrderAlert: "Misslyckades att genomföra beställning",

                // Shopping cart
                shoppingCartH2: "Kundvagn",
                shoppingCartTotal: "Totalt:",
                clearCart: "Töm kundvagnen",
                checkoutBtn: "Till kassan",
                qtyInfo: "Antal: ",

                // Admin Page
                AdminPageAddNew: "Lägg till ny",
                AdminPageBooksButton: "Böcker",
                AdminPageUsersButton: "Användare",
                AdminPageOrdersButton: "Ordrar",
                AdminPageTableBookTitle: "Titel",
                AdminPageTableBookISBN: "ISBN",
                AdminPageTableEdit: "Redigera",
                AdminPageTableDelete: "Ta bort",
                AdminPageTableUserFirstName: "Förnamn",
                AdminPageTableUserLastName: "Efternamn",
                AdminPageTableUserEmail: "E-postadress",
                AdminPageTableOrderUser: "Användare",
                AdminPageTableOrderDate: "Datum",
                CreateOrUpdateBookModalBookGenre: "Genre",
                CreateOrUpdateBookModalBookType: "Typ",
                CreateOrUpdateBookModalBookPublicationYear: "Publiceringsår",
                CreateOrUpdateBookModalBookPrice: "Pris",
                CreateOrUpdateBookModalBookCondition: "Skick",
                CreateOrUpdateBookModalBookReserved: "Reserverad",
                CreateOrUpdateBookModalBookImageUrl: "Bild-URL",
                CreateOrUpdateBookModalBookInventoryStockLevelUsed: "Lagerstatus (Använd)",
                CreateOrUpdateBookModalBookInventoryStockLevelNew: "Lagerstatus (Ny)",
                CreateOrUpdateBookModalBookPublisherName: "Förlagsnamn",
                CreateOrUpdateBookModalBookPublisherCountry: "Förlagsland",
                CreateOrUpdateBookModalBookAuthors: "Författarna",
                CreateOrUpdateBookModalBookAuthor: "Författare",
                CreateOrUpdateBookModalBookAuthorFirstName: "Förnamn",
                CreateOrUpdateBookModalBookAuthorLastName: "Efternamn",
                CreateOrUpdateBookModalBookAddNewAuthor: "Lägg till ny författare",
                CreateOrUpdateModalSubmit: "Skicka",
                CreateOrUpdateBookModalBookFailedToUpdate: "Misslyckades att uppdatera boken",
                CreateOrUpdateBookModalBookUpdatedSuccessfully: "Boken uppdaterades framgångsrikt",
                CreateOrUpdateBookModalBookFailedToAdd: "Misslyckades att lägga till boken",
                CreateOrUpdateBookModalBookAddedSuccessfully: "Boken lades till framgångsrikt",
                CreateOrUpdateBookModalBookFailed: "Ett oväntat fel inträffade. Försök igen.",
                CreateOrUpdateOrderModalOrder: "Beställning",
                CreateOrUpdateOrderModalOrderDate: "Beställningsdatum",
                CreateOrUpdateOrderModalOrderTotal: "Totalt",
                CreateOrUpdateOrderModalOrderedProducts: "Beställda produkter",
                CreateOrUpdateOrderModalProduct: "Produkt",
                CreateOrUpdateOrderModalProductQuantity: "Antal",
                CreateOrUpdateOrderModalProductISBN: "ISBN",
                CreateOrUpdateOrderModalProductPrice: "Pris",
                CreateOrUpdateOrderModalClose: "Stäng",
                CreateOrUpdateUserModalFirstName: "Förnamn",
                CreateOrUpdateUserModalLastName: "Efternamn",
                CreateOrUpdateUserModalStreetNumber: "Gatunummer",
                CreateOrUpdateUserModalStreetName: "Gatunamn",
                CreateOrUpdateUserModalPhoneNumber: "Telefonnummer",
                CreateOrUpdateUserModalPostalCode: "Postnummer",
                CreateOrUpdateUserModalProvince: "Län",
                CreateOrUpdateUserModalPassword: "Lösenord",
                CreateOrUpdateUserModalRole: "Roll",
            }
        },
    }
})