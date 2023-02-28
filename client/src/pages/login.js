import React from 'react';

export const Login = () => {

    return(
    <form>
        <label>
            Username:
            <input type="text" name="username" />
        </label>
    <br />
        <label>
            Password:
            <input type="password" name="password" />
        </label>
    <br />
        <button type="submit">Submit</button>
</form>

    )

}

export default Login;
