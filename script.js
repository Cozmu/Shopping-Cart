// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const createProductItemElement = ({ id, title, thumbnail, price }) => { // mostar na tela produtos
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__price', `R$${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const call = async () => { // mostar na tela produtos
  const carregando = document.querySelector('.loading');
  const items = document.querySelector('.items');
  const a = await fetchProducts('computador');
  const products = a.results;
  products.forEach((product) => {
    items.appendChild(createProductItemElement(product));
  });
  carregando.remove();
  items.style = "display: flex";
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.iten_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const getPrice = () => { // soma
  const itens = document.querySelectorAll('.cart__item');
  const totalPrice = document.querySelector('.total-price');
  let total = 0;
  itens.forEach((elements) => {
    const textoLI = elements.innerText.split('$');
    total += parseFloat(textoLI[1]);
  });
  const x = `Subtotal R$${total}`;
  totalPrice.innerHTML = x;
};

const father = document.querySelector('.cart__items'); // removedor

const cartItemClickListener = (event) => {
  event.target.parentNode.remove();
  saveCartItems(father.innerHTML);
  getPrice();
};

const buttonDelete = () => {
  const buttonD = document.querySelector('.empty-cart');
  buttonD.addEventListener('click', () => {
    father.innerHTML = '';
    getPrice();
    localStorage.clear();
  });
};

const createCartItemElement = ({ _id, title, price, thumbnail }) => { // carrinho
  const butao = document.createElement('button');
  butao.innerHTML = 'X';
  const li = document.createElement('li');
  li.className = 'cart__item';
  const imagem = document.createElement('img');
  imagem.className = 'cartimg';
  imagem.src = thumbnail;
  const titulo = document.createElement('p');
  const preco = document.createElement('p');
  preco.className = 'cartPrice';
  preco.innerHTML = `R$${+price}`;
  titulo.innerHTML = title;
  li.appendChild(imagem);
  li.appendChild(titulo);
  li.appendChild(preco);
  li.appendChild(butao);
  butao.addEventListener('click', cartItemClickListener);
  return li;
};

const captureButton = async () => { // carrinho 
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => {
    element.addEventListener('click', async (elemento) => {
      const idProdutoButton = elemento.target.parentNode.firstChild.innerText;
      const product = await fetchItem(idProdutoButton);
      father.appendChild(createCartItemElement(product));
      getPrice();
      saveCartItems(father.innerHTML);
    });
  });
};

window.onload = async () => {
  await call();
  captureButton();
  const saved = getSavedCartItems();
  father.innerHTML = saved;
  getPrice();
  buttonDelete();
  const liFilhos = document.querySelectorAll('.cart__item');
  liFilhos.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};
