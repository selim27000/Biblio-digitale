import { useAuth } from '../lib/auth.js'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useQuery} from '@apollo/client'



import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const { signIn, signOut } = useAuth()

  function onSubmit(e) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
const GetPosts = gql`
  {
    getPosts{
    body
    createdAt
    username
  
    }
  }
`

const EpisodeFeed = () => {
  
  const { data } = useQuery(GetPosts)
  console.log(useQuery(GetPosts))
  const { signOut } = useAuth()
  return (
    <div>
      <h1>Liste des films et séries</h1>
      <ul>
        {data?.getPosts.map((v) => {
        
          return <li key={v.id}>{v.username} -- {v.body}</li>
        })}
      </ul>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
export default function Home() {
  const { isSignedIn } = useAuth()
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1>BIBLIO DIGITALE</h1>
        {!isSignedIn() && <SignIn />}
        {isSignedIn() && <EpisodeFeed />}
      </main>
    </div>
  )
}