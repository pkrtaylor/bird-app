# bird-app


## Authentication and Authorization

Authentication was handled using JSON web tokens. I stored the json web tokens in an httpOnly cookie. This ensures that tokens cannot be accessed through javascript. Even if your site has a cross site scripting vulnerability, the cookie containing the token still cannot be accessed. Cross site scripting is where an attacker injects malicious executbale scripts(usually javascript) into the client side code of a website. Using his method will also allow us to mitigate CSRF. CSRF a.k.a Cross Site Request Forgery is an attack that forces end users to execute umwanted actions on a web application that they are logged into to. We are able to have a same site restriction, which prohibits requests made from a third party site. So the domain where the cookie was created must be the same domain to make the request.

The djano library `djangorestframework` was used for the backend API and `djangorestframework-simplejwt` was used for json web token authentication. We have an access token and a refresh token. The access token is used for authentication and authorization. The refresh token is used to create another access token when the previous expires. The `djangorestframework-simplejwt` provides us with class based views that we can use for authentication. `TokenObtainPairView`, this accepts a username and password that is tied to the current databse and the data is correct, gives a token and refresh token.
`TokenRefreshView` accepts a refresh token and gives a new token, and same refresh token. 
`TokenVerifyView` this accepts the access token and verifies whether our token is valid or not. This is used for authorization. The client slide has a process that checks the status of a token, when a paege loads. Next api makes the request here. 
As for the cookie funtionality, the npm library `cookie` gives us that. It allows us to serialize a cookie with a name and value pair into a set cookie header string. This is how we send off an httpOnly cookie in the header

### Flow

I am using NextJs and Django. NextJs provides both a client and server. So the Next client which is react is served by the next api server. Django is used as backend API. All three components are utilized.
A new user logging in would make a request from the client to the next server, which would make a request to the endpoint ending in /token. This hits `TokenObtainPairView`. If a status of 200 is returned that is when we serialize the httpOnly cookie. 

Now when a user makes any authorized request, the httpOnly cookie in the Set-Cookie header is parsed in the next api server for the access and refresh tokens. After, the authorized request is made to django backend which contains extracted tokens. When verified, data would be sent back to next api server, which would then send the data to the client. When making authorized requests we need to have next api server as our middle man because without it, the client side would need access to the tokens in order to make authorized requests to django. Every class view checks whether or not the token is valid, because in the settings.py, in the default permissions class, I included rest_framework.isAuthenticated. This makes it where every request by default needs have been made by an authenticated user.  




