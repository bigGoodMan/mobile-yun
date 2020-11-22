export function getCatSid() {
  return window.sessionStorage.getItem("catSid");
}
export function setCatSid(cSid) {
  window.sessionStorage.setItem("catSid", cSid);
}
