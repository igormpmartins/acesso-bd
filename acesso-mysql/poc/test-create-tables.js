const mysql = require('mysql2/promise')

const run = async() => {

    try {
    
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })

        try {

            const [res] = await conn.query(`SHOW TABLES LIKE 'categories'`)

            if (res.length === 0) {

                await conn.query(`CREATE TABLE categories (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    category varchar(250) 
                )`)

                await conn.query(`CREATE TABLE products (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    description varchar(250),
                    price float
                )`)

                await conn.query(`CREATE TABLE images (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    description text,
                    url varchar(250),
                    product_id int not null,
                    KEY fk_images_products_idx (product_id),
                    constraint fk_images_products foreign key (product_id) references products (id) on delete cascade on update cascade
                    
                )`)

                await conn.query(`CREATE TABLE categories_products (
                    product_id int not null,
                    category_id int not null,
                    
                    KEY fk_images_products_products_idx (product_id),
                    KEY fk_images_products_category_idx (category_id),

                    PRIMARY KEY (product_id, category_id),

                    constraint fk_categories_products_category foreign key (category_id) references categories (id) on delete cascade on update cascade,
                    constraint fk_categories_products_products foreign key (product_id) references products (id) on delete cascade on update cascade

                )`)

            }

            
        } catch (error) {
            console.log(error)
        }

    } catch (err) {
        console.log('connection error:', err)
    }

}

run()