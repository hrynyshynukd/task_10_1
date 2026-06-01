async function seedDatabase(db) {

    const countResult = db
        .prepare("SELECT COUNT(*) as count FROM cds")
        .get();

    if (countResult.count === 0) {

        const insertCD = db.prepare(`
            INSERT INTO cds
            (inventory_number, album_title, disk_size, disk_type, record_date)
            VALUES (?, ?, ?, ?, ?)
        `);

        insertCD.run(
            'CD001',
            'Hybrid Theory',
            700,
            'CD-R',
            '2024-01-15'
        );

        insertCD.run(
            'CD002',
            'Meteora',
            700,
            'CD-RW',
            '2024-03-10'
        );

        insertCD.run(
            'CD003',
            'Nevermind',
            800,
            'DVD-R',
            '2023-12-05'
        );

        console.log("Seed data inserted");
    }
}

module.exports = seedDatabase;