import React, { Component } from 'react'
import axios from 'axios';
import sort from 'fast-sort'

export default class Search extends Component {
  constructor(){
    super()
    this.state = {
      momentArr: [],
      displayArr: [],
      searchField: '',
      searchArr: []
    }
  }
  componentDidMount = () => {
    this.getAllMoments()
  }
  getAllMoments = () => {
    axios.get('/api/moment').then(res => {
      console.log('alllllll moments',res.data.moment)
      this.setState({momentArr: res.data.moment})
    })
  }
  seeState = () => {
    console.log('this.state', this.state)
    console.log('this.state.momentArr', this.state.momentArr)
  }
  submitSearch = async () => {
    console.log('submitSearch button starting search')
    let Arr = this.state.searchField.split(' ');
    console.log('arrrrrrrrrrrrrrrrrrrr', Arr)
    await this.setState({
      searchArr: Arr
    })
    this.sortMoments(this.state.momentArr)
  }
  sortMoments = (objArr) => {
    console.log('sorting moments')
    let mapped = objArr.map( moment => {
      moment.searchResult = this.searchMoment(moment)
      // console.log('moment.searchResult',moment.searchResult)
      return moment
    })
    mapped = mapped.filter( elem =>  elem.searchResult.result )
    let resultSort = sort(mapped).desc( a => a.searchResult.counter)
    console.log(resultSort)
    return resultSort
  }
  searchMoment = (moment) => {
    console.log('searching a moment')
    let trueCounter = 0
    let final = {}
    console.log(this.state.searchArr)
    for (let key in this.state.searchArr){
      let word = this.state.searchArr[key]
      word = word.toLowerCase();
      searchRecursiveForText(word,moment)
    }
    if (trueCounter === 0){
      return final = {results: false}
    } else {
      let final = {result: true, counter: trueCounter}
      console.log(final)
      return final
    }
    function searchRecursiveForText (text, item) {
      if (typeof item === 'object'){
      if (Array.isArray(item)){
        console.log('array')
      } else {
        console.log('object')
      }
        for (let key in item){
          searchRecursiveForText(text, item[key])
        }
      } else if (typeof item === 'number'){
        console.log('number')
      } else if (typeof item === 'string'){
        console.log('found a string, starting search')
        let itemLC = item.toLowerCase();
        let textLength = text.length
        for ( let i = 0; i < itemLC.length; i++){
          let itemslice = itemLC.slice(i, i+textLength)
          if ( text === itemslice){
            console.log('found a match, text is', text, 'truecounter+=1')
            trueCounter += 1
          }
        }
      }
      console.log('trueCounter is:', trueCounter)
      return trueCounter;
    }
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  render() {
    const { searchArr, searchField } = this.state;
    console.log('Search state', this.state)

    return (
      <div>
          <div><input name='searchField' value={searchField}onChange={this.handleChange} type="text" placeholder="Experiences"/></div>
          <button  onClick={this.submitSearch}>Search</button>
         
      </div>
    )
  }
}

// <button onClick={this.seeState}>See Search State</button>