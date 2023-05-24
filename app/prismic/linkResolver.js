export default (doc) => {
  if (doc.type === 'page') {
      return `/${doc.uid}`
  }
}
