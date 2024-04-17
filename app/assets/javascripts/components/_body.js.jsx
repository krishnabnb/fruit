class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewFruit = this.addNewFruit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteFruit = this.deleteFruit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this)
  }

  handleFormSubmit(name, description){
    let body = JSON.stringify({fruit: {name: name, description:   description} })
    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((fruit)=>{
      this.addNewFruit(fruit)
    })
  }

  handleDelete(id){
    fetch(`http://localhost:3000/api/v1/fruits/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log('Item was deleted!')
      this.deleteFruit(id)
    })
  }

  // deleteFruit(id){
  //   newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
  //   this.setState({
  //     fruits: newFruits
  //   })
  // }

  deleteFruit(id){
    const newFruits = this.state.fruits.filter((fruit) => fruit.id !== id);
    this.setState({
      fruits: newFruits
    });
  }

  addNewFruit(fruit){
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    })
  }

  handleUpdate(fruit){
    fetch(`http://localhost:3000/api/v1/fruits/${fruit}`,
    {
      method: 'PUT',
      body: JSON.stringify({fruit: fruit}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateFruit(fruit)
      })
  }

  updateFruit(fruit){
    let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
    newFruits.push(fruit)
    this.setState({
      fruits: newFruits
    })
  }

  // handleUpdate(fruit) {
  //   if (!fruit || !fruit.id) {
  //     console.error('Invalid fruit object:', fruit);
  //     return;
  //   }

  //   fetch(`http://localhost:3000/api/v1/fruits/${fruit.id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ fruit: fruit }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to update fruit');
  //     }
  //     return response.json();
  //   })
  //   .then(updatedFruit => {
  //     this.updateFruit(updatedFruit);
  //   })
  //   .catch(error => {
  //     console.error('Error updating fruit:', error);
  //   });
  // }

  // updateFruit(updatedFruit) {
  //   const updatedFruits = this.state.fruits.map(fruit => {
  //     if (fruit.id === updatedFruit.id) {
  //       return updatedFruit;
  //     }
  //     return fruit;
  //   });
  //   this.setState({ fruits: updatedFruits });
  // }


  componentDidMount(){
    fetch('/api/v1/fruits.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ fruits: data }) });
  }
  render() {
    const allFruits = this.state.fruits.map((fruit, index) => {
      return (
        <tr key={index}>
          <td>{fruit.name}</td>
          <td>{fruit.description}</td>
          <td>
            <button onClick={() => this.handleDelete(fruit.id)}>Delete</button>
          </td>
          <td>
            <button onClick={() => this.handleUpdate(fruit.id)}>Edit</button>
          </td>

        </tr>
      );
    });
    return (
      <div className="newFruits">
        <NewFruit handleFormSubmit={this.handleFormSubmit} />
        <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} /><br></br>
        <div className="App">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {allFruits}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
