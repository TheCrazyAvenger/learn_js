const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');
const ad = document.querySelector('.adv');

books.insertBefore(book[1], book[0]);
books.insertBefore(book[2], book[6]);
books.insertBefore(book[3], book[5]);

document.body.setAttribute('style', 'background-image: url("image/you-dont-know-js.jpg")');

book[4].firstElementChild.textContent = "Книга 3. this и Прототипы Объектов";
book[4].firstElementChild.setAttribute('style', 'color: darkkhaki');

ad.remove();

const fiveBookUl = book[5].children[1];
const fiveBookChild = fiveBookUl.children;

fiveBookUl.insertBefore(fiveBookChild[9], fiveBookChild[2]);
fiveBookUl.insertBefore(fiveBookChild[3], fiveBookChild[6]);
fiveBookUl.insertBefore(fiveBookChild[6], fiveBookChild[9]);

const secBookUl = book[0].children[1];
const secBookChild = secBookUl.children;

secBookUl.insertBefore(secBookChild[6], secBookChild[4]);
secBookUl.insertBefore(secBookChild[8], secBookChild[5]);
secBookUl.insertBefore(secBookChild[2], secBookChild[10]);

const sixBookUl = book[2].children[1];
const sixBookChild = sixBookUl.children;

const createLi = document.createElement('li');
createLi.textContent = 'Глава 8: За пределами ES6';
sixBookUl.appendChild(createLi);
sixBookUl.insertBefore(sixBookChild[10], sixBookChild[9]);