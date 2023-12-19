import { useSpaceX } from "../hooks/useSpaceX";

export function ListRokets (){
   const { rockets } = useSpaceX()
    return (
        <div>
            <h1>SpaceX Rockets</h1>
            <div className="grid-container">
            {rockets.map((rocket) => (
                    <article key={rocket.id}>
                        <img src={rocket.links.patch.small} alt="" />
                        <h2 >
                            {rocket.name}
                        </h2>
                    </article>
                    
                ))}
            </div>
        </div>
    );  
}