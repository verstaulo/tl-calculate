export default function storeKeyToTitle(key) {
  const result = key.split("_").join(" ");
  const firstChar = result.charAt(0).toUpperCase();
  return firstChar + result.slice(1);
}
