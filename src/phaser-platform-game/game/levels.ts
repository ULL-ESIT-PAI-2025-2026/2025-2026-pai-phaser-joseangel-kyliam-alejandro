/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Jose Angel Portillo Garcia
 * @author Alejandro Feo Martin
 * @author Kyliam Gabriel Chinea Salcedo
 * @since Apr 29 2026
 * @desc Defines the game level layouts using text-based tilemap format.
 * Each character represents a different game object or tile type.
 */

/**
 * Array of level data maps used to construct game levels.
 * Each level is a 2D representation of the game world using characters:
 * - '@' = Player spawn position
 * - '#' = Wall (solid platform)
 * - 'o' = Coin (collectible)
 * - '!' = Static lava (hazard)
 * - 'E' = Exit/Goal marker
 * - 'V' = Falling lava spawner
 * - ' ' = Empty space
 */
export const LEVELS = [
  // NIVEL 0: El tutorial
  [
'                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                                                ###             ',
    '                                                   ##      ##    ##!##          ',
    '                                      o o      ##                 #!!!#         ',
    '                                                                 ##!##          ',
    '                                   #####                          #V#           ',
    '                                                                            ##  ',
    '  ##                                      o o                               #  ',
    '  #                      o                                                  #  ',
    '  #                                       #####                            o#  ',
    '  #  @       ####        o                                                  #  ',
    '  #          #  #                                            #####          #  ',
    '  ############  ###############    ####################      ##################',
    '                               #!!!#                  #!!!!!#                   ',
    '                               #!!!#                  #!!!!!#                   ',
    '                               #!!!#                  #!!!!!#                   ',
    '                               #####                  #######                   ',
    '                                                                                ',
  ],
  [
    '################################################################',
    '#                                                              #',
    '#      o                                  o            o       #',
    '#     ###       ###         !            ###          ###      #',
    '#   @                      ###                                 #',
    '# ####               !              !          !             E #',
    '#        #####     #####          #####      #####         #####',
    '################################################################'
  ],
  // NIVEL 1: Más saltos
  [
    '########################',
    '#                      #',
    '#      o         o     #',
    '#     ###       ###    #',
    '#   @                  #',
    '# ####   !   !       E #',
    '#        #####     #####',
    '########################'
  ],
  // NIVEL 2: Precisión
  [
    '########################',
    '#  o             o     #',
    '# ###    !      ###    #',
    '#       ###            #',
    '#   @        !         #',
    '#  ###      ###      E #',
    '# !    !  !     !  #####',
    '########################'
  ]
];