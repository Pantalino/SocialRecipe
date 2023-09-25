CREATE DATABASE socialrecipe;

CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE ricette (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL,
    ingredienti TEXT NOT NULL,
    istruzioni TEXT NOT NULL,
    url_immagine VARCHAR(255),
    id_utente INT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_utente) REFERENCES utenti(id)
);
CREATE TABLE commenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenuto TEXT NOT NULL,
    id_utente INT,
    id_ricetta INT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_utente) REFERENCES utenti(id),
    FOREIGN KEY (id_ricetta) REFERENCES ricette(id)
);


       
   

