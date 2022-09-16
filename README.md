Installerar alla olika moduler genom npm install <module> --save

Starta servern genom npm start eller npm run watch för developers.



Jag har valt att strukturera mina routes genom en Controller som hanterar alla requests till Databasen, vaje request har en egen funktion.


I routes mappen kallar jag på funktionen från Controllen.

i app.js finns app.use = /text

get./ för att hämta alla docs

post. / för att skapa ett nytt

delete. /:id för att deleta

get./:id för att hämta ett dokument.

patch. /:id  för att uppdatera ett document.

I models har jag skapat en model genom mongooose.schema och mongoose.model.


I app.js connectar jag till databasen genom mongooose.connect.

