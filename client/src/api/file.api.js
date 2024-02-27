import {SERVER_URI} from "../constants";
import {post} from "./axios.api";

const upload = async ( file, roomId ) => {
    try {
        const body = new FormData();
        body.append('file', file);
        body.append('roomId', roomId);

        const response = await post(SERVER_URI + '/upload', body);

        if (!response.data) {
            const errorData = await response.json();
            console.error('Дані про помилку:', errorData);
            throw new Error(`Не вдалося завантажити файл. Статус: ${response.status}`);
        }

        return response.data.relativeFilePath;
    } catch (e) {
        console.error('Помилка під час завантаження файлу:', e);
        throw e;
    }
};

const fileApi = { upload };

export default fileApi;
