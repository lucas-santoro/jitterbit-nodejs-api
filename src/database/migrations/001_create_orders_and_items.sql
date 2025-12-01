CREATE TABLE IF NOT EXISTS orders (
    orderId VARCHAR(255) PRIMARY KEY,
    value NUMERIC NOT NULL,
    creationDate TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    orderId VARCHAR(255) NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    CONSTRAINT fk_order
      FOREIGN KEY(orderId)
      REFERENCES orders(orderId)
      ON DELETE CASCADE
);
