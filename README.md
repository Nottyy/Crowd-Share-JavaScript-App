Crowd-Share-JavaScript-App
==========================

JavaScript app designed for users to register, login, create posts, view posts, view posts by some criteria.

Crowd Share Description
Visitors must register in order to post to the Crowd Share application. 
The application has the following workflow:

1.	Visitors enter the application
  a.	They can view all the posts, even if not logged-in
  b.	They can register or login a user
2.	Visitors can view all posts, sorted
  a.	The visitor chooses how the posts to be sorted:
    •	By date or by title (alphabetically)
    •	Ascending or descending
  b.	The visitor can see the posts in pages. Each page contains N posts
    •	N is provided by the visitor
    •	Visitors can navigate through the pages (previous or next)
3.	Visitors can register a user
  a.	Providing a username and a password
4.	Visitors can login into the application
  a.	Providing a username and a password
  b.	They receive an unique session key that is used to authenticate to the application
5.	Logged-in users can logout from the application
  a.	Providing their session key (received after the login) 
6.	Registered users can post into the Crowd Share
  a.	Providing a title, body and a session key (received after the login)
