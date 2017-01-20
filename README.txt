# Congress-Search
This is a web application for congress information search.Originally this project utilize Sunlight Congress API, but the API is down right now, which means this project is not working properly currently. 
The project provides a congress information search for users including legislators search, bills search, committees search and amendments search. For legislators and bills, the application provides both preview and a detailed page. Besides, user may add their favorite items for future view.

The whole idea for the application is to send a request to php file, then the php requests the Sunlight API and returns a JSON to client. Then the client convert the JSON file into a good looking form.
