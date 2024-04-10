import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function getPdfUrl(pdfName) {
    const storage = getStorage();
    const pdfRef = ref(storage, pdfName);

    try {
        const url = await getDownloadURL(pdfRef);
        return url;
    } catch (error) {
        console.log('Error getting PDF URL:', error);
        return null;
    }
}