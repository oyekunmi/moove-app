
import { combineReducers } from 'redux';
import auth from "./auth";
import trip from "./trip";
import common from './common';

export default combineReducers({ auth, trip , common });
