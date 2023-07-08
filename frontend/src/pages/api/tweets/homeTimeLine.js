import cookie from 'cookie'
import {API_URL} from '../../../config/index'



export default async (req,res) => {
    if(req.method === 'GET')
    {
        //lets parse our cookie values
        const cookies = cookie.parse(req.headers.cookie ?? '')// if there are no cookies in the browser "req.headers.cookie" will return undefined
        //the code above says 'if it isnt null or undefined we parse the cookies if not we parse the empty string 

        const access = cookies.access ?? false

        if(access === false )
        {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            })
        }
       try {

            const apiRes = await fetch(`${API_URL}/api/tweets/homeTimeLine`, {
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            })

            const data = await apiRes.json();

            if(apiRes.status === 200)
            {
                return res.status(200).json({ tweets: data.tweets})
            }
            else{
                return res.status(apiRes.status).json({
                    error: data.error
                })
                
            }


       } catch (error) {
            return res.status(500).json({
                error: 'Something went wrong when retrieving tweets '
            })
       }
    
    }
    else{
        res.setHeader('Allow' , ['GET']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        })
    }
}



