INSERT INTO blog."Blogs"(
	"Id", "Title", "Description", "CreationDate", "Status", "UserId", "RatingSum", "Ratings")
	VALUES (-21, 'Title 1', 'Description 1', CURRENT_TIMESTAMP, 0,-21,0,'[]'),
	       (-22, 'Title 2', 'Description 2', CURRENT_TIMESTAMP, 1,-21,0,'[]'),
		   (-23, '4 eltiT', 'Description 3', CURRENT_TIMESTAMP, 2,-21,0,'[]'),
		   (-24, 'Cool blog', 'Description 4', CURRENT_TIMESTAMP, 2,-22,0,'[]'),
		   (-25, 'Desc', 'Description 5', CURRENT_TIMESTAMP, 1,-22,0,'[]');
	   