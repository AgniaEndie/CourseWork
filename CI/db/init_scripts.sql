create table product
(
    uuid   varchar(64)
        constraint product_pk
            primary key,
    title  varchar(255),
    about  text,
    price  float,
    amount integer,
    category varchar(120)
);

create table category
(
    uuid   varchar(64)
        constraint category_pk
            primary key,
    title  varchar(255)
);

create table users(
    uuid varchar(64),
    name varchar(120),
    password varchar(120),
    email  varchar(120),
    role varchar(64),
    is_active integer
);

create table role(
    uuid varchar(64),
    title varchar(120)
);

create table tokens(
    uuid varchar(64),
    user_id varchar(64),
    exp varchar(120)
);
create table cart(
    uuid varchar(64),
    user_id varchar(64),
    product_id varchar(64),
    count integer
)