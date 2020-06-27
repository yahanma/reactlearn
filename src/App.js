import React, { useState, useEffect } from 'react';
import { Table } from "semantic-ui-react";
import spinner from "./assets/ajax-loader.gif";
//import * as ReactDOM from 'react-dom'
//import logo from './logo.svg';
import './App.css';
import Search from "./Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
var API_URL= 'https://l3wuo08aqf.execute-api.us-east-1.amazonaws.com/beta/s3select';
const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/testinput">Testinput</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/tick">Tick</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/testinput">
            <Testinput />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/tick">
            <Tick />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
    };
  useEffect(() => {
    const results = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
 
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function About() {
  const [text, setText] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      //alert(`Submitting Name ${text}`)
  }
  return (
    <div>
      <p>Your url {text} </p>
      <form onSubmit={handleSubmit}>
        <label>
          search text:
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <Search search={text} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function Testinput() {
	const API_URL= 'https://l3wuo08aqf.execute-api.us-east-1.amazonaws.com/beta/s3select';
  const soptions=["Entry", "Entry name", "Protein names","Gene names","Organism","Mass","EC number","Cofactor"]
  const defaultValue=soptions[0]
  const [soption, setSoption] = useState(defaultValue)
  const doptions=["swisspro", "trembl"]
  const [doption, setDoption] = useState("swisspro")
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState(API_URL);
  const current_page = 1;
  //var url_post = API_URL

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.Items);
          setError(null);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url])//[]an array of dependencies the React.useEffect hook is dependent on 

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setUrl(API_URL +"?keyword=\""+soption+"\"&value=\""+text+"\"&category=\""+doption+"\"&page=\""+current_page+"\""); 
  }

  function handlesoptionChange(e) {
    setSoption([e.target.value]);
  }
  function handledoptionChange(e) {
    setDoption([e.target.value]);
  }
  const retrievedItems =
    !isLoaded && !error ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : error ? (
      <div className="errorMessage">{error.message}</div>
    ) : (
      <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Organism</Table.HeaderCell>
            <Table.HeaderCell>Length</Table.HeaderCell>
            <Table.HeaderCell>Mass</Table.HeaderCell>
            <Table.HeaderCell>Cofactor</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map(el => {
            return (
              <Table.Row key={el.Entry}>
                <Table.Cell>{el.Entry}</Table.Cell>
                <Table.Cell>{el.Organism}</Table.Cell>
                <Table.Cell> {el.Length}</Table.Cell>
                <Table.Cell>{el.Mass}</Table.Cell>
                <Table.Cell>{el.Cofactor}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      </div>
    );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        < select
          onChange={handledoptionChange}
          className="browser-default custom-select" >
          { doptions.map((option) => <option value={option}>{option}</option>)}
        </select >
        < select
          onChange={handlesoptionChange}
          className="browser-default custom-select" >
          { soptions.map((option) => <option value={option}>{option}</option>)}
        </select >
        <label>
          search text:
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="result">
        {retrievedItems}
      </div>
    <p>Your select option is {soption} and your database is  {doption} </p>
    <p>Your url {url} </p>
    </div>
  );
}

function Test() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const newtodos = [
    {id: 1, text: 'Learn playing' },
    {id: 2, text: 'Learn writting' }
  ];
  const [todos, setTodos] = useState([{ id: 1, text: 'Learn Hooks' }]);
  return (
    <div>
      <p>You like {fruit} !</p>
      <p>You are {age} !</p>
      <p>You need to do {todos[0].text} !</p>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.id} {item.text} 
          </li>
        ))}
      </ul>
      <button onClick={() => setFruit("apple")}>
        change apple
      </button>
      <button onClick={() => setAge(55)}>
        change age
      </button>
      <button onClick={() => setTodos(newtodos)}>
        change todos
      </button>
    </div>
  );
}

function Formdom() {
	//const API_URL= 'https://l3wuo08aqf.execute-api.us-east-1.amazonaws.com/beta/s3select';
  const soptions=["Entry", "Entry name", "Protein names","Gene names","Organism","Mass","EC number","Cofactor"]
  const defaultValue=soptions[0]
  var current_page=1
  const [soption, setSoption] = useState(defaultValue)
  const doptions=["swisspro", "trembl"]
  const [doption, setDoption] = useState("swisspro")
  const [text, setText] = useState("");
  const handleSubmit = (evt) => {
      evt.preventDefault();
      //prevent the default action of the form so that we stay on the page
      //alert(`Submitting Name ${text}`)
  }

  //const Add = addrtype.map(Add => Add)
  //const handleAddrTypeChange = (e) => console.log((addrtype[e.target.value]))
  function handlesoptionChange(e) {
    setSoption([e.target.value]);
    //console.log(addrtype)
  }
  function handledoptionChange(e) {
    setDoption([e.target.value]);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        < select
          onChange={handledoptionChange}
          className="browser-default custom-select" >
          { doptions.map((option) => <option value={option}>{option}</option>)}
        </select >
        < select
          onChange={handlesoptionChange}
          //onChange={e => handleAddrTypeChange(e)}
          className="browser-default custom-select" >
          { soptions.map((option) => <option value={option}>{option}</option>)}
        </select >
        <label>
          search text:
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    <p>Your select option is {soption} and your database is  {doption} </p>
    </div>
  );
}

function Tick() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
		var current_keyword = "Gene names";
		var current_value = "argR";
    var current_dataResource = "swisspro";
		var current_page = 1;
    var API_URL= 'https://l3wuo08aqf.execute-api.us-east-1.amazonaws.com/beta/s3select';
    //const sterm=searchValue
    var sterm=current_value;
    var url = API_URL+"?keyword=\""+current_keyword+"\"&value=\""+current_value+"\"&category=\""+current_dataResource+"\"&page=\""+current_page+"\""; 
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.Items);
          //setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])//[]an array of dependencies the React.useEffect hook is dependent on 
  if (error) {
    return (
      <div>
        <Formdom/>
        Error: {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return <div><Formdom/>Loading...</div>;
  } else {
    //console.log(items);
    return (
      <div>
      <Formdom/>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Organism</Table.HeaderCell>
            <Table.HeaderCell>Length</Table.HeaderCell>
            <Table.HeaderCell>Mass</Table.HeaderCell>
            <Table.HeaderCell>Cofactor</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map(el => {
            return (
              <Table.Row key={el.Entry}>
                <Table.Cell>{el.Entry}</Table.Cell>
                <Table.Cell>{el.Organism}</Table.Cell>
                <Table.Cell> {el.Length}</Table.Cell>
                <Table.Cell>{el.Mass}</Table.Cell>
                <Table.Cell>{el.Cofactor}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
    );
  }
  //don't use reactdom in create-react-APP application！！
  //ReactDOM.render(element, document.getElementById('root'));
}

function reslistdom(items) {
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.Entry}>
            {item.Entry} {item.Organism}
          </li>
        ))}
      </ul>
    </div>
  );
}


function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

