'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Должны остаться только ключи с ненулевыми значениями.");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Объект без ненулевых значений должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект.");
    });

    QUnit.test("Работает с массивом", function(assert) {
        const result = compressObject({
            array: [1, 2, 3],
        });

        assert.deepEqual(result, { array: [1, 2, 3] }, "Массив должен остаться.");
    });

    QUnit.test("Работает с вложенным объектом", function(assert) {
        const result = compressObject({
            innerObject: {
                a: 1,
                d: null,
                e: undefined,
                f: '',
            },
        });

        assert.deepEqual(result, {
            innerObject: { a: 1, d: null, e: undefined, f: '' },
        }, "Объект должен остаться и содержать все поля.");
    });

    QUnit.test(`Работает с нестандартными значениями`, function(assert) {
        const result = compressObject({
            a: '0',
            b: 0,
            c: 100n,
            d: false,
            e: NaN,
        });

        assert.deepEqual(result, { a: '0', b: 0, c: 100n, d: false, e: NaN }, "Все значения должны остаться.");
    });
});
