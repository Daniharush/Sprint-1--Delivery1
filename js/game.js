'use strict'
const MINE = '💣';
const EMPTY = '';


var gBoard;
var cell = [
    {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true,
        Element: null
    }
]



function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    // setMinesNegsCount(gBoard)
}



function buildBoard() {
    // Create the Matrix
    var board = createMat(4, 4);
    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        // console.log('board.length', board.length);
        for (var j = 0; j < board.length; j++) {
            var cell = { minesAroundCount: 4, isShown: true, isMine: false, isMarked: true }
            var countCell = 0;
            cell.type = EMPTY;
            if (i === 2 && j === 0 ||
                i === 1 && j === 2) {
                    board[i][j] = cell;
                    // cell.type = MINE;
                    cell.Element = MINE;
                cell.isMine = true;
                // board[i][j] = MINE;
                // console.log(' cell', cell)
            }
            board[i][j] = cell;
            setMinesNegsCount(i, j, board);
        }
    }
    // console.log('board', board);
    // console.table('table board', board);
    return board;
}


function renderBoard(board) {
    var strHTML = '<tbody class="board"></tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            var cell = board[i][j];
            if (currCell.isMine) {
                cell = MINE;
            } else {
                cell = EMPTY;
            }
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '<tbody class="board"></table>';
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}

// function setMinesNegsCount(board, cell) {

// }
function setMinesNegsCount(cellI, cellJ, board) {
    var mineNegsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j] === EMPTY) mineNegsCount++;
        }
    }
    console.log('neg mine count',mineNegsCount)
    return mineNegsCount;
}


// function renderBoard(board) {
//     createPassages();
//     var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>\n';
//         for (var j = 0; j < board[0].length; j++) {
//             var currCell = board[i][j];
//             var cellClass = getClassName({ i: i, j: j })
//             // TODO - change to short if statement
//             // if (currCell.type === FLOOR) cellClass += ' floor';
//             // else if (currCell.type === WALL) cellClass += ' wall';
//             cellClass += (currCell.type === FLOOR) ? ' floor' : ' wall';

//             //TODO - Change To template string
//             strHTML += `\t<td class="cell  ${cellClass}"  onclick="moveTo(${i},${j})" >\n`;

//             // TODO - change to switch case statement
//             if (currCell.gameElement === GAMER) {
//                 strHTML += GAMER_IMG;
//             } else if (currCell.gameElement === BALL) {
//                 strHTML += BALL_IMG;
//             } else if (currCell.gameElement === GLUE) {
//                 strHTML += GLUE_IMG;
//             }
//             strHTML += '\t</td>\n';
//         }
//         strHTML += '</tr>\n';
//     }
