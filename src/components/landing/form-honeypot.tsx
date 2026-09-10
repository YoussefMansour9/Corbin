/**
 * Bait field. Hidden from people by position and aria-hidden, but present in
 * the DOM, so form-filling bots populate it. The API route discards any
 * submission where it has a value.
 *
 * Deliberately not display:none, which some bots skip, and named to look like
 * a field worth filling.
 */
export function FormHoneypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
    >
      <label htmlFor="company-website-hp">Company website</label>
      <input
        id="company-website-hp"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
