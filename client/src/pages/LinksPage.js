import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { LinksList } from '../components/LinkList'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async() =>{
        try{
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch(e){}
    }, [token, request])

    useEffect(()=>{
        fetchLinks()
    }, [fetchLinks])

    return(
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
}