
class TableCom extends React.Component {
    render() {
        let todoItems = this.props.LIST.map( (item) => {
                  return <TableList item={item}></TableList>;
                });

        return (
          <div className="table">
            {todoItems}
          </div>
        );
    }
}

class TableList extends React.Component {
    render() {
        return (
            <p>{this.props.item}</p>
        )
    }
}


class List extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : [],
    };
  }


  addItem(){
    if (this.state.word.length >= 1 && this.state.word.length <=10) {
        let updatedList = this.state.list;
        updatedList.push(this.state.word);
        console.log("Updated list is: " + updatedList);

        this.setState({list: updatedList})
    } else {
        alert("OIII!")
    }

    // debugger;
  }

  changeHandler(){
    this.setState({word: event.target.value});

    // debugger;
  }

  clearField() {
    this.setState({word: ""});
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="list">
          <input id="myInput" onChange={()=>{this.changeHandler()}} value={this.state.word}/>
          <button onClick={()=>{this.addItem(); this.clearField();}}>add item</button>
          <TableCom LIST={this.state.list}/>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);