const fetchProducts = async (QUERY) => {
  try {
    const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const data = await fetch(endPoint);
    const result = await data.json();
    return result;
  } catch (error) {
    return error; 
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
