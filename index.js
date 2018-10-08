class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }
  handleClicked(event) {
    this.props.handler(this.props.card);
  }
  render() {
    const numberClass = this.props.card.selected ? 'number-shown' : 'number-hidden'
    return (
      <div className="card" onClick={this.handleClicked}>
        <div className={numberClass}>
          {this.props.card.value}
        </div>
      </div>
    );
  }
}

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.createCards()
    };
    this.handleClicked = this.handleClicked.bind(this);
  }

  createCards() {
    return this.cards(12).map((e, idx) => ({
      id: idx,
      value: e,
      selected: false,
      matched: false
    }));
  }

  handleClicked(card) {
    let selected_card = this.state.cards.find(
      e => e.selected && e.matched === false && e.id !== card.id
    );
    this.setState({
      cards: this.state.cards.map(
        c => (c.id === card.id ? { ...c, selected: true } : c)
      )
    });
    if (selected_card) {
      if (selected_card.value === card.value) {
        this.setState({
          cards: this.state.cards.map(
            c =>
              c.id === card.id || c.id === selected_card.id
                ? { ...c, selected: true, matched: true }
                : c
          )
        });
      } else {
        setTimeout(() => {
          this.setState({
            cards: this.state.cards.map(
              c =>
                c.id === card.id || c.id === selected_card.id
                  ? { ...c, selected: false, matched: false }
                  : c
            )
          });
        }, 500);
      }
    }
  }

  cards(n) {
    const m = Math.floor(n / 2);
    const card = [...Array(m).keys()].map(e => String.fromCodePoint(0x1F347 + e));
    // return this.shuffle([...card, ...card, String.fromCodePoint(0x1F61D)]);
    return this.shuffle([...card, ...card]);
  }

  shuffle(l) {
    const len = l.length;
    let indices = [...Array(len).keys()];
    let a = [];
    for (let k = 0, n = len; k < len; k++, n--) {
      let j = Math.floor(Math.random() * n);
      a[k] = l[indices[j]];
      indices = indices.filter(e => e !== indices[j]);
    }
    return a;
  }

  render() {
    console.log(this.cards(9));
    return (
      <div>
        <h1>matchmatch</h1>
        <div className="board">
          {this.state.cards.map(e => (
            <Card card={e} key={e.id} handler={this.handleClicked} />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<GameBoard />, document.getElementById("root"));
