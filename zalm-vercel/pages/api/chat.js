import fetch from 'isomorphic-unfetch';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { message, language } = req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;
  if(!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set in Vercel environment variables.' });

  try{
    const payload = {
      model: process.env.OPENAI_MODEL || 'gpt-5',
      messages: [
        { role: 'system', content: language === 'en' ? 'You are a helpful assistant. Reply in English.' : 'أنت مساعد ذكي يرد بالعربية.' },
        { role: 'user', content: message }
      ],
      max_tokens: 800
    };
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content || j.error?.message || JSON.stringify(j);
    res.status(200).json({ reply });
  }catch(e){
    res.status(500).json({ error: e.message });
  }
}
