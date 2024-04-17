const NewFruit = (props) => {
  let formFields = {}

  return(
    <form onSubmit={ (e) => {
      e.preventDefault();
      const name = formFields.name.value;
      const description = formFields.description.value;

      if (!name || !description) {
        alert("Title or desc cannot be blank");
        return;
      }
      props.handleFormSubmit(
        formFields.name.value,
        formFields.description.value
      );
      e.target.reset();}
    }>
     <input ref={input => formFields.name = input} placeholder='Enter the name of the item'/>
     <input ref={input => formFields.description = input} placeholder='Enter a description' /><c></c>
     <button>Submit</button>
    </form>
  )
}