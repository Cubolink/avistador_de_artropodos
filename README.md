# Avistador de Artrópodos.
Proyecto de desarrollo web. Muestra los últimos avistamientos de artrópodos en determinadas localidades, 
y permite al usuario añadir avistamientos.

En la página principal se muestran los últimos 5 avistamientos, y el usuario puede hacer click para añadir 
nuevos avistamientos a la lista. Además, puede presionar para ir al listado de informes de avistamiento.

## Añadir avistamiento
El usuario debe presionar la cinta de añadir avistamiento. Así, se despliega el formulario para añadir uno.
Este consta de 3 partes, desde abajo hacia arriba está el botón para subir el formulario, la sección donde el usuario
ingresa sus datos de contacto, y la sección donde se añaden datos del avistamiento. Esta última mencionada puede
contener varias secciones para que el usuario añada distintos avistamientos, habiendo la capacidad para añadir tantos
como el usuario desee presionando multiples veces la cinta de añadir avistamiento, pero la sección de contacto y
el botón para subir el formulario se mantendrán únicos.

Por defecto, cuando se presiona para añadir un nuevo avistamiento se colocan por defecto los valores de región, comuna 
y sector elegidos para el primer avistamiento. Sin embargo, el usuario puede informar de avistamientos de distintos lugares,
por lo que hacer un informe de múltiples avistamientos en distintas localidades no es un problema.
Este gran informe se dividirá en distintos informes según las localidades elegidas, de tal forma que si el usuario quisiera
informar 6 avistamientos que se distribuyen en por ejemplo 2 localidades distintas, no tiene que hacer dos informes
separados e ingresas sus datos de contacto dos veces, sino que el sistema se encargará de dividir el informe.

Una vez presionado el botón para subir el formulario, se abre una caja de confirmación donde se le pregunta al usuario si es que
está seguro de que quiere enviarlo. Si decide que no, vuelve al formulario, y si decide enviarlo se envían los datos, se limpia
el formulario y se muestra un mensaje de que los datos fueron enviados.

## Listado de Avistamientos
En esta página se muestran los avistamientos en una tabla. Al hacer click en una fila de la table, se redirecciona a
una página con los detalles del avistamiento. En esta página, cada foto que se muestra es también clickeable, y al hacerlo
se genera una vista de esta imagen en mayor resolución.