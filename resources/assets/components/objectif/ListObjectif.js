import React, { Component } from 'react';
import ItemList from './ItemList';

export default class ListObjectif extends Component {
  render() {
    return (
      <div className="conteneur">
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
        <ItemList />
      </div>
    );
  }
}
