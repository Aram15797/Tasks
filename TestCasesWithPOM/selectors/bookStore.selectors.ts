export const bookStoreSelectors = {
  loginButton: "#login",
  usernameInput: "#userName",
  passwordInput: "#password",
  loginSubmit: "#login",
  searchInput: "#searchBox",
  addToCollectionButton: "text=Add To Your Collection",
  profileMenu: "text=Profile",
  bookRows: ".rt-tbody .rt-tr-group",
  bookLink: (title: string) => `a:has-text("${title}")`,
  bookRow: (title: string) => `.rt-tbody .rt-tr-group:has-text("${title}")`,
  deleteBookButton: 'span[title="Delete"]',
  confirmDeleteButton: "#closeSmallModal-ok",
};
