#!/usr/bin/env python3
# Nightly importer: startup-research pipeline files -> static TS data for validation-ideas.
# (Moved into the repo from /workspace/vi-gen/gen.py on 2026-10-25; run it through scripts/import-night.sh.)
# The app never reads /workspace/startup-research at build or run time: this writes
#   lib/mock/ideas.ts     US pains (one entry per pain id; a pain re-pitched on a later night keeps its id and is updated)
#   lib/mock/legacy.ts    old Germany pains p-001..p-071
#   lib/mock/imported.ts  nights from IMPORT_FROM onward (scout counts, steps) and each night's brief:
#                         pitched ideas, the winner, its private-POC demo shots, the validation page proposal.
# Usage: scripts/gen-data.py [--night YYYY-MM-DD]   (env: VI_RESEARCH_DIR, VI_REPO)
import json, os, re, sys
from collections import Counter
R=os.environ.get('VI_RESEARCH_DIR','/workspace/startup-research')
REPO=os.environ.get('VI_REPO',os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# Nights before this are hand-written in lib/mock/nights.ts; from here on everything is parsed.
IMPORT_FROM='2026-10-25'
WANT=None
if '--night' in sys.argv: WANT=sys.argv[sys.argv.index('--night')+1]
pains=json.load(open(f'{R}/pains.json'))
comp={}
for l in open(f'{R}/us/complaints.jsonl'):
    c=json.loads(l); comp[c['id']]=c
pms={}
for l in open(f'{R}/us/proven-models.jsonl'):
    m=json.loads(l); pms[m['id']]=m

BRIEF={
 'p-072':dict(name='DinnerList', pitch='Tap 5 dinners, get one combined grocery list for any store: the simple Mealime that died on 21 Oct.',
   price='$3.99/month or $29/year, under Plan to Eat\'s $49',
   mvp="One screen with ~40 tested weeknight dinners plus 'add your own by URL'. Tap 3–5, pick servings, get one combined, aisle-sorted list to share or copy into Instacart/Walmart. No account until you pay.",
   kill="It's already dead: 20+ clones plus free Meals Hub and Flambette took the wedge, and a solo dev can't produce Mealime's tested-recipe catalogue in 2 weeks.",
   who="US working parents and home cooks who plan weeknight dinners and don't shop at Albertsons-family stores",
   ev='Mealime shut down 21 Oct 2026; 37 complaints from 35 people across the 22 and 24 Oct runs (Play, App Store, r/mealime, r/EatCheapAndHealthy and X).',
   quotes=['c-us-20261022-034','c-us-20261022-029','c-us-20261022-037'],
   kill_reason='Killed by the competitor check, not by score. 20+ Mealime replacements in 30 days, free Meals Hub (Albertsons), Plan to Eat since 2008, Ollie ($7.5M seed) owns AI planning.',
   gap='Only a sliver: a non-AI-slop planner with tested recipes and a combined list for any store, which Flambette, WeeknightBite and Plan to Eat already claim.'),
 'p-073':dict(name='ReelRecipe', pitch='Share a TikTok or Instagram recipe and get a clean card. Honest price, no trial trap.',
   price='$14.99/year or $19.99 one-time',
   mvp="A share-sheet target: share a reel or URL, the app pulls caption, transcript and page schema and shows ingredients and steps in 3 seconds. Tap 'fix' on any line. One list of saved recipes.",
   kill="Per-import AI/transcript cost above ~$0.02 at $15/yr; ReciMe dropping its 5-per-week cap; users really wanting one-time (Paprika exists); no TikTok distribution.",
   who="US home cooks who save recipes from social video, baited by 'free' apps that need a $40/yr trial",
   ev='ReciMe (15M users, #1 US Play Food & Drink grossing) draws 125 ≤3★ US Play reviews in 30 days over its 5-imports/week paywall and trial traps.',
   quotes=['c-us-20261022-002','c-us-20261022-004','c-us-20261022-001']),
 'p-076':dict(name='DueCheck', pitch="Enter your mileage and see what's due on your car. Free export, no subscription creep.",
   price='$1.99/month or $14.99/year (likely unsellable against free CARFAX)',
   mvp="Pick your car, enter today's odometer, and get a list of what's due (oil, tires, filters) with one tap to log 'done'. Reminders by mileage estimate. CSV export always free.",
   kill='CARFAX Car Care is free and fills itself from shop records, and reviewers refuse subscriptions for logging.',
   who='US DIY car owners whose long-used loggers moved features behind paywalls or broke sync',
   ev='5 US Play reviews (Drivvo, aCar, Simply Auto, FIXD) plus proven model Drivvo (Brazil, 5M+ Play installs).',
   quotes=['c-us-20261022-058','c-us-20261022-059','c-us-20261022-057']),
 'p-078':dict(label='Lift-logger paywalls', ev='StrongLifts went Pro-only (~$60/yr); 25 people in 30 days, many asking for a $10–20 one-time price.',
   quotes=['c-us-20261023-070','c-us-20261023-073','c-us-20261023-079'],
   kill_reason='Competitor veto (score 20). Hevy free, no ads, 99,319 US ratings at 4.92★; Strong free tier; Boostcamp no paywall; Liftosaur free; Oct 2026 indie pay-once launches (Maintenea, RepDay).',
   bn='Highest score tonight (20) but killed only by the competitor veto; the cluster wants one-time pricing.'),
 'p-079':dict(label='AI workout planners that repeat', ev='Fitbod/SHRED users say plans repeat or ignore settings; proven model Ladder (#2 US Health & Fitness top-grossing, via the scout).'),
 'p-080':dict(label='Running apps paywalling basic tracking', ev='Strava, Runna and NRC users resent paying to see their own stats; Strava acquired Runna.'),
 'p-084':dict(label='Home-warranty claim denials', ev='American Home Shield, Choice and First American reviewers report denied claims and cash-in-lieu lowballs.'),
 'p-074':dict(label='Shared grocery-list sync'),
 'p-075':dict(label='OEM remote-start subscriptions'),
 'p-077':dict(label='Parking & gas payment apps'),
 'p-081':dict(label='Peloton membership price rises'),
 'p-082':dict(label='Smart-thermostat app regressions'),
 'p-083':dict(label='Home-maintenance reminders'),
 'p-085':dict(label='Being your own repair project manager'),
 # 24 Oct 2026 run (labels from briefs/2026-10-24.md and the 24 Oct analyst log)
 'p-086':dict(label='School & activity message overload'),
 'p-087':dict(label='ClassDojo Plus resentment'),
 'p-088':dict(label='GameChanger & Hudl price hikes'),
 'p-089':dict(label='Team-app ads, RSVP & fees'),
 'p-090':dict(label='Family calendar with work-calendar sync'),
 'p-091':dict(label='Lineup tool for volunteer coaches', niche="kids' activities & school logistics"),  # proven-model only, no complaints to take the niche from
}

# Competition as a demand signal (settings v2, from the 25 Oct run onward). Read only when the data has it;
# accepted shapes: pains.json `competition: {strong_us_competitors|count, wedge, demand_signal, veto_by}` or flat
# `competitor_count` / `wedge` / `demand_signal` / `veto_by`. Never derived from the `competitors` list (that is research, not a count).
import glob
def competition(p, veto):
    c=p.get('competition') or {}
    def pick(*ks):
        for k in ks:
            if c.get(k) is not None: return c[k]
        for k in ks:
            if p.get(k) is not None: return p[k]
        return None
    count=pick('strong_us_competitors','count','competitor_count')
    wedge=pick('wedge'); wedge=wedge.strip() if isinstance(wedge,str) and wedge.strip() else None
    ds=pick('demand_signal'); vb=pick('veto_by')
    vb={'4+':'count','count':'count','competitors':'count','funded_leader':'funded_leader'}.get(str(vb).lower() if vb else '', None)
    return {'count':count if isinstance(count,int) else None,'wedge':wedge,'demand_signal':ds is True,
            'veto':(vb or 'old-rule') if veto else None,'checked':bool(c) or any(p.get(k) is not None for k in ('competitor_count','wedge','demand_signal'))}
# Fallback winners: pains.json `fallback: true` / `winner_type: "fallback"`, or a brief line naming the pain with "Fallback (below bar)".
FALLBACK=set()
for f in glob.glob(f'{R}/briefs/*.md'):
    for line in open(f):
        if 'fallback (below bar)' in line.lower(): FALLBACK.update(re.findall(r'p-\d{3}', line))
def is_fallback(p): return p.get('fallback') is True or p.get('winner_type')=='fallback' or p['id'] in FALLBACK

def gate(t):
    s=(t or '').strip().lower()
    if s.startswith('fail'): r='fail'
    elif s.startswith('weak pass'): r='weak-pass'
    elif s.startswith('borderline') or s.startswith('maybe'): r='borderline'
    elif s.startswith('pass'): r='pass'
    else: r='not-assessed'
    return {'result':r,'text':t or 'not assessed'}

def plc(p):
    x=p.get('plc')
    if not x: return None
    v=x['verdict']; st=re.match(r'\s*(introduction|growth|maturity|decline)',x['stage']).group(1)
    m=re.match(r'\s*(yes|maybe|no)(?:\s*→\s*(yes|maybe|no))?',v)
    o={'stage':st,'evidence':x['evidence'],'verdict':m.group(1),'verdictText':v,'assessment':True}
    if m.group(2): o['trendTo']=m.group(2)
    if x['stage']!=st: o['stageText']=x['stage']
    return o

SRC_SHORT={'google_play':'Google Play','app_store':'App Store','reddit':'Reddit','x':'X','hn':'Hacker News'}
def ev_summary(p,cs):
    from collections import Counter
    cnt=Counter(SRC_SHORT.get(c['source'].split()[0],c['source'].split()[0]) for c in cs)
    parts=', '.join(f'{k} {v}' for k,v in cnt.most_common())
    s=f"{len(p['complaint_ids'])} complaints from {p['distinct_people']} people ({parts})"
    pm=[m['app'].split(' (')[0] for m in p.get('proven_models',[])]
    if pm: s+=f"; proven model {', '.join(pm)}"
    return s+'.'

# The 4 gates (mirror lib/gates.ts): consumer_subscription, buildable_2wk, us_entry, plc_fit.
# pains.json carries text for consumer_subscription and us_entry; buildability only shows up in
# gate_failed; PLC fit comes from plc.verdict / plc.stage. 'simplest_way' is a build principle, not a gate.
GATE_IDS=['consumer_subscription','buildable_2wk','us_entry','plc_fit']
def gate_failed_ids(gf):
    toks=[t.strip() for t in re.split(r'[/,]',gf or '') if t.strip()]
    return {'buildable_2wk' if t=='buildability' else t for t in toks}
def any_gate_failed(p, gates):
    if any(g['result']=='fail' for g in gates.values()): return True
    if gate_failed_ids(p.get('gate_failed')) & set(GATE_IDS): return True
    x=p.get('plc')
    return bool(x and re.match(r'\s*no\b',x['verdict']))

def score_verdict(p, veto, gates):
    # Mirrors lib/verdict.ts: decline PLC -> killed; 18+ with all 4 gates passed and no veto -> winner;
    # 15+ otherwise -> near-miss regardless of veto or a failed gate ("Vetoed" / "Fails gate" tags); <15 -> below bar.
    t=p['scores']['total']
    if p.get('plc') and p['plc']['stage']=='decline': return 'killed'
    if t>=18 and not veto and not any_gate_failed(p, gates): return 'winner'
    if t>=15: return 'near-miss'
    return 'below-bar'

def wow(p):
    # Proven-model-only entries (p-091) carry only a note: no linked complaints, so 0 in both weeks of the run.
    w=dict(p['week_over_week'])
    if 'this_week_iso' not in w:
        w={'this_week_iso':'2026-W42','this_week':0,'last_week_iso':'2026-W41','last_week':0,**w}
    return w

def first_night(p):
    rs=p.get('runs_seen') or []
    return (rs[0] if rs else (p.get('analyst_runs') or [p['analyst_run']])[0])[:10]
def first_run(p):
    ar=p.get('analyst_runs')
    if ar: return ar[0]
    n=first_night(p)
    return p['analyst_run'] if p['analyst_run'].startswith(n) else n+'-us'

# ---------- Briefs from IMPORT_FROM on: parsed, never hand-copied ----------
def md_plain(t):
    t=re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',t); t=re.sub(r'\*\*|__|`','',t); t=re.sub(r'(?<!\w)\*([^*\n]+)\*(?!\w)',r'\1',t)
    return re.sub(r'\s+',' ',t).strip()
def sections(text, level):
    # {heading: body} for headings of exactly `level` #'s, in order
    out=[]; cur=None; buf=[]
    for line in text.split('\n'):
        m=re.match(r'^(#{1,6})\s+(.*)$',line)
        if m and len(m.group(1))<=level:
            if cur is not None: out.append((cur,'\n'.join(buf).strip()))
            cur=m.group(2).strip() if len(m.group(1))==level else None; buf=[]
        elif cur is not None: buf.append(line)
    if cur is not None: out.append((cur,'\n'.join(buf).strip()))
    return out
def sub(secs, prefix):
    for h,b in secs:
        if h.lower().startswith(prefix.lower()): return b
    return None
def bullets(b):
    return [md_plain(x) for x in re.findall(r'^\s*[-*]\s+(.+)$', b or '', re.M)]
def bold_label(b, label):
    m=re.search(r'\*\*'+re.escape(label)+r'[^*]*:\*\*\s*(.+)', b or '')
    return md_plain(m.group(1)) if m else None

LINK2C={c['link']:cid for cid,c in comp.items() if c.get('link')}
BRIEFS=[]
PARSED={}  # pain id -> [(night, parsed brief fields)], oldest first
for f in sorted(glob.glob(f'{R}/briefs/*.md')):
    date=os.path.basename(f)[:-3]
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}',date) or date<IMPORT_FROM: continue
    text=open(f).read()
    top=sections(text,2)
    pitched=[]
    for h,body in top:
        if not h.lower().startswith('idea '): continue
        m=re.search(r':\s*([^:()]+?)\s*\((p-\d{3})\)',h)
        if not m: continue
        name,pid=m.group(1).strip(),m.group(2)
        hl=h.lower(); role='fallback' if 'fallback' in hl else 'winner' if 'winner' in hl else 'pitched'
        ss=sections(body,3)
        np=sub(ss,'Name and pitch') or ''
        pm=re.search(r'\*\*[^*]+\*\*\s*:\s*(.+)',np)
        pitch=md_plain(pm.group(1)) if pm else None
        if pitch: pitch=pitch[0].upper()+pitch[1:]
        ev=re.search(r'Evidence in one line:\**\s*(.+)',np)
        price=None; pr=sub(ss,'Price guess') or ''
        bm=re.search(r'\*\*(.+?)\*\*',pr)
        if bm: price=re.sub(r'\s*\((?:USD, )?estimate\)\.?$','',md_plain(bm.group(1))).rstrip('.')
        mv=sub(ss,'MVP') or ''
        core=bold_label(mv,'Core feature'); simp=bold_label(mv,'Simplest path')
        cap1=lambda x: x[0].upper()+x[1:] if x else x
        mvp=' '.join(x for x in [core and 'Core feature: '+core.strip('"“”').rstrip('.').strip('"“”')+'.', cap1(simp)] if x) or None
        kill=bullets(sub(ss,'WHAT WOULD KILL'))
        qs=[LINK2C[u] for u in re.findall(r'\]\((https?://[^)\s]+)\)', sub(ss,'Real quotes') or '') if u in LINK2C]
        test=sub(ss,'Cheapest test') or None
        pitched.append(dict(painId=pid,name=name,role=role,pitch=pitch,price=price,mvp=mvp,kill='; '.join(k.rstrip('.') for k in kill)+'.' if kill else None,
                            ev=(lambda e: e[0].upper()+e[1:])(md_plain(ev.group(1))) if ev else None,quotes=qs,test=test))
    for x in pitched: PARSED.setdefault(x['painId'],[]).append((date,x))
    winner=next((x for x in pitched if x['role']!='pitched'),None)
    val=None
    vp=next(((h,b) for h,b in top if h.lower().startswith('validation page proposal')),None)
    if vp and winner:
        t=winner['test'] or ''
        num=lambda rx: (lambda m: [int(g) for g in m.groups()] if m else None)(re.search(rx,t))
        bud=num(r'€\s*(\d+)\s*[–-]\s*(\d+)'); vis=num(r'(\d+)\+\s*(?:US\s+)?visitors')
        kl=num(r'(?:below|under)\s*(\d+(?:\.\d+)?)%'); st=num(r'(\d+(?:\.\d+)?)%\+?\s*is strong')
        val=dict(status='proposal',heading=vp[0],markdown=vp[1],test=t or None,
                 budgetEur={'min':bud[0],'max':bud[1]} if bud else None,minVisitors=vis[0] if vis else None,
                 killPct=kl[0] if kl else None,strongPct=st[0] if st else None)
    # The winner's private POC: poc/<date>.md (real vs mocked) + poc/<date>-shots/*-390.png / *-1280.png
    demo=None
    pocmd=f'{R}/poc/{date}.md'; shotdir=f'{R}/poc/{date}-shots'
    if winner and os.path.isdir(shotdir):
        md=open(pocmd).read() if os.path.exists(pocmd) else ''
        rows=[]
        rv=sub(sections(md,2),'Real vs mocked') or ''
        for line in rv.split('\n'):
            cells=[c.strip() for c in line.strip().strip('|').split('|')] if line.strip().startswith('|') else None
            if not cells or len(cells)<2 or set(cells[0])<=set('-: ') or cells[0].lower()=='piece': continue
            sm=re.match(r'\**\s*(Real manifest|Real|Mock|Fake|Note only|Not built)',cells[1],re.I)
            kind={'real':'real','mock':'mock','fake':'fake','note':'note','not':'none'}[sm.group(1).lower().split()[0]] if sm else 'note'
            rows.append(dict(piece=md_plain(cells[0]),status=kind,text=md_plain(cells[1])))
        STOP={'in','the','a','of','and','to','from','by','url','full','plus','home','card','recipe'}
        tok=lambda s: {w for w in re.findall(r'[a-z]+',s.lower()) if w not in STOP}
        def norm(w): return w[:-1] if w.endswith('s') else w
        stems={}
        for fn in sorted(os.listdir(shotdir)):
            m=re.fullmatch(r'(\d+[a-z]?)-(.+)-(390|1280)\.png',fn)
            if m: stems.setdefault((m.group(1),m.group(2)),{})[m.group(3)]=fn
        shots=[]
        for (n,slug),w in stems.items():
            if '390' not in w or '1280' not in w: continue
            words=slug.replace('-',' ')
            cap=re.sub(r'\bfull$','(full page)',words); cap=cap[0].upper()+cap[1:]
            st={norm(x) for x in tok(slug)}
            best=0; hits=[]
            for r in rows:
                o=len(st & {norm(x) for x in tok(r['piece'])})
                if not o and 'demo' in st and 'demo' in r['text'].lower(): o=1
                if o>best: best,hits=o,[r]
                elif o and o==best: hits.append(r)
            shots.append(dict(n=n,slug=slug,caption=cap,src390=f'demo/{date}/{w["390"]}',src1280=f'demo/{date}/{w["1280"]}',
                              pieces=[dict(piece=h['piece'],status=h['status']) for h in hits]))
        mocked=sorted({re.sub(r'\s+link$','',r['piece'].split('+')[-1].strip()).lower() for r in rows if r['status'] in ('mock','fake')})
        private=bool(re.search(r'\bprivate\b',md,re.I))
        label='Demo screenshots'+(' · app runs privately' if private else '')
        if mocked: label+=' · '+(' and '.join([', '.join(mocked[:-1]),mocked[-1]] if len(mocked)>1 else mocked))+(' are' if len(mocked)>1 else ' is')+' mocked'
        title=re.search(r'^#\s+(.+)$',md,re.M)
        intro=next((md_plain(p) for p in md.split('\n\n')[1:] if p.strip() and not p.startswith('#') and not p.startswith('-')),None)
        demo=dict(title=title.group(1).strip() if title else f'{winner["name"]} POC',label=label,private=private,pocPath=f'poc/{date}.md',
                  intro=intro,rows=rows,shots=shots)
    BRIEFS.append(dict(date=date,briefPath=f'briefs/{date}.md',winnerPainId=winner['painId'] if winner else None,
                       winnerRole=winner['role'] if winner else None,
                       ideas=[dict(painId=x['painId'],name=x['name'],role=x['role']) for x in pitched],demo=demo,validation=val))

ideas=[]
for p in pains:
    if p.get('market')!='US': continue
    b=dict(BRIEF.get(p['id'],{}))
    # Latest brief wins: a pain pitched again on a later night keeps its pain id and is updated in place;
    # names it carried in earlier briefs stay reachable as `aka` (shown on its first night and its page).
    aka=[]; pitched_on=[]
    old=b.get('name')
    for d,x in PARSED.get(p['id'],[]):
        pitched_on.append(d)
        prev=b.get('name')
        if prev and prev!=x['name'] and prev not in [a['name'] for a in aka]:
            aka.append({'name':prev,'night':pitched_on[-2] if len(pitched_on)>1 else first_night(p)})
        b.update({k:v for k,v in dict(name=x['name'],pitch=x['pitch'],price=x['price'],mvp=x['mvp'],kill=x['kill'],ev=x['ev']).items() if v})
        if x['quotes']: b['quotes']=x['quotes']
    cs=[comp[c] for c in p['complaint_ids'] if c in comp and comp[c].get('link')]
    order=b.get('quotes',[])
    cs.sort(key=lambda c:(order.index(c['id']) if c['id'] in order else 99, c['post_date']), reverse=False)
    first=[c for c in cs if c['id'] in order]; rest=sorted([c for c in cs if c['id'] not in order], key=lambda c:c['post_date'], reverse=True)
    cs=first+rest
    kr=b.get('kill_reason', p.get('kill_reason'))
    veto=bool(p.get('competitor_veto')) or bool(kr and 'competitor' in kr.lower())
    gates={k:gate(p.get('gates',{}).get(k)) for k in ['consumer_subscription','us_entry']}
    simplest=(p.get('gates',{}).get('simplest_way') or '').strip()
    simplest=None if not simplest or simplest.lower() in ('n/a','not assessed') else simplest
    pm=[{k:v for k,v in pms.get(m['id'],m).items() if k!='market'}|{'market':'US','stream':'proven-model'} for m in p.get('proven_models',[])]
    pm=[{k:m.get(k,'') for k in ['id','found_date','app','country','model_and_price','traction_evidence','us_status','entry_point','why_not_done_yet','lifecycle_evidence','stream','market']} for m in pm]
    src=p.get('source','complaints')
    gap=b.get('gap',p.get('gap'))
    if gap and gap.lower().startswith('not researched'): gap=None
    idea={
      # Night = first scout night the pain was seen (runs_seen[0], else the first analyst run), so pains merged into
      # later runs (p-072..p-074 on 24 Oct, p-075..p-085 on 25 Oct) stay on the night they were found.
      'painId':p['id'],'night':first_night(p),'analyst_run':first_run(p),'market':'US',
      'niche': cs[0]['niche'] if cs else b.get('niche',''),
      'name':b.get('name'),'label':b.get('label'),'pitch':b.get('pitch'),
      'price':{'text':b['price'],'estimate':True} if b.get('price') else None,
      'mvp':b.get('mvp'),'killQuestion':b.get('kill'),
      'description':p['description'],'who':b.get('who',p['who']),'source':src,
      'evidenceSummary':b.get('ev') or ev_summary(p,cs),
      'complaint_ids':p['complaint_ids'],'quotes':[{k:c[k] for k in ['id','found_date','post_date','source','link','quote','engagement','niche','stream','market']} for c in cs],
      'proven_models':pm,'distinct_people':p['distinct_people'],'distinct_people_note':p.get('distinct_people_note',''),
      'weekly_counts':p['weekly_counts'],'week_over_week':wow(p),'recurring':p['recurring'],'recurring_note':p.get('recurring_note'),
      'scores':p['scores'],'score_notes':p['score_notes'],'gates':gates,'gate_failed':p.get('gate_failed'),'simplest_way':simplest,
      'competitor_veto':veto,'kill_reason':kr,'borderline_note':b.get('bn',p.get('borderline_note')),
      'competitors':p.get('competitors',[]),'gap':gap,'plc':plc(p),
      'competition':competition(p,veto),'fallback':is_fallback(p),
      'nights':sorted(set([first_night(p)]+[r[:10] for r in (p.get('runs_seen') or [])])),
    }
    if aka: idea['aka']=aka
    if pitched_on: idea['pitchedOn']=pitched_on
    idea['verdict']=score_verdict(p,veto,gates)
    ideas.append(idea)

legacy=[]
for p in pains:
    if p.get('market')=='US': continue
    n=int(p['id'][2:]); run=p.get('analyst_run') or ('2026-10-19' if n<=22 else '2026-10-20')
    t=p['scores']['total']
    v='killed' if p['status']=='killed' else ('near-miss' if t>=15 else 'below-bar')
    legacy.append({'painId':p['id'],'night':run,'market':'DE','description':p['description'],'who':p['who'],
      'source':p.get('source','complaints'),'scores':p['scores'],'verdict':v,'kill_reason':p.get('kill_reason'),
      'borderline_note':p.get('borderline_note'),'name':'Fristly' if p['id']=='p-011' else None,
      'pitched': p['id']=='p-011'})

# ---------- Nights from IMPORT_FROM on (older ones are hand-written in lib/mock/nights.ts) ----------
log=open(f'{R}/log.md').read()
logsec={h:b for h,b in sections(log,2)}
def logpart(date,kind):
    return next((b for h,b in logsec.items() if h.startswith(date) and kind in h.lower()),None)
pms_by=Counter(m['found_date'] for m in pms.values())
SRC_KEYS={'google_play','app_store','reddit','x','hn','trustpilot','forums'}
pitched_json=json.load(open(f'{R}/pitched.json')) if os.path.exists(f'{R}/pitched.json') else []
NEW_TIMES={'scout':'00:30','analyst':'01:30','builder':'02:30','brief':'05:05'}
night_dates=sorted({h[:10] for h in logsec if re.match(r'\d{4}-\d{2}-\d{2} ',h) and h[:10]>=IMPORT_FROM} | {b['date'] for b in BRIEFS})
if WANT and WANT not in night_dates: print(f'gen-data: WARNING no log.md section or brief for {WANT} yet', file=sys.stderr)
by_id={i['painId']:i for i in ideas}
NIGHTS=[]
for d in sorted(night_dates, reverse=True):
    cs=[c for c in comp.values() if c.get('found_date')==d and c.get('market')=='US']
    src=Counter(c['source'].split()[0] for c in cs)
    by={k:src.get(k,0) for k in ['google_play','app_store','reddit','x','hn','trustpilot','forums']}
    by['forums']+=sum(v for k,v in src.items() if k not in SRC_KEYS)
    blocked=[]
    sc=logpart(d,'scout') or ''
    bl=re.search(r'^- Blocked[^:]*:\s*(.+)$',sc,re.M)
    if bl:
        for item in [x.strip().rstrip('.') for x in re.split(r';|\.\s+',bl.group(1)) if x.strip()]:
            m=re.match(r'((?:[A-Z][\w.]*|[a-z]+\.[a-z.]+)(?:\s+(?:[A-Z][\w.]*|www))*)\s*(.*)',item)
            if m and m.group(1): blocked.append({'source':m.group(1),'reason':m.group(2).strip() or 'blocked'})
            else:
                m=re.match(r'([^(]+?)\s*\((.+)\)$',item)
                blocked.append({'source':m.group(1),'reason':m.group(2)} if m else {'source':item,'reason':'see log.md'})
    niches=[n for n,_ in Counter(c['niche'] for c in cs).most_common()]
    scored=[p for p in pains if p.get('market')=='US' and str(p.get('analyst_run','')).startswith(d)]
    new=[i['painId'] for i in ideas if i['night']==d]
    br=next((b for b in BRIEFS if b['date']==d),None)
    win=br['winnerPainId'] if br else next((x['pain_id'] for x in pitched_json if x.get('date')==d and x.get('winner')),None)
    poc=f'poc/{d}.md' if os.path.exists(f'{R}/poc/{d}.md') else None
    surv=sum(1 for p in scored if by_id.get(p['id'],{}).get('verdict')=='winner')
    steps={'scout':'done' if sc else 'skipped','analyst':'done' if logpart(d,'analyst') else 'skipped',
           'builder':'done' if logpart(d,'builder') else 'skipped','brief':'done' if os.path.exists(f'{R}/briefs/{d}.md') else 'skipped'}
    note=None
    if br and br['winnerRole']=='fallback':
        w=by_id.get(win,{}); note=f"No idea cleared the bar; {w.get('name') or win} ({win}) was built as the Fallback (below bar) POC"
    NIGHTS.append({'date':d,'market':'US','niches':niches,'steps':steps,'times':NEW_TIMES,
        'scout':{'complaints':len(cs),'provenModels':pms_by.get(d,0),'bySource':by,'blocked':blocked},
        'analyst':{'newPainIds':new,'updatedPainIds':[p['id'] for p in scored if p['id'] not in new],'survivors':surv},
        'builder':{'winnerPainId':win,'poc':poc},'briefPath':f'briefs/{d}.md',**({'note':note} if note else {})})
    print(f"night {d}: {len(cs)} complaints, {pms_by.get(d,0)} proven models, new {new}, winner {win}, brief {'yes' if br else 'no'}, demo shots {len(br['demo']['shots']) if br and br['demo'] else 0}, validation {'proposal' if br and br['validation'] else 'none'}")

latest=max([IMPORT_FROM]+night_dates)
hdr=f'// Generated by scripts/gen-data.py from startup-research (pains.json, us/*.jsonl, briefs/*.md, poc/*.md, log.md), nights through {latest}.\n// Static data: the app never reads the pipeline at build or run time. Re-run scripts/import-night.sh instead of editing.\n'
PITCHED_NEW=[{'date':x['date'],'name':re.sub(r'\s*\(working name\)','',x['name']),'pain_id':x['pain_id'],'core_feature':x.get('core_feature',''),'user':x.get('user',''),
  'winner':bool(x.get('winner')),'poc':x.get('poc') or ''} for x in pitched_json if x.get('date','')>=IMPORT_FROM]
open(f'{REPO}/lib/mock/imported.ts','w').write(hdr+'import type { NightBrief, NightRun, Pitched } from "../types";\n\n/** Nights parsed from the pipeline (newest first). Older nights are hand-written in ./nights.ts. */\nexport const IMPORTED_NIGHTS: NightRun[] = '+json.dumps(NIGHTS,ensure_ascii=False,indent=1)+';\n\n/** pitched.json entries from the imported nights (newest last, as in the file). */\nexport const PITCHED_IMPORTED: Pitched[] = '+json.dumps(PITCHED_NEW,ensure_ascii=False,indent=1)+';\n\n/** Per-night brief: pitched ideas (top first), the winner, its private-POC demo shots and the validation page proposal. */\nexport const BRIEFS: NightBrief[] = '+json.dumps(BRIEFS,ensure_ascii=False,indent=1)+';\n')
open(f'{REPO}/lib/mock/ideas.ts','w').write(hdr+'import type { Idea } from "../types";\n\nexport const IDEAS: Idea[] = '+json.dumps(ideas,ensure_ascii=False,indent=1)+';\n')
open(f'{REPO}/lib/mock/legacy.ts','w').write(hdr+'import type { LegacyPain } from "../types";\n\n/** Old Germany-market pains p-001…p-071 (light rows, hidden behind a filter). */\nexport const LEGACY: LegacyPain[] = '+json.dumps(legacy,ensure_ascii=False,indent=1)+';\n')
for i in ideas: print(i['painId'],i['night'],i['verdict'],i['scores']['total'],len(i['quotes']),i['niche'],i['name'] or i['label'])
print(sum(1 for l in legacy if l['verdict']=='near-miss'))
