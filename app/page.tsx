'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Star, Shield, Zap, Target } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

type Player = { name:string; club:string; position:string; age:number; overall:number; potential:number; pace:number; passing:number; shooting:number; defending:number; physical:number; value:string; fit:number }

const players: Player[] = [
 {name:'Jude Bellingham',club:'Real Madrid',position:'CM',age:23,overall:91,potential:94,pace:82,passing:91,shooting:88,defending:78,physical:86,value:'€180M',fit:96},
 {name:'Pedri',club:'Barcelona',position:'CM',age:23,overall:88,potential:92,pace:79,passing:94,shooting:76,defending:70,physical:66,value:'€140M',fit:94},
 {name:'Florian Wirtz',club:'Liverpool',position:'AM',age:23,overall:89,potential:93,pace:84,passing:92,shooting:83,defending:52,physical:64,value:'€130M',fit:92},
 {name:'William Saliba',club:'Arsenal',position:'CB',age:25,overall:89,potential:92,pace:86,passing:82,shooting:35,defending:94,physical:91,value:'€110M',fit:91},
 {name:'Lamine Yamal',club:'Barcelona',position:'RW',age:19,overall:89,potential:97,pace:92,passing:91,shooting:84,defending:42,physical:61,value:'€210M',fit:90},
 {name:'João Neves',club:'PSG',position:'CM',age:21,overall:87,potential:94,pace:81,passing:90,shooting:61,defending:86,physical:75,value:'€105M',fit:88},
 {name:'Giorgio Scalvini',club:'Atalanta',position:'CB',age:22,overall:82,potential:91,pace:76,passing:79,shooting:29,defending:84,physical:83,value:'€55M',fit:86},
 {name:'Benjamin Šeško',club:'Man United',position:'ST',age:23,overall:85,potential:93,pace:89,passing:68,shooting:90,defending:35,physical:88,value:'€95M',fit:84},
]

const radar = (p:Player) => [{subject:'Pace',A:p.pace},{subject:'Pass',A:p.passing},{subject:'Shoot',A:p.shooting},{subject:'Defend',A:p.defending},{subject:'Physical',A:p.physical}]

export default function Home(){
 const [query,setQuery]=useState(''); const [position,setPosition]=useState('All'); const [minPotential,setMinPotential]=useState(0); const [selected,setSelected]=useState(players[0]); const [sort,setSort]=useState<'fit'|'overall'|'potential'>('fit')
 const filtered=useMemo(()=>players.filter(p=>(p.name+p.club).toLowerCase().includes(query.toLowerCase())&&(position==='All'||p.position===position)&&p.potential>=minPotential).sort((a,b)=>b[sort]-a[sort]),[query,position,minPotential,sort])
 return <main>
  <header className="topbar"><div className="brand"><div className="logo">S</div><div><b>SCOUT<span>IQ</span></b><small>FOOTBALL INTELLIGENCE</small></div></div><div className="status"><i/> DATABASE ONLINE <span>•</span> 8,412 PLAYERS</div></header>
  <section className="hero"><div><p className="eyebrow">SCOUTING COMMAND CENTER</p><h1>Find the next <span>superstar.</span></h1><p className="sub">Data-driven scouting for smarter recruitment. Search, compare and identify high-value talent before the market catches up.</p></div><div className="heroStats"><div><strong>8,412</strong><span>PLAYERS</span></div><div><strong>47</strong><span>LEAGUES</span></div><div><strong>92%</strong><span>DATA QUALITY</span></div></div></section>
  <section className="workspace">
   <div className="controls"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search player or club..."/></div><select value={position} onChange={e=>setPosition(e.target.value)}><option>All</option><option>ST</option><option>AM</option><option>CM</option><option>CB</option><option>RW</option></select><label className="range">MIN POTENTIAL <input type="range" min="0" max="97" value={minPotential} onChange={e=>setMinPotential(+e.target.value)}/><b>{minPotential || 'ANY'}</b></label><button className="ghost"><SlidersHorizontal size={16}/> ADVANCED</button></div>
   <div className="grid"><div className="panel listPanel"><div className="panelHead"><div><h2>PLAYER DATABASE</h2><p>{filtered.length} prospects match your criteria</p></div><button className="sort" onClick={()=>setSort(sort==='fit'?'overall':sort==='overall'?'potential':'fit')}><ArrowUpDown size={14}/> SORT: {sort.toUpperCase()}</button></div><div className="tableHead"><span>PLAYER</span><span>POS</span><span>AGE</span><span>OVR</span><span>POT</span><span>VALUE</span><span>FIT</span></div>{filtered.map(p=><button className={'playerRow '+(selected.name===p.name?'active':'')} key={p.name} onClick={()=>setSelected(p)}><span className="player"><span className="avatar">{p.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><span><b>{p.name}</b><small>{p.club}</small></span></span><span>{p.position}</span><span>{p.age}</span><strong>{p.overall}</strong><strong className="potential">{p.potential}</strong><span>{p.value}</span><span className="fit">{p.fit}%</span></button>)}</div>
   <aside className="panel detail"><div className="detailTop"><span className="tag">SHORTLISTED</span><span className="fitBadge">{selected.fit}% FIT</span></div><div className="profile"><div className="bigAvatar">{selected.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><h2>{selected.name}</h2><p>{selected.club} · {selected.position} · Age {selected.age}</p></div></div><div className="ratings"><div><small>OVERALL</small><b>{selected.overall}</b></div><div><small>POTENTIAL</small><b>{selected.potential}</b></div><div><small>MARKET VALUE</small><b>{selected.value}</b></div></div><div className="chart"><ResponsiveContainer width="100%" height={240}><RadarChart data={radar(selected)}><PolarGrid/><PolarAngleAxis dataKey="subject" tick={{fontSize:11}}/><Radar dataKey="A" strokeWidth={2} fillOpacity={0.18}/><Tooltip/></RadarChart></ResponsiveContainer></div><div className="insights"><h3>SCOUTING INSIGHTS</h3><p><Zap size={15}/> <b>Elite trajectory</b> — projected to improve {selected.potential-selected.overall} OVR points.</p><p><Target size={15}/> <b>Role fit</b> — profile matches a modern {selected.position} in possession-heavy systems.</p><p><Shield size={15}/> <b>Value signal</b> — compare performance to market value before opening negotiations.</p></div><button className="shortlist"><Star size={16}/> ADD TO SHORTLIST</button></aside></div>
  </section><footer>SCOUTIQ · FOOTBALL SCOUTING ANALYTICS <span>DATA-DRIVEN RECRUITMENT PLATFORM</span></footer>
 </main>
}
