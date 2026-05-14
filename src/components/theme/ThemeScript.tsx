/**
 * Runs before paint to apply saved theme and avoid light/dark flash.
 */
export function ThemeScript() {
  const code = `(function(){try{var k='cm-theme';var t=localStorage.getItem(k);if(t==='light')document.documentElement.setAttribute('data-theme','light');else document.documentElement.removeAttribute('data-theme');}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
