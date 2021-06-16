Changelog
=========
## [0.0.1]

Version 3.0
-----------
- (B.3) Improved doc.
- (B.2) Added a Leaflet map on the main page, with marks on the comunas with avistamientos.
  On click makes a popup display additional info.
- (B.1) Stats on estadísticas.html now are generated from database. 

Version 2.0
-----------
- (B.7) Added email and phone regex validation on backend. Updated README.md. Page working on anakena. Release candidate.
- (B.5) Big Update.
  * Added HTML error messages when something fails, with backend validation and also frontend js validation, not only in console anymore.
  * Improved backend validations.
  * Moved HTML documents to python prints on cgi-bin. Not removed the original files tho. This new way allows to get info from the databases. That was implemented too.
  * The listado of avistamientos now has pages to read the next/previous 5 avistamientos, until there are not more.
  * Patched a bug when sending estado and tipo of avistamientos with tildes.
  * Backend stores copies of images on small and big resolution. Small are displayed on html strings by default.
  * In estadisticas.html, when trying to go back to index, now redirects to index.py.
  * All html in cgi-bin redirects to pages in the same cgi-bin, instead of the original html files. 
    The index redirect in estadisticas.html goes to cgi-bin too.
- (B.3) Forms are python-validated, sent and stored into databases.
- (B.2) Added basic raw cgi support, and a hidden photo counter per avistamiento when submitting the form.
- (B.1) Created databases, a python cgi initializer, 
  and the region and comuna options are now generated reading from the databases. 

Version 1.0
-----------
- (B.10) Refactor, improved for w3 validation. Release candidate.
- (B.9) Minor refactor of html options on the avistamiento form.
- (B.8) Added statistic visualization page.
- (B.7) Added photo visualization on particular avistamientos, expanded by click on them.
- (B.6) Added confirmation boxes, fixed several bugs with validations, and added pages with detailed avistamiento information.
- (B.5) Added js form validation.
- (B.4) Form structure and dynamic generation completed.
- (B.3) Avistamiento form structure started, and its dynamic generation is partially completed.
- (B.2) Added styles, and adapted the structure, to the main page.
- (B.1) Basic project structure.