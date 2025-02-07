-- Drop the database if it exists
DROP DATABASE IF EXISTS supply_chain_db;

-- Create the database
CREATE DATABASE supply_chain_db;

-- Create a new user and grant privileges
CREATE USER api WITH ENCRYPTED PASSWORD 'development_pass';
GRANT ALL PRIVILEGES ON DATABASE supply_chain_db TO api;

-- Connect to the database
\c supply_chain_db

-- Create a sample table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Insert a test user
INSERT INTO users (username, password) VALUES ('admin', 'adminpassword');
