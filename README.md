# graphical-password-scheme

![](https://img.shields.io/npm/v/graphical-password-scheme.svg?style=flat)

An over-the-shoulder-attack-resistant graphical password scheme for the world wide web. You can demo the scheme at https://graphical-password-scheme.now.sh

### Install

You can install the modules from npm via the following command:

`npm install graphical-password-scheme`

### Usage

You can import the `Register` and `Login` modules and use them in your React.js application as follows:

```
import { Register, Login } from graphical-password-scheme

<Register api="api/url" onSuccess={success}>

<Login api="api/url" onSuccess={success}>
```

The api supplied to each module must be a valid server endpoint. The Register module supplies the endpoint with a POST request containing a JSON object containing a `username` and a `password`. The Login module supplies the endpoint with a GET request which returns a JSON object containing a `username` and a `password`. 

The `success` function is called upon the success of the registration and login processes within the modules.

You can find an example of how the modules can be implemented at https://github.com/fjmillman/graphical-password-scheme