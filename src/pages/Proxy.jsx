import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';
import search from '../scripts/search'

import Frame from '../components/Frame'
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';

function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

function Proxy() {
    const [frameSrc, setFrameSrc] = useState()
    const params = useQuery()
    const navigate = useNavigate()

    const [src, setSrc] = useState((params.get("src")))

    useEffect(() => {
        if (!src) navigate("/")
    })

    var modifiedSrc = atob(src)
    modifiedSrc = search(modifiedSrc, 'https://google.com/search?q=%s')

    return (
        <>
            <Frame src={modifiedSrc} />
        </>
    )
}

export default Proxy;