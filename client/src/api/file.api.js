import { SERVER_URI } from 'constants'
import {post} from "../api/axios.api";
const upload = async ({ file, roomId }) => {
    try {
        const body = new FormData();
        body.append('file', file);

        const response = await fetch(`http://api.calamutka.com/upload`, {
            method: 'POST',
            body,
            headers: {
                'x-room-id': roomId
            }
        });

        console.log('Статус відповіді:', response.status);
        console.log('Текст статусу відповіді:', response.statusText);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Дані про помилку:', errorData);
            throw new Error(`Не вдалося завантажити файл. Статус: ${response.status}`);
        }

        const pathToFile = await response.json();
        return pathToFile;
    } catch (e) {
        console.error('Помилка під час завантаження файлу:', e);
        throw e;
    }
};

const fileApi = { upload };

export default fileApi;
