//var myApp = "https://script.google.com/macros/s/AKfycbz4k3v470sDbaMdPLa9OrmwQfRARBDlMjeatCXEGnhDKbD0a7yQm7F0cNXp0WGW6Mqm/exec";
//var myApp = "https://script.google.com/macros/s/AKfycbzOt5uEJKhDdRc5p0DJfjzVkfRS2j96LLHrl01_5KFR7TBOu0bgP86iziBqO8c-B5KE/exec"
var myApp = "https://script.google.com/macros/s/AKfycby5Gf4_PVOZxohbTHplidiOrOQBZXOAmTRx4QhJD-nFlz8Lvq6ycu2evra0nXPeA4fB/exec";
var dbArray = [];

function getTasks () {
    var action = "getTasks";
    var url = myApp+"?action="+action

    //подготавливаем и выполняем GET запрос
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	//в случае успеха преобразуем полученный ответ в JSON и передаем отдельной функции, которая сформирует нам таблицу
			dbArray = JSON.parse(xhr.response);
			//console.log("ok!");
			console.log(dbArray);
			randomWord();
        }
    };
    try { xhr.send(); } catch (err) {console.log(err) }
}

function ToCell(num, col, newValue)
{
	var action = "toCelll";
	var xhr = new XMLHttpRequest();
	var body = 'num=' + encodeURIComponent(num) + '&col=' + encodeURIComponent(col) +
	'&newValue=' + encodeURIComponent(newValue) + '&action=' + encodeURIComponent(action);
	xhr.open("POST", myApp, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	//$("#updateTaskModal").modal("hide");
        	alert(xhr.response);
		//getTasks ();//обновляем список задач
        }
    };
	try { xhr.send(body);} catch (err) {console.log(err) }
}

function saved()
{

	var action = "saved";
	var xhr = new XMLHttpRequest();
	var num = 15;
	var col = 'B';
	var newValue = 'kuku!';
	var body = 'num=' + encodeURIComponent(num) + '&col=' + encodeURIComponent(col) +
	'&newValue=' + encodeURIComponent(newValue) + '&action=' + encodeURIComponent(action);
	xhr.open("POST", myApp, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	//$("#updateTaskModal").modal("hide");
        	alert(xhr.response);
		//getTasks ();//обновляем список задач
        }
    };
	try { xhr.send(body);} catch (err) {console.log(err) }
}