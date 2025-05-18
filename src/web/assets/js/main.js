/**
 * Render the named page fragment.
 * @param {string} name  the filename (without .html) under pages/
 */
async function renderPage(name) {
  // 1) Fetch and parse the HTML fragment
  const text = await fetch(`pages/${name}.html`).then(r => r.text());
  const tpl  = document.createElement('template');
  tpl.innerHTML = text.trim();

  // 2) For each top-level element in the fragment
  const roots = tpl.content.children;
  // Build a map: selector → [elements]
  const groups = {};
  Array.from(roots).forEach(el => {
    const sel = el.dataset.view;
    if (!sel) return;                // skip any without data-view
    (groups[sel] = groups[sel]||[]).push(el);
  });

  // 3) Apply each group
  Object.entries(groups).forEach(([sel, frags]) => {
    const $targets = $(sel);
    const tcount   = $targets.length;
    const fcount   = frags.length;

    // 1×1 → direct replace
    if (fcount===1 && tcount===1) {
      $targets.eq(0).html(frags[0].innerHTML);
    }
    // 1×many → warn, apply same content to all
    else if (fcount===1 && tcount>1) {
      console.warn(`1 fragment for "${sel}" but ${tcount} targets – applying to all.`);
      $targets.each((_,t) => $(t).html(frags[0].innerHTML));
    }
    // many×many, equal counts → one-to-one
    else if (fcount>1 && tcount>1 && fcount===tcount) {
      for (let i=0; i<fcount; i++) {
        $targets.eq(i).html(frags[i].innerHTML);
      }
    }
    // many×many, mismatched counts → try swapping parents
    else if (fcount>1 && tcount>1 && fcount!==tcount) {
      // check if all targets share the same parent
      const p0 = $targets.eq(0).parent()[0];
      const sameParent = $targets.toArray().every(t => t.parentNode===p0);
      if (sameParent) {
        // remove old targets, append new fragments
        $targets.remove();
        frags.forEach(frag => p0.appendChild(frag));
      } else {
        alert(`Mismatch for "${sel}": ${fcount} fragments vs ${tcount} targets with different parents. Skipping.`);
      }
    }
    // many×1 → abort with alert
    else if (fcount>1 && tcount===1) {
      alert(`Multiple fragments (${fcount}) for "${sel}" but only 1 target. Aborting that replacement.`);
    }
    // other cases (no targets or no fragments) → ignore
  });

  // 4) Load any <script> tags in the fragment
  tpl.content.querySelectorAll('script').forEach(old => {
    const s = document.createElement('script');
    if (old.src) {
      s.src   = old.src;
      s.type  = old.type   || 'module';
      s.defer = true;
    } else {
      s.textContent = old.textContent;
    }
    document.body.appendChild(s);
  });
}

// -------------------------------------------------
// Delegate all clicks on <a data-link="..."> anchors
// so page.js handles routing instead of a full reload.
// -------------------------------------------------
$(document).on('click', 'a[data-link]', function(e) {
  e.preventDefault();
  const href = $(this).attr('href');
  page(href);
});



/** Define routes */

// page('/', () => page.redirect('/main-menu'));
page('/', () => renderPage('main-menu'));

page('/main-menu', () => renderPage('main-menu'));
page('/marks', () => renderPage('marks'));
page('/marks-practise', () => renderPage('marks-practise'));

page();

$(() => {
  renderPage('main-menu');
});
