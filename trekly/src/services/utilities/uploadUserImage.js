import { upload } from "../api/api";
import useAuthStore from "../../store/authStore";
import { showErrorAlert } from "./alertUtils";

export const uploadUserImage = async (token, type, uri) => {
    const formData = new FormData();

    // Determine the file type from the URI
    let fileType = uri.substring(uri.lastIndexOf(".") + 1);

    // Allow only JPEG and PNG file types
    if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
        formData.append('file', {
            uri,
            type: `image/${fileType}`,
            name: `upload.${fileType}`,
        });

        try {
            const response = await upload(token, type, formData);
            const url = response.url;
            useAuthStore.getState().updateProfilePhoto(url);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    } else {
        showErrorAlert("Unsupported file type", "Only JPEG and PNG are allowed.");
    }
};
