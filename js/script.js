window.addEventListener('DOMContentLoaded', () => {
	const tabsParent = document.querySelector('.tabheader__items'),
		tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		loader = document.querySelector('.loader');

	// Loader
	setTimeout(() => {
		loader.style.opacity = '0';
		setTimeout(() => {
			loader.style.display = 'none';
		}, 500);
	}, 2000);

	// Tabs
	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, idx) => {
				if (target == item) {
					hideTabContent();
					showTabContent(idx);
				}
			});
		}
	});

	// Timer

	const deadline = '2023-08-11';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const timer = Date.parse(endtime) - Date.parse(new Date());

		if (timer <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(timer / (1000 * 60 * 60 * 24));
			hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((timer / 1000 / 60) % 60);
			seconds = Math.floor((timer / 1000) % 60);
		}

		return { timer, days, hours, minutes, seconds };
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updatClock, 1000);

		updatClock();

		function updatClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.timer <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');
	//	modalCloseBtn = document.querySelector('[data-close]');

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
	});

	//modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', e => {
		if (e.target == modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// Class
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 110000;
			this.chageToUZS();
		}
		//conver dollar to sum
		chageToUZS() {
			this.price = this.price * this.transfer;
		}
		//add new  html file, div, class
		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(classname => element.classList.add(classname));
			}

			element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
        </div>
      `;

			this.parent.append(element);
		}
	}
	//data
	new MenuCard(
		'img/tabs/1.png',
		'usual',
		'Plan "Usual"',
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
		10,
		'.menu .container'
	).render();

	new MenuCard(
		'img/tabs/2.jpg',
		'plan',
		'Plan “Premium”',
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
		20,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/tabs/3.jpg',
		'vip',
		'Plan VIP',
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
		30,
		'.menu .container',
		'menu__item'
	).render();

	// server backend bilan ishlash ajax bilan ishlash formData lar bilan ishlash
	const forms = document.querySelectorAll('form');

	//pasdagi postData functionni forEach yordamida htmldagi ikala formga berib qoyamiz
	forms.forEach(form => {
		postData(form);
	});

	//toast- message to user
	const msg = {
		loading: 'loading...',
		success: 'thanks for submiting our form',
		failure: 'Something went wrong',
	};

	function postData(form) {
		form.addEventListener('submit', e => {
			e.preventDefault();

			// userga malumot yuborilganligini korsatish uchun:

			const statusMessage = document.createElement('div'); //htmlda div ochamiz
			statusMessage.textContent = msg.loading; //bu divni textiga loading messagni tenglaymiz
			form.append(statusMessage); // shu tenglikni form ichidagi htmlga dinmaic holda qohsamiz
			form.insertAdjacentElement('afterend', statusMessage);
			const request = new XMLHttpRequest();
			//	request.setRequestHeader('Content-Type', 'multipart/form-data'); //bizda xozir json file yoqligi uchun multipart/form-data shunaqa yozish kerak lekin bu xato biz qachon json bilan ishlasak shunda qoyish forData esa ozi bizga qoyib beradi
			request.open('POST', 'server.php'); //backend
			//
			request.setRequestHeader('Content-Type', 'aplication/json');
			const obj = {};

			const formData = new FormData(form); //bu form ni ichidagi input va boshqa taglarni hamma elelemntlarini constructorda(object holda olib beradi)
			formData.forEach((val, key) => {
				obj[key] = val;
			});
			const json = JSON.stringify(obj);

			request.send(json);

			//const formData = new FormData(form); //bu form ni ichidagi input va boshqa taglarni hamma elelemntlarini constructorda(object holda olib beradi)
			//request.send(formData); bu form data bilan ishlaganda kerak shunda yuqoridagi bazi kodlar kerak emas sammi.acdan korib tekshirib ol

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(msg.success);

					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					showThanksModal(msg.failure);
				}
			});
		});
	}

	//submit button bosilgandan keyin yangi modal ochib raxmat yuborish
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		<div data-close class="modal__close">&times;</div>
		<div class="modal__title">
${message}
		</div>

	</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
});
