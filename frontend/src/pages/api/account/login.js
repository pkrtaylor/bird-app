//inorder to utilize httpOnly cookies we need to install a library called cookie
//attributes of cookie
//expires - cookie will expire after a given amount of time 
//httpOnly client side javacript will not be able to acces cookie
//path - requires you to be in the specifc path inorder for you to send the cookie in the request
//sameSite - strict- the cookie is sent only to the same site that originally requested, this helps mitigate CSRF
//secure - must have an https connection in order to send a cookie 

import cookie from 'cookie'
import { API_URL } from '../../../config'


export default async (req, res) => {

    if (req.method === 'POST') {
        const { username, password } = req.body;
        //this turns the info back into json data
        const body = JSON.stringify({
            username,
            password
        })

        try {
            //api request to django
            const apiRes = await fetch(`${API_URL}/api/token/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: body

            });

            //apiRes returns data but we want the json version of it so we can access the data property
            const data = await apiRes.json();
            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        //here we serialize the access token 
                        //we get the access value from data 
                        //here on nextjs backend api when we parse this cookie we get the access token through the 'access' name below 
                        'access', data.access, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development', //if secure is false we dont need https 
                        maxAge: 60 * 30,
                        sameSite: 'strict',
                        path: '/api/'
                    }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24,
                        sameSite: 'strict',
                        path: '/api/'
                    }
                    ),

                ]);

                return res.status(200).json({
                    success: 'Logged in successfully'
                })
            } else {
                return res.status(apiRes.status).json({
                    error: 'Authentication failed'
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Something went wrong when authenticating'
            })
        }
    }
    else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({ error: `Method ${req.method} is not allowed` })
    }


}