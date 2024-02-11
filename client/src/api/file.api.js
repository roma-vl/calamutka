
const upload = async ({ file, roomId }) => {
    try {
        const body = new FormData();
        body.append('file', file);
        body.append('roomId', roomId);

        const response = await fetch(`https://api.calamutka.com/upload`, {
            method: 'POST',
            body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Дані про помилку:', errorData);
            throw new Error(`Не вдалося завантажити файл. Статус: ${response.status}`);
        }

        const pathToFile = await response.json();
        return pathToFile.relativeFilePath;
    } catch (e) {
        console.error('Помилка під час завантаження файлу:', e);
        throw e;
    }
};

const fileApi = { upload };

export default fileApi;
