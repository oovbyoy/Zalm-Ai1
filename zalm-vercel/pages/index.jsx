import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css'

export default function Home() {
  return (
    <>
      <Head><title>Zalm AI - Login</title></Head>
      <div className="centerPage">
        <div className="card loginCard">
          <h1>Zalm <span className="accent">AI</span></h1>
          <form onSubmit={(e)=>{e.preventDefault(); const u=e.target.username.value.trim(); const p=e.target.password.value.trim(); if(u==='admin'&&p==='123'){window.location='/chat'}else alert('Wrong credentials — use admin / 123')}}>
            <input name="username" placeholder="Username" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit" className="primary">Sign In</button>
          </form>
          <p className="hint">Try <b>admin</b> / <b>123</b></p>
          <p><Link href="/team"><a className="link">View Team</a></Link></p>
        </div>
      </div>
    </>
  )
}
