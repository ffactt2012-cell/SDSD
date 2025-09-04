
function md(str){
  if(!str) return '';
  let s=str;
  s=s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  s=s.replace(/^###\s+(.*)$/gm,'<h3>$1<\/h3>');
  s=s.replace(/^##\s+(.*)$/gm,'<h2>$1<\/h2>');
  s=s.replace(/^#\s+(.*)$/gm,'<h1>$1<\/h1>');
  s=s.replace(/\*\*(.*?)\*\*/g,'<strong>$1<\/strong>');
  s=s.replace(/\*(.*?)\*/g,'<em>$1<\/em>');
  s=s.replace(/!\[(.*?)\]\((.*?)\)/g,'<img alt="$1" src="$2" \/>');
  s=s.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1<\/a>');
  s=s.replace(/\n\n/g,'<\/p><p>');
  s='<p>'+s+'</p>';
  return s;
}
