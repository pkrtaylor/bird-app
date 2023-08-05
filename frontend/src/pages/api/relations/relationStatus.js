import cookie from 'cookie'
import { API_URL } from '../../../config'
// import FormData from 'form-data'


export default async (req, res) => {

    if (req.method === 'POST') {
        //lets parse our cookie values
        const cookies = cookie.parse(req.headers.cookie ?? '')// if there are no cookies in the browser "req.headers.cookie" will return undefined
        //the code above says 'if it isnt null or undefined we parse the cookies if not we parse the empty string 

        const access = cookies.access ?? false
        
        if (access === false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            })
        }


        const {follower, followee} = req.body
        console.log("relationStatus file "+follower)
        console.log("relationStatus file "+followee)

         //this turns the info back into json data
         const body = JSON.stringify({
            follower,
            followee
        })

     
        
        try {


            const apiRes = await fetch(`${API_URL}/api/relations/relationStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${access}`

                },
                body: body

            })

            const data = await apiRes.json()
            
            if (apiRes.status === 201) {
                return res.status(201).json({ relationStatus : data.relationStatus })
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
                error: 'Something went wrong getting relations status'
            })
        }

    }
    else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} is not allowed` })
    }
}


