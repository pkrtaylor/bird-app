import cookie from 'cookie'
import {API_URL} from '../../../config/index'



/*
    when we hit this request, we gonna parse our cookies and grab our refresh token ,
    when we get our refresh token we jsonify it, then 
    make refresh request to django backend api
    then we get back anew access and refresh token 
    the old refesh token will then become invalid beacause it will be submitted to our token blacklist
    admin level could do samething but not send back new token and band username from logging in.

*/



export default async (req, res) => {
    if(req.method === 'POST')
    {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const refresh = cookies.refresh ?? false;

        if(refresh === false){
            return res.status(401).json({
                error : 'User unauthorized to make this request'
            });
        }

        const body = JSON.stringify({
            refresh

        })

        try {
            const apiRes = await fetch(`${API_URL}/api/token/refresh/`,
            {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            })

            const data = await apiRes.json()

            if(apiRes.status === 200){
                //if successfull we update our access and refresh tokens insid eour httpOnly cookie
                //to update cookies we do a res.setheader
                
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
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
                ])

                return res.status(200).json({
                    success: 'Refesh request successful'
                })

            }else{
                
                return res.status(apiRes.status).json({
                    error: 'Failed to fulfill refresh request'
                })
            }
        } catch (error) {
            
            return res.status(500).json({
                error : 'Something went wrong when trying to fulfill refresh request'
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