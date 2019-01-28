import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionTypes, getName, addName } from '../store/template'


class Template extends Component {
    constructor (props) {
        super(props);

        this.modifyName = this.modifyName.bind(this);
    }
    render () {
        const {name} = this.props;

        return (
            <div>
                <p>我的名字是：</p>
                <h2>{ name }</h2>
                <button onClick={this.modifyName}>获取我的名字</button>
            </div>
        )
    }
    componentDidMount () {
        console.log(this.props.name)
    }
    modifyName () {
        this.props.addName({
            name: 'jmazm'
        });
    }
}

Template.defaultProps = {
    name: ''
};

Template.propTypes = {
    name: PropTypes.string
}

function mapStateToProps (state) {
    const template = state.template;

    return {
        ...template
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getName: bindActionCreators(getName, dispatch),
        addName: bindActionCreators(addName, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Template)