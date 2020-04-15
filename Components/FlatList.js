import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

export default class Flat_list extends Component{
    state={
        person:[
            {name:"Ashish"},
            {name:"Ravi"},
            {name:"Suraj"},
            {name:"Rahul"}
        ],
        refreshing:false
    }
    handlerefresh(){
        this.setState({
            refreshing:true
        },()=>{
            this.setState({
                person:[...this.state.person,{name:'AshExpert'},{name:"Shruti"}],
                refreshing:false
            })
        })
    }
    render(){
    // const myList = this.state.person.map(item=>{
    //     return <Text key={item.name}>{item.name}</Text>
    // })
    return(
        <View>
            {/* {myList} */}
            <FlatList
                keyExtractor={(item)=>item.name}
                data={this.state.person}
                renderItem={({item})=>{
                    return <Text style={{fontSize:40}}>{item.name}</Text>
                }}
                onRefresh={()=>this.handlerefresh()}
                refreshing ={this.state.refreshing}
            />
        </View>
    );
  }
}