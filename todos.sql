create table if not exists todos(
id serial primary key ,
title varchar(55) not null ,
body varchar(55) ,
created_at TIMESTAMPTZ not null default now(),
done boolean not null default false
);