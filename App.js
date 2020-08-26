import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import combinedReducer from './components/reducers';
import { Provider } from 'react-redux';
import MyApp from './components/myapp';
const store = createStore(combinedReducer, {}, applyMiddleware(reduxThunk));

class App extends Component {
render() {
return(<Provider store={store}><MyApp /></Provider>)
}
}
export default App;



