import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEventDetails} from '../../features/EventDetails/EventDetailsSlice';
import Loading from '../../components/LoadingIcon';

export default function EventDetails({route}) {
  const {navigate} = useNavigation();
  const link = route.params.link;
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.EventDetails);

  console.log(data);

  useEffect(() => {
    dispatch(fetchEventDetails(link));
  }, [dispatch, link]);

  if (loading || !data) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View>
          <Text> Error: {error} </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>EventDetails</Text>
      <Text>{data.sources[0]?.url}</Text>
    </View>
  );
}
