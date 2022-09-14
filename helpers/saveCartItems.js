const saveCartItems = () => {
  const salvar = document.querySelector('.cart__items');
  localStorage.setItem('carrinho', salvar);
};
saveCartItems();
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
