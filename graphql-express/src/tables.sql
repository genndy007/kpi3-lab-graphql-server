
create table account (
  user_id serial PRIMARY KEY,
  last_name varchar(64),
  first_name varchar(64),
  email varchar(64),
  phone varchar(15)
);

create table booking (
  booking_id serial PRIMARY KEY,
  apartment_id INT,
  user_id INT,
  profit INT
);