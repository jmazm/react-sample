import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Volumn from '../components/Volumn';

export default class Home extends Component {
    render () {
        return (
            <div>
                {/* <Link to="/template">go to template</Link> */}
                <Volumn/>
            </div>
        )
    }

    componentDidMount () {
        // this.sayHello();
    }
    sayHello () {
        const elements = [1, 2, 3].map((item) => {
            return (
              <div>{item}</div>
            )
          });

          console.log("foobar".includes("foo"))
          
          console.log(elements);
          
          async function a() {
            console.log('begin');
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000)
            })
            console.log('done');
          }
          a();
          
          console.log(Object.values({ 1: 2 }));
          
          console.log(Array.isArray([]));
    }
}