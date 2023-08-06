import cookie from 'cookie'
import { DJANGO_API_URL } from '../../../config'
import formidable from 'formidable'
import fs from 'fs'
// import FormData from 'form-data'
import { Blob } from 'buffer'
import axios from 'axios'
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
        //if null set ''
        //if data.files. exist create blob
        // anything else set bgp to value

        const imageHandler = (dataField, dataFile) =>{

                if(dataField === 'null')
                {
                    const s = ''
                    return s
                }
                else if(dataFile)
                {   
                    
                    const imageFile = dataFile
                    const tempImagePath = imageFile?.filepath
                    const srcToFile = fs.readFileSync(tempImagePath);
                    const blob = new Blob([srcToFile])
                    return blob

                }
                else{
                    console.log(dataField)
                    return dataField
                    
                }
        }

        
        console.log(1)
        const file = imageHandler(data.fields.pfp,data.files.pfp)
        if(typeof(file) === String)
        {
            body.append('pfp', file )
        }
        else{
            body.append('pfp', file,  data.files.pfp?.newFilename)
        }
        console.log(2)
       
        console.log(3)

        const file2 = imageHandler(data.fields.bgp,data.files.bgp)
        console.log(file2)
        if(data.fields.bgp)
        {
            body.append('bgp', file2 )
        }
        else{
            body.append('bgp', file2,  data.files.bgp?.newFilename)
        }
        console.log(5)


        body.append('display_name', data.fields.display_name)
        body.append('user_id', data.fields.user_id)
        body.append('bio', data.fields.bio)
        body.append('location', data.fields.location)
        body.append('birthdate', data.fields.birthdate)

        // if (data.fields.pfp === 'null' || data.fields.bgp === 'null') {
        //     console.log(1)

        //     if(data.fields.pfp === 'null' && data.fields.bgp === 'null'){
        //         body.append('pfp', '')
        //         body.append('bgp', '')
        //     }
        //     else if(data.fields.pfp === 'null')
        //     {
        //         const imageFile = data.files.bgp
        //         const tempImagePath = imageFile?.filepath
        //         const srcToFile = fs.readFileSync(tempImagePath);
        //         const blob = new Blob([srcToFile])

        //         body.append('bgp', blob, data.files.bgp?.newFilename)
        //         body.append('pfp', '')

        //     }
        //     else{
        //         const imageFile = data.files.pfp
        //         const tempImagePath = imageFile?.filepath
        //         const srcToFile = fs.readFileSync(tempImagePath);
        //         const blob = new Blob([srcToFile])

        //         body.append('pfp', blob, data.files.pfp?.newFilename)
        //         body.append('bgp', '')
        //     }
     
        // } else {
        //     console.log(2)
        //     const imageFile = data.files.bgp
        //     const tempImagePath = imageFile?.filepath
        //     const srcToFile = fs.readFileSync(tempImagePath);
        //     const blob = new Blob([srcToFile])

        //     const imageFile2 = data.files.pfp
        //     const tempImagePath2 = imageFile2?.filepath
        //     const srcToFile2 = fs.readFileSync(tempImagePath2);
        //     const blob2 = new Blob([srcToFile2])

        //     body.append('bgp', blob, data.files.bgp?.newFilename)
        //     body.append('pfp', blob2, data.files.pfp?.newFilename)
           


        // }

        
    



        console.log(data)
        try {


            const apiRes = await fetch(`${DJANGO_API_URL}/api/account/profile`, {
                method: 'POST',
                headers: {
                    // "Content-Type": `multipart/form-data; boundary=${body.getBoundary()}`,
                    'Authorization': `Bearer ${access}`

                },
                body: body

            })

            const data = await apiRes.json()
            if (apiRes.status === 200) {
                return res.status(200).json({ profile: data.profile })
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


