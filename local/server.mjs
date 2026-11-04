import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';

// Single-user prototype: run with Node 20.6+ on your own computer.
// Start from repo root: node --env-file=.env local/server.mjs
const PAGE=resolve(dirname(fileURLToPath(import.meta.url)),'../docs/practice.html');
const PORT=Number(process.env.PORT||4173);
const KEY=process.env.OPENAI_API_KEY||'';
const MODEL=process.env.OPENAI_MODEL||'gpt-4.1-mini';
const INSTRUCTIONS=[
'You are an expert Swedish writing coach. Help the learner become independently fluent.',
'Give ONLY valid JSON with keys: strength (string), edits (array), alternatives (array), vocabulary (array), phrases (array), recurringCandidates (empty array).',
'Each edit has original, replacement, category, explanation, occurrence. original must be an EXACT substring of the submitted text, including punctuation and Swedish characters.',
'Use occurrence as 1-based match number when the same exact original occurs more than once. Never return overlapping edits.',
'Preserve original meaning and voice; leave correct passages untouched. Do not mark merely less idiomatic but acceptable wording as an error.',
'Include optional changes under alternatives as objects with original, suggestion and note.',
'Translate [English placeholders] into natural Swedish that fits the context. Do not force translations of acceptable professional English loanwords.',
'Focus on vocabulary the learner actually needed, 1-5 English-first entries with english, swedish, context.',
'Include 1-3 English-first reusable phrases with english, swedish. Empty arrays are fine if nothing useful.',
'Explanations of real grammar and word-order errors must be short, specific, in plain English.',
'Do not include imitation tasks; repetition is handled through an independent second attempt and later recall.',
'Never claim an error is recurring from only one sample. recurringCandidates must be [].',
'If no actual corrections are needed, edits must be [].',
'Respond as JSON only, no markdown or extra prose.'
].join('\n');
function send(res,status,value){
 res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 res.end(JSON.stringify(value));
}
function readBody(req){
 return new Promise((resolveBody,reject)=>{
  const chunks=[];let size=0;
  req.on('data',part=>{size+=part.length;if(size>30000){reject(Error('Request too large'));req.destroy()}else chunks.push(part)});
  req.on('end',()=>{try{resolveBody(JSON.parse(Buffer.concat(chunks).toString('utf8')))}catch{reject(Error('Invalid JSON'))}});
  req.on('error',reject);
 });
}
const app=http.createServer(async(req,res)=>{
 const pathname=new URL(req.url||'/','http://localhost').pathname;
 if(req.method==='GET'&&(pathname==='/'||pathname==='/practice.html')){
  try{const page=await readFile(PAGE);res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(page)}
  catch{send(res,500,{error:'Practice page missing. Run this from the complete cloned repository.'})}
  return;
 }
 if(req.method==='GET'&&pathname==='/api/status'){send(res,200,{ready:Boolean(KEY),model:MODEL});return}
 if(req.method!=='POST'||pathname!=='/api/feedback'){send(res,404,{error:'Not found'});return}
 const origin=req.headers.origin;
 if(origin&&origin!=='http://localhost:'+PORT&&origin!=='http://127.0.0.1:'+PORT){send(res,403,{error:'Local app only'});return}
 if(!KEY){send(res,503,{error:'AI feedback is not configured. Add OPENAI_API_KEY to your local .env and restart. Your draft is safe.'});return}
 let data;try{data=await readBody(req)}catch(e){send(res,400,{error:e.message});return}
 const {text,context='free',title='Free writing',scenario=''}=data||{};
 if(typeof text!=='string'||text.trim().length<3||text.length>6000){send(res,400,{error:'Write 3–6000 characters of Swedish.'});return}
 if(typeof context!=='string'||typeof title!=='string'||typeof scenario!=='string'){send(res,400,{error:'Invalid writing context'});return}
 try{
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),75000);
  let response;
  try{
   response=await fetch('https://api.openai.com/v1/responses',{
    method:'POST',signal:controller.signal,headers:{Authorization:'Bearer '+KEY,'Content-Type':'application/json'},
    body:JSON.stringify({
     model:MODEL,store:false,instructions:INSTRUCTIONS,
     input:[{role:'user',content:'Situation: '+title+'\nContext: '+context+'\nTask: '+scenario.slice(0,1000)+'\n\nLEARNER TEXT:\n<<<START>>>\n'+text+'\n<<<END>>>'}],
     text:{format:{type:'json_object'}}
    })
   })
  }finally{clearTimeout(timer)}
  if(!response.ok){
   const err=await response.json().catch(()=>({}));
   console.error('AI service error',response.status,err.error?.code||'');
   const message=response.status===401?'API key rejected':response.status===429?'API quota or rate limit reached':response.status===402?'Insufficient API credit':'AI service unavailable ('+response.status+')';
   send(res,502,{error:message+'. Your draft is saved.'});return;
  }
  const result=await response.json();
  const output=typeof result.output_text==='string'?result.output_text:(result.output||[]).flatMap(x=>x.type==='message'?x.content||[]:[]).filter(x=>x.type==='output_text').map(x=>x.text||'').join('');
  const feedback=JSON.parse(output);
  if(!Array.isArray(feedback.edits)||!Array.isArray(feedback.vocabulary)||!Array.isArray(feedback.phrases))throw Error('Incomplete feedback');
  send(res,200,{feedback});
 }catch(e){
  console.error('AI feedback failed',e?.message||'unknown');
  send(res,502,{error:(e?.name==='AbortError'?'AI request timed out':'The AI response was invalid or unavailable')+'. Your draft is saved.'});
 }
});
app.listen(PORT,'127.0.0.1',()=>console.log('Write Your Way: http://localhost:'+PORT+(KEY?' · AI ready':' · Set OPENAI_API_KEY to enable AI')));
