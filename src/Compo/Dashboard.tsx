import { useSearchParams, useParams } from "react-router-dom"
import { jwtDecode, JwtPayload } from "jwt-decode"


interface CustomJWTPayload extends JwtPayload {
    accessToken: string,
    expiryDate: string
}


const tokenGetter = () => {
    const [SearchParams] = useSearchParams();

    const token = SearchParams.get("token") as string;
    localStorage.setItem("token", token);
    //get the JWT token from the query parameter and sets in the localstorage


    console.log("Token: " + token)
    return token
}

const jwtDecoder = () => {

    const token = tokenGetter();

    const decoded = jwtDecode<CustomJWTPayload>(token);
    console.log("Decoded: " + decoded)
    return decoded
    //const refresh_Token = decoded.accessToken
}

const tokenExpiryChecker = () => {
    const decoded = jwtDecoder();
    const expiryDateRaw = decoded.expiryDate;

    const expiryDate = new Date(expiryDateRaw);
    console.log("Expiry Date converted: " + expiryDate)

    const currentDate = new Date();
    console.log("Current Date: " + currentDate)

    if (expiryDate < currentDate) {
        return false
    }
    else {
        return true
    }

}

export default function Dashboard() {

    const token = tokenGetter()
    const decoded = jwtDecoder();
    const accessToken = decoded.accessToken;
    console.log("accessToken: ", accessToken)
    const expirythingy = tokenExpiryChecker();
    console.log("boom: " + expirythingy)

    return (
        <div className="text-white">
            Welcome to the dashboard brother!
            <div>Token : {token}</div>
            <div>Decoded Token: {decoded.accessToken}</div>
        </div>
    )
}