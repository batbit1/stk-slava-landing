/**
 * @param {string} id — без #
 */
export function scrollToSectionId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ block: 'start' })
}
