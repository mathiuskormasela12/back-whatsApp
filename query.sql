-- Create Database
CREATE DATABASE "whatsapp"
WITH OWNER "postgres"
ENCODING 'UTF8'
LC_COLLATE = 'en_US.UTF-8'
LC_CTYPE = 'en_US.UTF-8';

-- Create All Schemas
CREATE SCHEMA whatsApp_auth;
CREATE SCHEMA whatsApp_chat;