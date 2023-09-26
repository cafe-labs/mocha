export default function search(input, template) {
  try {
    return new URL(input).toString();
  } catch (err) {
  }

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
  }
  return template.replace("%s", encodeURIComponent(input));
}