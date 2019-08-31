class Main extends React.Component {
  constructor(){
    super();

    this.state = {
      list : [],
      word: "",
      inputErrorMsg: ""
    };

    this.setWord = this.setWord.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  addItem(){
    if (this.state.word.length < 1 || this.state.word.length > 200) {
      this.setState({inputErrorMsg: "Invalid entry. Please enter between 1 to 200 chaarters"});
    } else {
        let updatedList = this.state.list;
        updatedList.push(this.state.word);
        this.setState({list: updatedList});
        this.clearFieldAndErrorMsg();
    }
    // debugger;
  }

  deleteItem(event) {
    console.log("delete!")
    let updatedList = this.state.list;
    updatedList.splice(event.target.value, 1);
    this.setState({list: updatedList})
  }

  editItem(index, editedWord){
    if (editedWord.length < 1 || editedWord.length > 200) {
      this.setState({inputErrorMsg: "Invalid entry. Please enter between 1 to 200 chaarters"});
    } else {
      let updatedList = [...this.state.list];
      updatedList.splice(index, 1, editedWord);
      this.setState({list: updatedList});
      this.setState({inputErrorMsg: ""})
    }
  }

  setWord(event){
    this.setState({word: event.target.value});
    // debugger;
  }

  clearFieldAndErrorMsg() {
    this.setState({word: ""});
    this.setState({inputErrorMsg: ""})
  }


  render() {
      console.log("rendering MAIN APP");
      return (
        <div className="container">
          <Form 
              inputErrorMsg={this.state.inputErrorMsg} 
              list={this.state.list} 
              word={this.state.word} 
              setWord={this.setWord} 
              addItem={this.addItem}
            />
          <TableCom 
              LIST={this.state.list} 
              EDITItem={this.editItem} 
              DELETEItem={this.deleteItem}
          />
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
        let listItems = this.props.LIST.map( (item, id) => {
            return (
              <ListItems 
                      key={id}
                      EDIT={this.props.EDITItem} 
                      DELETE={this.props.DELETEItem} 
                      item={item} 
                      id={id}
              />
            )
        });

        return (
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>ToDo Item</th>
                        <th>Date Added</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                    {listItems}
                </tbody>
            </table>

        );
    }
}

class ListItems extends React.Component {
  constructor(){
    super()
    
    this.state = {
        isEditing: false
    }

    this.startEdit = this.startEdit.bind(this)
  }

  startEdit(){
    this.setState({
        isEditing: true
    })
  }

  doEdit(e){
    this.props.EDIT(this.props.id, e.target.value);
    this.setState({isEditing: false})
  }

  showItem(){
    //if in edit mode
    if (this.state.isEditing){
        return (
          <input 
                defaultValue={this.props.item}
                onKeyDown={ e => {
                  if(e.keyCode === 13){
                    this.doEdit(e);
                }
            }}
          />
        )
    //else show item
    } else {
        return (
            this.props.item
        )
    }
  }

  // showEditOrUpdateButton() {
  //   //if in edit mode show update button
  //   if (this.state.isEditing){
  //     return (
  //       <button value={this.} onClick={(e) => this.doEdit(e)}>Update</button>
  //     )
  //   //else show edit button
  //   } else {
  //       return (
  //         <button onClick={this.startEdit}>Edit</button>
  //       )
  //   }
  // }
  //<td>{this.showEditOrUpdateButton()}</td>

  render() {
      return (
          <tr>
              <td>{this.props.id}</td>
              <td>{this.showItem()}</td>
              <td>{moment().format("MMM Do YY HH:mm")}</td>
              <td><button onClick={this.startEdit}>Edit</button></td>
              <td><button value={this.props.id} onClick={this.props.DELETE}>Delete</button></td>
          </tr>
      )
  }
}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);