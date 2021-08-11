// Работа слайдера
// =========================================================
let swiper = new Swiper('.mySwiper', {
	loop: false,
	spaceBetween: 10,
	slidesPerView: 5,
	freeMode: true,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
});
let swiper2 = new Swiper('.mySwiper2', {
	loop: true,
	spaceBetween: 10,
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },
	thumbs: {
		swiper: swiper,
	},
});
// =========================================================
// Открытие / закрытие модального окна бургер-меню
const menuBtn = document.querySelector('.menu-button');
const navbarPanel = document.querySelector('.navbar-panel');
const menuCloseBtn = document.querySelector('.close-menu');
menuBtn.addEventListener('click', () => {
	navbarPanel.classList.add('is-open');
});
menuCloseBtn.addEventListener('click', () => {
	navbarPanel.classList.remove('is-open');
});
// =========================================================

// РАБОТА С ХЭШЕМ
let hash = location.hash.substring(1);

// =========================================================

// ЗАПОЛНЕНИЕ КАРТОЧЕК

// Идентифицируем карточку, на которую проведен клик мышью
const cardImage = document.querySelectorAll('.card-image');

window.addEventListener('click', (event) => {
	// event.preventDefault();
	switch (event.target.id) {
		case 'card-01':
			console.log('Первая карта');
			break;
		case 'card-02':
			console.log('Вторая карта');
			break;
		case 'card-03':
			console.log('Третья карта');
			break;
		case 'card-04':
			console.log('Четвертая карта');
			break;
		case 'card-05':
			console.log('Пятая карта');
			break;
		case 'card-06':
			console.log('Шестая карта');
			break;
		case 'card-07':
			console.log('Седьмая карта');
			break;
		case 'card-08':
			console.log('Восьмая карта');
			break;
	}
});
// =========================================================

// Получаем данные из базы

const getData = async () => {
	const data = await fetch('./db.json');
	if (data.ok) {
		return data.json();
	} else {
		throw new Error(
			`Данные не были получены. Ошибка ${data.status} ${data.statusText}`
		);
	}
};

const getGoods = (callback, value) => {
	getData()
		.then((data) => {
			if (value) {
				callback(data.filter((item) => item.category === value));
			} else {
				callback(data);
			}
		})
		.catch((err) => {
			console.error(err);
		});
};

try {
	// console.log(hash);
	const cards = document.querySelector('.cards');

	if (!cards) {
		throw 'This is not a cards page';
	}

	// Создание карточки. Данные из объекта data
	// сразу заносятся в перечень переменных при вызове callback функции (Третий вариант)
	const createCard = ({ adress, category, daytime, image, name, price }) => {
		// console.log(data);

		// Второй вариант получения переменных из объекта data
		// const { adress, category, daytime, image, name, price } = data;

		// Первый вариант получения переменных из объекта data
		// const adress = data.adress;
		// const category = data.category;
		// const daytime = data.daytime;
		// const image = data.image;
		// const name = data.name;
		// const price = data.price;

		const cardTemplate = document.createElement('div');
		cardTemplate.classList.add('card');

		// Шаблон карты с проверкой наличия элементов данных
		cardTemplate.innerHTML = `
			<a href="single-01.html" class="card-link">
			${
				image
					? `<img src='${image}' alt='Photo' class='card-image' id='card-01' />`
					: 'No image'
			}
			</a>
			<div class="card-header">
				<a href="single-01.html" class="card-link">
				${name ? `<h3 class='card-title'>${name}</h3>` : 'No name'}
				</a>
				<button class="like">
					<img src="img/like.svg" alt="Like" />
				</button>
			</div>
			<!-- /.card-header -->
			${price ? `<strong class="price">${price} ₽</strong>` : 'No price'}
			${
				adress
					? `<p class="card-text card-adress">
				${adress}
			</p>`
					: 'No adress'
			}
			${daytime ? `<p class="card-text card-time">${daytime}</p>` : 'No date'}
		`;
		// ======================================================================
		return cardTemplate;
	};

	const renderCards = (data) => {
		cards.textContent = '';
		data.forEach((item) => {
			const card = createCard(item);
			cards.append(card);
		});
	};

	// Перезагрузка карточек при смене хэша (выборе в меню Авто, Недвижимость, Работа или Услуги)
	window.addEventListener('hashchange', () => {
		hash = location.hash.substring(1);
		getGoods(renderCards, hash);
	});

	getGoods(renderCards, hash);
} catch (error) {
	console.warn(error);
}

// =========================================================
