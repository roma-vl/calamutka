export default function onError(err, req, res, next) {
    console.log(err)

        const statusCode = err.status || 500; // Встановлюємо статус коду (якщо його немає, то 500)
        res.status(statusCode).json({
            message: err.message || 'Internal Server Error', // Повертаємо повідомлення про помилку
            // Можна також додати інші деталі, такі як поле з помилками
            errors: err.errors || [] // Додайте масив помилок, якщо є
        });

}
