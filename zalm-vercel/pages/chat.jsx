import { useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function Chat() {
  const [messages, setMessages] = useState([{role:'bot', content:'أهلاً! اكتب سؤالك.'}]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('ar');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e){
    e.preventDefault();
    if(!input.trim()) return;
    const user={role:'user', content:input};
    setMessages(prev=>[...prev, user]);
    setInput('');
    setLoading(true);
    try{
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({message:user.content, language: lang})
      });
      const data = await res.json();
      const bot = {role:'bot', content: data.reply || data.error || 'No reply.'};
      setMessages(prev=>[...prev, bot]);
    }catch(err){
      setMessages(prev=>[...prev, {role:'bot', content:'Connection error.'}]);
    }finally{ setLoading(false); }
  }

  return (
    <>
      <Head><title>Zalm AI - Chat</title></Head>
      <div className="chatPage">
        <h1>Zalm <span className="accent">AI</span></h1>
        <div className="langSelect">
          <label>Language: </label>
          <select value={lang} onChange={(e)=>setLang(e.target.value)}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="chatBox">
          {messages.map((m,i)=>(<div key={i} className={m.role==='user'?'user':'assistant'}>{m.content}</div>))}
          {loading && <div className="assistant">...</div>}
        </div>
        <form onSubmit={sendMessage} className="chatForm">
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="اكتب رسالتك..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  )
}
