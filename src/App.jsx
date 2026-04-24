import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, X, ChevronDown, ChevronUp, Sun, Moon,
  Check, Send, Download, RotateCcw, Search,
  AlertCircle, CheckCircle, PenLine
} from 'lucide-react';
import { GAS_URL, getPredicate, initialData } from './data.js';
import './App.css';

// ─── QUESTION CARD ─────────────────────────────────────────
function QuestionCard({ q, catId, subId, qNum, onAnswer, onNote }) {
  const [showNote, setShowNote] = useState(!!q.note);

  const isPos = (opt, opts) => opt === opts[0];
  const isMid = (opt, opts) => opts.length === 3 && opt === opts[1];

  const getBtnStyle = (opt) => {
    const base = { flex: 1, padding: '10px 8px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: '2px solid', cursor: 'pointer', transition: 'all .15s', minHeight: 44, fontFamily: 'inherit' };
    if (q.answer !== opt) return { ...base, borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text-2)' };
    if (isPos(opt, q.options)) return { ...base, background: 'var(--green)', borderColor: 'var(--green)', color: '#fff', boxShadow: '0 2px 8px rgba(22,163,74,.3)' };
    if (isMid(opt, q.options)) return { ...base, background: 'var(--orange)', borderColor: 'var(--orange)', color: '#fff', boxShadow: '0 2px 8px rgba(234,88,12,.3)' };
    return { ...base, background: 'var(--red)', borderColor: 'var(--red)', color: '#fff', boxShadow: '0 2px 8px rgba(220,38,38,.3)' };
  };

  const answered = q.answer !== null;
  const answerIsPos = answered && isPos(q.answer, q.options);
  const answerIsMid = answered && isMid(q.answer, q.options);

  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', minWidth: 28, paddingTop: 2 }}>{qNum}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text)', textWrap: 'pretty' }}>{q.text}</p>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Bobot: {Number(q.weight).toFixed(2)}</p>
        </div>
        {answered && (
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: answerIsPos ? 'var(--green)' : answerIsMid ? 'var(--orange)' : 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={11} color="#fff" strokeWidth={3} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, paddingLeft: 36 }}>
        {q.options.map(opt => (
          <button key={opt} style={getBtnStyle(opt)} onClick={() => onAnswer(catId, subId, q.id, opt)}>
            {opt}
          </button>
        ))}
      </div>
      <div style={{ paddingLeft: 36, marginTop: 8 }}>
        {!showNote && !q.note ? (
          <button onClick={() => setShowNote(true)}
            style={{ fontSize: 12, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0', fontFamily: 'inherit' }}>
            <PenLine size={12} /> Tambah catatan
          </button>
        ) : (
          <textarea
            placeholder="Catatan (opsional)..."
            value={q.note}
            onChange={e => onNote(catId, subId, q.id, e.target.value)}
            style={{ fontSize: 13, minHeight: 60, padding: '8px 10px', borderRadius: 8, width: '100%', border: '1.5px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}
          />
        )}
      </div>
    </div>
  );
}

// ─── ASPEK SECTION ──────────────────────────────────────────
function AspekSection({ cat, catProgress, catScore, expanded, onToggle, onAnswer, onNote }) {
  const stat = catProgress[cat.id];
  const pct = stat.total > 0 ? Math.round(stat.answered / stat.total * 100) : 0;
  const isDone = stat.answered === stat.total;
  let qCounter = 0;

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }} id={cat.id}>
      <button onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: isDone ? 'var(--green-light)' : 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
          {cat.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', lineHeight: 1.3 }}>{cat.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: isDone ? 'var(--green)' : 'var(--blue)', borderRadius: 99, transition: 'width .4s' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: isDone ? 'var(--green)' : 'var(--text-3)', whiteSpace: 'nowrap' }}>
              {stat.answered}/{stat.total}
            </span>
          </div>
        </div>
        <div style={{ color: 'var(--text-3)', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          <div style={{ padding: '8px 16px', background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
            <span style={{ color: 'var(--text-2)' }}>Skor Aspek ini</span>
            <span style={{ fontWeight: 700, color: 'var(--blue)', fontSize: 14 }}>{catScore.toFixed(2)}</span>
          </div>
          {cat.subCategories.map(sub => (
            <div key={sub.id}>
              {sub.questions.length > 1 && (
                <div style={{ padding: '10px 16px 6px', background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', fontStyle: 'italic' }}>{sub.title}</span>
                </div>
              )}
              {sub.questions.map(q => {
                qCounter++;
                return <QuestionCard key={q.id} q={q} catId={cat.id} subId={sub.id} qNum={qCounter} onAnswer={onAnswer} onNote={onNote} />;
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODAL ─────────────────────────────────────────────────
function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface)', width: '100%', maxWidth: 540, borderRadius: '20px 20px 0 0', padding: 20, maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────
function Sidebar({ open, onClose, data, catProgress, scores, satker, onNavigate }) {
  const pred = getPredicate(scores.total);
  return (
    <>
      {open && <div onClick={onClose} className="sidebar-overlay" />}
      <div className={`sidebar ${open ? 'open' : ''}`}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--blue)' }}>ZI WBK/WBBM 2026</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
              {satker.trim() ? satker.substring(0, 22) + (satker.length > 22 ? '…' : '') : 'Satker belum diisi'}
            </div>
          </div>
          <button onClick={onClose} className="md-hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--text-2)', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ margin: 12, padding: 14, borderRadius: 12, background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 11, opacity: .8, marginBottom: 4 }}>Total Skor</div>
          <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, color: '#fbbf24' }}>{scores.total.toFixed(2)}</div>
          <div style={{ fontSize: 11, opacity: .7, marginTop: 4 }}>{pred.label}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 6 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ fontSize: 14, opacity: s <= pred.stars ? 1 : .25 }}>★</span>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 10px', overflowY: 'auto', flex: 1, paddingBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, color: 'var(--text-3)', padding: '4px 4px 8px' }}>Aspek Penilaian</div>
          {data.map((cat, idx) => {
            const stat = catProgress[cat.id];
            const isDone = stat.answered === stat.total;
            const pct = stat.total > 0 ? Math.round(stat.answered / stat.total * 100) : 0;
            return (
              <div key={cat.id} onClick={() => { onNavigate(cat.id); onClose(); }}
                className={`sb-item ${isDone ? 'done' : stat.answered > 0 ? 'partial' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{idx+1}. {cat.title.replace(/^\d+\.\s*/, '')}</div>
                  {isDone
                    ? <Check size={14} color="var(--green)" />
                    : <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--gray-100)', color: 'var(--gray-500)', padding: '2px 8px', borderRadius: 99 }}>{stat.total - stat.answered} sisa</span>
                  }
                </div>
                <div style={{ height: 4, borderRadius: 99, background: 'var(--border)', marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: isDone ? 'var(--green)' : 'var(--blue)', borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4, textAlign: 'right' }}>{stat.answered}/{stat.total} soal</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── APP ────────────────────────────────────────────────────
export default function App() {
  const [satker, setSatker]     = useState('');
  const [tanggal, setTanggal]   = useState(new Date().toISOString().split('T')[0]);
  const [auditor, setAuditor]   = useState('');
  const [jabatan, setJabatan]   = useState('');
  const [data, setData]         = useState(() => JSON.parse(JSON.stringify(initialData)));
  const [expanded, setExpanded] = useState({ 'aspek-1': true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // FIX #7: Lazy init untuk hindari FOUC theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('wbk_theme') === 'dark';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPull, setShowPull]   = useState(false);
  const [pullKeyword, setPullKeyword] = useState('');
  const [isPulling, setIsPulling]    = useState(false);
  const [pullStatus, setPullStatus]  = useState({ type: '', message: '' });
  const [pullSessions, setPullSessions] = useState([]);

  useEffect(() => {
    document.title = 'Form Cek Fisik ZI WBK/WBBM 2026';
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('wbk_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const { scores, progress, catProgress } = useMemo(() => {
    let totalScore = 0, totalQ = 0, answeredQ = 0;
    const catScores = {}, catProg = {};
    data.forEach(cat => {
      let catScore = 0, cTotal = 0, cAnswered = 0;
      cat.subCategories.forEach(sub => sub.questions.forEach(q => {
        totalQ++; cTotal++;
        if (q.answer !== null) {
          answeredQ++; cAnswered++;
          if (q.answer === q.options[0]) {
            catScore += q.weight;
            totalScore += q.weight;
          }
          else if (q.options.length === 3 && q.answer === q.options[1]) {
            catScore += q.weight / 2;
            totalScore += q.weight / 2;
          }
        }
      }));
      catScores[cat.id] = catScore;
      catProg[cat.id] = { total: cTotal, answered: cAnswered };
    });

    totalScore = Math.min(100, Number(totalScore.toFixed(2)));

    const isComplete = totalQ === answeredQ && totalQ > 0 && satker.trim() !== '';
    return { scores: { total: totalScore, catScores }, progress: { total: totalQ, answered: answeredQ, isComplete }, catProgress: catProg };
  }, [data, satker]);

  const handleAnswer = (catId, subId, qId, val) =>
    setData(prev => prev.map(c => c.id !== catId ? c : { ...c,
      subCategories: c.subCategories.map(s => s.id !== subId ? s : { ...s,
        questions: s.questions.map(q => q.id !== qId ? q : { ...q, answer: q.answer === val ? null : val })
      })
    }));

  const handleNote = (catId, subId, qId, val) =>
    setData(prev => prev.map(c => c.id !== catId ? c : { ...c,
      subCategories: c.subCategories.map(s => s.id !== subId ? s : { ...s,
        questions: s.questions.map(q => q.id !== qId ? q : { ...q, note: val })
      })
    }));

  const navigate = (id) => {
    const el = document.getElementById(id);
    if (el) { const top = el.getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top, behavior: 'smooth' }); }
    setExpanded(p => ({ ...p, [id]: true }));
  };

  const handleReset = () => {
    setData(JSON.parse(JSON.stringify(initialData)));
    setSatker(''); setAuditor(''); setJabatan('');
    setTanggal(new Date().toISOString().split('T')[0]);
    setShowReset(false); setSubmitStatus({ type: '', message: '' });
  };

  // ═══════════════════════════════════════════════════════════
  // FIX #2: handleSubmit — error handling lebih ketat, tidak ada fallback ganda
  // ═══════════════════════════════════════════════════════════
  const handleSubmit = async () => {
    if (!satker.trim()) {
      setSubmitStatus({ type: 'error', message: 'Nama Satker wajib diisi!' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Warning jika belum lengkap (soft check, tetap dibolehkan)
    if (!progress.isComplete && progress.answered < progress.total) {
      const lanjut = window.confirm(
        `Pengisian belum lengkap (${progress.answered}/${progress.total}). ` +
        `Tetap kirim ke Sheets?`
      );
      if (!lanjut) return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const rows = [];
    data.forEach(cat => cat.subCategories.forEach(sub => sub.questions.forEach(q => {
      let skor = 0;
      if (q.answer === q.options[0]) skor = q.weight;
      else if (q.options.length === 3 && q.answer === q.options[1]) skor = q.weight / 2;

      rows.push({
        aspek: cat.title,
        subAspek: sub.title,
        pertanyaan: q.text,
        jawaban: q.answer || '',
        bobot: Number(q.weight.toFixed(2)),
        skor: Number(skor.toFixed(2)),
        catatan: q.note || ''
      });
    })));

    const payload = {
      identity: { satker: satker.trim(), tanggal, auditor: auditor.trim(), jabatan: jabatan.trim() },
      rows,
      totalScore: scores.total
    };

    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify(payload));

      const res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        redirect: 'follow'
      });

      // Cek HTTP status eksplisit
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      // Cek content-type sebelum parse JSON
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Respons bukan JSON. Server mengembalikan: ${text.substring(0, 100)}`);
      }

      const result = await res.json();

      if (result.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: `Berhasil! Sheet: "${result.sheetName}" | Skor: ${result.totalScore} | ${result.predikat}`
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'GAS error: ' + (result.message || 'Status tidak diketahui')
        });
      }
    } catch (err) {
      // Log detail untuk debugging
      console.error('[Submit Error]', err);
      setSubmitStatus({
        type: 'error',
        message: `Gagal mengirim: ${err.message || 'Cek koneksi & deployment GAS'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // FIX #3: handlePull — error detail + redirect follow
  // ═══════════════════════════════════════════════════════════
  const handlePull = async () => {
    if (!pullKeyword.trim()) {
      setPullStatus({ type: 'error', message: 'Masukkan nama satker.' });
      return;
    }
    setIsPulling(true);
    setPullStatus({ type: '', message: '' });
    setPullSessions([]);

    try {
      const url = `${GAS_URL}?action=pull&keyword=${encodeURIComponent(pullKeyword.trim())}`;
      const res = await fetch(url, { method: 'GET', redirect: 'follow' });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Respons GAS bukan JSON. Cek deployment.');
      }

      const json = await res.json();
      if (json.status === 'success' && json.sessions?.length > 0) {
        setPullSessions(json.sessions);
        setPullStatus({ type: 'success', message: `Ditemukan ${json.sessions.length} sesi untuk "${pullKeyword}".` });
      } else {
        setPullStatus({ type: 'error', message: `Tidak ada data untuk "${pullKeyword}".` });
      }
    } catch (err) {
      console.error('[Pull Error]', err);
      setPullStatus({ type: 'error', message: `Gagal: ${err.message}` });
    } finally {
      setIsPulling(false);
    }
  };

  // FIX #4: Reset state modal pull saat ditutup
  const handleClosePull = () => {
    setShowPull(false);
    setPullKeyword('');
    setPullSessions([]);
    setPullStatus({ type: '', message: '' });
  };

  const handleLoadSession = (session) => {
    const newData = JSON.parse(JSON.stringify(initialData));
    session.rows.forEach(row => {
      if (!row.jawaban || row.jawaban === '-') return;
      newData.forEach(cat => cat.subCategories.forEach(sub => sub.questions.forEach(q => {
        if (q.text === row.pertanyaan) { q.answer = row.jawaban; if (row.catatan && row.catatan !== '-') q.note = row.catatan; }
      })));
    });
    setData(newData);
    setSatker(session.satker || pullKeyword);
    handleClosePull();
    setSubmitStatus({ type: 'success', message: `Data "${session.satker}" berhasil dimuat! Skor sebelumnya: ${session.totalScore}` });
  };

  const formatDate = d => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-';

  const handlePDF = async () => {
    if (!progress.isComplete || isPrinting) return;
    setIsPrinting(true);
    const loadScript = src => new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) return res();
      const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
      const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth(), margin = 10;
      const stripEmoji = s => (s || '').replace(/⭐/g, '').trim();
      let y = 10;
      const img = new Image(); img.src = '/Header Itjen Kemendikdasmen.png';
      await new Promise(res => { img.onload = res; img.onerror = res; });
      if (img.width) { const iw = 150, ih = (img.height * iw) / img.width; pdf.addImage(img, 'PNG', (pageW - iw) / 2, y, iw, ih); y += ih + 8; }
      else { pdf.setFontSize(10); pdf.setFont('helvetica', 'bold'); pdf.text('KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH', pageW / 2, y + 4, { align: 'center' }); y += 10; }
      pdf.setFontSize(13); pdf.setFont('helvetica', 'bold'); pdf.text('FORM PENILAIAN CEK FISIK', pageW / 2, y, { align: 'center' });
      pdf.setFontSize(10); pdf.text('PEMBANGUNAN ZONA INTEGRITAS WBK/WBBM TAHUN 2026', pageW / 2, y + 6, { align: 'center' }); y += 10;
      pdf.setDrawColor(0); pdf.setLineWidth(.4); pdf.line(margin, y, pageW - margin, y); y += 3;
      const pred = getPredicate(scores.total);
      pdf.autoTable({
        startY: y, margin: { left: margin, right: margin },
        body: [
          ['Unit Kerja / Satker', satker || '-'], ['Tanggal Penilaian', formatDate(tanggal)],
          ['Auditor / Penilai', auditor || '-'], ['Jabatan / NIP', jabatan || '-'],
          ['Total Skor Akhir', `${scores.total.toFixed(2)} — ${stripEmoji(pred.label)}`],
        ],
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 52, fillColor: [248, 249, 250] } },
        styles: { fontSize: 8.5, cellPadding: 2 }, theme: 'grid',
      });
      const tableBody = [];
      data.forEach((cat, ci) => {
        tableBody.push([{ content: String(ci + 1), styles: { fontStyle: 'bold', fillColor: [219, 234, 254] } }, { content: `${cat.title}   |   Skor: ${(scores.catScores[cat.id] || 0).toFixed(2)}`, colSpan: 5, styles: { fontStyle: 'bold', fillColor: [219, 234, 254] } }]);
        cat.subCategories.forEach((sub, si) => {
          if (sub.questions.length > 1) tableBody.push(['', '', { content: sub.title, colSpan: 4, styles: { fontStyle: 'italic', fillColor: [240, 244, 255] } }]);
          sub.questions.forEach((q, qi) => {
            const isP = q.answer && q.answer === q.options[0];
            tableBody.push([`${ci + 1}.${String.fromCharCode(97 + si)}.${qi + 1}`, '', sub.questions.length === 1 ? sub.title : '', q.text,
              { content: q.answer || '-', styles: { textColor: q.answer ? (isP ? [21, 128, 61] : [220, 38, 38]) : [100, 100, 100], fontStyle: q.answer ? 'bold' : 'normal' } }, q.note || '']);
          });
        });
      });
      pdf.autoTable({
        startY: pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 4 : y + 30, margin: { left: margin, right: margin },
        head: [[{ content: 'No.', styles: { halign: 'center' } }, 'Aspek', 'Sub Aspek', 'Pertanyaan', { content: 'Jawaban', styles: { halign: 'center' } }, 'Catatan']],
        body: tableBody,
        headStyles: { fillColor: [30, 58, 110], textColor: 255, fontSize: 7.5, fontStyle: 'bold' },
        columnStyles: { 0: { cellWidth: 11, halign: 'center' }, 1: { cellWidth: 20 }, 2: { cellWidth: 25 }, 3: { cellWidth: 70 }, 4: { cellWidth: 18, halign: 'center' }, 5: { cellWidth: 46 } },
        styles: { fontSize: 7, cellPadding: 1.8, overflow: 'linebreak', valign: 'top' }, theme: 'grid',
      });
      pdf.save(`CekFisik_${satker.replace(/[^\w]/g, '_')}_${tanggal}.pdf`);
    } catch (err) { setSubmitStatus({ type: 'error', message: 'Gagal membuat PDF: ' + err.message }); }
    finally { setIsPrinting(false); }
  };

  const pct = progress.total > 0 ? Math.round(progress.answered / progress.total * 100) : 0;
  const pred = getPredicate(scores.total);

  return (
    <div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} data={data} catProgress={catProgress} scores={scores} satker={satker} onNavigate={navigate} />

      <div className="main">
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 8, padding: 8, color: 'var(--text-2)', display: 'flex', cursor: 'pointer' }}>
            <Menu size={22} />
          </button>
          <img src={isDark ? '/Header Itjen Kemendikdasmen Dark.png' : '/Header Itjen Kemendikdasmen.png'} alt="Header Itjen"
            style={{ height: 44, objectFit: 'contain', flex: 1, maxWidth: 320 }}
            onError={e => { e.target.style.display = 'none'; }} />
          <button onClick={() => setIsDark(d => !d)} style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 8, padding: 8, color: 'var(--text-2)', display: 'flex', cursor: 'pointer' }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="sticky-header">
          <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3, color: '#fff' }}>Form Cek Fisik Pembangunan ZI WBK/WBBM</div>
              <div style={{ fontSize: 11, opacity: .7, marginTop: 2, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                Tahun 2026
                <span style={{ background: progress.isComplete ? '#16a34a' : 'rgba(255,255,255,.15)', padding: '1px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>
                  {progress.answered}/{progress.total} Terjawab
                </span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.12)', borderRadius: 10, padding: '6px 12px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 10, opacity: .7, color: '#fff' }}>Skor</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>{scores.total.toFixed(2)}</div>
            </div>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,.15)' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #fbbf24, #4ade80)', transition: 'width .5s ease' }} />
          </div>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 16px 100px' }}>
          {submitStatus.message && (
            <div style={{ padding: '12px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, background: submitStatus.type === 'success' ? 'var(--green-light)' : 'var(--red-light)', color: submitStatus.type === 'success' ? '#14532d' : '#7f1d1d', border: `1px solid ${submitStatus.type === 'success' ? '#86efac' : '#fca5a5'}` }}>
              {submitStatus.type === 'success' ? <CheckCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />}
              <span>{submitStatus.message}</span>
              <button onClick={() => setSubmitStatus({ type: '', message: '' })} style={{ background: 'none', border: 'none', marginLeft: 'auto', opacity: .6, cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
            </div>
          )}

          <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Identitas Penilaian</div>
            <div className="identity-grid">
              <div style={{ gridColumn: '1/-1' }}>
                <label className="field-label">Unit Kerja / Satker *</label>
                <input value={satker} onChange={e => setSatker(e.target.value)} placeholder="Nama satuan kerja..." style={{ borderColor: !satker.trim() ? '#f87171' : '' }} />
              </div>
              <div>
                <label className="field-label">Tanggal Penilaian</label>
                <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} />
              </div>
              <div>
                <label className="field-label">Auditor / Penilai</label>
                <input value={auditor} onChange={e => setAuditor(e.target.value)} placeholder="Nama auditor..." />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="field-label">Jabatan / NIP</label>
                <input value={jabatan} onChange={e => setJabatan(e.target.value)} placeholder="Jabatan atau NIP..." />
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Progress Pengisian</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--blue)' }}>{pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? 'var(--green)' : 'linear-gradient(90deg,#3b82f6,#8b5cf6)', borderRadius: 99, transition: 'width .4s' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{progress.answered} dari {progress.total} pertanyaan terjawab</div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Predikat</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', marginTop: 2 }}>{pred.label}</div>
              <div style={{ fontSize: 14 }}>{[...Array(pred.stars)].map((_, i) => <span key={i}>★</span>)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.map(cat => (
              <AspekSection key={cat.id} cat={cat} catProgress={catProgress} catScore={scores.catScores[cat.id] || 0}
                expanded={!!expanded[cat.id]} onToggle={() => setExpanded(p => ({ ...p, [cat.id]: !p[cat.id] }))}
                onAnswer={handleAnswer} onNote={handleNote} />
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn btn-ghost" onClick={() => setShowPull(true)} title="Tarik Data" style={{ flex: '0 0 44px', padding: '10px 0' }}>
          <Search size={18} />
        </button>
        <button className="btn btn-ghost" onClick={() => setShowReset(true)} title="Reset" style={{ flex: '0 0 44px', padding: '10px 0', color: 'var(--red)' }}>
          <RotateCcw size={18} />
        </button>
        <button className={`btn ${progress.isComplete ? 'btn-success' : 'btn-primary'}`}
          onClick={handleSubmit} disabled={isSubmitting || !satker.trim()} style={{ flex: 2 }}>
          {isSubmitting ? 'Mengirim...' : <><Send size={15} /> Kirim ke Sheets</>}
        </button>
        <button className="btn btn-ghost" onClick={handlePDF}
          disabled={!progress.isComplete || isPrinting}
          title={!progress.isComplete ? 'Lengkapi semua pertanyaan dulu' : 'Download PDF'}
          style={{ flex: '0 0 44px', padding: '10px 0', opacity: !progress.isComplete ? .4 : 1 }}>
          {isPrinting ? '...' : <Download size={18} />}
        </button>
      </div>

      <Modal show={showReset} onClose={() => setShowReset(false)}>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Reset Semua Data?</div>
          <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 20 }}>Semua jawaban dan catatan akan dihapus. Tindakan ini tidak dapat dibatalkan.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowReset(false)}>Batal</button>
            <button className="btn" style={{ flex: 1, background: 'var(--red)', color: '#fff', border: 'none' }} onClick={handleReset}>Ya, Reset</button>
          </div>
        </div>
      </Modal>

      <Modal show={showPull} onClose={handleClosePull}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Tarik Data dari Sheets</div>
          <button onClick={handleClosePull} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', display: 'flex' }}><X size={20} /></button>
        </div>
        <label className="field-label">Nama Satker</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input value={pullKeyword} onChange={e => setPullKeyword(e.target.value)} placeholder="Ketik nama satker..." onKeyDown={e => e.key === 'Enter' && handlePull()} />
          <button className="btn btn-primary" onClick={handlePull} disabled={isPulling} style={{ flexShrink: 0, minWidth: 80 }}>
            {isPulling ? '...' : 'Cari'}
          </button>
        </div>
        {pullStatus.message && (
          <div style={{ padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12, background: pullStatus.type === 'success' ? 'var(--green-light)' : 'var(--red-light)', color: pullStatus.type === 'success' ? '#14532d' : '#7f1d1d', display: 'flex', gap: 8, alignItems: 'center' }}>
            {pullStatus.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />} {pullStatus.message}
          </div>
        )}
        {pullSessions.map((s, i) => (
          <div key={i} onClick={() => handleLoadSession(s)}
            style={{ padding: '12px 14px', borderRadius: 8, border: '1.5px solid var(--border)', marginBottom: 8, cursor: 'pointer', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = ''; }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{s.satker}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
              {s.tanggal} · Skor: <strong>{s.totalScore}</strong>{s.auditor && ` · ${s.auditor}`}
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
}
