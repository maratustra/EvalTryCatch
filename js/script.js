// 22. функция получет в кач-ве параметов введенные пользователем значения полей Тип данных и Данные. Параметр ...values принимает все значения поля Данные и превращает их в массив. С помощью метода filter мы перебираем массив с данными values и находим все данные, которые соответствуют указанному типу type и возвращаем их  
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {
		// 11. объявлена переменная, в которой хранится массив блоков с классом .dialog__response-block, в которых содержатся все возможные ответы пользователю
		// 20f. то же, что в 11 шаге
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// 12. перебираем массив блоков методом forEach и для каждого полученного блока применяем стиль display: none, в результате которого все блоки становятся скрытыми
		// 20g. то же, что в 12 шаге
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// 9. функция может принять на вход три аргумента, у нас только один
	// 20d. функция принимат все три аругмента
	// 27. функция принимат все три аругмента
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// 10. сначала вызываем функцию, чтобы скрыть все блоки с ответами пользователю
		// 20e. вызываем функцию, чтобы скрыть все блоки с ответами пользователю
		// 28. вызываем функцию, чтобы скрыть все блоки с ответами пользователю
		hideAllResponseBlocks();
		// 13. в результате вызова функции hideAllResponseBlocks все блоки с ответами скрыты, но блок с переданным селектором .dialog__response-block_no-results ("Пока что нечего показать") делаем видимым 
		// 20h. то же, что в 13 шаге
		// 29. то же, что в 13 и 20h шаге
		document.querySelector(blockSelector).style.display = 'block';
		// 20i. у нас есть принятный параметр spanSelector, для нас будет верным условие if
		// 30. то же, что в 20i шаге
		if (spanSelector) {
			// 20j. получаем селектор с идентификатором error и присваиваем ему текст с описанием ошибки и выводим на экран
			// 31. получаем селектор с идентификатором ok и присваиваем ему текст с результатом и выводим на экран
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// 20с. функция принимает параметр и передает его в качестве аргумента в функцию showResponseBlock, куда также передает класс блока с текстом об ошибке (Что-то пошло нетак) и селектор ошибки
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// 26. функция принимает параметр и передает его в качестве аргумента в функцию showResponseBlock, куда также передает класс блока с текстом об успехе (Вот что получилось) и селектор ok  
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// 8. результатом выполнения функции showNoResults будет вызов функции showResponseBlock с переданным аргументом (блоком с надписью "Пока что нечего показать")
	// 14. функции showNoResults присваивается следующий результат: на экран выведена надпись "Пока что нечего показать", все остальные варианты ответа пользователю скрыты
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// 19. функция принимает на вход два аргумента
	tryFilterByType = (type, values) => {
		// 20. внутри функции конструкция try/catch для своевременного отлавливания ошибок. Сначала выполняется блок try, если в нем нет ошибок, то блок catch игнорируеся
		try {
			// 21. объявляем переменную, в которой хранится встроенная функция eval, которая выполняет код внутри скобок и возвращает результат последней инструкции. 
			// 23. Результатом вызова функции filterByType будет массив значений, который мы превращаем в строку со значениями через запятую с помощью метода join. Результат присваивается переменной valuesArray
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// 24. если длина строки valuesArray > 0, т.е. есть совпадения по типам, то генерируем сообщение с указанием типа и количества наденных совпадений. Если совпадений не найдено, то генерируем сообщение об отсутствии совпадений. Результат присваивается переменной
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// 25. вызываем функцию и передаем туда переменную
			showResults(alertMsg);
			// 20а. eсли в блоке try возникла ошибка, то выполнение try прерывается, и управление переходит в блок catch
		} catch (e) {
			//  20b. блок принимает ошибку, вызывает функцию showError и передает в кач-е аргумента инфомацию о ней
			showError(`Ошибка: ${e}`);
		}
	};

// 1. объявляем переменную, в которой будет храниться кнопка Фильтровать
const filterButton = document.querySelector('#filter-btn');

// 2. вешаем на кнопку Фильтровать обработчик событий, который будет отлеживать клик по кнопке и принимать на вход событие
filterButton.addEventListener('click', e => {
	// 3. объявляем переменную для селектора с типами данных (Тип данных)
	const typeInput = document.querySelector('#type');
	// 4. объявляем переменную для поля Данные (поле ввода данных от пользователя)
	const dataInput = document.querySelector('#data');

	// 5. прописываем условие если пользователь оставит поле Данные пустым
	if (dataInput.value === '') {
		// 6. то происходит ошибка валидации, т.к. поле обязательное, и поле должно показать сообщение 'Поле не должно быть пустым!'
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// 7. вызываем функцию showNoResults
		showNoResults();
		// 15. во всех иных случаях, т.е. когда пользователь вводит значение в поле и не оставляет его пустым
	} else {
		// 16. ошибки валидации не произошло, поэтому устанавливается значение пустая строка
		dataInput.setCustomValidity('');
		// 17. устанавливаем метод, предотвращающий стандартное поведение кнопки Фильтровать, которое автоматически перезагрузит страницу после нажатия
		e.preventDefault();
		// 18. вызываем функцию tryFilterByType и передаем два аргумента: 1. введеное значение поля Тип данных, к котором применен метод trim, убирающий лишние пробелы с начала и конца строки и 2. введеное значение поля Данные, к которому применени метод trim
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

