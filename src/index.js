import Post from '@models/Post';
import * as $ from 'jquery';
import users from './assets/users.json';
import xml from './assets/data.xml';
import logo from './img/logo.png';
import './styles/style.css';
import './styles/post.scss';
import './styles/logo.less';

const postContainer = document.getElementById('posts');

console.log(postContainer);
console.log(users);
console.log(xml);

const post = new Post('I\'ll super programer!', logo);

console.log(post.toString());

$('pre').html(post.toString())

document.querySelector('#logo').innerHTML = `<img src=${logo} alt="Loading..." width="400" id="logo" />`

const asyncTest = async () => {
    return await Promise.resolve('WAIT A MINUTE!');
}

asyncTest().then(console.log);

class SuperMachine {
    static health = Math.floor(Math.random() * 8999) + 1000;
}

console.log(SuperMachine.health);