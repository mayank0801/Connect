import Aside from "../../Component/Aside/Aside";

export default function Home(){
    return(
        <div style={{display:"flex"}}>
            <aside>
                <Aside/>
            </aside>
            <div>Home</div>
        </div>
    )
}