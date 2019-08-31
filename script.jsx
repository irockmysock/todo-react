class Main extends React.Component {
  constructor(){
    super();

    this.state = {
      list : [],
      word: "",
      inputErrorMsg: ""
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.setWord = this.setWord.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  addItem(){
    if (this.state.word.length < 1 || this.state.word.length > 10) {
      this.setState({inputErrorMsg: "Invalid entry. Please enter between 1 to 200 chaarters"});
    } else {
        let updatedList = this.state.list;
        updatedList.push(this.state.word);
        console.log("Updated list is: " + updatedList);

        this.setState({list: updatedList});
        this.clearField();
    }
    // debugger;
  }

  deleteItem(event) {
    console.log("delete!")
    let updatedList = this.state.list;
    updatedList.splice(event.target.value, 1);
    this.setState({list: updatedList})
  }

  setWord(event){
    this.setState({word: event.target.value});
    // debugger;
  }

  clearField() {
    this.setState({word: ""});
    this.setState({inputErrorMsg: ""})
  }


  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="container">
          <Form inputErrorMsg={this.state.inputErrorMsg} list={this.state.list} word={this.state.word} setWord={this.setWord} addItem={this.addItem} clearField={this.clearField}/>
          <TableCom LIST={this.state.list} DELETEItem={this.deleteItem}/>
        </div>
      );
  }
}

class Form extends React.Component {
  
  render() {
    return (
      <div className="form">
        <input 
              onChange={ this.props.setWord }
              onKeyDown={ e => { e.keyCode === 13 ? this.props.addItem() : null }}
              value={this.props.word}
        /> 
        <button onClick={ this.props.addItem }> add item </button>
        <p>{this.props.inputErrorMsg}</p>
      </div>
    );
  }
}


class TableCom extends React.Component {

    render() {
        let todoItems = this.props.LIST.map( (item, id) => {
            return <TableList DELETE={this.props.DELETEItem} item={item} id={id}></TableList>;
        });

        return (
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>ToDo Item</th>
                        <th>Date Added</th>
                        <th>Action</th>
                    </tr>
                    {todoItems}
                </tbody>
            </table>

        );
    }
}

class TableList extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.item}</td>
                <td>{moment().format("MMM Do YY HH:mm")}</td>
                <td><button value={this.props.id} onClick={this.props.DELETE}>Delete</button></td>
            </tr>
        )
    }
}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);