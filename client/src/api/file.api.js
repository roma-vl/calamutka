import { SERVER_URI } from 'constants'

const upload = async ({ file, roomId }) => {
    try {
        const body = new FormData()
        body.append('file', file)

        const response = await fetch(`http://api.calamutka.com/upload`, {
            method: 'POST',
            body,
            headers: {
                'x-room-id': roomId
            }
        });

        if (!response.ok) throw response

        const pathToFile = await response.json()
        return pathToFile
    } catch (e) {
        throw e
    }
}

const fileApi = { upload }

export default fileApi
