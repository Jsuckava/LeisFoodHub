USE lei_foodhubDb;
GO
--
CREATE LOGIN FinalsNewAdmin WITH PASSWORD = 'LeiAllenHEHE';
GO
--
CREATE USER FinalsNewAdminDb FOR LOGIN FinalsNewAdmin;
GO
--
ALTER ROLE db_datareader ADD MEMBER FinalsNewAdminDb;
ALTER ROLE db_datawriter ADD MEMBER FinalsNewAdminDb;
GO
--
REVOKE SELECT ON dbo.LF_Users FROM FinalsNewAdminDb;
REVOKE EXECUTE FROM FinalsNewAdminDb;
GO
--
GRANT SELECT ON dbo.LF_Users TO FinalsNewAdminDb;
GRANT EXECUTE TO FinalsNewAdminDb;
GO
--
SELECT * FROM dbo.LF_Users;
GO
