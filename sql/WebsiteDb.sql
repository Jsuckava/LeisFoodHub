CREATE DATABASE lei_foodhubDb;

USE lei_foodhubDb;

CREATE TABLE LF_Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
Go



CREATE TRIGGER 
trg_update_timestamp2
ON LF_Users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE LF_Users
    SET updated_at = GETDATE()
    FROM LF_Users U
    INNER JOIN inserted i ON U.id = i.id;
END;
GO



INSERT INTO LF_Users (username, email, password)
VALUES ('john_doe', 'john.doe@example.com', 'hashedpassword123');

--
ALTER TABLE LF_Users
ADD CONSTRAINT CHK_Email CHECK (email LIKE '%_@__%.__%');
--
ALTER TABLE LF_Users ALTER COLUMN password NVARCHAR(60);

--
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LF_Users_Email' AND object_id = OBJECT_ID('LF_Users'))
BEGIN
    DROP INDEX IX_LF_Users_Email ON LF_Users;
END;
--
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_LF_Users_Email' AND object_id = OBJECT_ID('LF_Users'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_LF_Users_Email ON LF_Users(email);
END;
--

SELECT *FROM LF_Users;

--
SELECT name FROM sys.databases WHERE name = 'lei_foodhubDb';

--
DROP INDEX IX_LF_Users_Email ON LF_Users;


SELECT @@SERVERNAME
Go