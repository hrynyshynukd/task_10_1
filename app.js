const db = require("./database/db");
const seedDatabase = require("./database/seed");

// Красивий вивід одного запису
function printCD(cd) {

    console.log(`
Інвентарний номер : ${cd.inventory_number}
Назва альбому     : ${cd.album_title}
Об'єм диску       : ${cd.disk_size} MB
Тип диску         : ${cd.disk_type}
Дата запису       : ${cd.record_date}
----------------------------------------
`);
}

// Виведення всіх компакт-дисків
function showAllCDs() {

    const cds = db.prepare(`
        SELECT * FROM cds
    `).all();

    console.log("\n=== Усі компакт-диски ===");

    cds.forEach(cd => {
        printCD(cd);
    });
}

// Сортування за датою запису
function sortByRecordDate() {

    const cds = db.prepare(`
        SELECT * FROM cds
        ORDER BY record_date
    `).all();

    console.log("\n=== Сортування за датою запису ===");

    cds.forEach(cd => {
        printCD(cd);
    });
}

// Пошук за назвою альбому
function findByAlbum(albumTitle) {

    const cds = db.prepare(`
        SELECT * FROM cds
        WHERE album_title = ?
    `).all(albumTitle);

    console.log(`\n=== Пошук альбому: ${albumTitle} ===`);

    if (cds.length === 0) {

        console.log("Альбом не знайдено.");

    } else {

        cds.forEach(cd => {
            printCD(cd);
        });
    }
}

// Головна функція
async function main() {

    // Автоматичне заповнення БД при першому запуску
    await seedDatabase(db);

    // Виведення всіх записів
    showAllCDs();

    // Сортування
    sortByRecordDate();

    // Пошук
    findByAlbum("Meteora");
}

main();