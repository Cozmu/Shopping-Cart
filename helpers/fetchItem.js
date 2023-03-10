const fetchItem = async (ItemID) => {
  try {
    const endPoint = `https://api.mercadolibre.com/items/${ItemID}`;
    const data = await fetch(endPoint);
    const result = await data.json();
    // console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};
fetchItem('MLB2713769552');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
