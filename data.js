/* data.js: ობიექტების ჩატვირთვა ბაზიდან.
   თუ config.js ჯერ არ არის შევსებული, გამოიყენება listings.js-ის სანიმუშო სია. */
const DB_READY = typeof SUPABASE_URL === 'string' && SUPABASE_URL.indexOf('YOUR-PROJECT') === -1 &&
                 typeof SUPABASE_ANON_KEY === 'string' && SUPABASE_ANON_KEY.indexOf('YOUR-ANON') === -1;

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
  return Object.assign(base, { price: Number(r.price_usd != null ? r.price_usd : r.price) || 0, area: r.area || 0, rooms: r.rooms || 0, floor: r.floor || '', phone: r.phone || '', amenities: r.amenities || [] });
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
