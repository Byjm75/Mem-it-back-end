/*
Ici le script de la construction de la Base De Données memit et de ses tables
**/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
drop table if exists utilisateur cascade;
drop table if exists categorie cascade;
drop table if exists tache cascade;
drop table if exists tag cascade;
drop table if exists tag_taches_tache cascade;

CREATE TABLE utilisateur (
  id uuid DEFAULT uuid_generate_v4 (),
   PRIMARY KEY (id),
  email VARCHAR (50) NOT NULL,
  pseudo VARCHAR (50) NOT NULL,
  picture VARCHAR (255),
  password VARCHAR (255) NOT NULL
);

CREATE TABLE categorie (
  id uuid DEFAULT uuid_generate_v4 (),
   PRIMARY KEY (id),
  title VARCHAR (50) NOT NULL,
  picture VARCHAR (255),
  user_id uuid,
CONSTRAINT fk_utilisateur FOREIGN KEY (user_id) 
REFERENCES utilisateur(id)
);

CREATE TABLE tache (
  id uuid DEFAULT uuid_generate_v4 (),
   PRIMARY KEY (id),
  title VARCHAR (50),
  date_creation DATE NOT NULL,
  date_event DATE,
  body text,
  image VARCHAR (255),
  url VARCHAR (255),
  user_id uuid,
  categorie_id uuid,
CONSTRAINT fk_categorie FOREIGN KEY (categorie_id) 
REFERENCES categorie(id),
CONSTRAINT fk_utilisateur FOREIGN KEY (user_id) 
REFERENCES utilisateur(id)
);

CREATE TABLE tag (
  id uuid DEFAULT uuid_generate_v4 (),
   PRIMARY KEY (id),
  title VARCHAR (50),
  user_id uuid,
CONSTRAINT fk_utilisateur FOREIGN KEY (user_id) 
REFERENCES utilisateur(id)
);

CREATE TABLE tag_taches_tache (
tag_id uuid,
tache_id uuid,
CONSTRAINT fk_tag FOREIGN KEY (tag_id) 
REFERENCES tag(id),
CONSTRAINT fk_tache FOREIGN KEY (tache_id) 
REFERENCES tache(id)
);






