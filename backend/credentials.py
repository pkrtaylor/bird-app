import json
import os
# import base64
# import os
# # from dotenv import load_dotenv, find_dotenv

variables_keys = {
    "type": "service_account",
    "project_id": "glowing-vehicle-390215",
    "private_key_id": "739a2dd317228ab80265229f645c8374912f0d61",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+V4qB2Nb2qwmD\nGPSR3LR8v/RdQdiexlyVB9I7uOVErKYy1hqe9LS4fy34WzCAV+Sz8H+ZC/HgnZG9\n5Oy2kGsVm6IMVfABs1K3z+q/wAL0MBuEx8PFR68I2ZGROAEb4DgH2cEDw8/bsSIU\nD4IYo/AJh/M0wYWeZdkpHQYZJOZghBl50Hg1LUXdjN9E2AkNmvh5pfEcE8Yqnt+2\nKvmzFJ8vPhTwkySEH65wNzAz1KhJR+f8WvvEIR09KHnkA7ik6VvruHS6ZCPnN8yb\nGCOwxOG84WYfXMrw3BmFfb0eyKwSG8Z64yCwgmEHY7/TFHUJjYIvcNDJ3s7YCwGE\nDtpOTYQtAgMBAAECggEABNRGQpicjZoVzfJwZBIAL0kUe1g8FX0tZKeT5SmCAZ3K\nwq/tcXp+ak7pvOsdXig8uHcB2cF0k9ETnUiFW/VqjhwKfrsgcX6Z+ulmyJIn0Qe2\nbwY9eJAix/vzJkbQOmOUMFjNPZn2eFm0ZmNlVtgz8x30pPJDAFuPqKwglzs5MBom\nofhr27FuT/bVe0wsBf0359e4quWl3QjVBArl/3Kkkl+QnYLv9As77hsMpMp9YUp5\naxlhS1uyfOpf/P+D3OUhNjFfv2vLeL6QZXatQyvJ5BgtJxCZ+TxzvxoThg5WZFr+\nZ9f3QoOM/EsyTW6S2qlQIzkocH6WJujZce6FZHbqaQKBgQD1/9pIC83q2GRs75RC\n1ZSTCZW4VaQMR8swpOZjnYqqeqI6+8ym6Mc+KmyWvGCKLdBxKt8BvNZqlVlxU6jt\nNPMMPHtcEGNvgOd5ohqN7pQm/0EwOJOiaqQ4F2ATvwtdH0F3yYZ7Xdroc/1I3ETx\nnanU8bRHygNPxHm1NYklIf9ItQKBgQDGFHQ7dc76HgnumTcZmlSzt8o+m4JuTRt/\n0gqTLrp9RGNZYuNw3o826HSI8LdpPGX+6MN4R2sNtODK2EEavdRYpEF0dPTT4Poz\nBXNBBqgxu5NRE73zn/rWYARkfoPF7nGmcAZfbWVOVlONE4smFZtExcE0uGpF/uXi\nTJpdnAjQmQKBgBErQDLTEBYZ8DhiKDjZ6zqv6pEo+QAaaqYEfEfrkOgBEx2GwWvM\nx0shbt6+WwaJ2Aht846NfXGG5u0v55RWo7fw6LMuOaJonr8wfyX0xsZJ/mS9LiCh\nzMBVcVEvfj2LlugjWo11qXeb0MurA+zREi9YhzqTcNO6ZLwu9llvHAAZAoGAbT+G\nw+y8FXNP4wsaOsLGCMFLiLBYheF9U0hTkM3rCYAYk4pZCz2VG6Gl9Ilff2lSj/9t\nH/+z6cFjYj1X2xnr7l/ZwhNnnRyuoklVQf4b8iIUpFkRITeRL3+RrKOiph5XDIco\n3KUHhOdT+bFXw8+S7aFsaFl2M9jcja3WTd7rdbECgYEAlOxCSiMGCNN8Sau7sgxQ\ny9TffKHBUYvVhQAVWWgnpTrLogoyF7D+/MVXDDIQoqu0f416W6iKB8gI5Fbuld+i\n1DywLyk9+AS7ATQ3DbUfBgjEUtWmvFlTM1FFCHhpnSIrffeVL73IoPt5sYZhqlRr\nYuV36Y4Acc5I9HfEwe7uQHQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "bird-app@glowing-vehicle-390215.iam.gserviceaccount.com",
    "client_id": "111506604242838933757",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bird-app%40glowing-vehicle-390215.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

# # service_key = json.dumps(service_key)

# # encoded_service_key = base64.b64encode(service_key.encode('utf-8'))
# # print(encoded_service_key)

variables_keys = {
    "type": os.getenv("TYPE"),
    "project_id": os.getenv("PROJECT_ID"),
    "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    "private_key": os.getenv("PRIVATE_KEY"),
    "client_email": os.getenv("CLIENT_EMAIL"),
    "client_id": os.getenv("CLIENT_ID"),
    "auth_uri": os.getenv("AUTH_URI"),
    "token_uri": os.getenv("TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
    "universe_domain": "googleapis.com"
}

json_object = json.dumps(variables_keys, indent=4)

print(json_object)
# with open("sample.json", "w") as outfile:
#     outfile.write(json_object)


{
    "type": "service_account",
    "project_id": "glowing-vehicle-390215",
    "private_key_id": "739a2dd317228ab80265229f645c8374912f0d61",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+V4qB2Nb2qwmD\nGPSR3LR8v/RdQdiexlyVB9I7uOVErKYy1hqe9LS4fy34WzCAV+Sz8H+ZC/HgnZG9\n5Oy2kGsVm6IMVfABs1K3z+q/wAL0MBuEx8PFR68I2ZGROAEb4DgH2cEDw8/bsSIU\nD4IYo/AJh/M0wYWeZdkpHQYZJOZghBl50Hg1LUXdjN9E2AkNmvh5pfEcE8Yqnt+2\nKvmzFJ8vPhTwkySEH65wNzAz1KhJR+f8WvvEIR09KHnkA7ik6VvruHS6ZCPnN8yb\nGCOwxOG84WYfXMrw3BmFfb0eyKwSG8Z64yCwgmEHY7/TFHUJjYIvcNDJ3s7YCwGE\nDtpOTYQtAgMBAAECggEABNRGQpicjZoVzfJwZBIAL0kUe1g8FX0tZKeT5SmCAZ3K\nwq/tcXp+ak7pvOsdXig8uHcB2cF0k9ETnUiFW/VqjhwKfrsgcX6Z+ulmyJIn0Qe2\nbwY9eJAix/vzJkbQOmOUMFjNPZn2eFm0ZmNlVtgz8x30pPJDAFuPqKwglzs5MBom\nofhr27FuT/bVe0wsBf0359e4quWl3QjVBArl/3Kkkl+QnYLv9As77hsMpMp9YUp5\naxlhS1uyfOpf/P+D3OUhNjFfv2vLeL6QZXatQyvJ5BgtJxCZ+TxzvxoThg5WZFr+\nZ9f3QoOM/EsyTW6S2qlQIzkocH6WJujZce6FZHbqaQKBgQD1/9pIC83q2GRs75RC\n1ZSTCZW4VaQMR8swpOZjnYqqeqI6+8ym6Mc+KmyWvGCKLdBxKt8BvNZqlVlxU6jt\nNPMMPHtcEGNvgOd5ohqN7pQm/0EwOJOiaqQ4F2ATvErQDLTEBYZ8DhiKDjZ6zqv6pEo+QAaaqYEfEfrkOgBEx2GwWvM\nx0shbt6+WwaJ2Aht846NfXGG5u0v55RWo7fw6LMuOaJonr8wfyX0xsZJ/mS9LiCh\nzMBVcVEvfj2LlugjWo11qXeb0MurA+zREi9YhzqTcNO6ZLwu9llvHAAZAoGAbT+G\nw+y8FXNP4wsaOsLGCMFLiLBYheF9U0hTkM3rCYAYk4pZCz2VG6Gl9Ilff2lSj/9t\nH/+z6cFjYj1X2xnr7l/ZwhNnnRyuoklVQf4b8iIUpFkRITeRL3+RrKOiph5XDIco\n3KUHhOdT+bFXw8+S7aFsaFl2M9jcja3WTd7rdbECgYEAlOxCSiMGCNN8Sau7sgxQ\ny9TffKHBUYvVhQAVWWgnpTrLogoyF7D+/MVXDDIQoqu0f416W6iKB8gI5Fbuld+i\n1DywLyk9+AS7ATQ3DbUfBgjEUtWmvFlTM1FFCHhpnSIrffeVL73IoPt5sYZhqlRr\nYuV36Y4Acc5I9HfEwe7uQHQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "bird-app@glowing-vehicle-390215.iam.gserviceaccount.com",
    "client_id": "111506604242838933757",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bird-app%40glowing-vehicle-390215.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
