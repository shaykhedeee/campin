export function safeReturnPath(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u001f]/.test(value)) return '/account';
  try {
    const url = new URL(value, 'https://campin.co.in');
    return url.origin === 'https://campin.co.in' ? url.pathname + url.search + url.hash : '/account';
  } catch { return '/account'; }
}
