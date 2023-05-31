import {View, Text, Button} from 'react-native';
import React from 'react';
import useCounterStore from '../app/store';
import {GeneralStyles} from '../Utils/GeneralStyles';

export default function Counter() {
  const count = useCounterStore(state => state.count);
  const {increment, decrement} = useCounterStore(state => state);
  return (
    <View style={GeneralStyles.container}>
      <Text>Counter: {count} </Text>
      <Button title="increment" onPress={increment} />
      <Button title="decrement" onPress={decrement} />
    </View>
  );
}
