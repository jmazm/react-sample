import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addName } from '../store/template.thunk'
import { addBirth} from '../store/template.promise'
import { addAge } from '../store/template.saga'


class Template extends Component {
    constructor (props) {
        super(props);

        this.modifyName = this.modifyName.bind(this);
    }
    render () {
        const {name, age, birth} = this.props;

        return (
            <div>
                <p>我的名字是：</p>
                <h2>{ name }</h2>
                <p>我的年龄是：</p>
                <h2>{ age }</h2>
                <p>我的出生地是：</p>
                <h2>{ birth }</h2>
                <button onClick={this.modifyName}>获取我的名字</button>
            </div>
        )
    }
    componentDidMount () {
        console.log(this.props.name)
    }
    async modifyName () {
        await this.props.addName({
            name: 'jmazm'
        });


        this.props.addBirth({
            birth: '三水'
        });

        this.props.addAge({
            age: 22
        });
    }
}

Template.defaultProps = {
    name: '',
    age: -1,
    birth: ''
};

Template.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    birth: PropTypes.string
}

function mapStateToProps (state) {
    const thunk = state.thunk;
    const promise = state.promise;
    const saga = state.saga;

    return {
        ...thunk,
        ...promise,
        ...saga
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addName: bindActionCreators(addName, dispatch),
        addBirth: bindActionCreators(addBirth, dispatch),
        addAge: bindActionCreators(addAge, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Template)