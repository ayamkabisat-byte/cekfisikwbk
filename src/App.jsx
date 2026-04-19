      const sy = pdf.lastAutoTable.finalY + 12;
      pdf.setFontSize(8); pdf.setFont('helvetica','normal');
      pdf.text('......................., ...................... 2026', pw-rm-50, sy, { align:'center' });
      pdf.text('Tim Penilai / Auditor,', pw-rm-50, sy+5, { align:'center' });
      pdf.line(pw-rm-75, sy+20, pw-rm-15, sy+20);
      pdf.setFont('helvetica','bold');
      pdf.text(auditor||'___________________________', pw-rm-50, sy+24, { align:'center' });
      if (jabatan) { pdf.setFont('helvetica','normal'); pdf.text(jabatan, pw-rm-50, sy+28, { align:'center' }); }

      pdf.save(`CekFisik_${satker.replace(/[^\w]/g,'_')}_${tanggal}.pdf`);
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type:'error', message:'❌ Gagal membuat PDF. Pastikan koneksi internet aktif lalu coba lagi.' });
    } finally {
      setIsPrinting(false);
    }
  };

  const handlePullData = async () => {
    if (!pullQuery.trim() || isPulling) return;
    setIsPulling(true);
    setPullResult(null);
    try {
      const url = `${GAS_URL}?action=getReport&satker=${encodeURIComponent(pullQuery.trim())}`;
      const res = await fetch(url);
      const result = await res.json();
      setPullResult(result);
    } catch {
      setPullResult({ status:'error', message:'Gagal mengambil data. Periksa koneksi internet atau URL GAS.' });
    } finally {
      setIsPulling(false);
    }
  };

  const dk = isDark;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-';

  // ── Render ────────────────────────────────────────────────
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dk ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>

      <div className="print-only">
        <div className="print-header-wrap">
          <img src={isDark ? '/Header Itjen Kemendikdasmen Dark.png' : '/Header Itjen Kemendikdasmen.png'} alt="Header" className="print-header-img" onError={e => { e.target.style.display = 'none'; }} />
          <div style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: 2 }}>KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</div>
          <div style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>FORM PENILAIAN CEK FISIK</div>
          <div style={{ fontSize: '11pt', fontWeight: 'bold' }}>PEMBANGUNAN ZONA INTEGRITAS WBK/WBBM TAHUN 2026</div>
        </div>
        <table style={{ width: '100%', marginBottom: 10, fontSize: '9pt', color: 'black' }}>
          <tbody>
            {[['Unit Kerja / Satker', satker || '-'],['Tanggal Penilaian', formatDate(tanggal)],['Auditor / Penilai', auditor || '-'],['Jabatan / NIP', jabatan || '-'],['Total Skor Akhir', `${scores.total.toFixed(2)} — ${getPredicate(scores.total)}`]].map(([k, v]) => (
              <tr key={k}><td style={{ border: '1px solid black', padding: '3px 8px', fontWeight: 'bold', width: '30%', background: '#f8f9fa' }}>{k}</td><td style={{ border: '1px solid black', padding: '3px 8px' }}>{v}</td></tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr><th style={{ width: '6%' }}>No.</th><th style={{ width: '16%' }}>Aspek</th><th style={{ width: '17%' }}>Sub Aspek</th><th style={{ width: '33%' }}>Pertanyaan</th><th style={{ width: '10%' }}>Jawaban</th><th style={{ width: '11%' }}>Catatan</th><th style={{ width: '7%' }}>Bobot</th></tr>
          </thead>
          <tbody>
            {data.map((cat, ci) => (
              <React.Fragment key={cat.id}>
                <tr className="aspek-row"><td>{ci + 1}</td><td colSpan={6}><strong>{cat.title}</strong> &nbsp;|&nbsp; Skor: <strong>{(scores.categories[cat.id]?.current || 0).toFixed(3)}</strong></td></tr>
                {cat.subCategories.map((sub, si) => (
                  <React.Fragment key={sub.id}>
                    {sub.questions.length > 1 && (<tr className="sub-row"><td></td><td></td><td colSpan={5}><em>{sub.title}</em></td></tr>)}
                    {sub.questions.map((q, qi) => {
                      const pos = q.answer && POSITIVE_ANSWERS.includes(q.answer);
                      return (
                        <tr key={q.id}>
                          <td style={{ textAlign: 'center' }}>{ci + 1}.{String.fromCharCode(97 + si)}.{qi + 1}</td>
                          <td></td>
                          <td>{sub.questions.length === 1 ? sub.title : ''}</td>
                          <td>{q.text}</td>
                          <td className={q.answer ? (pos ? 'ans-pos' : 'ans-neg') : ''}>{q.answer || '-'}</td>
                          <td>{q.note || ''}</td>
                          <td style={{ textAlign: 'center' }}>{q.weight.toFixed(3)}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end', color: 'black' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '9pt', margin: 0, color: 'black' }}>......................., ...................... 2026</p>
            <p style={{ fontSize: '9pt', margin: '4px 0', color: 'black' }}>Tim Penilai / Auditor,</p>
            <div style={{ height: 55 }} />
            <p style={{ fontSize: '9pt', borderTop: '1px solid black', paddingTop: 3, minWidth: 180, margin: 0, color: 'black' }}>{auditor || '___________________________'}</p>
            {jabatan && <p style={{ fontSize: '8pt', margin: '2px 0 0', color: 'black' }}>{jabatan}</p>}
          </div>
        </div>
      </div>

      <div className="no-print flex flex-col md:flex-row min-h-screen">
        <div className={`fixed inset-y-0 left-0 z-40 w-64 shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${dk ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}>
          <div className={`p-4 flex justify-between items-center border-b ${dk ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`font-bold text-sm ${dk ? 'text-blue-400' : 'text-blue-600'}`}>Progress Isian</h2>
            <button className="md:hidden p-1 rounded" onClick={() => setIsSidebarOpen(false)}><X size={18} /></button>
          </div>
          <div className="p-3 overflow-y-auto h-full pb-28 space-y-3">
            <div className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium ${dk ? 'bg-gray-700' : 'bg-gray-50'}`}>
              {satker.trim() ? <CheckCircle size={15} className="text-green-500 shrink-0" /> : <AlertCircle size={15} className="text-orange-500 shrink-0" />}
              <span className={satker.trim() ? (dk ? 'text-green-400' : 'text-green-700') : 'text-orange-500'}>{satker.trim() ? `Satker: ${satker.substring(0, 20)}${satker.length > 20 ? '…' : ''}` : 'Nama Satker belum diisi'}</span>
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${dk ? 'text-gray-500' : 'text-gray-400'}`}>Aspek Penilaian</p>
            {data.map((cat, idx) => {
              const stat = categoryProgress[cat.id];
              const isDone = stat.answered === stat.total;
              const pct = stat.total > 0 ? Math.round(stat.answered / stat.total * 100) : 0;
              return (
                <div key={cat.id} onClick={() => scrollToCat(cat.id)} className={`cursor-pointer p-2.5 rounded-xl border transition-all ${isDone ? (dk ? 'bg-green-900/20 border-green-800/50' : 'bg-green-50 border-green-200') : stat.answered > 0 ? (dk ? 'bg-blue-900/20 border-blue-800/30 hover:bg-blue-900/30' : 'bg-blue-50/70 border-blue-100 hover:bg-blue-100') : (dk ? 'border-gray-700 hover:bg-gray-700/40' : 'border-gray-100 hover:bg-gray-50')}`}>
                  <div className="flex justify-between items-start gap-1 mb-1.5">
                    <span className={`text-xs font-semibold leading-tight line-clamp-2 ${isDone ? (dk ? 'text-green-400' : 'text-green-700') : (dk ? 'text-gray-200' : 'text-gray-700')}`}>{idx + 1}. {cat.title.replace(/^\d+\.\s*/, '')}</span>
                    {isDone ? <CheckCircle size={13} className="text-green-500 shrink-0 mt-0.5" /> : <span className={`text-[9px] shrink-0 px-1.5 py-0.5 rounded-full font-bold ${stat.answered > 0 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>{stat.total - stat.answered} sisa</span>}
                  </div>
                  <div className={`w-full h-1.5 rounded-full ${dk ? 'bg-gray-600' : 'bg-gray-200'}`}><div className={`h-full rounded-full transition-all duration-300 ${isDone ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} /></div>
                  <div className={`text-right text-[9px] mt-0.5 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{stat.answered}/{stat.total}</div>
                </div>
              );
            })}
            <div className={`p-3 rounded-xl text-center border ${dk ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
              <p className={`text-[10px] ${dk ? 'text-blue-300' : 'text-blue-600'}`}>Total Skor</p>
              <p className={`text-2xl font-extrabold leading-none ${dk ? 'text-yellow-400' : 'text-blue-800'}`}>{scores.total.toFixed(2)}</p>
              <p className={`text-[10px] mt-0.5 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{progress.answered}/{progress.total} terjawab</p>
            </div>
          </div>
        </div>
        {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setIsSidebarOpen(false)} />}

        <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
          <div className={`w-full border-b flex justify-center items-center py-4 relative ${dk ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <button className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700" onClick={() => setIsSidebarOpen(true)}><Menu size={22} /></button>
            <img src={isDark ? '/Header Itjen Kemendikdasmen Dark.png' : '/Header Itjen Kemendikdasmen.png'} alt="Header Itjen Kemendikdasmen" className="h-16 md:h-24 object-contain px-4 max-w-full" onError={e => { e.target.style.display = 'none'; }} />
          </div>

          <header className={`sticky top-0 z-20 shadow-md ${dk ? 'bg-blue-950 text-white' : 'bg-blue-700 text-white'}`}>
            <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-sm md:text-base font-bold leading-tight">Form Cek Fisik Pembangunan ZI WBK/WBBM</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-blue-200">Tahun 2026</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${progress.isComplete ? 'bg-green-500 text-white' : 'bg-blue-800 text-blue-200'}`}>{progress.answered}/{progress.total} Terjawab</span>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-xl text-right ${dk ? 'bg-blue-900' : 'bg-blue-800'}`}>
                <span className="text-[10px] block text-blue-300">Total Skor</span>
                <span className="text-xl font-extrabold text-yellow-300">{scores.total.toFixed(2)}</span>
              </div>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full flex-shrink-0 transition-colors ${dk ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-blue-600 text-yellow-200 hover:bg-blue-500'}`} title={isDark ? 'Mode Terang' : 'Mode Gelap'}>
                {dk ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="h-1 bg-blue-900/50"><div className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-500" style={{ width: `${progress.total > 0 ? Math.round(progress.answered / progress.total * 100) : 0}%` }} /></div>
          </header>

          <main className="max-w-4xl w-full mx-auto p-4 space-y-5 pb-28">
            {submitStatus.message && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm font-medium ${submitStatus.type === 'success' ? (dk ? 'bg-green-900/30 text-green-300 border-green-800' : 'bg-green-50 text-green-800 border-green-200') : (dk ? 'bg-red-900/30 text-red-300 border-red-800' : 'bg-red-50 text-red-800 border-red-200')}`}>
                {submitStatus.type === 'success' ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                <p>{submitStatus.message}</p>
              </div>
            )}

            <div className={`p-5 rounded-2xl border shadow-sm ${dk ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-sm font-bold mb-4 flex items-center gap-2 ${dk ? 'text-blue-400' : 'text-blue-600'}`}><FileSpreadsheet size={16} /> Identitas Penilaian</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Nama Satker / Unit Kerja <span className="text-red-500">*</span></label>
                  <input type="text" value={satker} onChange={e => setSatker(e.target.value)} placeholder="mis. BPMP Provinsi Jambi" className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Tanggal Penilaian</label>
                  <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Nama Auditor / Penilai</label>
                  <input type="text" value={auditor} onChange={e => setAuditor(e.target.value)} placeholder="Nama lengkap" className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Jabatan / NIP Penilai</label>
                  <input type="text" value={jabatan} onChange={e => setJabatan(e.target.value)} placeholder="Jabatan atau NIP" className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
              </div>
            </div>

            {data.map((cat, ci) => (
              <div key={cat.id} id={cat.id} className={`rounded-2xl border overflow-hidden shadow-sm ${dk ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <button onClick={() => setExpandedCats(p => ({ ...p, [cat.id]: !p[cat.id] }))} className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${dk ? 'bg-blue-900/60 hover:bg-blue-900/80' : 'bg-blue-700 hover:bg-blue-800'} text-white`}>
                  <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-extrabold flex-shrink-0">{ci + 1}</span>
                  <span className="flex-1 font-bold text-sm md:text-base leading-tight">{cat.title.replace(/^\d+\.\s*/, '')}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">{(scores.categories[cat.id]?.current || 0).toFixed(2)} pts</span>
                  {(() => { const s = categoryProgress[cat.id]; return s.answered === s.total ? <CheckCircle size={17} className="text-green-400 flex-shrink-0" /> : <span className="text-xs bg-orange-500/30 text-orange-200 px-2 py-0.5 rounded-full flex-shrink-0">{s.total - s.answered} sisa</span>; })()}
                  {expandedCats[cat.id] ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                </button>
                {expandedCats[cat.id] && cat.subCategories.map((sub, si) => (
                  <div key={sub.id} className={`border-b last:border-b-0 ${dk ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className={`flex items-start gap-3 px-5 py-2.5 ${dk ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{String.fromCharCode(97 + si)}</span>
                      <span className={`text-sm font-semibold flex-1 leading-snug ${dk ? 'text-gray-200' : 'text-gray-700'}`}>{sub.title.replace(/^[a-z]\.\s*/i, '')}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sub.questions.every(q => q.answer !== null) ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : `${dk ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}`}>{sub.questions.filter(q => q.answer !== null).length}/{sub.questions.length}</span>
                    </div>
                    {sub.questions.map(q => {
                      const answered = q.answer !== null;
                      return (
                        <div key={q.id} className={`px-5 py-3 border-b last:border-b-0 transition-colors ${answered ? (dk ? 'bg-green-900/10' : 'bg-green-50/50') : ''} ${dk ? 'border-gray-700/50' : 'border-gray-100'}`}>
                          <p className={`text-sm mb-2.5 leading-relaxed ${dk ? 'text-gray-300' : 'text-gray-700'}`}>{q.text}</p>
                          <div className="flex flex-wrap gap-2 mb-2.5">
                            {q.options.map(opt => {
                              const isSel = q.answer === opt;
                              const isPos = POSITIVE_ANSWERS.includes(opt);
                              const isPar = q.options.length === 3 && opt === q.options[1];
                              let cls = 'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ';
                              if (isSel) cls += isPos ? 'bg-green-500 border-green-500 text-white' : isPar ? 'bg-amber-500 border-amber-500 text-white' : 'bg-red-500 border-red-500 text-white';
                              else cls += dk ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-300' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600';
                              return (<button key={opt} onClick={() => handleAnswer(cat.id, sub.id, q.id, opt)} className={cls}>{isSel && (isPos ? <CheckCircle size={12} /> : isPar ? <AlertCircle size={12} /> : <XCircle size={12} />)}{opt}</button>);
                            })}
                          </div>
                          <div className="relative">
                            <MessageSquareText size={14} className={`absolute top-3 left-3 ${dk ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input type="text" placeholder="Tambahkan catatan/temuan fisik..." value={q.note} onChange={e => handleNote(cat.id, sub.id, q.id, e.target.value)} className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border outline-none transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-400 placeholder-gray-400'}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}

            {!progress.isComplete && progress.answered > 0 && (
              <div className={`p-4 rounded-xl text-center text-sm font-medium border ${dk ? 'bg-orange-900/20 border-orange-800 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-700'}`}>
                Masih ada <strong>{progress.total - progress.answered} pertanyaan</strong> belum dijawab.{!satker.trim() && ' Nama Satker juga belum diisi.'}{' '}Lengkapi untuk mengaktifkan tombol Download PDF.
              </div>
            )}
          </main>

          <div className={`fixed bottom-0 left-0 right-0 md:left-64 z-30 border-t px-4 py-3 flex flex-wrap gap-2 shadow-2xl ${dk ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <button onClick={() => setShowResetModal(true)} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${dk ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><RotateCcw size={14} /> Reset</button>
            <button onClick={handleSubmit} disabled={isSubmitting || !satker.trim()} className="flex items-center gap-1.5 flex-1 md:flex-none justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all">
              {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={14} />}
              {isSubmitting ? 'Mengirim...' : 'Kirim ke Sheets'}
            </button>
            <button onClick={() => setShowPullModal(true)} className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${dk ? 'border-blue-700 text-blue-400 hover:bg-blue-900/30' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}><Database size={14} /> <span className="hidden sm:inline">Tarik Data</span></button>
            {progress.isComplete ? (
              <button onClick={handleDownloadPDF} disabled={isPrinting} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-sm font-bold shadow-md transition-all disabled:opacity-60">
                {isPrinting ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={14} />}
                {isPrinting ? 'Membuat...' : 'Download PDF'}
              </button>
            ) : (
              <div className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs cursor-default ${dk ? 'border-gray-700 text-gray-600' : 'border-gray-100 text-gray-300 bg-gray-50'}`} title="Selesaikan semua pertanyaan dan isi nama satker untuk download PDF">
                <Download size={14} /><span className="hidden sm:inline">PDF ({progress.answered}/{progress.total})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPullModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full shadow-2xl ${dk ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-bold text-base flex items-center gap-2 ${dk ? 'text-blue-400' : 'text-blue-600'}`}><Database size={18} /> Tarik Data dari Google Sheets</h3>
              <button onClick={() => { setShowPullModal(false); setPullResult(null); setPullQuery(''); }} className={`p-1.5 rounded-lg ${dk ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><X size={16} /></button>
            </div>
            <p className={`text-xs mb-3 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Masukkan nama satker (atau sebagian nama) untuk melihat skor gabungan dari seluruh anggota tim.</p>
            <div className="flex gap-2 mb-4">
              <input type="text" value={pullQuery} onChange={e => setPullQuery(e.target.value)} onKeyDown={e => e.key==='Enter' && handlePullData()} placeholder="mis. BPMP Provinsi Jambi" className={`flex-1 p-2.5 border rounded-xl outline-none text-sm ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
              <button onClick={handlePullData} disabled={isPulling || !pullQuery.trim()} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold disabled:opacity-50">
                {isPulling ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={14} />}
                {isPulling ? '' : 'Cari'}
              </button>
            </div>
            {pullResult && (
              <div className={`rounded-xl p-4 border text-sm ${pullResult.status==='success' ? (dk ? 'bg-green-900/20 border-green-800 text-green-300' : 'bg-green-50 border-green-200 text-green-800') : (dk ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700')}`}>
                {pullResult.status==='success' ? (
                  <div className="space-y-1.5">
                    <p className="font-bold">{pullResult.satker || pullQuery}</p>
                    {pullResult.totalScore !== undefined && <p>Skor Gabungan: <strong className="text-lg">{Number(pullResult.totalScore).toFixed(2)}</strong></p>}
                    {pullResult.predikat && <p>Predikat: <strong>{pullResult.predikat}</strong></p>}
                    {pullResult.submissionCount && <p className={`text-xs ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{pullResult.submissionCount} anggota tim telah mengisi</p>}
                    {pullResult.lastUpdated && <p className={`text-xs ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Terakhir diperbarui: {pullResult.lastUpdated}</p>}
                  </div>
                ) : <p>{pullResult.message || 'Data tidak ditemukan untuk satker tersebut.'}</p>}
              </div>
            )}
            <p className={`text-[10px] mt-3 ${dk ? 'text-gray-600' : 'text-gray-400'}`}>Fitur ini membutuhkan handler GET di Google Apps Script Anda (<code>doGet</code>).</p>
          </div>
        </div>
      )}

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`rounded-2xl p-6 max-w-sm w-full shadow-2xl ${dk ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold text-lg mb-2">⚠️ Reset Form?</h3>
            <p className={`text-sm mb-5 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Semua jawaban dan catatan akan dihapus. Tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetModal(false)} className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold ${dk ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'}`}>Batal</button>
              <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold">Ya, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
