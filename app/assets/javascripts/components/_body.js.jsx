class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: [],
      editModes: {}
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewFruit = this.addNewFruit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteFruit = this.deleteFruit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this);
  }

  handleEdit(fruitId) {
    this.setState((prevState) => ({
      editModes: {
        ...prevState.editModes,
        [fruitId]: true
      }
    }));
  }

  handleSubmit(fruit) {
    this.setState((prevState) => ({
      editModes: {
        ...prevState.editModes,
        [fruit.id]: false
      }
    }));
    this.handleUpdate(fruit);
  }

  handleFormSubmit(name, description) {
    let body = JSON.stringify({ fruit: { name: name, description: description } });
    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => { return response.json() })
      .then((fruit) => {
        this.addNewFruit(fruit);
      });
  }

  handleDelete(id) {
    fetch(`http://localhost:3000/api/v1/fruits/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('Item was deleted!');
        this.deleteFruit(id);
      });
  }

  deleteFruit(id) {
    const newFruits = this.state.fruits.filter((fruit) => fruit.id !== id);
    this.setState({
      fruits: newFruits
    });
  }

  addNewFruit(fruit) {
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    });
  }

  handleUpdate(fruit) {
    fetch(`http://localhost:3000/api/v1/fruits/${fruit.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ fruit: fruit }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).
      then((response) => response.json())
      .then((updatedFruit) => {
        this.updateFruit(updatedFruit);
      });
  }

  updateFruit(updatedFruit) {
    this.setState((prevState) => ({
      fruits: prevState.fruits.map((fruit) => {
        if (fruit.id === updatedFruit.id) {
          return updatedFruit;
        }
        return fruit;
      })
    }));
  }

  componentDidMount() {
    fetch('/api/v1/fruits.json')
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ fruits: data }) });
  }

  handleChange(e, fruit){
    const { name, value } = e.target;
    const updatedFruit = { ...fruit, [name]: value };
    this.setState((prevState) => ({
      fruits: prevState.fruits.map((f) => (f.id === fruit.id ? updatedFruit : f))
    }));
  };

  render() {
    const allFruits = this.state.fruits.map((fruit, index) => (
      <tr key={index}>
        <td>
          {this.state.editModes[fruit.id] ? (
            <input
              name="name"
              value={fruit.name}
              onChange={(e) => this.handleChange(e, fruit)}
              placeholder="Name"
            />
          ) : (
            fruit.name
          )}
        </td>
        <td>
          {this.state.editModes[fruit.id] ? (
            <input
              name="description"
              value={fruit.description}
              onChange={(e) => this.handleChange(e, fruit)}
              placeholder="Description"
            />
          ) : (
            fruit.description
          )}
        </td>
        <td>
          {this.state.editModes[fruit.id] ? (
            <button onClick={() => this.handleSubmit(fruit)}>Submit</button>
          ) : (
            <button onClick={() => this.handleEdit(fruit.id)}>Edit</button>
          )}
        </td>
        <td>
          <button onClick={() => this.handleDelete(fruit.id)}>Delete</button>
        </td>
      </tr>
    ));

    return (
      <div className="newFruits">
        <NewFruit handleFormSubmit={this.handleFormSubmit} />
        <div className="App">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{allFruits}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
