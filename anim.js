// Функция для сортировки таблицы по столбцу "Очки"
function sortTableByPoints() {
    const table = document.querySelector("#table table");
    const rows = Array.from(table.rows).slice(1, -1); // Берем все строки кроме заголовка и итогов
    rows.sort((rowA, rowB) => {
        const pointsA = parseInt(rowA.cells[3].innerText);
        const pointsB = parseInt(rowB.cells[3].innerText);
        return pointsB - pointsA;
    });
    rows.forEach(row => table.appendChild(row)); // Перемещаем отсортированные строки в таблицу
    alert("Таблица успешно отсортирована по очкам!");
}

// Функция для добавления нового раздела "Советы для начинающих"
function addBeginnerTips() {
    const newSection = document.createElement("section");
    newSection.className = "info-block";
    newSection.innerHTML = `
        <h2>Советы для начинающих</h2>
        <ul>
            <li>Начинайте с основ: дриблинг, точный бросок и передача.</li>
            <li>Работайте над физической подготовкой и координацией.</li>
            <li>Изучите правила и роли на каждой позиции.</li>
        </ul>
    `;
    document.body.insertBefore(newSection, document.querySelector(".footer"));
    alert("Раздел 'Советы для начинающих' успешно добавлен!");
}

// Функция для изменения стиля ссылок в навигации
function styleNavLinks() {
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.style.color = "darkblue";
        link.style.fontWeight = "bold";
        link.style.textDecoration = "underline";
    });
    alert("Стиль навигационных ссылок изменен!");
}

// Функция работы с BOM: открытие окна со статистикой НБА
function openNBASite() {
    window.open("https://www.nba.com/stats", "_blank", "width=800,height=600");
    alert("Открывается статистика НБА!");
}

// Функция для анимации мяча на холсте
function animateBall() {
    const canvas = document.getElementById("basketballCourt");
    const ctx = canvas.getContext("2d");
    let x = 50;
    let y = 50;
    let dx = 2;
    let dy = 3;
    
    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
        
        if (x + dx > canvas.width - 20 || x + dx < 20) dx = -dx;
        if (y + dy > canvas.height - 20 || y + dy < 20) dy = -dy;

        x += dx;
        y += dy;
    }
    
    setInterval(drawBall, 20); // Анимация мяча с помощью setInterval
    alert("Анимация мяча запущена!");
}
// Функция для добавления блока с информацией о новом игроке
function addPlayerInfo() {
    const newInfoBlock = document.createElement("div");
    newInfoBlock.className = "info-block";
    newInfoBlock.innerHTML = `
        <h2>Информация о новом игроке</h2>
        <p>Имя: Яннис Адетокунбо</p>
        <p>Возраст: 29 лет</p>
        <p>Рост: 2.11 м</p>
        <p>Вес: 110 кг</p>
        <p>Позиция: форвард</p>
    `;
    document.body.insertBefore(newInfoBlock, document.querySelector(".footer"));
}

const colors = ['#FA8072', '#FFB6C1', '#FFEFD5', '#E0FFFF'];
let i = 0;

const intervalId = setInterval(() => document.body.style.background = colors[i++ % colors.length], 750);
setTimeout(() => { clearInterval(intervalId); document.body.style.background = ''; }, 3000);


// Функция для удаления последнего блока информации о игроке
function removeLastPlayerInfo() {
    const infoBlocks = document.querySelectorAll(".info-block");
    if (infoBlocks.length > 1) { // Удаление только дополнительных блоков, без основного
        document.body.removeChild(infoBlocks[infoBlocks.length - 1]);
    } else {
        alert("Нет дополнительных блоков для удаления.");
    }
}

// Привязываем функции к кнопкам при загрузке документа
document.addEventListener("DOMContentLoaded", () => {
    // Кнопка для добавления нового блока игрока
    const addButton = document.createElement("button");
    addButton.textContent = "Добавить информацию о игроке";
    addButton.onclick = addPlayerInfo;
    document.body.appendChild(addButton);

    // Кнопка для удаления последнего блока игрока
    const removeButton = document.createElement("button");                                      
    removeButton.textContent = "Удалить последний блок информации";
    removeButton.onclick = removeLastPlayerInfo;
    document.body.appendChild(removeButton);
});


// Привязываем функции к кнопкам при загрузке документа
document.addEventListener("DOMContentLoaded", () => {
    // Кнопка для сортировки таблицы
    const sortButton = document.createElement("button");
    sortButton.textContent = "Сортировать по очкам";
    sortButton.onclick = sortTableByPoints;
    document.querySelector("#table").appendChild(sortButton);

    // Кнопка для добавления раздела
    const tipsButton = document.createElement("button");
    tipsButton.textContent = "Добавить советы для начинающих";
    tipsButton.onclick = addBeginnerTips;
    document.body.appendChild(tipsButton);

    // Кнопка для изменения стиля ссылок
    const styleLinksButton = document.createElement("button");
    styleLinksButton.textContent = "Изменить стиль навигации";
    styleLinksButton.onclick = styleNavLinks;
    document.body.appendChild(styleLinksButton);

    // Кнопка для открытия окна со статистикой НБА
    const nbaStatsButton = document.createElement("button");
    nbaStatsButton.textContent = "Открыть статистику НБА";
    nbaStatsButton.onclick = openNBASite;
    document.body.appendChild(nbaStatsButton);

    // Запуск анимации на холсте
    animateBall();
});
