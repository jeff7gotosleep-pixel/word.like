function exec(command, value = null) {
  document.execCommand(command, false, value);
}

function insertTable(rows = 2, cols = 2) {
  let html = '<table style="border-collapse: collapse; width: 100%;">';
  for (let r = 0; r < rows; r++) {
    html += '<tr>';
    for (let c = 0; c < cols; c++) {
      html += '<td contenteditable="true" style="border:1px solid #999; padding:6px;">&nbsp;</td>';
    }
    html += '</tr>';
  }
  html += '</table>';
  exec('insertHTML', html);
}

function clearFormatting() {
  exec('removeFormat');
}

function downloadHTML() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('editor').innerHTML;
  const full = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${content}</body></html>`;
  const blob = new Blob([full], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportSelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return alert('Selecciona algo primero');
  const div = document.createElement('div');
  for (let i = 0; i < sel.rangeCount; i++) div.appendChild(sel.getRangeAt(i).cloneContents());
  const blob = new Blob([div.innerHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'selection.html';
  a.click();
  URL.revokeObjectURL(url);
}

function openHTMLFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const text = ev.target.result;
    const bodyMatch = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    document.getElementById('editor').innerHTML = bodyMatch ? bodyMatch[1] : text;
  };
  reader.readAsText(file);
}

function onImageInput(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    exec('insertImage', ev.target.result);
  };
  reader.readAsDataURL(file);
}
