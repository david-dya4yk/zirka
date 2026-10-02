function isGraph(
  data: Record<string, unknown> | readonly Record<string, unknown>[],
): data is readonly Record<string, unknown>[] {
  return Array.isArray(data);
}

/** schema.org JSON-LD; several nodes go into one @graph. */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}): React.JSX.Element {
  const json = isGraph(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data };
  return (
    <script
      type="application/ld+json"
      // Escape `<` so page copy can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, '\\u003c') }}
    />
  );
}
