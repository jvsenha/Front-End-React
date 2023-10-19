import {Main } from "./style"
import Sidebar from "../../components/Sidebar"


const HomeEmp = () => {
    const token = localStorage.getItem('token');
    
    return (
        <>

            <Sidebar page="Dashboard" />
            <Main>

            </Main>
        </>
    )
}

export { HomeEmp };