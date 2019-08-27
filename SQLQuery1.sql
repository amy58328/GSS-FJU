-- create a database named TESTDATA
CREATE DATABASE TESTDATA
GO 

USE TESTDATA
GO


CREATE TABLE dbo.SingleWord
	(SingleWordE varchar(25),
	SingleWordC varchar(25) ,
	SingleWordId int PRIMARY KEY NOT NULL)
GO

-- show table
SELECT SingleWordId N'�s��',SingleWordE AS N'�^��',SingleWordC N'����'
	FROM dbo.SingleWord
GO

-- insert data into table
-- �b����e���[N���|���ͶýX
INSERT dbo.SingleWord(SingleWordE,SingleWordC,SingleWordId)
	VALUES('lunatic',N'�Ƥl',1)
GO

INSERT dbo.SingleWord(SingleWordE,SingleWordC,SingleWordId)
	VALUES('relish',N'�߷R�B�ɨ�',2),
		('celebration',N'�y�����ʡB�y��',3),
		('saint',N'�t�{',4),
		('civic',N'�������B������',5),
		('workshop',N'�u�@�{�B��Q�|',6),
		('lumber',N'����B���',7),
		('competition',N'�v���B����',8),
		('intense',N'�@�P���B������',9),
		('sculptor',N'�J��a�B�J��a',10),
		('torch',N'����B����N',11),
		('joyous',N'�w�ߪ��B�ּ֪�',12),
		('offering',N'���~�B�ݰ�~',13),
		('massive',N'���j���B�j�W�Ҫ�',14),
		('firecracher',N'�@��',15),
		('fuse',N'�O�I���B����',16),
		('blast',N'�z�}�A���}',17),
		('restraint',N'�J��B����',18),
		('stroll',N'���B�B���}',19),
		('scramble',N'�ܫP��ʡA����',20)
GO

