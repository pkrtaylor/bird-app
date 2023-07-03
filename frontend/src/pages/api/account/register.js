//the way this works is in our next js client when we make an api request to api/accout/register, it will hit whats inside here

//we want to send  a request to localhost:8000
//when you go into production you wont actually hit localhost:8000 but it will be your domain 
//so lets use envionrment variables 

import { API_URL } from "../../../config";


export default async (req, res) =>{
    if(req.method === 'POST')
    {
        const {
            email,
            first_name,
            last_name,
            username,
            password,
            re_password
        } = req.body

        //turn all the vlaues we extracted from req,body into strings,and we can pass along this as json data
        const body = JSON.stringify({
            email,
            first_name,
            last_name,
            username,
            password,
            re_password
        })

        try {
            const apiRes = await fetch(`${API_URL}/api/account/register`,{
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: body
            })

            //lets get the data back from this response 
            //back in the registerView in django if we sucessfully create an account we get sent back a  201 status  

            const data = await apiRes.json();

            if(apiRes.status === 201)//this is the status coming from django api
            {
                return res.status(201).json({success : data.success})
            }
            else{
                return res.status(apiRes.status).json({
                    error: data.error //this can be any of the many error cases messages we have in our registerView in django
                })
            }
        } catch (error) {
            return res.status(500).json({
                error : 'Something went wrong registering for an account'
            })
        }
    }
    else{
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({'error' : `Method ${req.method} not allowed`})
    }
};