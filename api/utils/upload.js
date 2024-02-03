import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// путь к текущей директории
const _dirname = dirname(fileURLToPath(import.meta.url))
console.log(_dirname, '_dirname')
const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024, // обмеження розміру файлу до 10 МБ
    },
    storage: multer.diskStorage({
        // директория для записи файлов
        destination: (req, _, cb) => {
            const { file } = req;

            if (!file) return false;

            // Доступ до файлу:
            console.log('Файл:', file);

            // Доступ до інших даних у формі:
            console.log('x-room-id:', req.body['x-room-id']);

            const roomId = req.body ? req.body['x-room-id'] : 'main_room';

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            const dirPath = join(__dirname, '../files', roomId);

            // Створити директорію, якщо вона не існує
            if (!existsSync(dirPath)) {
                mkdirSync(dirPath, { recursive: true });
            }

            cb(null, dirPath);
        },

        filename: (_, file, cb) => {
            // названия файлов могут быть одинаковыми
            // добавляем к названию время с начала эпохи и дефис
            const fileName = `${Date.now()}-${file.originalname}`

            cb(null, fileName)
        }
    }),
})

export default upload
