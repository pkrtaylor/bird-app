import cookie from 'cookie'
import { API_URL } from '../../../config'
import formidable from 'formidable'
import fs from 'fs'
// import FormData from 'form-data'
import { Blob } from 'buffer'
export const config = {
    api: {
        bodyParser: false,
    },
}

export default async (req, res) => {

    if (req.method === 'POST') {
        //lets parse our cookie values
        const cookies = cookie.parse(req.headers.cookie ?? '')// if there are no cookies in the browser "req.headers.cookie" will return undefined
        //the code above says 'if it isnt null or undefined we parse the cookies if not we parse the empty string 

        const access = cookies.access ?? false
        console.log('sendTweets_file_1')
        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            })
        }



        const data = await new Promise(
            (resolve, reject) => {
                const form = new formidable.IncomingForm({
                    keepExtensions: true,
                    multiples: true

                });


                form.parse(req, (err, fields, files) => {
                    if (err) reject({ err });
                    resolve({ fields, files });
                });
            }
        );


        console.log(data)
        console.log('sendTweets_file_2')

        const body = new FormData()
        if (data.fields.media === 'null') {
            console.log(1)

            body.append('text', data.fields.text)
            body.append('user_id', data.fields.user_id)
            body.append('media', '')
            body.append('is_reply', data.fields.is_reply)
            body.append('parent_id', data.fields.parent_id)

        } else {
            console.log(2)
            const imageFile = data.files.media
            const tempImagePath = imageFile?.filepath
            const srcToFile = fs.readFileSync(tempImagePath);
            const blob = new Blob([srcToFile])


            body.append('text', data.fields.text)
            body.append('user_id', data.fields.user_id)
            body.append('media', blob, data.files.media?.newFilename)
            body.append('is_reply', data.fields.is_reply)
            body.append('parent_id', data.fields.parent_id)


        }

        console.log(data)
        try {


            const apiRes = await fetch(`${API_URL}/api/tweets/tweet`, {
                method: 'POST',
                headers: {
                    // "Content-Type": `multipart/form-data; boundary=${body.getBoundary()}`,
                    'Authorization': `Bearer ${access}`

                },
                body: body

            })

            const data = await apiRes.json()
            if (apiRes.status === 200) {
                return res.status(200).json({ tweets: data.tweets })
                //tweets is the name of the object attached to data coming in 
            }
            else {
                return res.status(apiRes.status).json({
                    error: data.error
                })

            }

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                error: 'Something went wrong with sending tweet'
            })
        }

    }
    else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} is not allowed` })
    }
}


