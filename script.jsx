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

// class InputErrorMsg extends React.Component {
//     render() {
//         if (this.props.word.length <= 1) {
//             return (
//             <p>WOOOOOOO!</p>
//             )
//         }
//     }
// }
// <InputErrorMsg word={this.state.word}/>


class Main extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : [],
    };

    this.deleteItem = this.deleteItem.bind(this);
  }


  addItem(){
    if (this.state.word.length <= 1) {
        alert("ENTER SOMETHING OI!");
    } else if (this.state.word.length >=50) {
        alert("TOO MANY CHARACTERS!");
    } else {
        let updatedList = this.state.list;
        updatedList.push(this.state.word);
        console.log("Updated list is: " + updatedList);

        this.setState({list: updatedList})
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

  deleteItem(event) {
    console.log("delete!")
    let updatedList = this.state.list;
    updatedList.splice(event.target.value, 1);
    this.setState({list: updatedList})
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="list">
          <input id="myInput" onChange={()=>{this.changeHandler()}} value={this.state.word}/>
          <button onClick={()=>{this.addItem(); this.clearField();}}>add item</button>
          <TableCom LIST={this.state.list} DELETEItem={this.deleteItem}/>
        </div>
      );
  }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);