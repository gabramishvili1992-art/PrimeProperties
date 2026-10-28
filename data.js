/* data.js: ობიექტების ჩატვირთვა ბაზიდან.
   თუ config.js ჯერ არ არის შევსებული, გამოიყენება listings.js-ის სანიმუშო სია. */
const DB_READY = typeof SUPABASE_URL === 'string' && SUPABASE_URL.indexOf('YOUR-PROJECT') === -1 &&
                 typeof SUPABASE_ANON_KEY === 'string' && SUPABASE_ANON_KEY.indexOf('YOUR-ANON') === -1;

/* ქირაობის თარიღები: booked = [{from:'YYYY-MM-DD', to:'YYYY-MM-DD'}], ორივე დღე ჩათვლით დაკავებულია */
function isoDay(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function addDays(iso, n) { const p = iso.split('-').map(Number); return isoDay(new Date(p[0], p[1] - 1, p[2] + n)); }
function fmtDay(iso, lang) { const p = iso.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString(lang === 'ka' ? 'ka-GE' : 'en-GB', { day: 'numeric', month: 'short' }); }
function validBooked(b) { return (Array.isArray(b) ? b : []).filter(r => r && r.from && r.to && r.to >= r.from); }
/* აბრუნებს null-ს, თუ მომავალი დაკავება არ არის მითითებული;
   {busy:true, freeFrom} - ახლა დაკავებულია; {busy:false, nextBusy} - ახლა თავისუფალია */
function bookingInfo(booked) {
  const today = isoDay(new Date());
  const rs = validBooked(booked).filter(r => r.to >= today).map(r => ({ from: r.from, to: r.to })).sort((a, b) => a.from < b.from ? -1 : 1);
  const m = [];
  rs.forEach(r => { const l = m[m.length - 1]; if (l && r.from <= addDays(l.to, 1)) { if (r.to > l.to) l.to = r.to; } else m.push(r); });
  if (!m.length) return null;
  const cur = m.find(r => r.from <= today && today <= r.to);
  return cur ? { busy: true, freeFrom: addDays(cur.to, 1) } : { busy: false, nextBusy: m[0].from };
}

function mapRow(r) {
  if (r.place_ka) PLACES_KA[r.place] = r.place_ka;
  const base = {
    id: r.id, place: r.place, beds: r.beds || 0, price: Number(r.price) || 0,
    name: { en: r.name_en || r.name_ka || '', ka: r.name_ka || r.name_en || '' },
    img: r.img || ''
  };
  if (r.kind === 'sale') {
    return Object.assign(base, { code: r.code || '', area: r.area || 0, land: r.land || '—', rooms: r.rooms || 0, baths: r.baths || 0, pool: !!r.pool, sold: !!r.sold });
  }
  return Object.assign(base, { price: Number(r.price_usd != null ? r.price_usd : r.price) || 0, area: r.area || 0, rooms: r.rooms || 0, floor: r.floor || '', phone: r.phone || '', amenities: r.amenities || [], booked: Array.isArray(r.booked) ? r.booked : [] });
}

async function loadListings(kind) {
  if (!DB_READY) return kind === 'sale' ? SALE : RENT;
  try {
    const url = SUPABASE_URL + '/rest/v1/listings?select=*&kind=eq.' + kind + '&published=eq.true&order=created_at.desc';
    // ძველი anon გასაღები (eyJ...) იგზავნება ორივე სათაურით; ახალი "publishable" გასაღები (sb_publishable_...) მხოლოდ apikey-ით
    const headers = { apikey: SUPABASE_ANON_KEY };
    if (SUPABASE_ANON_KEY.indexOf('eyJ') === 0) headers.Authorization = 'Bearer ' + SUPABASE_ANON_KEY;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return (await res.json()).map(mapRow);
  } catch (e) {
    console.error('ობიექტების ჩატვირთვა ვერ მოხერხდა:', e);
    return [];
  }
}
