create database contratado;

use contratado;

-- estado de un comentario
create table cCommentState(
	id						int(11) primary key auto_increment,
	state         varchar(250) -- mal servicio , servicio regular , buen servicio , excelente servicio
);

-- estado de un acuerdo
create table cAgreeState(
	id						int(11) primary key auto_increment,
	state					varchar(250) -- rechazado , pendiente , aceptado
);

-- categoria de un trabajo
create table cCategory(
	id						int(11) primary key auto_increment,
	category_name	varchar(200)
);

-- subcategoria de un trabajo
create table cSubCategory(
	id						int(11) primary key auto_increment,
	subcategory_name varchar(200),
	id_category int(11),
	constraint fk_id_category foreign key (id_category) references cCategory(id) on delete cascade
);


-- usuario
create table cUser(
	id 				int(11) primary key auto_increment,
	first_name 	varchar(250) not null,
	last_name 	varchar(250),
	id_number 	varchar(250),
	phone			varchar(200),
	email 			varchar(250),
    birthday 		date null default null,
	country_code  	varchar(250),  -- Ejemplo SV
	country_name 	varchar(250),  -- Ejemplo El Salvador
	country_state  	varchar(250),  -- Ejemplo Sonsonate
    country_city			varchar(250),  -- Ejemplo Nahuizalco
	user_info			 	varchar(250),  -- informacion sobre el usuario que desea compartir
    picture_path 		varchar(250), --  por el momento omitir para datos de prueba
	document_path 	varchar(250), --  por el momento omitir para datos de prueba
    latitude                double,          -- utilizar datos reales
    longitude             double,          -- utilizar datos reales
    is_an_advertiser	bool
);

create table cUserSubCategory(
	id 						int(11) primary key auto_increment,
    id_user				int(11),
    id_subcategory	int(11),
    constraint fk_usersubcat_user	foreign key (id_user) 				references cUser(id),
    constraint fk_usersubcat_cat 		foreign key (id_subcategory)	references cSubCategory(id)
);

create table cRate(
	id int(11) 		primary key auto_increment,
	rate 				decimal,
    id_user		int(11),
	constraint fk_rate_user foreign key (id_user) references cUser(id)
);

create table cExperience(
	id int(11) 		primary key auto_increment,
	employer 	varchar(250),
	occupation 	varchar(250),
	exp_date 	date,
    id_user		int(11),
    constraint fk_exp_user foreign key (id_user) references cUser(id)
);

create table cReference(
	id int(11) 		primary key auto_increment,
	first_name 	varchar(250),
	occupation 	varchar(250),
	phone			varchar(250),
	email 			varchar(250),
	id_exp			int(11),
	constraint fk_ref_exp foreign key (id_exp) references cExperience(id)
);

create table cAgreement(
	id 					int(11) primary key auto_increment,
	job_details 		varchar(250),
	date_agree 		date,
	id_agreestate	int(11),
    id_employer 	int(11),
	id_employee 	int(11),
	constraint fk_agree_state 			foreign key (id_agreestate) references cAgreeState(id),
	constraint fk_agree_employer  	foreign key (id_employer) 	references cUser(id),
	constraint fk_agree_employee 	foreign key (id_employee) 	references cUser(id)
);

create table cComplaint(
	id 					int(11) primary key auto_increment,
	details 				text not null,
	date_occur 		date,
	id_employer 	int(11), -- empleador patron
    id_employee	int(11), -- empleado trabajador
	constraint fk_complaint_employer	foreign key (id_employer) 	references cUser(id),
    constraint fk_complaint_employee	foreign key (id_employee) 	references cUser(id)
);

create table cComment(
	id 					int(11) primary key auto_increment,
	commentary 	text,
    id_user 			int(11),
	id_comment_state 	int(11),
	comment_date 		datetime,
	constraint fk_comment_user			foreign key (id_user) references cUser(id),
    constraint fk_comment_state  		foreign key (id_comment_state) references cCommentState(id)
);
