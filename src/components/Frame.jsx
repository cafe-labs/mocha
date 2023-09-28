import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import store from 'store2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'

function Frame({ src }) {
    const [bareLoaded, setBareLoaded] = useState(false)

    var proxiedSrc = src ? `/uv/` + btoa(src) : null
    const [loading, setLoading] = useState(true)

    function handleLoad() {
        setLoading(false)
        if (src.includes("play.geforcenow.com")) {
            toast((t) => (
                <span>
                  This page is known to be unstable on Ultraviolet. Switching to Dynamic might fix this - go to the <Link to="/settings" onClick={() => toast.dismiss(t.id)}><a className="link">Settings menu</a></Link> to learn more.
                </span>
              ), {
                icon: "⚠️"
              });
        }
    }
    
    return (
            <>
                {loading ? (
                    <div className="loader bg-base-100 flex items-center justify-center flex-col">
                        <h1 className="text-3xl	font-bold">Loading your content...</h1>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                    ) : null}
                    <iframe
                        src={proxiedSrc}
                        className="frame"
                        onLoad={handleLoad}
                    />
            </>
    );
}


export default Frame;
