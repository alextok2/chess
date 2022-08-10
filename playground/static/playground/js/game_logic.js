board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19, 
    20, null, 21, null, 22, null, 23, null
]
const cells = document.querySelectorAll("td")
let red_pieces = document.getElementsByClassName('red_piece')
let black_pieces = document.getElementsByClassName('black_piece')
const red_turn_text = document.querySelectorAll(".red_turn_text")
const black_turn_text = document.querySelectorAll(".black_turn_text")
const divider = document.querySelector("#divider")

let turn = true
let is_red_turn = true
let red_score = 12
let black_score = 12
let player_pieces

let selected_piece = {
    piece_id: -1,
    index_of_board_piece: -1,
    is_king: false,
    seventh_space: false,
    ninth_space: false,
    fourteenth_space: false,
    eighteenth_space: false,
    minus_seventh_space: false,
    minus_ninth_space: false,
    minus_fourteenth_space: false,
    minus_eighteenth_space: false,
}

function get_player_pieces(){
    console.log("get_player_pieces")
    if(turn) {
        player_pieces = red_pieces
    }
    else{
        player_pieces = black_pieces
    }
    remove_cell_on_click()
    reset_borders()
}

function give_pieces_event_listeners(){
    console.log("give_pieces_event_listeners")
    if(turn){
            for(let i = 0; i < red_pieces.length; i++)
            {
                red_pieces[i].addEventListener("click", get_player_pieces)
            }
        }
        else{
            for(let i = 0; i < black_pieces.length; i++)
            {
                black_pieces[i].addEventListener("click", get_player_pieces)
            }
        }
    }

function remove_cell_on_click(){
    console.log("remove_cell_on_click")
    for(let i = 0; i < cells.length; i++){
        cells[i].removeAttribute("onclick")
    }
}

function reset_borders(){
    console.log("reset_borders")
    for (let i = 0; i < player_pieces.length; i++){
        player_pieces[i].style.border = "1px solid white"
    }
    reset_selected_piece_properties()
    get_selected_piece()
}

function reset_selected_piece_properties(){
    console.log("reset_selected_piece_properties")
    selected_piece.piece_id = -1
    selected_piece.is_king = false
    selected_piece.seventh_space = false
    selected_piece.ninth_space = false
    selected_piece.fourteenth_space = false
    selected_piece.eighteenth_space = false
    selected_piece.minus_seventh_space = false
    selected_piece.minus_ninth_space = false
    selected_piece.minus_fourteenth_space = false
    selected_piece.minus_eighteenth_space = false
}

function get_selected_piece(){
    console.log("get_selected_piece")
    selected_piece.piece_id = parseInt(event.target.id)
    selected_piece.index_of_board_piece = find_piece(selected_piece.piece_id)
    is_piece_king()
    
}

let find_piece = function(piece_id){
    let parsed = parseInt(piece_id)
    return board.indexOf(parsed)
}

function is_piece_king() {
    console.log("is_piece_king")
    if (document.getElementById(selected_piece.piece_id).classList.contains("king")){
        selected_piece.is_king = true
    }
    else{
        selected_piece.is_king = false
    }
    get_available_space()
}

function get_available_space(){
    console.log("get_available_space")
    if(board[selected_piece.index_of_board_piece + 7] === null && cells[selected_piece.index_of_board_piece + 7].classList.contains("white_cage") !== true){
        selected_piece.seventh_space = true
    }
    if(board[selected_piece.index_of_board_piece + 9] === null && cells[selected_piece.index_of_board_piece + 9].classList.contains("white_cage") !== true){
        selected_piece.ninth_space = true
    }
    if(board[selected_piece.index_of_board_piece - 7] === null && cells[selected_piece.index_of_board_piece - 7].classList.contains("white_cage") !== true){
        selected_piece.minus_seventh_space = true
    }
    if(board[selected_piece.index_of_board_piece - 9] === null && cells[selected_piece.index_of_board_piece - 9].classList.contains("white_cage") !== true){
        selected_piece.minus_ninth_space = true
    }
    check_available_jump_spaces()
}

function check_available_jump_spaces(){
    console.log("check_available_jump_spaces")
    if (turn) {
        if (board[selected_piece.index_of_board_piece + 14] === null 
            && cells[selected_piece.index_of_board_piece + 14].classList.contains("white_cage") !== true
            && board[selected_piece.index_of_board_piece + 7 >= 12]) {
                selected_piece.fourteenth_space = true
            }
            else {
                if(board[selected_piece.index_of_board_piece + 14] === null
                    && cells[selected_piece.index_of_board_piece + 14].classList.contains("white_cage") !== true
                    && board[selected_piece.index_of_board_piece + 7] < 12 && board[selected_piece.index_of_board_piece + 7] !== null){
                        selected_piece.fourteenth_space = true
                    }
            }
    }
    check_piece_conditions()
}

function check_piece_conditions() {
    console.log("check_piece_conditions")
    if (selected_piece.is_king){
        give_piece_border()
    }
    else{
        if(turn){
            selected_piece.minus_seventh_space = false
            selected_piece.minus_ninth_space = false
            selected_piece.minus_fourteenth_space = false
            selected_piece.minus_eighteenth_space = false
        }
        else{
            selected_piece.seventh_space = false
            selected_piece.ninth_space = false
            selected_piece.fourteenth_space = false
            selected_piece.eighteenth_space = false
        }
        give_piece_border()
    }
}

function give_piece_border(){
    console.log("give_piece_border")
    if (selected_piece.seventh_space || selected_piece.ninth_space || selected_piece.fourteenth_space 
        || selected_piecel.eighteenth_space || selected_piece.minus_seventh_space || selected_piece.minus_fourteenth_space 
        || selected_piece.minus_eighteenth_space) {
            document.getElementById(selected_piece.piece_id).style.border = "3px solid green"
            give_cells_click()
        }
        else{
            return
        }
}


function give_cells_click() {
    console.log("give_cells_click")
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece + 7].setAttribute("onclick", "make_move(7)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece + 9].setAttribute("onclick", "make_move(9)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece + 14].setAttribute("onclick", "make_move(14)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece + 18].setAttribute("onclick", "make_move(18)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece - 7].setAttribute("onclick", "make_move(-7)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece - 9].setAttribute("onclick", "make_move(-9)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece - 14].setAttribute("onclick", "make_move(-14)")
    }
    if( selected_piece.seventh_space){
        cells[selected_piece.index_of_board_piece - 18].setAttribute("onclick", "make_move(-18)")
    }
}

function make_move(number) {
    console.log("make_move")
    document.getElementById(selected_piece.piece_id).remove()
    cells[selected_piece.index_of_board_piece].innerHTML = ""
    if (turn) {
        if (selected_piece.is_king) {
            cells[selected_piece.index_of_board_piece + number].innerHTML = `<p class="red_piece king" id="${selected_piece.piece_id}"></p>`
            red_pieces = document.getElementsByClassName('red_piece')
        }
        else{
            cells[selected_piece.index_of_board_piece + number].innerHTML = `<p class="red_piece" id="${selected_piece.piece_id}"></p>`
            red_pieces = document.getElementsByClassName('red_piece')
        }
    } else{
        if (selected_piece.is_king) {
            cells[selected_piece.index_of_board_piece + number].innerHTML = `<p class="black_piece king" id="${selected_piece.piece_id}"></p>`
            red_pieces = document.getElementsByClassName('black_piece')
        }
        else{
            cells[selected_piece.index_of_board_piece + number].innerHTML = `<p class="black_piece" id="${selected_piece.piece_id}"></p>`
            red_pieces = document.getElementsByClassName('black_piece')
        }

        let index_of_piece = selected_piece.index_of_board_piece
        if (number === 14 || number === -14 || number === 18 || number === -18){
            change_data(index_of_piece, index_of_piece + number, index_of_piece + numver / 2)
        }
        else {
            change_data(index_of_piece, index_of_piece + number)
        }
    }
}
function change_data(index_of_board_piece, modified_index, remove_piece){
    console.log("change_data")
    board[index_of_board_piece] = null
    board[modified_index] = parseInt(selected_piece.piece_id)
    if(turn && selected_piece.piece_id < 12 && modified_index >= 57){
        document.getElementById(selected_piece.piece_id).classList.add("king")
    }
    if(turn === false && selected_piece.piece_id >= 12 && modified_index <= 7){
        document.getElementById(selected_piece.piece_id).classList.add("king")
    }
    if(remove_piece){
        board[remove_piece] = null
        if (turn && selected_piece.piece_id < 12) {
            cells[remove_piece].innerHTML = ""
            black_score--
        }
        if (turn === false && selected_piece.piece_id >= 12) {
            cells[remove_piece].innerHTML = ""
            red_score--
        }
    }
}

function remove_event_listeners() {
    console.log("remove_event_listeners")
    if(turn) {
        for(let i = 0; i < red_pieces.length; i++){
            red_pieces[i].removeEventListener("click", get_player_pieces)
        }
    }
    else{
        for(let i = 0; i < black_pieces.length; i++){
            black_pieces[i].removeEventListener("click", get_player_pieces)
        }
    }
    check_for_win()
}

function check_for_win() {
    console.log("check_for_win")
    if (black_score === 0){
        divider.style.display = "none"
        for (let i = 0; i < red_turn_text.length; i++){
            red_turn_text[i].style.color = "black"
            black_turn_text[i].style.display = "none"
            red_turn_text[i].textContent = "RED WINS!"
        }
    }
    else if(red_score === 0){
        divider.style.display = "none"
        for (let i = 0; i < black_turn_text.length; i++){
            black_turn_text[i].style.color = "black"
            red_turn_text[i].style.display = "none"
            black_turn_text[i].textContent = "BLACK WINS!"
        }
    }
    change_player()
}

function change_player(){
    console.log("change_player")
    if(turn){ 
        turn = false
        for(let i = 0; i < red_turn_text.length; i++){
            red_turn_text[i].style.color = "lightGrey"
            black_turn_text[i].style.color = "black"
        }
    }
    else{
        turn = true
        for(let i = 0; i < red_turn_text.length; i++){
            black_turn_text[i].style.color = "lightGrey"
            red_turn_text[i].style.color = "black"
        }
    }
    give_pieces_event_listeners()
}

give_pieces_event_listeners()