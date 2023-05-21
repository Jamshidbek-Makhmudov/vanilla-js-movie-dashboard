//json
//malumotlarni saqlash va tashish uchun ishlatilinadi. serverga objectlar faqat json korinishida yuborilishi kereak
//server oddiy object farmatni qabul qilmayi yani oqimaydi. json chiqishidan oldin xml ishlatilgan uni hajmi jsondan
//biroz kattaroq sababi uni ichida ozini har xil taglari bor
//json javascript object notatio deyiladi.
const obj = {
	name: 'jamshid',
	age: '30',
	work: {
		position: 'developer',
		company: 'lowell pef',
	},
};
const objJson = JSON.stringify(obj); //obj ni json farmatga ogiradi;
const newObj = JSON.parse(objJson); //json ni oddiy object farmatga ogiradi;
//deeep cloning objects
const clone = JSON.parse(JSON.stringify(obj)); //obj ni deep(ichida nested objectlariga qoshib, toliq clone qiladi)
//
//ajax- asynxron javascript and xml;
//html malumotlarni korsatish uchun kerak bolsa, xml malumotlarni saqlash va tashish uchun kerak;
//ajax ni 2ta vazifasi bor:
//1. sahifani yangilamsdan turib serverga ma'lumotlar bilan birga dinamik sorovlar yuborish va
//yangilanmagan sahifada serverlardan qaytgan javobni tahlil qilish;
//2.DHTML-dinamic tarizda sahifada o'zgarishlar qilish va yangi ma'lumotlarni chop etish

//querySelectorAll - array qaytaradi

//API- aplication programing inerface

//javascript array methods: forEach yangi array qaytarmaydi;
//map,filter yangi array qaytaradi

//practice- change the currency:
const uzs = document.querySelector('#uzs');
usd = document.querySelector('#usd');
uzs.addEventListener('input', e => {
	const request = new XMLHttpRequest();
	request.open('GET', './test.json');
	request.setRequestHeader('Content-Type', 'aplication/json', 'chartset=utf-8');
	request.send();
	// readystatechange ni orniha "load" yozsak if() ni ichida  request.readyState === 4  shu kodni yozmasdan shiqasak boladi bu osonroq va tezroq
	request.addEventListener('readystatechange', () => {
		if (request.readyState === 4 && request.status === 200) {
			console.log(request.response);
			const data = JSON.parse(request.response);
			usd.value = (+uzs.value / data.current.usd).toFixed(2);
		} else {
			usd.value = 'something went wrong';
		}
	});

	//status 200-ok 404-not found 500-server error 400-client error
	//statusText
	//response
	//readyState-value 0=> UNSENT=>client has been created. open() not called yet;
	//.      1=> OPENED=> open() has been called
	//.      1=> HEADERS_RECEIVED=> send() has been called, and headers and status are availabe
	//.      1=> LOADIN=> send() downloading responseText holds partial data
	//.      1=> DONE=> send() the operation is complete

	//yuqoridagilar  xml request yuborish edi
	//fetch apoi bn ishlash//
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'aplication/json',
		},
		body: JSON.stringify({ name: 'jamshid' }),
	})
		.then(response => response.json())
		.then(json => console.log(json));
});
