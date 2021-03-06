import React from 'react'
import ReactDOM  from 'react-dom'
import './index.css'


function Square(props) {

   
  return (
    <button 
    className="square"
    onClick={props.onClick}
    >
      {
       props.value 
      }
    </button>
  );
}

  
  
  class Board extends React.Component {

   

    renderSquare(i) {
      return (<Square 
        value = {this.props.squares[i]}  
        onClick = {() => this.props.onClick(i)} 
      />);
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        history : [{
          squares : Array(9).fill(null), 
        }],
        xIsNext: true,
        stepNum: 0
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNum + 1);
      const current = history[history.length - 1 ];
      const squares = current.squares.slice();
      // const xIsNext = this.state.xIsNext;
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNum: history.length
      });
    }

    jumpTo(step) {
      this.setState({
      stepNum: step,
      xIsNext: (step%2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const xIsNext = this.state.xIsNext;
      const current = history[this.state.stepNum];
      const winner = calculateWinner(current.squares);
      console.log(current.squares); //TEST
      const moves = history.map((step, move) => {
        const desc = move ? 
        'Go to move' + move :
        'Go to game start '
        return ( 
          <li key={move}>
            <button onClick={() => {
              this.jumpTo(move)
            }}>
              {desc}
            </button>
          </li>
        )
      });

      let status ;

      if (winner) {
        if (xIsNext) {
          status = 'The winner is O';
        }
        else {
          status = 'The winner is X'
        }
      }
      else {
        //status = `Next is ${xIsNext ? 'X' : 'O' }` 
        status = "next player : " + (xIsNext ? "X" : "O");
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0 , 1, 2],
      [3 , 4, 5],
      [6 , 7, 8],
      [0 , 4, 8],
      [6 , 4, 2],
      [0 , 3, 6],
      [1 , 4, 7],
      [2 , 5, 8],
    ];

    for (let i = 0; i < lines.length; i++)
    {
      const [a, b, c] = lines[i];
      if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
      {
        return squares[a];
      }
    }
    return null;
  }  

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  