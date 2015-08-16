/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}, //Тут лишняя запятая =)
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'],
    responses = {},
    K,
    i,
    j,
    mainValue = prompt('Enter country or city','');//добавляем диалог (adding dialog)

//если значение не пустое и диалог не отклонен идем в цикл
//go to cycle when value isn't empty or dialog isn't canceled
if (mainValue === ''){
    alert('Nothing was entered.');
} else if (mainValue === null){
    alert("You've canceled.");
} else{
    for (i = 0; i < 3; i++) {
        sendRequest(requests[i]);
    }
}
//Функция-обертка (Wrap function)
function sendRequest(request){
        var callback = function (error, result) {
            responses[request] = result;
            var l = [];
            for (K in responses)
                l.push(K);
            if (l.length == 3) {
                var c = [], //страны (countries)
                    cc = [], //города (cities)
                    p = 0; //результат (result)
                for (i = 0; i < responses['/countries'].length; i++) {
                    if (responses['/countries'][i].continent === mainValue) {
                        c.push(responses['/countries'][i].name);
                    }
                }
                //Если в массив c не добавлено ничего, то главная переменная не континент, добавляем ее в массив стран
                //Add mainvalue to the array of countries if array c is empty (i.e. mainvalue isn't a continent)
                if (c.length==0) c.push(mainValue);
                for (i = 0; i < responses['/cities'].length; i++) {
                    for (j = 0; j < c.length; j++) {
                        if (responses['/cities'][i].country === c[j]) {
                            cc.push(responses['/cities'][i].name);
                        }
                    }
                }
                //Если в массив cc ничего не добавлено, то гл. переменная не страна, добавляем ее в массив городов
                //Add mainvalue to the array of cities if array cc is empty (i.e. mainvalue isn't a country)
                if (cc.length==0) cc.push(mainValue);
                for (i = 0; i < responses['/populations'].length; i++) {
                    for (j = 0; j < cc.length; j++) {
                        if (responses['/populations'][i].name === cc[j]) {
                            p += responses['/populations'][i].count;
                        }
                    }
                }
                //Вывод
                //Output
                if (p!=0) alert('Total population in ' + mainValue + ' is ' + p);
                else alert("There is no such country or city!");
            }
        };
        getData(request, callback);
    }
