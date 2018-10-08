create database contratado;

create table cCommentState(
id int(11) primary key auto_increment,
state varchar(250)
);

create table cAgreeState(
id int(11) primary key auto_increment,
state varchar(250)
);


create table cCountry(
id int(11) primary key auto_increment,
country_name varchar(200) unique,
country_code varchar(50) unique,
country_iso varchar(50) unique
);

create table cCity(
id int(11) primary key auto_increment,
city_name varchar(200),
id_country int(11),
constraint fk_id_country foreign key (id_country) references cCountry(id)
);

create table cCategory(
id int(11) primary key auto_increment,
category_name varchar(200)
);

create table cSubCategory(
id int(11) primary key auto_increment,
subcategory_name varchar(200),
id_category int(11),
constraint fk_id_category foreign key (id_category) references cCategory(id)
);

create table cExperience(
id int(11) primary key auto_increment,
employer varchar(250),
occupation varchar(250),
until_date date
);

create table cReference(
id int(11) primary key auto_increment,
first_name varchar(250),
occupation varchar(250),
phone_number varchar(250),
email varchar (250),
id_experience int(11),
constraint fk_id_experience foreign key (id_experience) references cReference(id)
);

create table cUser(
id int(11) primary key auto_increment,
first_name varchar(250) not null,
last_name varchar(250),
id_number varchar(250),
birthday date,
phone_number varchar(200),
email varchar(250),
address varchar(200),
is_an_ad bool,
picture_path varchar(250),
document_path varchar(250),
occupation_info varchar(250),
id_subcategory int(11),
id_city int(11),
constraint fk_id_subcategory foreign key (id_subcategory) references cSubCategory(id),
constraint fk_id_city foreign key (id_city) references cCity(id)
);

create table cComplaint(
id int(11) primary key auto_increment,
details text not null,
id_user int,
date_occur date,
constraint fk_id_user_complaint foreign key (id_user) references cUser(id)
);

create table cUserExperience(
id int(11) primary key auto_increment,
id_experience int(11),
id_user int(11),
constraint fk_id_exp  foreign key (id_experience) references cExperience(id),
constraint fk_id_user foreign key (id_user) references cUser(id)
);

create table cAgreement(
id int(11) primary key auto_increment,
id_employer int(11) unique,
id_worker int(11) unique,
work_details varchar(250),
date_agree date,
id_agreestate int(11),
constraint fk_id_employer  foreign key (id_employer) references cUser(id),
constraint fk_id_worker foreign key (id_worker) references cUser(id),
constraint fk_agreestate foreign key (id_agreestate) references cAgreeState(id)
);


create table cRate(
id int(11) primary key auto_increment,
rate decimal,
votes int(11),
id_user int(11),
constraint fk_id_user_rate foreign key (id_user) references cUser(id)
);

create table cComment(
id int(11) primary key auto_increment,
commentary text,
id_state int(11),
id_user int(11),
id_agree int(11),
constraint fk_id_state  foreign key (id_state) references cCommentState(id),
constraint fk_comment_user  foreign key (id_user) references cUser(id),
constraint fk_agree_comment  foreign key (id_agree) references cAgreement(id)
);