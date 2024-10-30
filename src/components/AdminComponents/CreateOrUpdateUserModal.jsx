import {useUserContext} from "../../context/UserContext.jsx";
import {useState} from "react";
import {addUser, updateUser} from "../../utils/api.js";
import Modal from "./Modal.jsx";
import TextProperty from "./Properties/TextProperty.jsx";
import {t} from "i18next";


const CreateOrUpdateUserModal = ({open, onClose, existingUser, user_id}) => {
    const {user} = useUserContext();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [first_name, setFirst_name] = useState(existingUser?.first_name || '')
    const [last_name, setLast_name] = useState(existingUser?.last_name || '')
    const [street_number, setStreet_number] = useState(existingUser?.street_number || null);
    const [street_name, setStreet_name] = useState(existingUser?.street_name || '')
    const [phone_number, setPhone_number] = useState(existingUser?.phone_number || '')
    const [postal_code, setPostal_code] = useState(existingUser?.postal_code || null)
    const [province, setProvince] = useState(existingUser?.province || '')
    const [password, setPassword] = useState(existingUser?.password || '')
    const [role, setRole] = useState(existingUser?.role || '')
    const [email, setEmail] = useState(existingUser?.email || '')

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            let userData = {
                first_name: first_name,
                last_name: last_name,
                street_number: street_number,
                street_name: street_name,
                phone_number: phone_number,
                postal_code: postal_code,
                province: province,
                password: password,
                role: role,
                email: email
            };

            if (existingUser) {
                // Update
                response = await updateUser(user_id, userData, user.token);

                if (response.success === false) {
                    setErrorMessage(response.message);
                    setSuccessMessage('');
                } else {
                    setSuccessMessage(t("CreateOrUpdateUserModalUserUpdatedSuccessfully"));
                    console.log("User updated successfully");
                    setErrorMessage("");
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                }
            } else {
                // Create
                response = await addUser(userData, user.token);

                if (response.success === false) {
                    setErrorMessage(response.message);
                    setSuccessMessage('');
                } else {
                    setSuccessMessage(t("CreateOrUpdateUserModalUserCreatedSuccessfully"));
                    console.log("User created successfully");
                    setErrorMessage("");
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                }

            }
        } catch (error) {
            setErrorMessage(t("CreateOrUpdateUserModalErrorCreatingOrUpdateUser"));
            setSuccessMessage('');
            console.error("Error creating or updating user", error);
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <TextProperty value={first_name} type={"text"} label={t("CreateOrUpdateUserModalFirstName")} name={"first_name"}
                              onInputChange={(_, value) => setFirst_name(value)}/>
                <TextProperty value={last_name} type={"text"} label={t("CreateOrUpdateUserModalLastName")} name={"last_name"}
                              onInputChange={(_, value) => setLast_name(value)}/>
                <TextProperty value={street_number} type={"number"} label={t("CreateOrUpdateUserModalStreetNumber")} name={"street_number"}
                              onInputChange={(_, value) => setStreet_number(value)}/>
                <TextProperty value={street_name} type={"text"} label={t("CreateOrUpdateUserModalStreetName")} name={"street_name"}
                              onInputChange={(_, value) => setStreet_name(value)}/>
                <TextProperty value={phone_number} type={"text"} label={t("CreateOrUpdateUserModalPhoneNumber")} name={"phone_number"}
                              onInputChange={(_, value) => setPhone_number(value)}/>
                <TextProperty value={postal_code} type={"text"} label={t("CreateOrUpdateUserModalPostalCode")} name={"postal_code"}
                              onInputChange={(_, value) => setPostal_code(value)}/>
                <TextProperty value={province} type={"text"} label={t("CreateOrUpdateUserModalProvince")} name={"province"}
                              onInputChange={(_, value) => setProvince(value)}/>
                <TextProperty value={password} type={"password"} label={t("CreateOrUpdateUserModalPassword")} name={"password"}
                              onInputChange={(_, value) => setPassword(value)}/>
                <TextProperty value={role} type={"text"} label={t("CreateOrUpdateUserModalRole")} name={"role"}
                              onInputChange={(_, value) => setRole(value)}/>
                <TextProperty value={email} type={"email"} label={t("AdminPageTableUserEmail")} name={"email"}
                              onInputChange={(_, value) => setEmail(value)}/>

                <div className={"form-buttons-container my-4 flex justify-center"}>
                    <button type={"submit"}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {t("CreateOrUpdateModalSubmit")}
                    </button>
                </div>

                {successMessage && <p className={"text-green-500"}>{successMessage}</p>}
                {errorMessage && <p className={"text-red-500"}>{errorMessage}</p>}
            </form>
        </Modal>
    );
}

export default CreateOrUpdateUserModal;