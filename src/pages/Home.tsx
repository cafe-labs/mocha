import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { encodeXor } from "../utils"


function Home() {
    const navigate = useNavigate()
    const [input, setInput] = useState('')

    function handleSearch() {
        const encodedSrc = encodeXor(input)
        navigate(`view?src=${encodedSrc}`)
    }
    
    return (
        <>
            <div className="center">
                <div className="join">
                    <input type="text" placeholder="Enter a search query or url" onKeyDown={(e) => {if (e.key == "Enter") handleSearch()}} onChange={(e) => setInput(e.target.value)} className="input bg-base-200 join-item w-64 focus:outline-none placeholder:opacity-70 outline-none transition-all focus:w-96 " />
                    <button className="btn join-item" onClick={handleSearch}>Search</button>
                </div> 
            </div>
        </>
    )
} 

export default Home;