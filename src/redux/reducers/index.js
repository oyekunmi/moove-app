
import { combineReducers } from 'redux';
import auth from "./auth";
import trip from "./trip";
import common from './common';
import trips from './trips';

export default combineReducers({ common, auth, trips, trip });
