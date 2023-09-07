const Course = ({course}) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Content = ({parts}) => {
    return (
        <div>
        { parts.map (part => <Part key={part.id} part={part} />) }
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({parts}) => {
    return (
        <p><b>total of {parts.map(part=>part.exercises).reduce( (total, exercises) => exercises+total )} exercises</b></p>
    )
}

export default Course;