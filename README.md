# frontend-homework, вариант №8
> Introductory homework for the course "Frontend-development"

## Привет!

В этом репозитории содержится условие варианта №8. Чтобы начать с ним работать, тебе необходимо склонировать репозиторий к себе на компьютер и перейти в ветку твоего варианта.

### Условие
Мы написали юнит-тесты на некоторую функцию, но саму функцию не реализовали. Тебе необходимо её реализовать, а так же написать на неё парочку дополнительных тестов. Готовое решение необходимо закоммитить, запушить и отправить нам в пулл-реквесте. Не забудь представиться (Номера группы, фамилии и имени будет достаточно)!

Все функции должны быть документированы с помощью [JSDOC](https://jsdoc.app/).

За это ДЗ можно получить до 5 баллов. Оцениваться будет качество и оптимальность кода. Чтобы получить максимальный балл, необходимо выполнить его вовремя, при этом все тесты должны проходить. Код тестов поможет тебе лучше понять условие.

Обрати внимание, что некоторые проверки автоматизированы - это поможет тебе заметить проблемы с решением сразу же и оперативно исправить их до проверки преподавателем.

#### Задание:

Напишите функцию `plainify`, которая получает на вход обычный объект в вложенными свойствами, а возвращает plain-объект.

### Файлы
В репозитории содержатся следующие файлы:

- `index.html` &mdash; главный файл. Для запуска тестов, необходимо открыть его в браузере
- `.github/workflows/CI.yml`, `.eslintrc.json`, `karma.conf.js` &mdash; файлы для автоматической проверки домашнего задания
- `source/max.js` &mdash; файл с реализацией функции `max()`
- `test/max.js` &mdash; файл с тестами к функции `max()`. Эти два файлика не нужно изменять - они уже работают хорошо)
- `test/plainify.js` &mdash; файл с тестами к функции `plainify()`

На страницу `index.html` подключена библиотека для юнит-тестирования [QUnit](https://qunitjs.com/). На сайте QUnit можно найти примеры тестов и описание функций, которые есть в библиотеке.

Открой `index.html` в браузере, и ты увидишь такую картинку:

![screenshot.png](screenshot.png)

На этом скриншоте всё хорошо: все тесты пройдены, но у тебя некоторые тесты упадут. Тебе нужно сделать так, чтобы все тесты были "зелёными".

### Пример
В качестве примера, мы реализовали функцию max, которая принимает на вход массив из трёх чисел и возвращает максимальное из них. Для этого в папке `source` мы создали файл `max.js` и подключили его на страницу. Для всех остальных функций я советую так же создавать отдельный файл. Так код станет чище и аккуратнее и твоим коллегам будет проще в нём разобраться.

Давайте посмотрим на наш тест:
```javascript
QUnit.module('Тестируем функцию max', function () {
    QUnit.test('Возвращает максимальное из трёх положительных чисел', function (assert) {
        assert.strictEqual(max([1, 2, 3]), 3, 'max([1, 2, 3]) === 3');
        assert.strictEqual(max([3, 2, 1]), 3, 'max([3, 2, 1]) === 3');
    });

    QUnit.test('Возвращает максимальное из трёх отрицательных чисел', function (assert) {
        assert.strictEqual(max([-1, -2, -3]), -1, 'max([-1, -2, -3]) === -1');
        assert.strictEqual(max([-3, -2, -1]), -1, 'max([-3, -2, -1]) === -1');
    });

    QUnit.test('Возвращает максимальное из трёх чисел разных знаков', function (assert) {
        assert.strictEqual(max([-1, 0, 1]), 1, 'max([-1, 0, 1]) === 1');
        assert.strictEqual(max([1, 0, -1]), 1, 'max([1, 0, -1]) === 1');
    });
    
    ...
});
```

В строке `QUnit.module('Тестируем функцию max', ...` мы создаём группу тестов, далее с помощью фунции `QUnit.test` мы создаём отдельные тесты. В одном из тестов мы проверяем, правильно ли работает наша функция с положительными числами.

Строка
```javascript
assert.strictEqual(max([1, 2, 3]), 3, 'max([1, 2, 3]) === 3');
```

содержит вызов специальной функции `assert.strictEqual`, которая проверяет на равенство значение, возвращаемое функцией `max` и ожидаемый правильный ответ. В качестве третьего аргумента в функцию передаётся текстовое описание проверки. Если проверка сфейлится, то соответствующий тест не пройдёт.

Аналогичным образом написаны и остальные тесты в группе.

#### Реализация функции max
Давайте попробуем реализовать функцию `max` так, чтобы она правильно работала. Для этого добавляем в файл `source/max.js` следующий код:

```javascript
const max = function (numbers) {
    const a = numbers[0]
    const b = numbers[1]
    const c = numbers[2]
    if (a > b) {
        if (a > c) {
            return a
        }
        return c
    }
    if (b > c) {
        return b
    }
    return c
};
```

Это правильная реализация, и с ней наши тесты проходят, но она выглядит очень сложно и запутанно. Попробуем её улучшить с помощью использования встроенной в JavaScript функции `Math.max()`:

```javascript
const max = function (numbers) {
    return Math.max.apply(null, numbers);
};
```

Здесь нам пришлось использовать метод `Math.max.apply`, т.к. функция `Math.max()` принимает на вход не массив чисел, а отдельные числа. Так намного короче, чем раньше, но лучшее не враг хорошего, и можно сделать ещё проще, если использовать оператор spread:

```javascript
const max = numbers => Math.max(...numbers);
```

Теперь решение оптимальное и лаконичное. Стоит отметить, что такая реализация функции `max()` позволяет вызывать её с массивами любой длины: результат всегда будет правильный. Однако чем сложнее функция - тем труднее понять и разобраться с ней стороннему человеку. Для того, чтобы будущим коллегам было проще, добавим [JSDOC](https://jsdoc.app/):

```javascript
/**
 * Функция, определяющая максимальное число в массиве
 * @param {Array<Number>} numbers - массив чисел
 * 
 * @example
 * // returns 3
 * max([1, 2, 3]);
 * 
 * @returns {Number}
 */
const max = numbers => Math.max(...numbers);
```

Теперь все идеально! Именно за такое решение можно получить максимальный балл.
**Желаем тебе успехов!**
#
