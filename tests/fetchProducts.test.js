require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
it('Teste se fetchProducts é uma função', () => {
  expect(typeof fetchProducts).toBe('function');
});
it('Execute a função fetchProducts com o argumento `computador` e teste se fetch foi chamada', async () => {
  await fetchProducts('computador');
  expect(fetch).toBeCalled();
});
it('Teste se, ao chamar a função fetchProducts com o argumento `computador`, a função fetch utiliza o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador`', async () => {
  await fetchProducts('computador')
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
  expect(fetch).toBeCalledWith(url);
});
it('Teste se o retorno da função fetchProducts com o argumento `computador` é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
  expect(await fetchProducts('computador')).toEqual(computadorSearch);
});
it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: `You must provide an url`.', async () => {
  await fetchProducts();
  expect(fetch).toThrow();
});
});
