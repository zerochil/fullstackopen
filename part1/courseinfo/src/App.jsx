const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name:"Fundamentals of React", exercise: 10},
    {name:"Using props to pass data", exercise: 7},
    {name:"State of a component", exercise: 14},
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercise}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise1}</p>
  )
}

export default App