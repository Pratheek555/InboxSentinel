import { useSearchParams, useParams } from "react-router-dom"


const tokenExpiryChecker = () => {
    const [SearchParams] = useSearchParams();

    const token = SearchParams.get("token");
    console.log("Token: " + token)
    return token
}


export default function Dashboard() {

    const token = tokenExpiryChecker()


    return (
        <div className="text-white">
            Welcome to the dashboard brother!
            <div>Token : {token}</div>
        </div>
    )
}