const getSavedCartItems = () => {
  const x = localStorage.getItem('cartItems');
  return x;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
