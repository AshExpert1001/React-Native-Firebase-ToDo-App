import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, YellowBox } from 'react-native';
// import Flat_list from './Components/FlatList';
import * as firebase from 'firebase';
import {config} from './config';
import { TextInput, Button, Appbar, List, Card } from 'react-native-paper';


// code for ignore warning time
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



firebase.initializeApp(config);

export default class App extends Component{
  state={
    text:"",
    mylist:[]
  }
componentDidMount(){
const myList = firebase.database().ref("todo");
  myList.on("value", data=>{
    //console.log(Object.values(data.val()))
    if(data.val()){
      this.setState({ mylist:Object.values(data.val()) })
    }
  })
  
}
saveitem(){
  const mytodo = firebase.database().ref("todo");
  mytodo.push().set({
    text:this.state.text,
    time:Date.now()
  })
  this.setState({text:""})
}

removeall(){
  firebase.database().ref("todo").remove()
  this.setState({mylist:[]})
}

  render(){
    // console.log(this.state)
    const myitems = this.state.mylist.map(item=>{
      return(
        <Card key={item.time} style={{margin:5, padding:5, elevation:4}}>
          <List.Item
            title={item.text}
            description={new Date(item.time).toDateString()}
          />
        </Card>
      )
    })
  return (
    <View style={styles.container}>
     <Appbar.Header >
        <Appbar.Content title="TO-DO App" style={{alignItems:'center'}}/>
      </Appbar.Header>
      <TextInput
        label='TODO'
        value={this.state.text}
        onChangeText={(text) => this.setState({ text })}
      />
      <View style={{flexDirection:'row', margin:10, justifyContent:'space-evenly'}}>
      <Button icon="lead-pencil" mode="contained" onPress={() => this.saveitem()} style={{backgroundColor:'green',borderRadius:30, padding:5}}>
        Add ToDo
      </Button>
      <Button icon="delete" mode="contained" onPress={() => this.removeall()} style={{backgroundColor:'red', borderRadius:30, padding:5}}>
        Delete All
      </Button>
      </View>
      <ScrollView>
        {myitems}
      </ScrollView>
    </View>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',

  },
});
