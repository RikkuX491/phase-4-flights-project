import NavBar from "./NavBar";
import Header from "./Header";

function ErrorPage(){
    return <div>
        <NavBar/>
        <Header/>
        <h1>Whoops! This page does not exist!</h1>
    </div>
}

export default ErrorPage;