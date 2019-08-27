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
SELECT SingleWordId N'編號',SingleWordE AS N'英文',SingleWordC N'中文'
	FROM dbo.SingleWord
GO

-- insert data into table
-- 在中文前面加N不會產生亂碼
INSERT dbo.SingleWord(SingleWordE,SingleWordC,SingleWordId)
	VALUES('lunatic',N'瘋子',1)
GO

INSERT dbo.SingleWord(SingleWordE,SingleWordC,SingleWordId)
	VALUES('relish',N'喜愛、享受',2),
		('celebration',N'慶祝活動、慶典',3),
		('saint',N'聖徒',4),
		('civic',N'城市的、市民的',5),
		('workshop',N'工作坊、研討會',6),
		('lumber',N'木材、木料',7),
		('competition',N'競爭、比賽',8),
		('intense',N'劇烈的、熱情的',9),
		('sculptor',N'雕刻家、雕塑家',10),
		('torch',N'火把、放火燒',11),
		('joyous',N'歡喜的、快樂的',12),
		('offering',N'祭品、待售品',13),
		('massive',N'巨大的、大規模的',14),
		('firecracher',N'鞭炮',15),
		('fuse',N'保險絲、熔化',16),
		('blast',N'爆破，炸開',17),
		('restraint',N'克制、限制',18),
		('stroll',N'漫步、閒逛',19),
		('scramble',N'倉促行動，爭奪',20)
GO

