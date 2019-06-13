DROP DATABASE IF EXISTS KnowItAllDB;
CREATE DATABASE IF NOT EXISTS KnowItAllDB;
USE KnowItAllDB;

DROP TABLE IF EXISTS following;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS baseball_team_stats;
DROP TABLE IF EXISTS baseball_pitching_stats;
DROP TABLE IF EXISTS baseball_batter_stats;
DROP TABLE IF EXISTS payroll;
DROP TABLE IF EXISTS player;

CREATE TABLE user(
user_id INT AUTO_INCREMENT PRIMARY KEY,
user_name VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL
)ENGINE INNODB;

DROP TABLE IF EXISTS team;
CREATE TABLE team(
team_id 	VARCHAR(5) PRIMARY KEY,
team_name VARCHAR(50) NOT NULL UNIQUE,
league  	VARCHAR(10)	NOT NULL,
division 	VARCHAR(5) NOT NULL
)ENGINE INNODB;
SELECT * FROM team;

-- STATS FOR A TEAM IN 1 YEAR
DROP TABLE IF EXISTS baseball_team_stats;
CREATE TABLE baseball_team_stats(
team_id 			VARCHAR(5) 		PRIMARY KEY,
team_name 			VARCHAR(50) 	NOT NULL UNIQUE,
team_year			YEAR 			NOT NULL,
div_rank			INT         	NOT NULL,
games				INT				NOT NULL,
wins				INT 			NOT NULL,
losses 				INT				NOT NULL,
runs 				INT 			NOT NULL,
at_bats	 			INT				NOT NULL,
hits 				INT				NOT NULL,
doubles				INT				NOT NULL,
triples				INT 			NOT NULL,
homeruns			INT  			NOT NULL,
walks				INT				NOT NULL,
strikeouts			INT				NOT NULL,
stolen_bases		INT 			NOT NULL,
caught_stealing 	INT				NOT NULL,
hit_by_pitches		INT				NOT NULL,
sac_flies			INT	 			NOT NULL,
runs_allowed		INT 			NOT NULL,
earned_runs			INT				NOT NULL,
era					DECIMAL(3,2)	NOT NULL,
complete_games		INT 			NOT NULL,
shutouts			INT 			NOT NULL,
saves 				INT 			NOT NULL,
hits_allowed 		INT				NOT NULL,
homeruns_allowed	INT				NOT NULL,
walks_allowed		INT 			NOT NULL,
pitcher_strikeouts	INT 			NOT NULL,
team_errors 		INT 			NOT NULL,
double_plays		INT 			NOT NULL,
field_pct			DECIMAL(4,3)	NOT NULL,
team_park			VARCHAR(50)		NOT NULL,
attendance			INT 			NOT NULL,
CONSTRAINT team_id_fk2 FOREIGN KEY(team_id) REFERENCES team(team_id)
)ENGINE INNODB;



DROP TABLE IF EXISTS following;
CREATE TABLE following(
team VARCHAR(5) NOT NULL,
user INT NOT NULL,
CONSTRAINT following_pk PRIMARY KEY(team, user),
CONSTRAINT user_follow_pk FOREIGN KEY(user) REFERENCES user(user_id)
ON DELETE CASCADE
ON UPDATE CASCADE ,
CONSTRAINT team_follow_pk FOREIGN KEY(team) REFERENCES team(team_id)
ON DELETE CASCADE
ON UPDATE CASCADE  
)ENGINE INNODB;

DROP TABLE IF EXISTS post;
CREATE TABLE post(
post_id INT AUTO_INCREMENT PRIMARY KEY,
post_title VARCHAR(50) NOT NULL UNIQUE,
user INT NOT NULL,
content VARCHAR(100) NOT NULL,
founding_date DATE NOT NULL, 
CONSTRAINT user_pk FOREIGN KEY(user) REFERENCES user(user_id)
ON DELETE CASCADE
ON UPDATE CASCADE 
)ENGINE INNODB;

DROP TABLE IF EXISTS player;
CREATE TABLE player(
player_id 			VARCHAR(20) PRIMARY KEY,
player_name 		VARCHAR(50) NOT NULL,
player_birthdate	DATE 		NOT NULL,
team 				VARCHAR(5) NOT NULL, 
CONSTRAINT team_pk FOREIGN KEY(team) REFERENCES team(team_id)
ON DELETE CASCADE
ON UPDATE CASCADE
)ENGINE INNODB;

-- STATS FOR A BATTER IN ONE YEAR

CREATE TABLE baseball_batter_stats(
player_id		VARCHAR(20)		PRIMARY KEY,
year_id			YEAR			NOT NULL,
team_id			VARCHAR(10)		NOT NULL,
league_id		VARCHAR(10)		NOT NULL,
games			INT 			NOT NULL,
at_bats			INT				NOT NULL,
runs			INT 			NOT NULL,
hits			INT 			NOT NULL,
doubles			INT				NOT NULL,
triples			INT 			NOT NULL,
homeruns		INT 			NOT NULL,
rbi				INT 			NOT NULL,
stolen_bases	INT				NOT NULL,
caught_stealing	INT				NOT NULL,
walks			INT 			NOT NULL,
strikeouts		INT 			NOT NULL,
int_walks		INT				NOT NULL,
hit_by_pitch	INT 			NOT NULL,
sacrifies_flies INT				NOT NULL,
double_plays	INT 			NOT NULL,
bat_avg			DECIMAL(4,3)	NOT NULL,
bat_obp			DECIMAL(4,3)	NOT NULL,
bat_slg			DECIMAL(4,3)	NOT NULL,
bat_ops			DECIMAL(4,3)	NOT NULL,
CONSTRAINT team_id_fk3 FOREIGN KEY(team_id) REFERENCES team(team_id)
-- ,CONSTRAINT league_id_fk FOREIGN KEY(league_id) REFERENCES team(league)
)ENGINE INNODB;


CREATE TABLE baseball_pitching_stats(
player_id			VARCHAR(20)		PRIMARY KEY,
year_id				YEAR			NOT NULL,
wins				INT 			NOT NULL,
losses				INT 			NOT NULL,
games 				INT  			NOT NULL,
games_started		INT 			NOT NULL,
complete_games		INT 			NOT NULL,
shutouts			INT				NOT NULL,
saves				INT 			NOT NULL,
hits_allowed 		INT 			NOT NULL,
earned_runs			INT 			NOT NULL,
runs_allowed		INT 			NOT NULL,
homeruns_allowed	INT				NOT NULL,
walks				INT 			NOT NULL,
strikeouts			INT 			NOT NULL,
opp_avg				DECIMAL(4,3)	NOT NULL,
era					DECIMAL(3,2),
int_walks			INT 			NOT NULL,
wild_pitch			INT				NOT NULL,
hbp					INT				NOT NULL,
balks				INT 			NOT NULL,
games_finished		INT				NOT NULL,
CONSTRAINT player_fk FOREIGN KEY(player_id) REFERENCES player(player_id)
)ENGINE INNODB;


CREATE TABLE payroll(
team_id			VARCHAR(5)		NOT NULL,
year_id			VARCHAR(4)		NOT NULL,
attendance		INT				NOT NULL,
avg_attendance	INT				NOT NULL,
total_payroll	INT				NOT NULL,
CONSTRAINT payroll_pk PRIMARY KEY(team_id, year_id),
CONSTRAINT team_fk FOREIGN KEY(team_id) REFERENCES team(team_id)
)ENGINE INNODB;
















