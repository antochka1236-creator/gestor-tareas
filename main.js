// Importar prompt-sync para Node.js
const prompt = require('prompt-sync')();

// Estructura de dades {nom: string, completada: boolean}
const tasques = []

/**
 * Mostrará el menú principal con las opciones disponibles
 * @returns {number} La opción seleccionada por el usuario
 */
function mostrarMenu(){
    console.log('\n=== Menu de Opciones ===')
    console.log('1. Afegir tasca')
    console.log('2. Mostrar tasques')
    console.log('3. Marcar completada')
    console.log('4. Eliminar tasca')
    console.log('5. Estadístiques')
    console.log('6. Mostrar tasques pendents')
    console.log('7. Sortir')
    
    return Number(prompt('Elija una opcion'));
} 
/**
 * Añadirá una nueva tarea al listado
 * @returns {string} Mensaje de confirmación o error
 */function afegirTasca(){
    let novaTascaNom = prompt('Nova Tasca: ')?.trim() ?? '';

    if (novaTascaNom === '') return 'La tasca no pot estar buida';

    let duplicada = tasques.find(
        tasca => tasca.nom.toLowerCase() === novaTascaNom.toLowerCase()
    );

    if (duplicada) return 'Aquesta tasca ja existeix';

    const novaTasqa = {
        nom: novaTascaNom,
        completada: false
    }
    tasques.push(novaTasqa)
    return 'Tasca afegida correctament';
}

/**
 * Mostrará todas las tareas con su estado (Completada o Pendent)
 * @returns {string} Listado formateado de tareas o mensaje de error
 */
function mostrarTasques(){
    if (tasques.length === 0) return 'No hi ha tasques';
    
    const llistatTasques = tasques
    .map((tasqa, index) => `${index + 1}. ${tasqa.nom} - ${tasqa.completada ? 'Completada' : 'Pendent'}`)
    .join(`\n`)

    return `=== Listat de tasques ===\n${llistatTasques}`;
}

/**
 * Mostrará todas las tareas pendientes (no completadas)
 * @returns {string} Listado formateado de tareas pendientes o mensaje de error
 */
function mostrarTasquesPendents(){
    if (tasques.length === 0) return 'No hi ha tasques';

    const llistatPendents = tasques
       .filter(tasca => !tasca.completada)
       .map((tasca, index) => `${index + 1}. ${tasca.nom}`)
       .join(`\n`)

    if (!llistatPendents) return 'No hi ha tasques pendents'

    return `=== Tasques pemdents ===\n${llistatPendents}`
}

/**
 * Obtendrá un índice válido de tarea solicitado al usuario
 * @returns {number} Índice válido (0 o mayor) o -1 si es inválido
 */
function obtenirIndexValid(){
    let numero = Number(prompt('Número de tasca')?.trim() ?? '');

    if (isNaN(numero) || numero <= 0) return -1;

    let index = numero - 1;

    if (index < 0 || index >= tasques.length){
        return -1;
    }

    return index;
}

/**
 * Modificará una tarea según la acción especificada
 * @param {number} index - Índice de la tarea a modificar
 * @param {string} accio - Acción a realizar ('completar' o 'esborrar')
 * @returns {string} Mensaje de confirmación o error
 */
function modificarTasca(index, accio){
    if (index === -1) return 'Tasca no vàlida';

    if (accio === 'completar'){
        if (tasques[index].completada) {
            return 'La tasca ja estava completada!';
        }

        tasques[index].completada = true;
        return 'Tasca completada!!';
    }

    if (accio === 'esborrar'){
        tasques.splice(index, 1);
        return 'Tasca eliminada!!';
    }
}

/**
 * Mostrará estadísticas del listado de tareas
 * @returns {string} Estadísticas (total, completadas, pendentes) o mensaje de error
 */
function mostrarEstadistiques(){
    if (tasques.length === 0) return 'No hi ha estadístiques!';

    let total = tasques.length;

    let fetes = tasques.filter(tasqa => tasqa.completada).length;

    let pendents = total - fetes;

    let estadistica = `
        - Total: ${total}
        - Completades: ${fetes}
        - Pendents: ${pendents}
    `;

    return estadistica;
}

/**
 * Ejecutará el bucle principal del gestor de tareas
 * Gestiona todas las opciones del menú
 * @returns {boolean} False cuando el usuario seleccione salir
 */
function main(){
    let opcio;

    while(true){
        opcio = mostrarMenu();
        console.clear();

        switch (opcio) {
            case 1:
                console.log(afegirTasca());
                break;

            case 2:
                console.log(mostrarTasques());
                break;

            case 3:
                console.log(mostrarTasques());

                if (tasques.length > 0){
                    console.log(
                        modificarTasca(
                            obtenirIndexValid(),
                            'completar'
                        )
                    );
                }
                break;

            case 4:
                console.log(mostrarTasques());

                if (tasques.length > 0){
                    console.log(
                        modificarTasca(
                            obtenirIndexValid(),
                            'esborrar'
                        )
                    );
                }
                break;

            case 5:
                console.log(mostrarEstadistiques());
                break;

            case 6:
                console.log(mostrarTasquesPendents());
                break;

            case 7:
                console.log("Fins aviat");
                return false;

            default:
                console.log("Opció no vàlida");
        }
    }
}

main();